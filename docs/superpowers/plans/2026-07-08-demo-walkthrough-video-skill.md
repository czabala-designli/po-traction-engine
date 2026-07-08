# Demo Walkthrough Video Skill — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable personal Claude Code skill that records any project's live site in a browser and narrates the walkthrough with a high-quality macOS system voice (a swappable seam for the PO's own cloned voice later), producing a finished MP4 with one command.

**Architecture:** Two layers. A **reusable engine** lives once in a personal skill at `~/.claude/skills/demo-walkthrough-video/` (Node orchestrator + Swift voice renderer + Playwright recorder + ffmpeg stitcher, with Playwright installed there a single time). A thin **per-project `demo/` folder** holds only that project's walkthrough definition, a `run.sh` wrapper, and output. The engine is project-agnostic: it takes a walkthrough file (URL + voice + beats) and an output dir as inputs.

**Tech Stack:** Node (ESM, no framework), Playwright (Chromium video recording), macOS `say` system voices, ffmpeg/ffprobe.

## Global Constraints

- **macOS only.** The skill targets macOS (dev machine is macOS 26.5).
- **Zero paid tools.** Only free/open-source or already-installed software. No accounts, no API keys.
- **No per-project install.** Playwright installs into the skill's `engine/` exactly once; ffmpeg/`say` are system-wide. New projects add the skill with no install.
- **Engine is project-agnostic.** Nothing in `engine/` may hardcode po-traction-engine's URL, selectors, or paths. All project specifics come from the walkthrough file passed in.
- **Voice = a macOS `say` system voice, rendered to a file.** Default `Samantha`; any installed `say` voice (incl. Enhanced/Premium downloads) works by name. The voice is a **swappable seam**: a future local voice-clone renderer plugs in behind the same `synth()` interface. (Decision 2026-07-08: Apple **Personal Voice cannot be rendered to a file** — macOS blocks `AVSpeechSynthesizer` buffer capture for Personal Voices — so we ship a built-in voice now and add a cloned voice later. Task 2 is superseded.)
- **Audio drives timing.** Per-beat audio durations (measured by ffprobe) are the single source of truth for both the video hold and the audio track, so voice and picture cannot drift.
- **First deliverable:** `full-library-tour` for `https://po-traction-engine.vercel.app` in the `Samantha` voice.
- **Node style:** ESM (`.mjs`), Node built-ins only in the engine except Playwright. Use `execFile` (not `exec`) for shelling out.
- **.gitignore:** never commit `node_modules/`, `demo/output/`, or `demo/build/`.

---

### Task 1: Scaffold the skill + engine and install shared dependencies

**Files:**
- Create: `~/.claude/skills/demo-walkthrough-video/engine/package.json`
- Create: `~/.claude/skills/demo-walkthrough-video/engine/.gitignore`
- Create: `~/.claude/skills/demo-walkthrough-video/engine/lib/env.mjs`
- Test: `~/.claude/skills/demo-walkthrough-video/engine/test/env.test.mjs`

**Interfaces:**
- Produces: `checkTools()` → `Promise<{ ffmpeg: boolean, ffprobe: boolean, swift: boolean }>` in `lib/env.mjs`; used by `build.mjs` (Task 6) to fail fast with a clear message.

- [ ] **Step 1: Create the engine package.json**

```json
{
  "name": "demo-walkthrough-video-engine",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "description": "Reusable engine for narrated site walkthrough videos.",
  "dependencies": {
    "playwright": "^1.48.0"
  },
  "scripts": {
    "test": "node --test"
  }
}
```

- [ ] **Step 2: Create the engine .gitignore**

```
node_modules/
```

- [ ] **Step 3: Install Playwright + Chromium (one time, in the engine only)**

Run:
```bash
cd ~/.claude/skills/demo-walkthrough-video/engine && npm install && npx playwright install chromium
```
Expected: exits 0; `node_modules/playwright` exists.

- [ ] **Step 4: Install ffmpeg (system, one time)**

Run: `brew install ffmpeg` (skip if `ffmpeg -version` already works)
Expected: `ffmpeg -version` and `ffprobe -version` both succeed.

- [ ] **Step 5: Write the failing test for `checkTools`**

`engine/test/env.test.mjs`:
```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { checkTools } from "../lib/env.mjs";

test("checkTools reports ffmpeg, ffprobe, and swift as available", async () => {
  const tools = await checkTools();
  assert.equal(tools.ffmpeg, true);
  assert.equal(tools.ffprobe, true);
  assert.equal(tools.swift, true);
});
```

- [ ] **Step 6: Run it to verify it fails**

Run: `cd ~/.claude/skills/demo-walkthrough-video/engine && node --test test/env.test.mjs`
Expected: FAIL — cannot find module `../lib/env.mjs`.

- [ ] **Step 7: Implement `lib/env.mjs`**

```js
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);

async function has(cmd, args = ["-version"]) {
  try {
    await run(cmd, args);
    return true;
  } catch {
    return false;
  }
}

export async function checkTools() {
  const [ffmpeg, ffprobe, swift] = await Promise.all([
    has("ffmpeg"),
    has("ffprobe"),
    has("swift", ["--version"]),
  ]);
  return { ffmpeg, ffprobe, swift };
}
```

- [ ] **Step 8: Run it to verify it passes**

Run: `node --test test/env.test.mjs`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
cd ~/.claude/skills/demo-walkthrough-video
git init -q 2>/dev/null; git add engine/package.json engine/.gitignore engine/lib/env.mjs engine/test/env.test.mjs
git commit -m "feat: scaffold demo-walkthrough-video engine + tool check"
```
> Note: the skill dir may not be a git repo. If `git init` is undesirable, skip the commit here; the whole skill is committed in Task 8. Either way, do not commit `node_modules/`.

---

### Task 2: SUPERSEDED — Personal Voice → file is blocked by macOS

**No work.** During execution (2026-07-08) we confirmed macOS blocks rendering an Apple **Personal Voice** to a file: `AVSpeechSynthesizer.write(_:toBufferCallback:)` logs `Cannot use AVSpeechSynthesizerBufferCallback with Personal Voices` and never produces audio (normal system voices render fine). Personal Voices may only play out loud.

**Decision:** ship with a high-quality macOS **system voice** now (Task 3), keeping the voice as a swappable seam, and add a **local voice clone** (MIT-licensed, e.g. OpenVoice v2 / F5-TTS, trained on the user's exported Personal Voice recordings) as a future upgrade. No Swift renderer is built. Skip directly to Task 3.

---

### Task 3: `voice.mjs` — render a system voice to a WAV + measure duration

**Files:**
- Create: `~/.claude/skills/demo-walkthrough-video/engine/lib/voice.mjs`
- Test: `~/.claude/skills/demo-walkthrough-video/engine/test/voice.test.mjs`

**Interfaces:**
- Consumes: `say` + ffmpeg/ffprobe (Task 1).
- Produces:
  - `synth({ text, voice, outPath }) → Promise<string>` — renders `text` in the named macOS `say` voice (default `Samantha`) to a WAV at `outPath`, returns `outPath`. **This is the swappable voice seam**: a future local clone renderer replaces the body behind this exact signature.
  - `duration(file) → Promise<number>` — seconds, via ffprobe.

- [ ] **Step 1: Write the failing test**

`engine/test/voice.test.mjs`:
```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { synth, duration } from "../lib/voice.mjs";

test("synth renders a WAV with a positive duration using a system voice", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "voice-"));
  const out = path.join(dir, "line.wav");
  const returned = await synth({
    text: "This is a voice test.",
    voice: "Samantha",
    outPath: out,
  });
  assert.equal(returned, out);
  assert.ok(existsSync(out), "wav file should exist");
  const d = await duration(out);
  assert.ok(d > 0, `duration should be > 0, got ${d}`);
});

test("synth defaults to a system voice when none is given", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "voice-"));
  const out = path.join(dir, "line.wav");
  await synth({ text: "Default voice test.", outPath: out });
  assert.ok(existsSync(out), "wav file should exist with the default voice");
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test test/voice.test.mjs`
Expected: FAIL — cannot find module `../lib/voice.mjs`.

- [ ] **Step 3: Implement `voice.mjs`**

```js
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { rm } from "node:fs/promises";

const run = promisify(execFile);

// Default macOS system voice. Any installed `say` voice works by name,
// including free Enhanced/Premium downloads (e.g. "Ava (Enhanced)").
const DEFAULT_VOICE = "Samantha";

// Render narration to a WAV using a macOS `say` system voice.
//
// This is the SWAPPABLE VOICE SEAM. To move to a cloned/personal voice later,
// replace the body of synth() with a renderer that writes `outPath` from
// `text` — the signature and the WAV contract stay identical, so nothing
// downstream (record/stitch/build) changes.
export async function synth({ text, voice = DEFAULT_VOICE, outPath }) {
  const aiff = `${outPath}.aiff`;
  await run("say", ["-v", voice, "-o", aiff, text]);
  await run("ffmpeg", ["-y", "-i", aiff, outPath]);
  await rm(aiff, { force: true });
  return outPath;
}

export async function duration(file) {
  const { stdout } = await run("ffprobe", [
    "-v", "error",
    "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    file,
  ]);
  return parseFloat(stdout.trim());
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `node --test test/voice.test.mjs`
Expected: PASS (2/2).

- [ ] **Step 5: Commit**

```bash
cd ~/.claude/skills/demo-walkthrough-video
git add engine/lib/voice.mjs engine/test/voice.test.mjs
git commit -m "feat: voice.mjs — system-voice WAV renderer + ffprobe duration"
```

---

### Task 4: `record.mjs` — Playwright records the site, paced by durations

**Files:**
- Create: `~/.claude/skills/demo-walkthrough-video/engine/lib/record.mjs`
- Create: `~/.claude/skills/demo-walkthrough-video/engine/test/fixtures/mini.html`
- Test: `~/.claude/skills/demo-walkthrough-video/engine/test/record.test.mjs`

**Interfaces:**
- Consumes: Playwright (Task 1).
- Produces:
  - `record({ url, viewport, beats, durations, videoDir, pad }) → Promise<string>` — returns the path to the recorded silent `.webm`. `beats[i]` holds for `durations[i] + pad` seconds after running `beats[i].action(page)`.
  - `scrollTo(page, selector) → Promise<void>` and `scrollToText(page, text) → Promise<void>` — helpers walkthrough files import for their `action`s.

- [ ] **Step 1: Create the test fixture page**

`engine/test/fixtures/mini.html`:
```html
<!doctype html>
<html><head><meta charset="utf-8"><title>mini</title>
<style>section{height:100vh;display:flex;align-items:center;justify-content:center;font:48px sans-serif}</style>
</head><body>
<section id="one">One</section>
<section id="two">Two</section>
</body></html>
```

- [ ] **Step 2: Write the failing test**

`engine/test/record.test.mjs`:
```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { record, scrollTo } from "../lib/record.mjs";

const run = promisify(execFile);
const fixture = pathToFileURL(path.join(import.meta.dirname, "fixtures", "mini.html")).href;

test("record produces a webm whose length ~ sum(durations)+pads", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "rec-"));
  const beats = [
    { id: "one", action: async (p) => scrollTo(p, "#one") },
    { id: "two", action: async (p) => scrollTo(p, "#two") },
  ];
  const durations = [1.0, 1.0];
  const pad = 0.5;
  const webm = await record({
    url: fixture,
    viewport: { width: 640, height: 360 },
    beats, durations, videoDir: dir, pad,
  });
  assert.ok(existsSync(webm), "webm should exist");
  const { stdout } = await run("ffprobe", [
    "-v", "error", "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1", webm,
  ]);
  const d = parseFloat(stdout.trim());
  // 2 beats * (1.0 + 0.5) = 3.0s of holds, plus small nav/settle overhead.
  assert.ok(d >= 2.8, `expected >= 2.8s, got ${d}`);
}, { timeout: 60000 });
```

- [ ] **Step 3: Run it to verify it fails**

Run: `node --test test/record.test.mjs`
Expected: FAIL — cannot find module `../lib/record.mjs`.

- [ ] **Step 4: Implement `record.mjs`**

```js
import { chromium } from "playwright";

export async function scrollTo(page, selector) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, selector);
  await page.waitForTimeout(800);
}

export async function scrollToText(page, text) {
  const locator = page.getByText(text, { exact: false }).first();
  await locator.scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(800);
}

export async function record({ url, viewport, beats, durations, videoDir, pad = 0.6 }) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport,
    recordVideo: { dir: videoDir, size: viewport },
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  for (let i = 0; i < beats.length; i++) {
    const beat = beats[i];
    if (typeof beat.action === "function") {
      try {
        await beat.action(page);
      } catch (e) {
        console.warn(`⚠️  beat "${beat.id}" action failed: ${e.message}`);
      }
    }
    await page.waitForTimeout((durations[i] + pad) * 1000);
  }
  await page.waitForTimeout(300);

  const video = page.video();
  await context.close(); // flushes the video file
  await browser.close();
  return video.path();
}
```

- [ ] **Step 5: Run it to verify it passes**

Run: `node --test test/record.test.mjs`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
cd ~/.claude/skills/demo-walkthrough-video
git add engine/lib/record.mjs engine/test/record.test.mjs engine/test/fixtures/mini.html 2>/dev/null || true
git commit -m "feat: Playwright recorder paced by per-beat durations" 2>/dev/null || true
```

---

### Task 5: `stitch.mjs` — ffmpeg builds the audio track and muxes the MP4

**Files:**
- Create: `~/.claude/skills/demo-walkthrough-video/engine/lib/stitch.mjs`
- Test: `~/.claude/skills/demo-walkthrough-video/engine/test/stitch.test.mjs`

**Interfaces:**
- Consumes: ffmpeg (Task 1).
- Produces:
  - `buildAudioTrack(clipPaths, pad, workDir) → Promise<string>` — normalizes each clip to 44.1kHz stereo, inserts `pad` seconds of silence after each, concatenates to `workDir/narration.wav`, returns its path.
  - `mux({ videoPath, audioPath, outPath, viewport }) → Promise<string>` — encodes H.264/AAC MP4 scaled to `viewport`, returns `outPath`.
  - `probeStreams(file) → Promise<string[]>` — codec_type list (`["video","audio"]`), used by tests and smoke checks.

- [ ] **Step 1: Write the failing test**

`engine/test/stitch.test.mjs`:
```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { buildAudioTrack, mux, probeStreams } from "../lib/stitch.mjs";

const run = promisify(execFile);

test("buildAudioTrack + mux yields an mp4 with both video and audio streams", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "stitch-"));
  // two 1s tone clips
  const clips = [];
  for (let i = 0; i < 2; i++) {
    const c = path.join(dir, `tone-${i}.wav`);
    await run("ffmpeg", ["-y", "-f", "lavfi", "-i", "sine=frequency=440:duration=1", c]);
    clips.push(c);
  }
  const track = await buildAudioTrack(clips, 0.4, dir);
  // a 3s silent test video
  const vid = path.join(dir, "silent.webm");
  await run("ffmpeg", ["-y", "-f", "lavfi", "-i", "color=c=black:s=320x180:d=3", vid]);
  const out = path.join(dir, "out.mp4");
  await mux({ videoPath: vid, audioPath: track, outPath: out, viewport: { width: 320, height: 180 } });
  const streams = await probeStreams(out);
  assert.ok(streams.includes("video"), "should have a video stream");
  assert.ok(streams.includes("audio"), "should have an audio stream");
}, { timeout: 60000 });
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test test/stitch.test.mjs`
Expected: FAIL — cannot find module `../lib/stitch.mjs`.

- [ ] **Step 3: Implement `stitch.mjs`**

```js
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const run = promisify(execFile);
const SR = 44100;

async function makeSilence(seconds, outPath) {
  await run("ffmpeg", [
    "-y", "-f", "lavfi", "-i", `anullsrc=r=${SR}:cl=stereo`,
    "-t", String(seconds), "-c:a", "pcm_s16le", outPath,
  ]);
}

async function normalize(inPath, outPath) {
  await run("ffmpeg", [
    "-y", "-i", inPath, "-ar", String(SR), "-ac", "2",
    "-c:a", "pcm_s16le", outPath,
  ]);
}

export async function buildAudioTrack(clipPaths, pad, workDir) {
  const silence = path.join(workDir, "pad.wav");
  await makeSilence(pad, silence);
  const entries = [];
  for (let i = 0; i < clipPaths.length; i++) {
    const norm = path.join(workDir, `norm-${i}.wav`);
    await normalize(clipPaths[i], norm);
    entries.push(`file '${norm.replace(/'/g, "'\\''")}'`);
    entries.push(`file '${silence.replace(/'/g, "'\\''")}'`);
  }
  const listFile = path.join(workDir, "concat.txt");
  await writeFile(listFile, entries.join("\n"), "utf8");
  const track = path.join(workDir, "narration.wav");
  await run("ffmpeg", ["-y", "-f", "concat", "-safe", "0", "-i", listFile, "-c", "copy", track]);
  return track;
}

export async function mux({ videoPath, audioPath, outPath, viewport }) {
  await run("ffmpeg", [
    "-y",
    "-i", videoPath,
    "-i", audioPath,
    "-c:v", "libx264", "-pix_fmt", "yuv420p",
    "-vf", `scale=${viewport.width}:${viewport.height}`,
    "-c:a", "aac", "-b:a", "192k",
    "-shortest",
    outPath,
  ]);
  return outPath;
}

export async function probeStreams(file) {
  const { stdout } = await run("ffprobe", [
    "-v", "error",
    "-show_entries", "stream=codec_type",
    "-of", "default=noprint_wrappers=1:nokey=1",
    file,
  ]);
  return stdout.trim().split("\n").filter(Boolean);
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `node --test test/stitch.test.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd ~/.claude/skills/demo-walkthrough-video
git add engine/lib/stitch.mjs engine/test/stitch.test.mjs 2>/dev/null || true
git commit -m "feat: ffmpeg audio track builder + mp4 mux" 2>/dev/null || true
```

---

### Task 6: `build.mjs` — orchestrator + CLI

**Files:**
- Create: `~/.claude/skills/demo-walkthrough-video/engine/build.mjs`
- Test: `~/.claude/skills/demo-walkthrough-video/engine/test/build.test.mjs`
- Create: `~/.claude/skills/demo-walkthrough-video/engine/test/fixtures/tiny-walkthrough.mjs`

**Interfaces:**
- Consumes: `checkTools` (Task 1), `synth`/`duration` (Task 3), `record`/`scrollTo`/`scrollToText` (Task 4), `buildAudioTrack`/`mux`/`probeStreams` (Task 5).
- Produces: `buildVideo({ walkthroughPath, outDir, workDir, voiceOverride, dryRun, keep }) → Promise<{ audioClips: string[], videoPath: string|null }>` and a CLI entry (`--walkthrough --out --work --voice --dry-run --keep`).

- [ ] **Step 1: Create a tiny walkthrough fixture (uses the mini.html from Task 4)**

`engine/test/fixtures/tiny-walkthrough.mjs`:
```js
import { pathToFileURL } from "node:url";
import path from "node:path";
import { scrollTo } from "../../lib/record.mjs";

export const config = {
  url: pathToFileURL(path.join(import.meta.dirname, "mini.html")).href,
  voice: "Samantha",
  viewport: { width: 640, height: 360 },
};

export const beats = [
  { id: "one", narration: "This is section one.", action: async (p) => scrollTo(p, "#one") },
  { id: "two", narration: "And this is section two.", action: async (p) => scrollTo(p, "#two") },
];
```

- [ ] **Step 2: Write the failing test (dry-run: voice clips only, no recording)**

`engine/test/build.test.mjs`:
```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { buildVideo } from "../build.mjs";

test("dry-run produces one audio clip per beat and no video", async () => {
  const out = await mkdtemp(path.join(tmpdir(), "b-out-"));
  const work = await mkdtemp(path.join(tmpdir(), "b-work-"));
  const result = await buildVideo({
    walkthroughPath: path.join(import.meta.dirname, "fixtures", "tiny-walkthrough.mjs"),
    outDir: out,
    workDir: work,
    dryRun: true,
  });
  assert.equal(result.audioClips.length, 2);
  assert.equal(result.videoPath, null);
}, { timeout: 60000 });
```

- [ ] **Step 3: Run it to verify it fails**

Run: `node --test test/build.test.mjs`
Expected: FAIL — cannot find module `../build.mjs`.

- [ ] **Step 4: Implement `build.mjs`**

```js
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { checkTools } from "./lib/env.mjs";
import { synth, duration } from "./lib/voice.mjs";
import { record } from "./lib/record.mjs";
import { buildAudioTrack, mux, probeStreams } from "./lib/stitch.mjs";

const PAD = 0.6;

export async function buildVideo({
  walkthroughPath, outDir, workDir,
  voiceOverride, dryRun = false, keep = false,
}) {
  const tools = await checkTools();
  if (!tools.ffmpeg || !tools.ffprobe) {
    throw new Error("ffmpeg/ffprobe not found. Install with: brew install ffmpeg");
  }

  const mod = await import(pathToFileURL(path.resolve(walkthroughPath)).href);
  const { config, beats } = mod;
  if (!config?.url || !Array.isArray(beats) || beats.length === 0) {
    throw new Error(`walkthrough must export { config: { url, voice, viewport }, beats: [...] }`);
  }
  const voice = voiceOverride || config.voice;
  const name = path.basename(walkthroughPath).replace(/\.mjs$/, "");

  await mkdir(outDir, { recursive: true });
  await mkdir(workDir, { recursive: true });

  // Station 2: voice per beat, measure durations.
  const audioClips = [];
  const durations = [];
  for (let i = 0; i < beats.length; i++) {
    const clip = path.join(workDir, `beat-${i}.wav`);
    await synth({ text: beats[i].narration, voice, outPath: clip });
    audioClips.push(clip);
    durations.push(await duration(clip));
  }

  if (dryRun) {
    return { audioClips, videoPath: null };
  }

  // Station 3: record paced by durations.
  const videoDir = path.join(workDir, "video");
  await mkdir(videoDir, { recursive: true });
  const silentWebm = await record({
    url: config.url,
    viewport: config.viewport ?? { width: 1920, height: 1080 },
    beats, durations, videoDir, pad: PAD,
  });

  // Station 4: stitch.
  const track = await buildAudioTrack(audioClips, PAD, workDir);
  const outPath = path.join(outDir, `${name}.mp4`);
  await mux({
    videoPath: silentWebm, audioPath: track, outPath,
    viewport: config.viewport ?? { width: 1920, height: 1080 },
  });

  const streams = await probeStreams(outPath);
  if (!streams.includes("video") || !streams.includes("audio")) {
    throw new Error(`output ${outPath} is missing a stream: ${streams.join(",")}`);
  }

  if (!keep) {
    await rm(workDir, { recursive: true, force: true });
  }
  return { audioClips, videoPath: outPath };
}

// ---- CLI ----
function parseArgs(argv) {
  const out = { dryRun: false, keep: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--walkthrough") out.walkthroughPath = argv[++i];
    else if (a === "--out") out.outDir = argv[++i];
    else if (a === "--work") out.workDir = argv[++i];
    else if (a === "--voice") out.voiceOverride = argv[++i];
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--keep") out.keep = true;
  }
  return out;
}

const isMain = pathToFileURL(process.argv[1] ?? "").href === import.meta.url;
if (isMain) {
  const opts = parseArgs(process.argv.slice(2));
  if (!opts.walkthroughPath || !opts.outDir) {
    console.error("usage: node build.mjs --walkthrough <file.mjs> --out <dir> [--work <dir>] [--voice <name>] [--dry-run] [--keep]");
    process.exit(2);
  }
  opts.workDir ??= path.join(opts.outDir, "..", "build");
  buildVideo(opts)
    .then((r) => {
      if (r.videoPath) console.log(`✅ ${r.videoPath}`);
      else console.log(`✅ dry-run: ${r.audioClips.length} audio clips generated`);
    })
    .catch((e) => { console.error(`❌ ${e.message}`); process.exit(1); });
}
```

- [ ] **Step 5: Run it to verify it passes**

Run: `node --test test/build.test.mjs`
Expected: PASS.

- [ ] **Step 6: Run the whole engine test suite**

Run: `cd ~/.claude/skills/demo-walkthrough-video/engine && node --test`
Expected: all tests PASS.

- [ ] **Step 7: Commit**

```bash
cd ~/.claude/skills/demo-walkthrough-video
git add engine/build.mjs engine/test/build.test.mjs engine/test/fixtures/tiny-walkthrough.mjs 2>/dev/null || true
git commit -m "feat: orchestrator build.mjs + CLI" 2>/dev/null || true
```

---

### Task 7: Project templates + scaffolding (`run.sh`, starter walkthrough, `scaffold.mjs`)

**Files:**
- Create: `~/.claude/skills/demo-walkthrough-video/engine/templates/run.sh`
- Create: `~/.claude/skills/demo-walkthrough-video/engine/templates/walkthrough.mjs`
- Create: `~/.claude/skills/demo-walkthrough-video/engine/templates/gitignore`
- Create: `~/.claude/skills/demo-walkthrough-video/engine/scaffold.mjs`
- Test: `~/.claude/skills/demo-walkthrough-video/engine/test/scaffold.test.mjs`

**Interfaces:**
- Produces: `scaffold(projectDir) → Promise<string[]>` — creates `<projectDir>/demo/{walkthroughs/,output/,build/}`, copies `run.sh` (chmod +x), `walkthroughs/example-tour.mjs` (from `walkthrough.mjs`), and a `demo/.gitignore`. Returns the list of created paths. Idempotent (never overwrites an existing walkthrough).

- [ ] **Step 1: Create `templates/run.sh`**

```bash
#!/usr/bin/env bash
set -euo pipefail
ENGINE="$HOME/.claude/skills/demo-walkthrough-video/engine"
if [ ! -f "$ENGINE/build.mjs" ]; then
  echo "Demo engine not found at $ENGINE — install the demo-walkthrough-video skill." >&2
  exit 1
fi
NAME="${1:-}"
if [ -z "$NAME" ]; then
  echo "usage: ./demo/run.sh <walkthrough-name> [--voice <name>] [--dry-run] [--keep]" >&2
  exit 2
fi
shift
DEMO_DIR="$(cd "$(dirname "$0")" && pwd)"
node "$ENGINE/build.mjs" \
  --walkthrough "$DEMO_DIR/walkthroughs/$NAME.mjs" \
  --out "$DEMO_DIR/output" \
  --work "$DEMO_DIR/build" \
  "$@"
```

- [ ] **Step 2: Create `templates/walkthrough.mjs` (starter)**

```js
// Rename this file to <your-tour-name>.mjs and edit the beats.
// Run it with:  ./demo/run.sh <your-tour-name>
import { scrollTo, scrollToText } from "../../../.claude/skills/demo-walkthrough-video/engine/lib/record.mjs";

export const config = {
  url: "https://example.com",                 // the live site to record
  voice: "Samantha",                          // any installed macOS `say` voice, e.g. "Ava (Enhanced)"
  viewport: { width: 1920, height: 1080 },
};

export const beats = [
  {
    id: "intro",
    narration: "Welcome — here's a quick tour.",
    action: async (page) => { /* stay on the hero */ },
  },
  // Add one beat per section. Use scrollTo(page, "#anchor") or scrollToText(page, "Some heading").
];
```

> Note: the starter imports helpers by relative path to the skill. `scaffold.mjs` rewrites this import to an absolute `$HOME` path when it copies the file, so it works from any project depth (see Step 4).

- [ ] **Step 3: Create `templates/gitignore`**

```
output/
build/
```

- [ ] **Step 4: Write the failing test**

`engine/test/scaffold.test.mjs`:
```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { scaffold } from "../scaffold.mjs";

test("scaffold creates demo/ with run.sh, a walkthrough, and .gitignore", async () => {
  const proj = await mkdtemp(path.join(tmpdir(), "proj-"));
  const created = await scaffold(proj);
  const run = path.join(proj, "demo", "run.sh");
  const wt = path.join(proj, "demo", "walkthroughs", "example-tour.mjs");
  const gi = path.join(proj, "demo", ".gitignore");
  for (const f of [run, wt, gi]) {
    await stat(f); // throws if missing
    assert.ok(created.includes(f), `${f} should be in returned list`);
  }
  const mode = (await stat(run)).mode;
  assert.ok(mode & 0o100, "run.sh should be executable");
  const wtSrc = await readFile(wt, "utf8");
  assert.ok(wtSrc.includes(process.env.HOME), "walkthrough import should be rewritten to an absolute path");
});
```

- [ ] **Step 5: Run it to verify it fails**

Run: `node --test test/scaffold.test.mjs`
Expected: FAIL — cannot find module `../scaffold.mjs`.

- [ ] **Step 6: Implement `scaffold.mjs`**

```js
import { mkdir, copyFile, readFile, writeFile, chmod, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES = path.join(__dirname, "templates");
const HELPERS_ABS = path.join(process.env.HOME, ".claude", "skills", "demo-walkthrough-video", "engine", "lib", "record.mjs");

async function exists(p) {
  try { await access(p, constants.F_OK); return true; } catch { return false; }
}

export async function scaffold(projectDir) {
  const demo = path.join(projectDir, "demo");
  const walk = path.join(demo, "walkthroughs");
  await mkdir(walk, { recursive: true });
  await mkdir(path.join(demo, "output"), { recursive: true });
  await mkdir(path.join(demo, "build"), { recursive: true });

  const created = [];

  // run.sh (executable)
  const run = path.join(demo, "run.sh");
  if (!(await exists(run))) {
    await copyFile(path.join(TEMPLATES, "run.sh"), run);
    await chmod(run, 0o755);
  }
  created.push(run);

  // .gitignore
  const gi = path.join(demo, ".gitignore");
  if (!(await exists(gi))) {
    await copyFile(path.join(TEMPLATES, "gitignore"), gi);
  }
  created.push(gi);

  // starter walkthrough — rewrite the helper import to an absolute path
  const wt = path.join(walk, "example-tour.mjs");
  if (!(await exists(wt))) {
    let src = await readFile(path.join(TEMPLATES, "walkthrough.mjs"), "utf8");
    src = src.replace(
      /from "[^"]*record\.mjs"/,
      `from "${HELPERS_ABS}"`,
    );
    await writeFile(wt, src, "utf8");
  }
  created.push(wt);

  return created;
}
```

- [ ] **Step 7: Run it to verify it passes**

Run: `node --test test/scaffold.test.mjs`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
cd ~/.claude/skills/demo-walkthrough-video
git add engine/templates engine/scaffold.mjs engine/test/scaffold.test.mjs 2>/dev/null || true
git commit -m "feat: per-project scaffolding + run.sh/walkthrough templates" 2>/dev/null || true
```

---

### Task 8: `SKILL.md` — make it discoverable and usable in any project

**Files:**
- Create: `~/.claude/skills/demo-walkthrough-video/SKILL.md`

**Interfaces:**
- Produces: the skill front-matter + instructions Claude follows when a user says "make a demo video" in any project.

- [ ] **Step 1: Write `SKILL.md`**

````markdown
---
name: demo-walkthrough-video
description: Create a narrated walkthrough video of any web project's live site, recorded in a browser and voiced by a macOS system voice. Use when the user wants a demo video, product walkthrough, screen-recorded tour, or narrated video of a site. macOS only.
---

# Demo Walkthrough Video

Records a project's live site in a browser and narrates it with a macOS system
voice, producing an MP4. The engine is shared; each project keeps only its own
`demo/` folder. The voice is a swappable seam (see Notes).

## When to use
The user wants a demo/walkthrough/tour video of a website they can regenerate later.

## Prerequisites (check, don't assume)
- macOS. `Samantha` is built in; for better quality suggest a free Enhanced voice via System Settings → Accessibility → Spoken Content → System Voice → Manage Voices.
- `ffmpeg` installed (`ffmpeg -version`); if missing: `brew install ffmpeg`.
- The engine installed at `~/.claude/skills/demo-walkthrough-video/engine` with deps (`npm install` + `npx playwright install chromium` run once inside it).

## To create a video in the current project
1. Scaffold the project's demo folder (idempotent):
   `node ~/.claude/skills/demo-walkthrough-video/engine/scaffold.mjs <project-root>`
   (or call `scaffold()` from that module).
2. Copy `demo/walkthroughs/example-tour.mjs` to a descriptive name (e.g. `product-tour.mjs`).
3. Edit its `config.url` to the site, `config.voice` to any installed macOS `say`
   voice (default `Samantha`, e.g. `Ava (Enhanced)`), and write one `beat` per
   section — each with a `narration` line and an `action` that scrolls/clicks.
   Use `scrollTo(page, "#anchor")` or `scrollToText(page, "Heading text")`.
4. Preview the script fast without recording: `./demo/run.sh <name> --dry-run`
5. Produce the video: `./demo/run.sh <name>`  → `demo/output/<name>.mp4`

## Flags
- `--voice "<name>"` override the voice · `--dry-run` audio only · `--keep` keep intermediates.

## Notes
- The engine never hardcodes a project; everything project-specific is in the walkthrough file.
- Voice is a swappable seam in `lib/voice.mjs`: a future local voice-clone renderer (e.g. OpenVoice v2 / F5-TTS) can replace the `say` call behind the same `synth()` interface. Apple Personal Voice cannot be rendered to a file (macOS blocks it), so it is not used.
````

- [ ] **Step 2: Verify the skill is discoverable**

Run: `ls ~/.claude/skills/demo-walkthrough-video/SKILL.md`
Expected: the file exists. (In a fresh Claude Code session, `/demo-walkthrough-video` should now be offered.)

- [ ] **Step 3: Commit the whole skill**

```bash
cd ~/.claude/skills/demo-walkthrough-video
git add -A && git commit -m "feat: SKILL.md for demo-walkthrough-video" 2>/dev/null || true
```

---

### Task 9: First real walkthrough — `full-library-tour` for po-traction-engine

**Files:**
- Create: `/Users/cazabalac/projects/po-traction-engine/demo/walkthroughs/full-library-tour.mjs`
- Create (via scaffold): `/Users/cazabalac/projects/po-traction-engine/demo/run.sh`, `demo/.gitignore`
- Modify: `/Users/cazabalac/projects/po-traction-engine/.gitignore` (ensure `demo/output/`, `demo/build/` ignored — the demo/.gitignore already covers it, but add a root-level guard)

**Interfaces:**
- Consumes: the whole engine (Tasks 1–8), `scrollTo`/`scrollToText` (Task 4).
- Produces: `demo/output/full-library-tour.mp4`.

- [ ] **Step 1: Scaffold the demo folder in po-traction-engine**

Run: `node ~/.claude/skills/demo-walkthrough-video/engine/scaffold.mjs /Users/cazabalac/projects/po-traction-engine`
Expected: `demo/` created with `run.sh`, `walkthroughs/example-tour.mjs`, `.gitignore`.

- [ ] **Step 2: Find the real section anchors on the home page**

Read `/Users/cazabalac/projects/po-traction-engine/src/pages/index.astro` and note the actual `id=` anchors for: the hero/intro, the Day-0 blockers band, the 30/60/90 milestone bands, and the template grid. If a section has no stable `id`, plan to target it with `scrollToText(page, "<visible heading text>")` instead.

- [ ] **Step 3: Write `full-library-tour.mjs` using the real anchors**

Create `demo/walkthroughs/full-library-tour.mjs`. Replace the `scrollTo`/`scrollToText` targets below with the anchors/headings found in Step 2 (these are the intended beats — the selectors are the only thing to confirm):

```js
import { scrollTo, scrollToText } from "/Users/cazabalac/.claude/skills/demo-walkthrough-video/engine/lib/record.mjs";

export const config = {
  url: "https://po-traction-engine.vercel.app",
  voice: "Samantha",
  viewport: { width: 1920, height: 1080 },
};

export const beats = [
  {
    id: "intro",
    narration: "This is the Traction Engine — a library of reusable plays that help Product Owners drive early traction.",
    action: async (page) => { /* hold on the hero */ },
  },
  {
    id: "day-0-blockers",
    narration: "It starts with your Day-Zero blockers — the handful of things to clear before anything else can move.",
    action: async (page) => { await scrollToText(page, "Day-0"); },
  },
  {
    id: "milestones",
    narration: "From there, work is grouped into thirty, sixty, and ninety day milestones, so you always know what to focus on next.",
    action: async (page) => { await scrollToText(page, "30"); },
  },
  {
    id: "templates",
    narration: "Each play is a reusable template — a live preview, the prompt that builds it, and a short playbook you can run yourself.",
    action: async (page) => { await scrollToText(page, "Templates"); },
  },
  {
    id: "outro",
    narration: "That's the Traction Engine: a growing library that turns Product Owners into traction engines.",
    action: async (page) => { await scrollTo(page, "footer"); },
  },
];
```

- [ ] **Step 4: Fast script preview (no recording)**

Run: `cd /Users/cazabalac/projects/po-traction-engine && ./demo/run.sh full-library-tour --dry-run`
Expected: `✅ dry-run: 5 audio clips generated`. Play a couple of the clips in `demo/build/` to confirm they sound right (Samantha).

- [ ] **Step 5: Produce the full video**

Run: `./demo/run.sh full-library-tour`
Expected: `✅ .../demo/output/full-library-tour.mp4`.

- [ ] **Step 6: Verify the output**

Run: `ffprobe -v error -show_entries format=duration:stream=codec_type -of default=noprint_wrappers=1 demo/output/full-library-tour.mp4`
Expected: a duration > 0 and both `codec_type=video` and `codec_type=audio`. Then **open and watch it** end to end — confirm narration lines up with the section on screen.

- [ ] **Step 7: Ensure root .gitignore guards the artifacts**

Add to `/Users/cazabalac/projects/po-traction-engine/.gitignore` if not already covered:
```
demo/output/
demo/build/
```

- [ ] **Step 8: Commit the project's walkthrough (not the video)**

```bash
cd /Users/cazabalac/projects/po-traction-engine
git add demo/walkthroughs/full-library-tour.mjs demo/run.sh demo/.gitignore .gitignore
git commit -m "feat: add full-library-tour demo walkthrough for the site"
```

---

### Task 10: Reusability check — prove the engine isn't hardcoded to this project

**Files:**
- Temporary only (a throwaway walkthrough in a temp dir; nothing committed).

**Interfaces:**
- Consumes: the engine CLI (Task 6).

- [ ] **Step 1: Create a throwaway walkthrough against a different site**

Run:
```bash
TMP=$(mktemp -d)
cat > "$TMP/other-tour.mjs" <<EOF
export const config = {
  url: "https://example.com",
  voice: "Samantha",
  viewport: { width: 1280, height: 720 },
};
export const beats = [
  { id: "a", narration: "This is a reusability check on a different site.", action: async () => {} },
];
EOF
```

- [ ] **Step 2: Run the engine directly against it**

Run:
```bash
node ~/.claude/skills/demo-walkthrough-video/engine/build.mjs \
  --walkthrough "$TMP/other-tour.mjs" --out "$TMP/output" --work "$TMP/build"
```
Expected: `✅ $TMP/output/other-tour.mp4` with both streams (confirm via `ffprobe`). This proves the engine records an arbitrary URL into an arbitrary output dir with nothing tied to po-traction-engine.

- [ ] **Step 3: Clean up**

Run: `rm -rf "$TMP"`
Expected: no error. (Nothing to commit — this task is verification only.)

---

## Self-Review

**Spec coverage:**
- Reusable engine as a personal skill → Tasks 1, 8. Two-layer split → Tasks 1 (engine), 7 (per-project scaffold).
- Live-footage recording → Task 4. System-voice narration → Task 3 (Task 2 superseded — Personal Voice can't render to file). Stitch → Task 5. Orchestration + sync-by-duration → Task 6.
- Zero paid tools / no per-project install → Task 1 (Playwright in engine once; ffmpeg system).
- System-voice rendering + swappable seam → Task 3. Flags (`--voice/--dry-run/--keep`) → Task 6, surfaced via `run.sh` (Task 7).
- Re-runnable without Claude → `run.sh` (Task 7). "Make a demo video" entry → SKILL.md (Task 8).
- First deliverable full-library-tour (EN, live site) → Task 9. Reusability check → Task 10 (matches spec's testing section).
- .gitignore rules → Tasks 1, 7, 9. Error handling (ffmpeg missing, voice denied, missing stream) → Tasks 3, 6.
- Known limitation (action animates before narration) → carried as PAD + settle waits in Task 4; acceptable per spec.

**Placeholder scan:** No TBD/TODO. The only "confirm this" is Task 9 Step 2 (real anchors), which is a genuine lookup step with a concrete fallback (`scrollToText`), not a placeholder.

**Type consistency:** `synth`/`duration` (Task 3) used identically in Task 6. `record` signature (Task 4) matches its call in Task 6. `buildAudioTrack`/`mux`/`probeStreams` (Task 5) match Task 6. `scaffold` (Task 7) matches Task 9 Step 1. `checkTools` (Task 1) matches Task 6. Consistent.
