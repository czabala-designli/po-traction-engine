// Rename this file to <your-tour-name>.mjs and edit the beats.
// Run it with:  ./demo/run.sh <your-tour-name>
import { scrollTo, scrollToText } from "/Users/cazabalac/.claude/skills/demo-walkthrough-video/engine/lib/record.mjs";

export const config = {
  url: "https://example.com",                 // the live site to record
  voice: "kokoro:af_heart",                   // natural neural voice (kokoro:<id>); falls back to macOS `say` "Samantha" if Kokoro isn't installed
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
