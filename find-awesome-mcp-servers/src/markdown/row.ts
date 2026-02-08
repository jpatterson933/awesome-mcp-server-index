import { EnrichedRepo } from "../schema/github.js";
import { formatRepoDescription } from "../utils/format.js";
function formatSize(kb: number): string {
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function formatTopics(topics: string[]): string {
  if (topics.length === 0) return "-";
  return topics.slice(0, 3).join(", ");
}

function formatLicense(license: { name: string } | null): string {
  return license?.name || "-";
}

export function createMarkdownRow(repo: EnrichedRepo): string {
  const repoLink = `[${repo.name}](${repo.html_url})`;
  const ownerLink = `[${repo.owner.login}](${repo.owner.html_url})`;
  const stars = repo.stargazers_count.toLocaleString();
  const forks = repo.forks_count.toLocaleString();
  const issues = repo.open_issues_count;
  const size = formatSize(repo.size);
  const topics = formatTopics(repo.topics);
  const license = formatLicense(repo.license);
  const created = repo.created_at.split("T")[0];
  const updated = repo.pushed_at.split("T")[0];
  const description = formatRepoDescription(repo.description);

  return `| ${repoLink} | ${ownerLink} | ${stars} | ${forks} | ${issues} | ${size} | ${topics} | ${license} | ${created} | ${updated} | ${description} |`;
}
