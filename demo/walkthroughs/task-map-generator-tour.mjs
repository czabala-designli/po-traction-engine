// Demo tour of the Task Map Generator v2. Run: ./demo/run.sh task-map-generator-tour
import { scrollTo, scrollToText } from "/Users/cazabalac/.claude/skills/demo-walkthrough-video/engine/lib/record.mjs";

export const config = {
  url: "https://po-traction-engine.vercel.app/library/task-map-generator",
  voice: "kokoro:af_heart",
  viewport: { width: 1920, height: 1080 },
  theme: { background: "#0E1034", accent: "#F87565" }, // navy bg, coral accent
};

// Fill the inputs and generate the map, then wait for it to render.
// Fill the inputs (no generate yet) so the controls can be highlighted.
async function fillInputs(page) {
  await page.selectOption("[data-ktm-path]", "3");        // from scratch
  await page.selectOption("[data-ktm-injection]", "discovery");
  await page.check("[data-ktm-priorinfo]");
  await page.check("[data-ktm-mobile]");
  await page.fill("[data-ktm-date]", "2026-07-22");
  await scrollTo(page, ".ktm-input");
}
// Click generate and wait for the map to render.
async function generate(page) {
  await page.click("[data-ktm-generate]");
  await page.waitForSelector("[data-ktm-copy]", { timeout: 8000 });
}

export const beats = [
  {
    kind: "card", variant: "intro", eyebrow: "TRACTIONLAB",
    title: "Task Map Generator",
    subtitle: "The full traction-lab plan, dated from one kickoff date.",
    narration: "Here's the new Task Map Generator, the full cross-functional traction-lab plan, built from a single kickoff date.",
  },
  {
    id: "inputs",
    action: fillInputs,
    focus: ".ktm-input",
    narration: "Start here: pick your entry path, choose the injection, flag whether prior information exists, and set a kickoff date.",
    annotate: { highlight: true, callout: "Entry path, injection, kickoff date", caption: { title: "Set it up", subtitle: "A few choices at the top" } },
  },
  {
    id: "generate",
    action: generate,
    focus: "[data-ktm-generate]",
    narration: "Then generate the full dated task map.",
    annotate: { highlight: true, callout: "Generate", ripple: true },
  },
  {
    id: "milestones",
    focus: ".ktm-miles",
    narration: "Every task auto-dates from kickoff, and the Day 14, 30, 60 and 90 commitments always hold their true calendar dates.",
    annotate: { highlight: true, caption: { title: "Commitment dates", subtitle: "Guarantees stay on their true dates" } },
  },
  {
    id: "before-injection",
    action: async (page) => { await scrollToText(page, "Before kick off"); },
    narration: "It opens with the before-kick-off foundation, then a parallel injection week of workshops owned by the whole pod.",
    annotate: { caption: { title: "Before kick off & injection", subtitle: "Foundation, then the pod-owned workshop week" } },
  },
  {
    id: "owners",
    action: async (page) => { await scrollToText(page, "Week 1 — Foundation"); },
    narration: "Each task shows its owner and supporting roles, and no task ever lands on a weekend.",
    annotate: { caption: { title: "Owners on every task", subtitle: "Weekend tasks pull back to Friday" } },
  },
  {
    id: "copy",
    focus: ".ktm-copy",
    narration: "Check tasks off as you go, then copy the whole dated plan straight into Slack or Basecamp.",
    annotate: { highlight: true, callout: "Copy checklist", caption: { title: "Copy anywhere", subtitle: "Paste into Slack or Basecamp" } },
  },
  {
    kind: "card", variant: "outro",
    title: "Task Map Generator",
    pills: ["Path-aware", "Owners", "No weekend tasks", "Copy to Slack"],
    narration: "That's the Task Map Generator.",
  },
];
