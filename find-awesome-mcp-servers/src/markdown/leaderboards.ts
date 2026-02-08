import { EnrichedRepo, MetricType } from "../schema/github.js";
import { calculateTimePeriod } from "../utils/calculateFreshness.js";
import { distillTopRanked, formatRepoDescription } from "../utils/format.js";
import {
  createBadge,
  createStatBadge,
  githubBadge,
  matchLicenseToBadge,
} from "./badges.js";

const BACK_TO_INDEX_FOOTER = [
  "",
  "---",
  "",
  "[![Back to Index](https://img.shields.io/badge/←_Back_to_Index-000?style=flat-square&logo=github)](./README.md)",
];

function headerColumnStructure(columns: string[]): {
  colTitles: string;
  separator: string;
} {
  const colTitles = columns.join(" | ");
  const separator = columns
    .map((col) => "-".repeat(col.length) + ":")
    .join(" | ");

  return {
    colTitles,
    separator,
  };
}
function buildMarkdownHeader(
  title: string,
  description: string,
  columns: string[],
): string[] {
  const { colTitles, separator } = headerColumnStructure(columns);
  const createdAt = new Date().toISOString().split("T")[0];

  return [
    title,
    "",
    description,
    "",
    `Generated: ${createdAt}`,
    "",
    `| Rank | Repository | ${colTitles} |`,
    `| ---: | ---------- | ${separator} |`,
  ];
}

function buildMarkdownRowForBadges(
  repos: EnrichedRepo[],
  stat: MetricType,
  metric: string,
  color: string,
  logo?: string,
): string[] {
  return repos.map((repo, index) => {
    const repoLink = `${githubBadge}[${repo.name}](${repo.html_url})`;
    const badge = createStatBadge(metric, repo[stat], color, logo);
    const description = formatRepoDescription(repo.description);
    const ranking = index + 1;

    return `| ${ranking} | ${repoLink} | ${badge} | ${description} |`;
  });
}

export function generateTopStarred(repos: EnrichedRepo[]): string {
  const stat = "stargazers_count";
  const topRepos = distillTopRanked(repos, stat);
  const header = buildMarkdownHeader(
    "# Top 10 Starred MCP Repositories",
    "The most popular MCP awesome repositories by GitHub stars.",
    ["Stars", "Description"],
  );
  const rows = buildMarkdownRowForBadges(topRepos, stat, "⭐️", "FFD700");

  return [...header, ...rows, ...BACK_TO_INDEX_FOOTER].join("\n");
}

export function generateTopSubscribed(repos: EnrichedRepo[]): string {
  const stat = "subscribers_count";
  const topRepos = distillTopRanked(repos, stat);
  const header = buildMarkdownHeader(
    "# Top 10 Subscribed MCP Repositories",
    "The most watched MCP repositories (users receiving notifications).",
    ["Subscribers", "Description"],
  );
  const rows = buildMarkdownRowForBadges(topRepos, stat, "👀", "8E24AA");

  return [...header, ...rows, ...BACK_TO_INDEX_FOOTER].join("\n");
}

export function generateTopForked(repos: EnrichedRepo[]): string {
  const stat = "forks_count";
  const topRepos = distillTopRanked(repos, stat);
  const header = buildMarkdownHeader(
    "# Top 10 Forked MCP Repositories",
    "The most forked MCP repositories.",
    ["Forks", "Description"],
  );
  const rows = buildMarkdownRowForBadges(topRepos, stat, "git", "5B2DAD");

  return [...header, ...rows, ...BACK_TO_INDEX_FOOTER].join("\n");
}

export function generateTopIssues(repos: EnrichedRepo[]): string {
  const stat = "open_issues_count";
  const topRepos = distillTopRanked(repos, stat);
  const header = buildMarkdownHeader(
    "# Top 10 Issues MCP Repositories",
    "MCP repositories with the most open issues and PRs.",
    ["Open Issues + PRs", "Description"],
  );
  const rows = buildMarkdownRowForBadges(topRepos, stat, "🗂️", "E64727");

  return [...header, ...rows, ...BACK_TO_INDEX_FOOTER].join("\n");
}

export function generateTopLargest(repos: EnrichedRepo[]): string {
  const stat = "size";
  const topRepos = distillTopRanked(repos, stat);
  const header = buildMarkdownHeader(
    "# Top 10 Largest MCP Repositories",
    "The biggest MCP repositories by size. Why? Who knows.",
    ["Size", "Description"],
  );
  const rows = buildMarkdownRowForBadges(topRepos, stat, "💾", "737894");

  return [...header, ...rows, ...BACK_TO_INDEX_FOOTER].join("\n");
}

export function generateActivityTimeline(repos: EnrichedRepo[]): string {
  const sortedByActivity = [...repos].sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
  );

  const header = buildMarkdownHeader(
    "# MCP Repo Activity Analysis",
    "Sure its a famous repo but does anyone even maintain it!?",
    ["Freshness", "Last Push", "Created", "License"],
  );

  const rows = sortedByActivity.map((repo, index) => {
    const ranking = index + 1;
    const timePeriod = calculateTimePeriod(repo.pushed_at);
    const emoji = createBadge("time_period_emoji", timePeriod);

    const repoLink = `${emoji} [${repo.name}](${repo.html_url})`;
    const timePeriodBadge = createBadge("time_period", timePeriod);
    const lastPush = repo.pushed_at.split("T")[0];
    const created = repo.created_at.split("T")[0];
    const licenseBadge = matchLicenseToBadge(repo.license);

    return `| ${ranking} | ${repoLink} | ${timePeriodBadge} | ${lastPush} | ${created} | ${licenseBadge} |`;
  });

  return [...header, ...rows, ...BACK_TO_INDEX_FOOTER].join("\n");
}
