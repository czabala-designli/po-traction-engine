import raw from '../../../docs/prompts/feedback_widget_prompt_web.md?raw';

export const prerender = true;

export const GET = () =>
  new Response(raw, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
