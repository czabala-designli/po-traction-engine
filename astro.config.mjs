// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  adapter: vercel(),
  redirects: {
    // Tool renamed from "Kickoff Task Map" → "Task Map Generator"; keep the old link alive.
    '/library/kickoff-task-map': '/library/task-map-generator',
  },
});
