export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);

  if (!body || !body.type || !body.message) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { type, message, email, url } = body;
  const githubToken = import.meta.env.GITHUB_TOKEN;
  const githubRepo  = import.meta.env.GITHUB_REPO;
  const slackWebhook = import.meta.env.SLACK_WEBHOOK_URL;

  if (!githubToken || !githubRepo) {
    return new Response(JSON.stringify({ error: 'GitHub not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const issueTitle = `[${type}] ${message.slice(0, 60)}${message.length > 60 ? '…' : ''}`;
  const issueBody = [
    `**Type:** ${type}`,
    email ? `**Email:** ${email}` : null,
    `**Page:** ${url || 'unknown'}`,
    '',
    '---',
    '',
    message,
  ].filter(Boolean).join('\n');

  const ghRes = await fetch(`https://api.github.com/repos/${githubRepo}/issues`, {
    method: 'POST',
    headers: {
      Authorization: `token ${githubToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github+json',
    },
    body: JSON.stringify({
      title: issueTitle,
      body: issueBody,
      labels: [type.toLowerCase()],
    }),
  });

  if (!ghRes.ok) {
    return new Response(JSON.stringify({ error: 'Failed to create GitHub issue' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const issue = await ghRes.json();

  // Slack notification — optional, skips gracefully if not configured
  if (slackWebhook) {
    await fetch(slackWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `*[${type}]* ${issueTitle}\n${email ? `From: ${email} · ` : ''}Page: ${url || 'unknown'}\n<${issue.html_url}|View issue #${issue.number}>`,
      }),
    }).catch(() => null);
  }

  return new Response(JSON.stringify({ ok: true, issue_url: issue.html_url }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
