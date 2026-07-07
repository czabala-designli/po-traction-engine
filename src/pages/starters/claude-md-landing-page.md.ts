import raw from '../../../docs/claude-md-landing-page-template.md?raw';

export const prerender = true;

export const GET = () =>
  new Response(raw, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
