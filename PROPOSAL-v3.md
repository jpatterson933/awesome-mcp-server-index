# Proposal v3: Cleanup & Leaderboard System

![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

---

## Part 1: Cleanup - Exact File Changes

### File: `src/validation/schema.ts`

| Line | Action     | Current Code                 |
| ---- | ---------- | ---------------------------- |
| 17   | **REMOVE** | `watchers_count: z.number()` |
| 23   | **REMOVE** | `allow_forking: z.boolean()` |

---

### File: `src/markdown/index.ts`

| Action     | Details                                                                    |
| ---------- | -------------------------------------------------------------------------- |
| **REMOVE** | `watchers` variable from `createMarkdownRow()`                             |
| **REMOVE** | `Watchers` column from `TABLE_HEADER`                                      |
| **UPDATE** | `formatLanguages()` to return shields.io badges with percentages and logos |

---

### File: `src/docs/github-repo-response.md`

| Action     | Details                                 |
| ---------- | --------------------------------------- |
| **REMOVE** | `watchers_count` row from documentation |
| **REMOVE** | `allow_forking` row from documentation  |

---

### File: `src/index.ts`

| Action  | Details                                                                                          |
| ------- | ------------------------------------------------------------------------------------------------ |
| **ADD** | Filter archived repos: `enrichedRepos.filter(repo => !repo.archived)` before markdown generation |

---

## Part 2: New Files to Create

### File: `src/markdown/leaderboards.ts` (NEW)

Functions to create:

| Function                                  | Purpose                              |
| ----------------------------------------- | ------------------------------------ |
| `generateTopStarred(repos): string`       | Creates TOP-STARRED.md content       |
| `generateTopSubscribed(repos): string`    | Creates TOP-SUBSCRIBED.md content    |
| `generateTopForked(repos): string`        | Creates TOP-FORKED.md content        |
| `generateTopIssues(repos): string`        | Creates TOP-ISSUES.md content        |
| `generateTopLargest(repos): string`       | Creates TOP-LARGEST.md content       |
| `generateActivityTimeline(repos): string` | Creates ACTIVITY-TIMELINE.md content |

---

### File: `src/markdown/badges.ts` (NEW)

Functions to create:

| Function                                        | Purpose                                                    |
| ----------------------------------------------- | ---------------------------------------------------------- |
| `createLanguageBadge(lang, percent): string`    | Returns shields.io badge with language logo and percentage |
| `createFreshnessBadge(pushedAt): string`        | Returns appropriate badge based on repo age                |
| `createLicenseBadge(license): string`           | Returns colored badge for license type                     |
| `createStatsBadge(label, value, color): string` | Generic stat badge creator                                 |

---

## Part 3: Badge Catalog (From Ileriayo/markdown-badges)

### Language Badges with Logos (Exact Format from Repo)

| Language   | Badge                                                                                                                        | Markdown                                                                                                                       |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| TypeScript | ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)     | `![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)`     |
| JavaScript | ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) | `![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)` |
| Python     | ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)                       | `![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)`                       |
| Go         | ![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)                             | `![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)`                             |
| Rust       | ![Rust](https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white)                       | `![Rust](https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white)`                       |
| Java       | ![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)                    | `![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)`                    |
| C#         | ![C#](https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=csharp&logoColor=white)                       | `![C#](https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=csharp&logoColor=white)`                       |
| Ruby       | ![Ruby](https://img.shields.io/badge/ruby-%23CC342D.svg?style=for-the-badge&logo=ruby&logoColor=white)                       | `![Ruby](https://img.shields.io/badge/ruby-%23CC342D.svg?style=for-the-badge&logo=ruby&logoColor=white)`                       |
| PHP        | ![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)                          | `![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)`                          |
| Shell      | ![Shell Script](https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white)   | `![Shell Script](https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white)`   |
| Kotlin     | ![Kotlin](https://img.shields.io/badge/kotlin-%237F52FF.svg?style=for-the-badge&logo=kotlin&logoColor=white)                 | `![Kotlin](https://img.shields.io/badge/kotlin-%237F52FF.svg?style=for-the-badge&logo=kotlin&logoColor=white)`                 |
| Swift      | ![Swift](https://img.shields.io/badge/swift-F54A2A?style=for-the-badge&logo=swift&logoColor=white)                           | `![Swift](https://img.shields.io/badge/swift-F54A2A?style=for-the-badge&logo=swift&logoColor=white)`                           |

**With Percentage (Custom Format):**

```markdown
![TypeScript](https://img.shields.io/badge/TypeScript-85%25-3178C6?style=flat-square&logo=typescript&logoColor=white)
```

![TypeScript](https://img.shields.io/badge/TypeScript-85%25-3178C6?style=flat-square&logo=typescript&logoColor=white)

---

### AI/MCP Related Badges (Perfect for this project!)

| Name           | Badge                                                                                                                         | Markdown                                                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Claude         | ![Claude](https://img.shields.io/badge/Claude-D97757?style=for-the-badge&logo=claude&logoColor=white)                         | `![Claude](https://img.shields.io/badge/Claude-D97757?style=for-the-badge&logo=claude&logoColor=white)`                         |
| ChatGPT        | ![ChatGPT](https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)                       | `![ChatGPT](https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)`                       |
| GitHub Copilot | ![GitHub Copilot](https://img.shields.io/badge/GitHub_Copilot-8957E5?style=for-the-badge&logo=github-copilot&logoColor=white) | `![GitHub Copilot](https://img.shields.io/badge/github_copilot-8957E5?style=for-the-badge&logo=github-copilot&logoColor=white)` |
| HuggingFace    | ![HuggingFace](https://img.shields.io/badge/huggingface-%23FFD21E.svg?style=for-the-badge&logo=huggingface&logoColor=black)   | `![HuggingFace](https://img.shields.io/badge/huggingface-%23FFD21E.svg?style=for-the-badge&logo=huggingface&logoColor=black)`   |
| LangChain      | ![LangChain](https://img.shields.io/badge/langchain-%231C3C3C.svg?style=for-the-badge&logo=langchain&logoColor=white)         | `![LangChain](https://img.shields.io/badge/langchain-%231C3C3C.svg?style=for-the-badge&logo=langchain&logoColor=white)`         |
| Ollama         | ![Ollama](https://img.shields.io/badge/ollama-%23000000.svg?style=for-the-badge&logo=ollama&logoColor=white)                  | `![Ollama](https://img.shields.io/badge/ollama-%23000000.svg?style=for-the-badge&logo=ollama&logoColor=white)`                  |

---

### Freshness Badges

#### 🔥 HOT (< 1 week) - High Energy, Bold

| Badge                                                                                                                      | Markdown                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| ![HOT](https://img.shields.io/badge/🔥_HOT-FF4500?style=for-the-badge)                                                     | `![HOT](https://img.shields.io/badge/🔥_HOT-FF4500?style=for-the-badge)`                                                     |
| ![ON FIRE](https://img.shields.io/badge/ON_FIRE-red?style=for-the-badge&logo=fireship&logoColor=white)                     | `![ON FIRE](https://img.shields.io/badge/ON_FIRE-red?style=for-the-badge&logo=fireship&logoColor=white)`                     |
| ![FRESH](https://img.shields.io/badge/FRESH_AF-brightgreen?style=for-the-badge&logo=rocket&logoColor=white)                | `![FRESH](https://img.shields.io/badge/FRESH_AF-brightgreen?style=for-the-badge&logo=rocket&logoColor=white)`                |
| ![JUST SHIPPED](https://img.shields.io/badge/JUST_SHIPPED-success?style=for-the-badge&logo=github-actions&logoColor=white) | `![JUST SHIPPED](https://img.shields.io/badge/JUST_SHIPPED-success?style=for-the-badge&logo=github-actions&logoColor=white)` |

#### ✨ ACTIVE (1 week - 1 month) - Positive, Clean

| Badge                                                                                                   | Markdown                                                                                                  |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| ![ACTIVE](https://img.shields.io/badge/ACTIVE-00C853?style=flat-square&logo=statuspage&logoColor=white) | `![ACTIVE](https://img.shields.io/badge/ACTIVE-00C853?style=flat-square&logo=statuspage&logoColor=white)` |
| ![MAINTAINED](https://img.shields.io/badge/MAINTAINED-success?style=flat-square)                        | `![MAINTAINED](https://img.shields.io/badge/MAINTAINED-success?style=flat-square)`                        |
| ![GOOD VIBES](https://img.shields.io/badge/GOOD_VIBES-2ea44f?style=flat-square)                         | `![GOOD VIBES](https://img.shields.io/badge/GOOD_VIBES-2ea44f?style=flat-square)`                         |

#### 📘 STABLE (1-6 months) - Neutral, Calm

| Badge                                                                            | Markdown                                                                           |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| ![STABLE](https://img.shields.io/badge/STABLE-blue?style=flat-square)            | `![STABLE](https://img.shields.io/badge/STABLE-blue?style=flat-square)`            |
| ![CHILLIN](https://img.shields.io/badge/CHILLIN-informational?style=flat-square) | `![CHILLIN](https://img.shields.io/badge/CHILLIN-informational?style=flat-square)` |

#### 💤 SLOW (6 months - 1 year) - Warning Signs

| Badge                                                                               | Markdown                                                                              |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| ![SLOW](https://img.shields.io/badge/💤_SLOW-yellow?style=flat-square)              | `![SLOW](https://img.shields.io/badge/💤_SLOW-yellow?style=flat-square)`              |
| ![HIBERNATING](https://img.shields.io/badge/HIBERNATING-orange?style=flat-square)   | `![HIBERNATING](https://img.shields.io/badge/HIBERNATING-orange?style=flat-square)`   |
| ![TAKING A NAP](https://img.shields.io/badge/TAKING_A_NAP-yellow?style=flat-square) | `![TAKING A NAP](https://img.shields.io/badge/TAKING_A_NAP-yellow?style=flat-square)` |

#### ⚠️ LAZY (> 1 year) - Call Them Out!

| Badge                                                                           | Markdown                                                                          |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| ![LAZY](https://img.shields.io/badge/⚠️_LAZY-critical?style=flat-square)        | `![LAZY](https://img.shields.io/badge/⚠️_LAZY-critical?style=flat-square)`        |
| ![NEEDS LOVE](https://img.shields.io/badge/NEEDS_LOVE-ff69b4?style=flat-square) | `![NEEDS LOVE](https://img.shields.io/badge/NEEDS_LOVE-ff69b4?style=flat-square)` |
| ![WAKE UP](https://img.shields.io/badge/WAKE_UP-lightgrey?style=flat-square)    | `![WAKE UP](https://img.shields.io/badge/WAKE_UP-lightgrey?style=flat-square)`    |
| ![ABANDONED](https://img.shields.io/badge/ABANDONED-critical?style=flat-square) | `![ABANDONED](https://img.shields.io/badge/ABANDONED-critical?style=flat-square)` |
| ![DUSTY](https://img.shields.io/badge/🕸️_DUSTY-grey?style=flat-square)          | `![DUSTY](https://img.shields.io/badge/🕸️_DUSTY-grey?style=flat-square)`          |
| ![RIP](https://img.shields.io/badge/💀_RIP-black?style=flat-square)             | `![RIP](https://img.shields.io/badge/💀_RIP-black?style=flat-square)`             |

---

### License Badges

| License    | Badge                                                                                                      | Markdown                                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| MIT        | ![MIT](https://img.shields.io/badge/MIT-green?style=flat-square&logo=opensourceinitiative&logoColor=white) | `![MIT](https://img.shields.io/badge/MIT-green?style=flat-square&logo=opensourceinitiative&logoColor=white)` |
| Apache 2.0 | ![Apache 2.0](https://img.shields.io/badge/Apache_2.0-blue?style=flat-square&logo=apache&logoColor=white)  | `![Apache 2.0](https://img.shields.io/badge/Apache_2.0-blue?style=flat-square&logo=apache&logoColor=white)`  |
| GPL        | ![GPL](https://img.shields.io/badge/GPL-A42E2B?style=flat-square&logo=gnu&logoColor=white)                 | `![GPL](https://img.shields.io/badge/GPL-A42E2B?style=flat-square&logo=gnu&logoColor=white)`                 |
| BSD        | ![BSD](https://img.shields.io/badge/BSD-orange?style=flat-square)                                          | `![BSD](https://img.shields.io/badge/BSD-orange?style=flat-square)`                                          |
| ISC        | ![ISC](https://img.shields.io/badge/ISC-blue?style=flat-square)                                            | `![ISC](https://img.shields.io/badge/ISC-blue?style=flat-square)`                                            |
| Unlicense  | ![Unlicense](https://img.shields.io/badge/Unlicense-lightgrey?style=flat-square)                           | `![Unlicense](https://img.shields.io/badge/Unlicense-lightgrey?style=flat-square)`                           |
| No License | ![No License](https://img.shields.io/badge/NO_LICENSE-red?style=flat-square)                               | `![No License](https://img.shields.io/badge/NO_LICENSE-red?style=flat-square)`                               |

---

### Stats Badges (Dynamic with Values)

| Stat        | Badge Example                                                               | Markdown Pattern                                                                    |
| ----------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Stars       | ![Stars](https://img.shields.io/badge/⭐_1.2k-gold?style=flat-square)       | `![Stars](https://img.shields.io/badge/⭐_${count}-gold?style=flat-square)`         |
| Forks       | ![Forks](https://img.shields.io/badge/🍴_234-blue?style=flat-square)        | `![Forks](https://img.shields.io/badge/🍴_${count}-blue?style=flat-square)`         |
| Issues      | ![Issues](https://img.shields.io/badge/🎫_45-orange?style=flat-square)      | `![Issues](https://img.shields.io/badge/🎫_${count}-orange?style=flat-square)`      |
| Subscribers | ![Subscribers](https://img.shields.io/badge/👀_89-purple?style=flat-square) | `![Subscribers](https://img.shields.io/badge/👀_${count}-purple?style=flat-square)` |
| Size        | ![Size](https://img.shields.io/badge/📦_12MB-grey?style=flat-square)        | `![Size](https://img.shields.io/badge/📦_${size}-grey?style=flat-square)`           |

---

### Database & Framework Badges (For Repo Topics)

| Name     | Badge                                                                                                                   |
| -------- | ----------------------------------------------------------------------------------------------------------------------- |
| MongoDB  | ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat-square&logo=mongodb&logoColor=white)           |
| Postgres | ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=flat-square&logo=postgresql&logoColor=white)      |
| Redis    | ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=flat-square&logo=redis&logoColor=white)                 |
| Supabase | ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)               |
| Firebase | ![Firebase](https://img.shields.io/badge/firebase-a08021?style=flat-square&logo=firebase&logoColor=ffcd34)              |
| React    | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB)             |
| Next.js  | ![Next JS](https://img.shields.io/badge/Next-black?style=flat-square&logo=next.js&logoColor=white)                      |
| Express  | ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat-square&logo=express&logoColor=%2361DAFB) |
| FastAPI  | ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat-square&logo=fastapi)                                  |
| Docker   | ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat-square&logo=docker&logoColor=white)              |

---

## Part 4: Leaderboard Table Columns

| File                   | Columns                                                             | Badge Usage                                    |
| ---------------------- | ------------------------------------------------------------------- | ---------------------------------------------- |
| `TOP-STARRED.md`       | Repository, Owner, Stars                                            | Star count as gold badge                       |
| `TOP-SUBSCRIBED.md`    | Repository, Owner, Subscribers                                      | Subscriber count as purple badge               |
| `TOP-FORKED.md`        | Repository, Owner, Forks                                            | Fork count as blue badge                       |
| `TOP-ISSUES.md`        | Repository, Owner, **Open Issues + PRs**                            | Issue count as orange badge                    |
| `TOP-LARGEST.md`       | Repository, Owner, Size (KB), Languages                             | Language badges with % and logos               |
| `ACTIVITY-TIMELINE.md` | Repository, Owner, Pushed At, Created At, License, Primary Language | Freshness badge, license badge, language badge |

---

## Part 5: Output Files (Generated by Script)

When script runs, these files get written to repo root:

| File                   | Status            |
| ---------------------- | ----------------- |
| `AWESOME-MCP-REPOS.md` | Existing, updated |
| `TOP-STARRED.md`       | **NEW**           |
| `TOP-SUBSCRIBED.md`    | **NEW**           |
| `TOP-FORKED.md`        | **NEW**           |
| `TOP-ISSUES.md`        | **NEW**           |
| `TOP-LARGEST.md`       | **NEW**           |
| `ACTIVITY-TIMELINE.md` | **NEW**           |

---

## Part 6: Other File Updates

### File: `README.md`

Add table of contents section with badges:

```markdown
## 📊 Leaderboards

| Leaderboard                                                                                                     | Description                  |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| [![Top Starred](https://img.shields.io/badge/🏆_Top_Starred-gold?style=flat-square)](TOP-STARRED.md)            | Most popular by GitHub stars |
| [![Top Subscribed](https://img.shields.io/badge/👀_Top_Subscribed-purple?style=flat-square)](TOP-SUBSCRIBED.md) | Most watched (notifications) |
| [![Top Forked](https://img.shields.io/badge/🍴_Top_Forked-blue?style=flat-square)](TOP-FORKED.md)               | Most forked repositories     |
| [![Top Issues](https://img.shields.io/badge/🎫_Top_Issues-orange?style=flat-square)](TOP-ISSUES.md)             | Most active issue trackers   |
| [![Top Largest](https://img.shields.io/badge/📦_Top_Largest-grey?style=flat-square)](TOP-LARGEST.md)            | Biggest codebases            |
| [![Activity](https://img.shields.io/badge/⏰_Activity-green?style=flat-square)](ACTIVITY-TIMELINE.md)           | All repos by recent activity |
```

---

### File: `.github/workflows/update-index.yml`

Update git add command to include all new markdown files:

```yaml
- name: Commit changes
  run: |
    git add AWESOME-MCP-REPOS.md TOP-STARRED.md TOP-SUBSCRIBED.md TOP-FORKED.md TOP-ISSUES.md TOP-LARGEST.md ACTIVITY-TIMELINE.md
    git commit -m "Update MCP repo index" || echo "No changes to commit"
    git push
```

---

## Summary of All Files Affected

### Files to Modify

| File                                 | Changes                                                    |
| ------------------------------------ | ---------------------------------------------------------- |
| `src/validation/schema.ts`           | Remove `watchers_count`, `allow_forking`                   |
| `src/markdown/index.ts`              | Remove watchers column, update language formatting         |
| `src/docs/github-repo-response.md`   | Remove deprecated field documentation                      |
| `src/index.ts`                       | Add archived repo filter, add leaderboard generation calls |
| `README.md`                          | Add leaderboards table of contents                         |
| `.github/workflows/update-index.yml` | Add new files to git commit                                |

### Files to Create

| File                           | Purpose                                         |
| ------------------------------ | ----------------------------------------------- |
| `src/markdown/leaderboards.ts` | Functions to generate each leaderboard markdown |
| `src/markdown/badges.ts`       | Badge creation utility functions                |

### Files Generated by Script (Output)

| File                   | Purpose                                   |
| ---------------------- | ----------------------------------------- |
| `AWESOME-MCP-REPOS.md` | Main full repo list                       |
| `TOP-STARRED.md`       | Top 10 by stars                           |
| `TOP-SUBSCRIBED.md`    | Top 10 by subscribers                     |
| `TOP-FORKED.md`        | Top 10 by forks                           |
| `TOP-ISSUES.md`        | Top 10 by open issues + PRs               |
| `TOP-LARGEST.md`       | Top 10 by size with language breakdown    |
| `ACTIVITY-TIMELINE.md` | All repos sorted by freshness with badges |

---

## Badge Style Reference

From shields.io, 5 available styles:

| Style           | Example                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------- |
| `plastic`       | ![Plastic](https://shields.io/badge/style-plastic-03650f?logo=appveyor&style=plastic)                     |
| `flat-square`   | ![Flat-square](https://shields.io/badge/style-flat--square-03650f?logo=appveyor&style=flat-square)        |
| `flat`          | ![Flat](https://shields.io/badge/style-flat-03650f?logo=appveyor&style=flat)                              |
| `social`        | ![Social](https://shields.io/badge/style-social-03650f?logo=appveyor&style=social)                        |
| `for-the-badge` | ![For-the-badge](https://shields.io/badge/style-for--the--badge-03650f?logo=appveyor&style=for-the-badge) |

**Recommendation:**

- Use `for-the-badge` for headers and freshness (HOT repos)
- Use `flat-square` for inline stats and most badges
- Use `flat` for language percentages
