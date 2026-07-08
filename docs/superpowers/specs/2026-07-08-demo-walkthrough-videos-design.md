# Demo Walkthrough Videos — Design Spec

**Date:** 2026-07-08
**Owner:** Carlos Zabala (PO)
**Status:** Approved for planning

---

## One-line summary

A **reusable Claude Code skill** that, in any project, drives that project's live
site in a browser, records the walkthrough as video, narrates it in Carlos's own
macOS Personal Voice, and stitches the two into a finished MP4 — re-runnable any
time the site changes. `po-traction-engine` is the first project to use it.

## Goals

- **Reusable across every project** Carlos opens in Claude Code — the engine is
  written once as a personal skill, not copied per project.
- Produce a narrated **live-footage** walkthrough with a single command.
- **Re-runnable by the PO** with no developer and no Claude-in-the-loop.
- **Zero paid tools.** Everything is free/open-source or already on the Mac.
- Narration in **Carlos's own voice today** via macOS Personal Voice (EN now, ES supported).
- Adding a new video = drop one walkthrough file, mirroring how the library adds templates.
- First deliverable: a **Full Library Tour** of the po-traction-engine home page
  (Day-0 blockers → 30/60/90 bands → template grid), in English.

## Non-goals (v1 — deliberately deferred)

- Captions / subtitles, background music, animated transitions, intro/outro title cards.
- Multi-scene editing timeline. v1 is a linear beat-by-beat tour.
- Publishing/hosting the video anywhere. v1 just produces the MP4 file.
- Cross-platform support. This is macOS-only (Personal Voice is an Apple feature).
- Turning the skill into a shared DesignliOS canon skill — possible later (see Future).

## Audience & polish level

Internal-first (shared with Designli POs), with a path to client-facing later.
v1 targets "clear and repeatable," not "broadcast-polished."

---

## Architecture — two layers

The system splits into a **reusable engine** (written once, lives in a personal
skill) and **per-project data** (each project's own tour script + output). This is
what makes it reusable across all projects without duplication.

### Layer 1 — The engine (reusable skill, written once)

Lives at `~/.claude/skills/demo-walkthrough-video/` so Claude Code auto-discovers
it in every project:

```
~/.claude/skills/demo-walkthrough-video/
  SKILL.md                     # trigger + instructions; lets any project say "make a demo video"
  engine/
    package.json               # Playwright dep — installed ONCE here, shared by all projects
    node_modules/              # (Playwright + Chromium; gitignored / not part of the skill's committed files)
    build.mjs                  # orchestrator: reads a walkthrough → voice → record → stitch
    lib/
      voice.mjs                # narration text → audio clip + measured duration
      voice.swift              # Personal Voice renderer (called by voice.mjs)
      record.mjs               # Playwright drives + records the target site
      stitch.mjs               # ffmpeg muxes audio onto video → mp4
    templates/
      walkthrough.mjs          # starter a project's first walkthrough is scaffolded from
      run.sh                   # thin per-project runner, copied into each project
```

The engine is **project-agnostic**: it takes a walkthrough file (which carries the
target URL, voice, and beats) and an output directory as inputs. It never hardcodes
anything about po-traction-engine.

### Layer 2 — Per-project data (this repo, and any future project)

The skill scaffolds a small `demo/` folder in whichever project it's run from:

```
<project>/demo/
  walkthroughs/
    full-library-tour.mjs      # this project's tour: its URL, voice, and beats
  run.sh                       # one-line wrapper → calls the shared engine (re-runnable without Claude)
  output/                      # finished .mp4 files — gitignored
  build/                       # intermediate artifacts — gitignored
```

Only this thin, project-specific slice lives in each repo. The heavy, shared
machinery stays in the skill.

---

## The 4 stations (inside the engine)

Each station is an isolated, swappable unit with a clear input → output contract.

### Station 1 — Script (the walkthrough definition)

A project's `walkthroughs/<name>.mjs` exports config + an ordered list of **beats**,
each pairing one narration line with one browser action:

```js
export const config = {
  url: "https://po-traction-engine.vercel.app",
  voice: "Carlos' Personal Voice (EN)",
  viewport: { width: 1920, height: 1080 },
};

export const beats = [
  {
    id: "intro",
    narration: "This is the Traction Engine — a library of reusable plays for Product Owners.",
    action: async (page) => { /* land on home, hold */ },
  },
  {
    id: "day-0-blockers",
    narration: "First, your Day-0 blockers — the things to clear before anything else.",
    action: async (page) => { await scrollTo(page, "#day-0-blockers"); },
  },
  // ...one beat per section of the tour
];
```

Narration is plain English the PO edits freely. `action` is a small async function
that scrolls/clicks. Claude drafts the initial beats from the real site content;
the PO owns the wording thereafter.

### Station 2 — Voice (Personal Voice → audio)

`lib/voice.mjs` takes a narration string + a voice name and returns
`{ audioPath, durationSeconds }`.

- **Default:** shells out to `lib/voice.swift`, which uses Apple's
  `AVSpeechSynthesizer` to render the line in the named Personal Voice to a WAV file.
- **Fallback:** if Personal Voice authorization is denied or the voice isn't found,
  fall back to the plain `say` CLI (with a warning) so the pipeline still completes.
- Duration is measured with `ffprobe` (ships with ffmpeg).

**`voice.swift` behavior:**
1. Call `AVSpeechSynthesizer.requestPersonalVoiceAuthorization` and wait for the result
   (first run triggers a one-time macOS permission prompt Carlos approves once).
2. Find the target voice via `AVSpeechSynthesisVoice.speechVoices()` filtered by
   `voiceTraits.contains(.isPersonalVoice)`, matched by name.
3. Render the utterance via `synthesizer.write(_:toBufferCallback:)`, appending PCM
   buffers to an `AVAudioFile` until an empty buffer signals completion.
4. Args: `voice.swift "<voice name>" "<input text file>" "<output wav path>"`.

Requires macOS 14+ and the Swift toolchain — both already present (macOS 26.5,
`/usr/bin/swift`). No install.

### Station 3 — Record (Playwright drives the live site)

`lib/record.mjs`:
- Launches Chromium via Playwright with video recording enabled at the configured
  viewport (retina scale for crispness, downscaled on export).
- Opens `config.url`.
- For each beat, in order: run `beat.action(page)`, then hold for that beat's
  **measured audio duration + a small padding**, so the picture stays on screen
  exactly as long as its narration.
- Closes the context to flush the silent `.webm`.

### Station 4 — Stitch (ffmpeg → MP4)

`lib/stitch.mjs`:
- Concatenates the per-beat audio clips in order, each followed by the same padding
  used during recording, into one narration track.
- Muxes that track onto the silent video and exports `output/<name>.mp4` (H.264/AAC).

### The sync guarantee

Both the **video pacing** (Station 3's per-beat hold) and the **audio track**
(Station 4's per-beat concat) are derived from the *same* per-beat durations measured
in Station 2. They are built from one source of truth, so voice and picture cannot
drift apart over the length of the video.

**Known limitation (accepted for v1):** an `action` with its own animation (e.g. a
smooth scroll) runs *before* the narration hold, so a beat's narration starts after
its motion settles. Fine for a tour feel; a per-beat `leadIn` knob can tune it later.

---

## How it's used

### In a brand-new project (the reusable path)

1. Open the project in Claude Code, say "make a demo video of this site" (or `/demo-walkthrough-video`).
2. The skill scaffolds `demo/` in that project and drafts a first walkthrough from the site.
3. It records that project's URL and narrates in the chosen Personal Voice.

### Re-running without Claude (from any project that has `demo/`)

```
./demo/run.sh full-library-tour
```

`run.sh` calls the shared engine with this project's walkthrough file and output dir.
First run only: approve the macOS Personal Voice permission prompt once.

Useful flags (passed through to the engine):
- `--voice "Voz personal de Carlos (ES)"` — override voice (e.g. Spanish).
- `--dry-run` — generate script + voice clips only, skip recording (fast script review).
- `--fallback-voice` — force the plain `say` voice.

## Dependencies (all free)

| Tool | Purpose | Where it lives | Install |
|---|---|---|---|
| Node | orchestration | system | already present |
| Playwright | records the site | **the skill's `engine/`** (once) | `npm i` in the engine, one time |
| ffmpeg / ffprobe | stitch + measure durations | system | one-time `brew install ffmpeg` |
| Swift + AVSpeechSynthesizer | Personal Voice rendering | system | already present (macOS 26.5) |
| macOS `say` | fallback voice | system | built in |

Because Playwright installs into the skill once and everything else is system-wide,
adding the skill to a new project needs **no per-project install**.

## Error handling

- **ffmpeg missing** → clear message to run `brew install ffmpeg`.
- **Personal Voice denied / not found** → warn and fall back to `say`; still produce a video.
- **Site unreachable** → fail fast with the URL and a hint to check the deploy.
- **A beat's selector not found** → skip its scroll with a warning, keep going.
- **Engine not found from a project** → `run.sh` prints where it expected the skill and how to install it.
- Intermediate artifacts land in `build/`; `--keep` preserves them, otherwise cleaned on success.

## Testing / verification

- **Smoke test:** a 2-beat mini walkthrough runs the full pipeline and asserts the
  output MP4 exists, has non-zero duration, and contains both a video and an audio
  stream (via `ffprobe`).
- **Reusability check:** run the engine against a second, throwaway walkthrough
  (different URL/output dir) to confirm nothing is hardcoded to po-traction-engine.
- **Dry-run check:** `--dry-run` produces the expected number of audio clips.
- **Manual verification:** play `full-library-tour.mp4` end to end and confirm narration
  lines up with the section on screen. Evidence (file + ffprobe summary) before claiming done.

## Future upgrades (out of scope now, enabled by the design)

- ES walkthrough via `--voice` (already supported).
- Title cards / captions / music as optional stitch steps.
- New videos: add `walkthroughs/<name>.mjs`, run `./demo/run.sh <name>`.
- Promote the skill into DesignliOS canon so the whole team can use it (via designlios-capture).

## Git / .gitignore

- **Skill repo/dir:** commit `SKILL.md`, `engine/*.mjs`, `engine/lib/*`, `engine/templates/*`,
  `engine/package.json`; ignore `engine/node_modules/`.
- **Per project:** commit `demo/walkthroughs/*` and `demo/run.sh`; ignore `demo/output/`
  and `demo/build/`. Generated videos are artifacts, not source.
