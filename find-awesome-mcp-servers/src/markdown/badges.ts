import { z } from "zod";
import { TimePeriodType } from "../types/badges.js";

const TIME_PERIOD_BADGES: Record<TimePeriodType, string> = {
  one_day: `![FRESH](https://img.shields.io/badge/%F0%9F%94%A5%20FRESH%20AF-FF4500?style=for-the-badge)`,
  one_week: `![HOT](https://img.shields.io/badge/%F0%9F%94%A5%20HOT-FF6B35?style=for-the-badge)`,
  one_month: `![ACTIVE](https://img.shields.io/badge/ACTIVE-00C853?style=flat-square&logo=statuspage&logoColor=white)`,
  six_months: `![STABLE](https://img.shields.io/badge/STABLE-2196F3?style=flat-square)`,
  one_year: `![SLOW](https://img.shields.io/badge/%F0%9F%92%A4%20ZZZ-FFC107?style=flat-square)`,
};

const TIME_PERIOD_EMOJIS: Record<TimePeriodType, string> = {
  one_day: "🔥",
  one_week: "🌶️",
  one_month: "✅",
  six_months: "📘",
  one_year: "💤",
};

export const githubBadge = `![](https://img.shields.io/badge/-black?logo=github)`;

export function createBadge(
  badgeType: string,
  timePeriod: TimePeriodType,
): string {
  switch (badgeType) {
    case "time_period":
      return TIME_PERIOD_BADGES[timePeriod];
    case "time_period_emoji":
      return TIME_PERIOD_EMOJIS[timePeriod];
    default:
      return "no badge found";
  }
}

export function createFreshnessEmoji(timePeriod: TimePeriodType): string {
  return TIME_PERIOD_EMOJIS[timePeriod];
}

const uriComponent = z.codec(z.string(), z.string(), {
  decode: (encodedString) => decodeURIComponent(encodedString),
  encode: (decodedString) => encodeURIComponent(decodedString),
});

export function createStatBadge(
  metric: string,
  stat: number,
  color: string,
  logo?: string,
): string {
  const label = uriComponent.encode(metric);
  const logoParams = logo ? `&logo=${logo}&logoColor=white` : "";
  const badgeUrl = `https://img.shields.io/badge/${label}-${stat}-${color}?style=for-the-badge${logoParams}`;
  return `![${metric}](${badgeUrl})`;
}

export function matchLicenseToBadge(license: { name: string } | null): string {
  if (!license) return "Ugh sry no License :(";
  const licenseBadgesBaseUrl = "https://img.shields.io/badge/License-";

  const LICENSE_BADGES: Record<string, string> = {
    "MIT License": `[![License: MIT](${licenseBadgesBaseUrl}MIT-yellow.svg)](https://opensource.org/licenses/MIT)`,
    "Apache License 2.0": `[![License](${licenseBadgesBaseUrl}Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`,
    "Boost Software License 1.0": `[![License](${licenseBadgesBaseUrl}Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)`,
    'BSD 3-Clause "New" or "Revised" License': `[![License](${licenseBadgesBaseUrl}BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`,
    'BSD 2-Clause "Simplified" License': `[![License](${licenseBadgesBaseUrl}BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)`,
    "Creative Commons Zero v1.0 Universal": `[![License: CC0-1.0](${licenseBadgesBaseUrl}CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)`,
    "Creative Commons Attribution 4.0 International": `[![License: CC BY 4.0](${licenseBadgesBaseUrl}CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)`,
    "Creative Commons Attribution Share Alike 4.0 International": `[![License: CC BY-SA 4.0](${licenseBadgesBaseUrl}CC_BY--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)`,
    "Creative Commons Attribution Non Commercial 4.0 International": `[![License: CC BY-NC 4.0](${licenseBadgesBaseUrl}CC_BY--NC_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)`,
    "Creative Commons Attribution No Derivatives 4.0 International": `[![License: CC BY-ND 4.0](${licenseBadgesBaseUrl}CC_BY--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nd/4.0/)`,
    "Creative Commons Attribution Non Commercial Share Alike 4.0 International": `[![License: CC BY-NC-SA 4.0](${licenseBadgesBaseUrl}CC_BY--NC--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)`,
    "Creative Commons Attribution Non Commercial No Derivatives 4.0 International": `[![License: CC BY-NC-ND 4.0](${licenseBadgesBaseUrl}CC_BY--NC--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)`,
    "Eclipse Public License 1.0": `[![License](${licenseBadgesBaseUrl}EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)`,
    "GNU General Public License v3.0": `[![License: GPL v3](${licenseBadgesBaseUrl}GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`,
    "GNU General Public License v2.0": `[![License: GPL v2](${licenseBadgesBaseUrl}GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)`,
    "GNU Affero General Public License v3.0": `[![License: AGPL v3](${licenseBadgesBaseUrl}AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)`,
    "GNU Lesser General Public License v3.0": `[![License: LGPL v3](${licenseBadgesBaseUrl}LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)`,
    "GNU Free Documentation License v1.3": `[![License: FDL 1.3](${licenseBadgesBaseUrl}FDL_v1.3-blue.svg)](https://www.gnu.org/licenses/fdl-1.3)`,
    "Hippocratic License 2.1": `[![License: Hippocratic 2.1](${licenseBadgesBaseUrl}Hippocratic_2.1-lightgrey.svg)](https://firstdonoharm.dev)`,
    "Hippocratic License 3.0": `[![License: Hippocratic 3.0](${licenseBadgesBaseUrl}Hippocratic_3.0-lightgrey.svg)](https://firstdonoharm.dev)`,
    "IBM Public License Version 1.0": `[![License: IPL 1.0](${licenseBadgesBaseUrl}IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)`,
    "ISC License": `[![License: ISC](${licenseBadgesBaseUrl}ISC-blue.svg)](https://opensource.org/licenses/ISC)`,
    "Mozilla Public License 2.0": `[![License: MPL 2.0](${licenseBadgesBaseUrl}MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`,
    "Open Data Commons Attribution License": `[![License: ODC BY](${licenseBadgesBaseUrl}ODC_BY-brightgreen.svg)](https://opendatacommons.org/licenses/by/)`,
    "Open Data Commons Open Database License": `[![License: ODbL](${licenseBadgesBaseUrl}ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)`,
    "Open Data Commons Public Domain Dedication and License": `[![License: PDDL](${licenseBadgesBaseUrl}PDDL-brightgreen.svg)](https://opendatacommons.org/licenses/pddl/)`,
    "Artistic License 2.0": `[![License: Artistic-2.0](${licenseBadgesBaseUrl}Artistic_2.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)`,
    "SIL Open Font License 1.1": `[![License: Open Font-1.1](${licenseBadgesBaseUrl}OFL_1.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)`,
    "The Unlicense": `[![License: Unlicense](${licenseBadgesBaseUrl}Unlicense-blue.svg)](http://unlicense.org/)`,
    "Do What The F*ck You Want To Public License": `[![License: WTFPL](${licenseBadgesBaseUrl}WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)`,
    "zlib License": `[![License: Zlib](${licenseBadgesBaseUrl}Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)`,
  };

  return (
    LICENSE_BADGES[license.name] ||
    `![License: ${license.name}](https://img.shields.io/badge/License-${encodeURIComponent(license.name)}-lightgrey.svg)`
  );
}
