import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const templates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/templates' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['live', 'coming-soon']),
    summary: z.string(),
    previewUrl: z.string().optional(),
    order: z.number().default(99),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['active', 'complete']),
    summary: z.string(),
    templatesUsed: z.array(z.string()).default([]),
    checklist: z
      .array(
        z.object({
          label: z.string(),
          done: z.boolean(),
          note: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { templates, projects };
