import type { CollectionEntry } from 'astro:content';

export type Asset = CollectionEntry<'assets'>;

// Canonical journey phase order.
export const PHASE_ORDER = ['foundation', 'activation', 'conversion', 'hdd', 'marketing'];

// Day-bands shown as sidebar groups, each spanning a set of phases.
export const BANDS: { label: string; phases: string[] }[] = [
  { label: 'Days 1–30', phases: ['foundation', 'activation', 'conversion'] },
  { label: 'Days 31–90', phases: ['hdd', 'marketing'] },
];

// Canonical journey order: by phase, then by `order` within a phase.
export function orderedAssets(assets: Asset[]): Asset[] {
  return [...assets].sort(
    (a, b) =>
      PHASE_ORDER.indexOf(a.data.phase) - PHASE_ORDER.indexOf(b.data.phase) ||
      a.data.order - b.data.order,
  );
}

// Prev/next neighbors in the canonical order for a given asset id.
export function sequenceNeighbors(
  assets: Asset[],
  id: string,
): { prev: Asset | null; next: Asset | null } {
  const ordered = orderedAssets(assets);
  const i = ordered.findIndex((a) => a.id === id);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? ordered[i - 1] : null,
    next: i < ordered.length - 1 ? ordered[i + 1] : null,
  };
}
