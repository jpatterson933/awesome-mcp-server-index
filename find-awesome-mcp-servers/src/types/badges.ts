import { z } from "zod";

export const TimePeriodSchema = z.enum([
  "one_day",
  "one_week",
  "one_month",
  "six_months",
  "one_year",
]);

export type TimePeriodType = z.infer<typeof TimePeriodSchema>;

export const BadgeStyleSchema = z.enum([
  "flat",
  "flat-square",
  "for-the-badge",
  "plastic",
  "social",
]);

export type BadgeStyleType = z.infer<typeof BadgeStyleSchema>;

export const TimePeriodBadgeSchema = z.object({
  label: z.string(),
  color: z.string(),
  style: BadgeStyleSchema,
  emoji: z.string(),
  logo: z.string().optional(),
  logoColor: z.string().optional(),
});

export type TimePeriodBadgeType = z.infer<typeof TimePeriodBadgeSchema>;
