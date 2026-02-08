import { EnrichedRepo, MetricType } from "../schema/github.js";

export function formatRepoDescription(description: string | null): string {
  return (description || "-")
    .replace(/\|/g, "-")
    .replace(/\n/g, " ")
    .replace(/\r/g, "");
}

export function distillTopRanked(
  repos: EnrichedRepo[],
  metric: MetricType,
): EnrichedRepo[] {
  const descending = (a: EnrichedRepo, b: EnrichedRepo) =>
    b[metric] - a[metric];
  return [...repos].sort(descending).slice(0, 10);
}
