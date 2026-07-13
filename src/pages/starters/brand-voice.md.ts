import raw from '../../../docs/skills/brand-voice-skill.md?raw';

export const prerender = true;

export const GET = () =>
  new Response(raw, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
