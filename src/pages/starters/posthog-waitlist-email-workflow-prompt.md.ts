import raw from '../../../docs/prompts/posthog_workflow_prompt.md?raw';

export const prerender = true;

export const GET = () =>
  new Response(raw, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
