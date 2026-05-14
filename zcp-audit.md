# ZCP MCP reference audit (v2)

Audit of `apps/docs/content/zcp/` (Zerops Control Plane MCP reference) for **consolidation**, **hierarchy / texture**, and **vocabulary fit to Zerops voice**. Entry point is `apps/docs/content/features/coding-agents.mdx`. Tone reference is the Zerops 3.0 article (https://zerops.io/articles/might-as-well-call-it-zerops-3-0-huge-updates-and-what-s-next).

Date: 2026-05-13. Revised after independent review by Codex and a fresh-eyes Opus reader. Their corrections are folded into the findings below.

---

## 1. Tree as it stands today

```
Zerops Control Plane MCP                                    ← sidebar group headline
│
├─ Overview                       95 ln   landing from /features/coding-agents
├─ Quickstart                    126 ln   AI Agent recipe → Claude Code → proof
├─ How it works                  190 ln   the loop, conceptual + mermaid
│
├─ Remote or local setup/                                   ← category page = choose-workspace
│  ├─ choose-workspace            73 ln   decision matrix (parent)
│  ├─ hosted-workspace           121 ln   what remote gives you
│  └─ local-agent-bridge         175 ln   8-step local install
│
├─ Build and ship/                                          ← category page = build-with-zcp
│  ├─ build-with-zcp             138 ln   parent + §1-§5 (§4/§5 are legitimate summaries, see §6)
│  ├─ package-running-service     81 ln   handoff/reuse bundle
│  └─ promote-to-production      131 ln   dev → prod handoff
│
├─ Security/                                                ← category page = trust-model
│  ├─ trust-model                119 ln   boundary + blast radius (5 tables)
│  ├─ tokens-and-project-access  162 ln   ZCP_API_KEY canonical (6 tables)
│  └─ production-policy           93 ln   prod-stays-separate (3 tables)
│
└─ Reference/                                               ← category page = reference/index
   ├─ index                       13 ln   thin 4-row directory — smell, see §6
   ├─ agent-workflow             217 ln   bootstrap+develop deep-dive (longest page, 9 tables)
   ├─ mcp-operations             103 ln   tool names (5 tables)
   ├─ troubleshooting             94 ln   recovery playbook (3 tables)
   └─ glossary                   134 ln   definitions (also fed to mcp-operations as "Reference")
```

**Orphan stubs (not in sidebar, 9–10 lines each, redirect via prose):**
- `apps/docs/content/zcp/workflows/create-or-adopt-services.mdx`
- `apps/docs/content/zcp/workflows/delivery-handoff.mdx`
- `apps/docs/content/zcp/workflows/build-and-verify-app.mdx`

These should become Docusaurus client redirects in `docusaurus.config.ts` or be deleted. Currently soft "moved" prose — the worst of both (still indexed, no real redirect).

## 2. How info actually flows from /features/coding-agents

The features page hands the reader four entry-cards: **Quickstart / Overview / Remote-or-local / Build-and-ship**. It also drops inline links to `/zcp/reference/agent-workflow`, `/zcp/reference/mcp-operations`, `/zcp/security/production-policy`.

Reader archetypes that hit the section:

| Reader | What they want | Where they land first | Where they get stuck |
|---|---|---|---|
| **Team lead** (adoption decision) | 90-second read: blast radius, cost, production stance | Overview | Overview re-pitches the feature instead of giving an adoption-grade summary |
| **First-time evaluator** | Try it fast, confirm the concept | Quickstart → Overview | Overview's first 30 seconds rehash the features-page intro almost verbatim |
| **Operator** (returning mid-project) | Make a decision, then execute | Build and ship | Three near-identical comparison tables across choose-workspace / trust-model / mcp-operations |
| **Recoverer** (something broke) | Get unstuck fast | Troubleshooting → Glossary | Glossary defines workflow-only terms; prose elsewhere doesn't link into it |
| **Security reviewer** | Threat model, boundaries | Trust model | Trust model and production-policy share a boundary statement but at different abstraction levels |
| **Custom MCP integrator** | Tool names, no workflow | MCP tools → Glossary | Glossary doubles as workflow term reference; integrator filters noise |

The features page promises **"Bootstrap + Develop"** as the two phases. Overview doesn't pick that thread up — it's parked deep in `reference/agent-workflow`, which the evaluator won't reach naturally. That's the single biggest narrative break, and it's compounded by the features-page inline link (`See Workflows in depth for both`) routing readers *directly* into the most jargon-heavy reference page in the section.

## 3. Content repetition — pattern, not policy

The right pattern is **short local reminder at decision points + link to canonical home**, not collapse-and-redirect. Refrains are load-bearing in docs because readers land mid-section.

Six concepts get retold three to six times. Most need only minor trims. Where I overstated in v1 is called out below.

| Concept | Pages that touch it | Canonical home | Action |
|---|---|---|---|
| **"Proof or blocker" + URL/endpoint/UI/job/data list** | overview, quickstart, how-it-works, build-with-zcp, promote-to-production, agent-workflow, troubleshooting, glossary | **how-it-works** | Keep one-line refrains where they appear. Cut only the *full 5-bullet list* outside how-it-works; replace with link + 1-line echo |
| **Production-stays-separate policy** | overview, trust-model, tokens, production-policy, build-with-zcp §5, promote-to-production | **production-policy** | Keep a one-paragraph caveat in trust-model (it's the security parent) and a one-line callout in overview. Strip the duplicate prose from the other 3 |
| **Remote vs local comparison** | choose-workspace, how-it-works, trust-model, mcp-operations | **choose-workspace** | NOT pure duplication — each table compares different axes (decision factors / loop invariance / blast radius / tool behavior). Trim where overlap is real; keep where the axis is unique. v1 overstated this one |
| **Confirmation gates (service deletion + destructive import override)** | agent-workflow, mcp-operations, trust-model, tokens, glossary | **tokens-and-project-access** (`#what-zcp-enforces-for-destructive-actions`) | Remove duplicate table from agent-workflow, mcp-operations, trust-model — replace with link. Glossary keeps the term definition |
| **Runtime layouts (5 values)** | glossary, agent-workflow, choose-workspace (4), how-it-works (bullets), build-with-zcp (3 user-facing) | **glossary** = labels; **build-with-zcp** = user-facing 3 | Drop the duplicate 5-row table from agent-workflow |
| **Failure categories (7 values)** | glossary, agent-workflow, troubleshooting | **troubleshooting** (has "read first + avoid" columns) | agent-workflow links to it; glossary keeps the term definition |
| **Live-state inventory bullets** | overview, how-it-works, agent-workflow | **how-it-works** | Overview becomes a teaser, not a re-list |
| **ZCP_API_KEY full explanation** | tokens (canonical), production-policy, trust-model, hosted-workspace, local-agent-bridge, choose-workspace, build-with-zcp, troubleshooting | **tokens-and-project-access** | Most pages *already* describe their local concern and link out. Only **production-policy §credential-rules** and **trust-model §credential-ownership** truly re-explain the key. Trim those two; leave the rest alone |

**Build-with-zcp §4 / §5 are NOT duplication.** They're parent-page summaries (overview-to-detail architecture). [build-with-zcp.mdx:98,112](apps/docs/content/zcp/workflows/build-with-zcp.mdx#L98) link to the detail pages; [package-running-service.mdx:50,63](apps/docs/content/zcp/workflows/package-running-service.mdx#L50) carry env classification and exclusions the summary doesn't have. v1 called this two-place truth; it isn't. Keep the summaries as 3-sentence anchored deep-links — parent pages that only link out feel hollow.

**Before sweep 2: quantify repetition vs unique content per page.** If `trust-model.mdx` is 60% unique threat-model content and 40% restated policy, cutting the 40% is safe. Inverse, the page collapses. Worth measuring before swinging the axe.

## 4. Off-brand vocabulary vs Zerops 3.0 voice

The Zerops 3.0 article voice uses: *deploy, managed services, environment parity, productized DevOps knowledge, topology, transparent by default, sensible defaults, hand off production-ready code*. It avoids: *seamless, intuitive, best practices, orchestration, promotion (noun)*.

| Off-brand term | Where it appears | Why it grates | Direction |
|---|---|---|---|
| **"Production promotion"** (noun) | glossary, build-with-zcp §5, package-running-service, quickstart card, promote-to-production prose | Article says "hand off production-ready code." Verb page (`promote-to-production`) is fine. The noun is invented jargon | **"Production release"** as the noun. "Handoff" is already overloaded (delivery handoff, human handoff, external handoff); adding "production handoff" makes a 4th meaning. Verb pages already say "release process" |
| **"Operating loop"** | overview, how-it-works description | Features page already uses **"the short work loop"** and **"develop loop"** — both more concrete | **"work loop"** or **"develop loop"** consistently |
| **"Workflow-guided"** (adjective) | overview, reference/index, agent-workflow, mcp-operations | Jargon-y compound. Article doesn't need a name for "agents that follow our instructions" | Drop the adjective. Where context needs it: *"a run that follows the generated workflow"* or just *"a guided run"* |
| **"Bounded operations"** | overview, glossary, hosted-workspace | Abstract. **"Project-scoped operations"** is also used and is more concrete | Standardise on **"project-scoped operations"** |
| **"Opinionated"** | how-it-works ("workflow is opinionated about...") | Industry meme word the article voice avoids. Single occurrence | Replace with *"the workflow handles..."* / *"the workflow decides..."* |
| **"Concerns" / "Done criteria" / "Done gate"** | how-it-works | Agile-speak | *"things the workflow handles"*, *"what counts as done"*, *"the proof gate"* |
| **"Setup" overload** | Everywhere | Six meanings: Remote setup, Local setup, AI Agent setup (recipe env), Service setup (workflow phase), `setup:` block (zerops.yaml), Bootstrap setup | "Remote workspace" / "Local workspace" already exist in places — push that distinction harder. Leave "setup" for the workflow phase and the YAML key |
| **"Blast radius"** | trust-model, choose-workspace, tokens, production-policy, features page | Used consistently. Aligns with article tone | **Keep** |

**v1 got "Bootstrap" wrong — dropped.** The features page brands `Bootstrap + Develop` as a labelled pair at [coding-agents.mdx:66,120](apps/docs/content/features/coding-agents.mdx#L66). Renaming to "Service setup" breaks the symmetric pair (mismatched grammar and abstraction level). The real problem is one apologetic sentence at [agent-workflow.mdx:15](apps/docs/content/zcp/reference/agent-workflow.mdx#L15): *"Bootstrap is not a marketing or onboarding step. It is the workflow's name for..."* — that line is what reveals the term as defensive. **Delete the apology, keep the label.**

**Vocabulary lives in both ZCP and features.** "Bootstrap" appears in [coding-agents.mdx:66,120](apps/docs/content/features/coding-agents.mdx#L66); any vocabulary pass has to touch the features page too, not just `/zcp/`.

## 5. Hierarchy / uniformity — abstraction collision, not just texture

**Every page has the same skeleton:** 1-paragraph intro → "What you're choosing / what it does" H2 → 2–6 tables → "Related" / "Next steps." Result reads flat regardless of whether you're on a security threat model or a CLI install guide.

**Table counts per page (actual, recounted after Codex pushback):**

| Page | Tables | Diagnosis |
|---|---|---|
| reference/agent-workflow | **9** | Worst offender. Trim to 2–3; turn duplicated tables (runtime layouts, failure categories, confirmation gates) into prose with anchors to canonical homes |
| security/tokens-and-project-access | **6** | Credential map + rejected tokens + rotation justify tables; rest can be prose |
| reference/mcp-operations | **5** | A tool reference IS table-shaped — keep, but vary widths/styles |
| security/trust-model | **5** | Blast-radius table earns its place; rest are repeating credentials/rules |
| concept/how-it-works | **4** + 1 mermaid | The mermaid earns its keep; tables compete with it |
| workflows/build-with-zcp | **3** | OK |
| reference/troubleshooting | **3** | OK — playbook genuinely needs tables |

**Texture moves missing across the board:**
- Almost no `:::tip` / `:::caution` callouts (only overview has one)
- ASCII visual / diagrams used ONLY in how-it-works + agent-workflow (mermaid)
- No definition lists outside glossary
- Highlighted-span class `.ascii-graph__highlight` built for features page isn't reused
- No inline code-snippet examples on most security/reference pages
- **Glossary terms aren't linked from prose.** Across the section, `appdev`, `appstage`, `local-stage`, `delivery mode`, `runtime layout` appear without anchor links to glossary entries. That's the real fix for "glossary doing two jobs": let prose carry meaning, let glossary be the index

**Same-shape problem:** [concept/how-it-works.mdx](apps/docs/content/zcp/concept/how-it-works.mdx) (190 lines) and [reference/agent-workflow.mdx](apps/docs/content/zcp/reference/agent-workflow.mdx) (217 lines) tell the same story at adjacent abstraction levels — same two-phase split, same mermaid logic, same vocabulary. The deeper issue isn't visual sameness; it's **level-of-abstraction collision**. Concept page should teach the *idea*; reference should catalog *exact labels*. They blur. Merging is the right instinct, but commit to a hard line-budget — a merged 350-line page that no archetype reads end-to-end is worse than the split.

## 6. Structural problems

1. **Three orphan stubs** still live in the content tree — they should be deleted or converted to real Docusaurus redirects. Zero-risk fix; ship before anything else.

2. **`reference/index.mdx` is 13 lines.** Either richer (mini-toc with use-cases, when-to-reach-for-each, common combinations) or absent (collapse into sidebar group with no landing page). A 13-line landing for a category is a smell.

3. **Reference subsection is over-stocked at the wrong abstraction.** [agent-workflow.mdx](apps/docs/content/zcp/reference/agent-workflow.mdx) (217 lines) is the longest page in the section but it's filed under Reference, where users won't look. Worse: the features page's inline link (`See Workflows in depth`) drops evaluators directly into it — broken information scent.

4. **Glossary is doing two jobs**: legitimate term dictionary + canonical home for confirmation gates / failure categories / runtime layouts. Non-term entries should live on the operational pages; glossary should be a thin dictionary. Fix in tandem with linking glossary terms from prose (§5).

5. **"Start here" cards repeat across three pages** with overlapping items. [overview.mdx](apps/docs/content/zcp/overview.mdx) "Start here" tables, [quickstart.mdx](apps/docs/content/zcp/quickstart.mdx) "Next steps" DocCardList, [coding-agents.mdx](apps/docs/content/features/coding-agents.mdx) "Where to start" cards — three nav surfaces showing 60% overlapping links. Navigation duplication, not content duplication, but the reader hits it three times in 5 minutes.

6. **Overview's first 30 seconds are weak.** Lines 8–12 of [overview.mdx](apps/docs/content/zcp/overview.mdx#L8) restate the features-page intro almost verbatim ("Zerops provides... ZCP MCP is the project-scoped tool layer..."). Overview should *start* with the public-preview caveat + a 3-bullet "what's in this section" map, not re-pitch the feature.

7. **Factual narrowing on the features page.** [coding-agents.mdx:87](apps/docs/content/features/coding-agents.mdx#L87) says the agent "opens a PR" before production. [promote-to-production.mdx:64](apps/docs/content/zcp/workflows/promote-to-production.mdx#L64) lists five equally valid paths (tag push, protected branch merge, manual CLI, PR, CI job). Features page narrows a real choice — readers form an expectation the workflow page contradicts.

8. **Anchor reliability not verified.** Audit recommends linking to canonical anchors (e.g. `tokens-and-project-access#what-zcp-enforces-for-destructive-actions`). That anchor exists; not all proposed targets do. Verify before edits cite them.

## 7. Proposed sweeps — revised order

Original v1 ordering (vocabulary → consolidation → hierarchy) was wrong for rework cost. Vocab touches every page; if you do it first and then merge `how-it-works` ↔ `agent-workflow` later, you redo the vocab work inside the merge.

Better order: **set the surface, then operate on it.**

### Sweep 1 — Structural deletions (30 min, zero content risk)
- Delete or redirect the 3 orphan stubs (Docusaurus client redirects in `docusaurus.config.ts`)
- Decide whether `reference/index.mdx` becomes richer or disappears
- Fix the factual narrowing in [coding-agents.mdx:87](apps/docs/content/features/coding-agents.mdx#L87) — "opens a PR" → reflect the real range of paths
- Verify all anchor targets that downstream sweeps will cite

### Sweep 2 — Hierarchy decisions (sets the surface)
- Decide: merge `how-it-works` ↔ `agent-workflow` (target ≤200 lines combined), or sharpen the abstraction split between them?
- Decide: keep `build-with-zcp` §4/§5 as 3-sentence anchored summaries, or remove?
- Trim navigation duplication across overview / quickstart / coding-agents "Start here" cards — pick one canonical entry-card set per audience
- Rewrite overview's first 30 seconds: drop the re-pitch, lead with "what's in this section"

### Sweep 3 — Consolidation (on the now-smaller surface)
- Apply the local-reminder-plus-link pattern from §3:
  - Trim full proof/blocker list to one place, keep refrains
  - Strip duplicate confirmation-gates table from 3 pages
  - Strip duplicate failure-categories and runtime-layouts tables from agent-workflow
  - Cut the ZCP_API_KEY re-explanation from `production-policy` and `trust-model` only
  - Trim where remote/local tables overlap; keep the axes that are genuinely different
- Link glossary terms from prose across the section

### Sweep 4 — Vocabulary (find-and-replace over stable surface)
- "Production promotion" (noun) → "production release"
- "Operating loop" → "work loop" / "develop loop"
- "Workflow-guided" → drop or rephrase
- "Bounded operations" → "project-scoped operations"
- "Opinionated", "concerns", "done gate" → concrete replacements
- Delete the apologetic Bootstrap line at [agent-workflow.mdx:15](apps/docs/content/zcp/reference/agent-workflow.mdx#L15); keep the label
- Push "Remote workspace" / "Local workspace" disambiguation where setup-overload bites
- Touch the features page for vocab too (Bootstrap stays, but "Operating loop" / "workflow-guided" / etc may need fixing there)

**Run as one editorial pass with four subgoals, not four separate review cycles.** Three or four cycles invite drift between them.

## 8. Risks worth flagging before any edits

- **Killing "Bootstrap" was wrong** (already cut from the plan above). External surfaces — recipe READMEs, blog posts, community threads — may reference Bootstrap as the phase name. Grep the codebase for external mentions before any aggressive vocab change.
- **Collapsing production-policy prose** risks the security reviewer's read path. They land on `trust-model.mdx` first (security sidebar parent at [sidebars.js:667](apps/docs/sidebars.js#L667)). Stripping the production caveat from there leaves the threat model without its most important boundary statement. Keep a one-paragraph reminder.
- **Removing `build-with-zcp` §4/§5 summaries** breaks the page as a standalone read for the operator archetype who wants the whole pipeline in one place. Keep as anchored 3-sentence summaries.
- **Merging how-it-works + agent-workflow** risks a 350-line monster. ≤200-line target or don't merge.
- **"Production release" as the replacement noun** is cleaner than "handoff" but verify it doesn't collide with anything else in the docs before global replace.
- **Quantify before sweep 3.** Measure repetition vs unique content per page. Pages where 60%+ is unique can survive a 40% trim; the inverse can't.
