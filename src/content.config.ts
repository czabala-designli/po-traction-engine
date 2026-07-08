import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const assets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/assets' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['template', 'play', 'tool']),
    phase: z.enum(['foundation', 'activation', 'conversion', 'hdd', 'marketing']),
    status: z.enum(['live', 'coming-soon']),
    summary: z.string(),
    previewUrl: z.string().optional(),
    starter: z.boolean().default(false),
    order: z.number().default(99),
    needs: z.array(z.string()).default([]),
    needsNote: z.string().optional(),
    feeds: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['active', 'complete', 'template']),
    summary: z.string(),
    assetsUsed: z.array(z.string()).default([]),
    checklist: z
      .array(
        z.object({
          label: z.string(),
          done: z.boolean(),
          note: z.string().optional(),
          milestone: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { assets, projects };
