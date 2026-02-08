import { TimePeriodType } from "../types/badges.js";

export function calculateTimePeriod(pushedAt: string): TimePeriodType {
  const pushedDate = new Date(pushedAt);
  const now = new Date();
  const diffMs = now.getTime() - pushedDate.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffHours / 24;
  const diffMonths = diffDays / 30;
  // 1 day
  if (diffHours < 24) return "one_day";
  // 1 week
  if (diffDays < 7) return "one_week";
  // 1 month
  if (diffDays < 30) return "one_month";
  // 6 months
  if (diffMonths < 6) return "six_months";
  // 1 year
  if (diffMonths < 12) return "one_year";
  return "one_year";
}
