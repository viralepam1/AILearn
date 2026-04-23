# AI Agents for Food Delivery App Development

This workspace uses specialized AI agents to automate key development workflows. Each agent is configured to understand the Food Delivery App PRD and Jira integration points.

---

## Quick Start

### 1. Story Writer
Generates detailed, decomposed user stories from PRD features and automatically creates test cases for each story.

**When to use:** At the start of a feature cycle to translate product requirements into actionable stories with test coverage.

**Invocation:**
```
@story-writer Feature 7: Dashboard (Home)
@story-writer Feature 3: Authentication — Sign Up — Figma: https://figma.com/file/abc123
```

**Inputs:**
- **Feature number** (1–21) — PRD section identifier
- **Feature name** — Human-readable feature title
- **Figma link** (optional) — Design reference to embed in stories

**Output:** 
- Separate frontend (FE) and backend (BE) user stories
- Each story has acceptance criteria, API contracts, and UI notes
- Stories are created as issues in Jira "My Software Team" space
- Comprehensive test cases (functional, negative, edge, API, accessibility) automatically generated for each story
- Test cases created as sub-tasks under each story in Jira

**Reference:** [.github/agents/story-writer.agent.md](.github/agents/story-writer.agent.md)

---

### 2. QA Test Writer
Generates comprehensive test cases (functional, negative, edge-case) from user stories.

**When to use:** After story approval to ensure thorough test coverage before development.

**Invocation:**
```
@qa-test-writer MST-42
@qa-test-writer MST-10, MST-11, MST-12
@qa-test-writer [paste full story text here]
```

**Inputs:**
- **Jira key** (e.g., `MST-42`) — Auto-fetches story details
- **Story text** (optional) — Paste story directly if not yet in Jira
- **Story type** (auto-detected) — FE or BE

**Output:**
- Test cases in BDD format (Gherkin syntax)
- Negative/error cases and edge cases
- Sub-tasks created under the story in Jira

**Reference:** [.github/agents/qa-test-writer.agent.md](.github/agents/qa-test-writer.agent.md)

---

### 3. Sprint Planner
Estimates stories using Fibonacci points and groups them into 2-week sprints.

**When to use:** During sprint planning to organize stories and forecast delivery.

**Invocation:**
```
@sprint-planner MST-10, MST-11, MST-12, MST-13, MST-14
@sprint-planner All stories from Epic "Dashboard (Home)" — capacity: 25 points
@sprint-planner MST-20 through MST-35, constraint: MST-22 must be in Sprint 1
```

**Inputs:**
- **Stories** — Jira keys or Epic name
- **Team capacity** (default: 30 points) — Adjust for your team
- **Sprint start date** (default: next Monday) — When Sprint 1 begins
- **Constraints** (optional) — Forced dependencies or ordering

**Output:**
- Sprint allocations respecting dependencies and capacity
- Fibonacci story point estimates (1, 2, 3, 5, 8, 13)
- Sprints created in Jira

**Reference:** [.github/agents/sprint-planner.agent.md](.github/agents/sprint-planner.agent.md)

---

### 4. RN Project Setup
Scaffolds the `foodDeliveryFE/` React Native project with production-ready architecture: navigation, state management, API layer, and screens.

**When to use:** When setting up the project foundation or adding new screens/features that need the full architecture scaffold (navigation, hooks, store, components).

**Invocation:**
```
@rn-setup Setup the project foundation — navigation, state management, API layer, theme, and Login screen
@rn-setup Add Cart screen with PRD Feature 11
@rn-setup Add a new atom component: Badge
```

**Inputs:**
- **Task** (required) — What to scaffold (e.g., "setup project", "add Login screen")
- **Feature number** (optional) — PRD section number (1–21) for context
- **Figma link** (optional) — Design reference URL

**Output:**
- Complete folder structure under `foodDeliveryFE/src/` following Atomic Design
- Screen + co-located hook pairs (Hook-Screen pattern)
- Zustand stores, typed API layer with mock data
- React Navigation with type-safe param lists
- All code follows SOLID, Container-Presentation (via hooks), TypeScript strict, and RN best practices

**Reference:** [.github/agents/rn-setup.agent.md](.github/agents/rn-setup.agent.md)

---

### 5. GitHub Push
Automates the full GitHub push workflow: creates a feature branch, commits staged changes, pushes to GitHub, and opens a Pull Request against `main`.

**When to use:** After completing development work on a story — to branch, commit, push, and raise a PR in one step.

**Invocation:**
```
@github-push MST-42, splash screen animation
@github-push MST-10, Add login screen — commit: "implement sign-in form with validation"
@github-push MST-55, order tracking — target branch: develop
```

**Inputs:**
- **Ticket / Story ID** (required) — Jira key, e.g. `MST-42`
- **Story / feature title** (required) — Short description used in branch name and PR title
- **Commit message** (optional) — Custom message; derived from title if omitted
- **PR description** (optional) — Extra context for PR body
- **Target branch** (optional) — Defaults to `main`

**Output:**
- Feature branch created: `feature/<ticket-id>-<kebab-title>`
- Commit with message: `[MST-42] <short imperative sentence>`
- Branch pushed to `origin`
- Pull Request opened against `main` with ticket link and change summary

**Reference:** [.github/agents/github-push.agent.md](.github/agents/github-push.agent.md)

---

### 6. Code Reviewer
Reviews React Native code against all project standards: SOLID, Hook-Screen pattern, Atomic Design, TypeScript strict, style-file separation, type conventions, performance, security, and accessibility.

**When to use:** Before merging a PR or after completing code on a feature — to catch violations and improve quality.

**Invocation:**
```
@code-reviewer foodDeliveryFE/src/screens/login/LoginScreen.tsx
@code-reviewer foodDeliveryFE/src/screens/dashboard/ — focus: performance
@code-reviewer review all changed files
```

**Inputs:**
- **File path(s)** (required, or "all changed") — Files or directories to review
- **PR number** (optional) — GitHub PR number to auto-detect changed files
- **Focus area** (optional) — Narrow the review (e.g., "performance only", "types only")

**Output:**
- Structured review with severity levels (🔴 BLOCKER / 🟡 WARNING / 🔵 SUGGESTION)
- Exact file, line, and rule for each issue
- Fix suggestions with corrected code snippets
- Highlights of well-written code

**Reference:** [.github/agents/code-reviewer.agent.md](.github/agents/code-reviewer.agent.md)

---

## Typical Workflow

1. **Feature Breakdown** → Use `@story-writer Feature X` to decompose a PRD feature into granular, independent stories with automatic test case generation.
2. **Sprint Planning** → Use `@sprint-planner MST-X, MST-Y, MST-Z` to estimate and allocate work.
3. **Project Setup & Scaffolding** → Use `@rn-setup` to scaffold screens, navigation, stores, and API layer.
4. **Development** → Teams implement using stories, acceptance criteria, and test cases for guidance.
5. **Code Review** → Use `@code-reviewer` to audit code against project standards before pushing.
6. **GitHub Push** → Use `@github-push MST-N, <title>` to branch, commit, push, and raise a PR.

*Note: Story Writer now automatically invokes QA Test Writer for each story created, so Step 2 (Test Planning) is integrated into Step 1.*

---

## Project Context

### Product Requirements
- **PRD:** [docs/Food_Delivery_App_PRD.md](docs/Food_Delivery_App_PRD.md)  
  Complete specification for all 21 features including splash screen, authentication, dashboard, cart, order tracking, payments (COD only), etc.

### Key Conventions

#### Story Naming
- `[FE] <Feature Name> — <Specific Scope>` (e.g., `[FE] Dashboard — Category Chips Horizontal Scroll`)
- `[BE] <Feature Name> — <Specific Scope>` (e.g., `[BE] Dashboard — GET /api/home Endpoint`)

#### Labels (Jira)
- `FE` or `BE` — Frontend or Backend work
- Feature name in kebab-case (e.g., `dashboard-home`, `authentication-sign-up`)

#### Epics
- One Epic per PRD feature (e.g., "Dashboard (Home)", "Authentication")
- All related stories are children of the feature's Epic

#### Project / Space
- **Jira Project:** My Software Team
- **Provider:** jira (always used in agent tool calls)

### App Constraints
- **Payment:** Cash on Delivery (COD) only — no payment gateway integration
- **Chat:** Out of scope
- **Currency:** INR (₹)
- **Development approach:** Mobile-first, PRD-driven, user-story decomposition

### Example Prompts
See [docs/agent-prompts.md](docs/agent-prompts.md) for more invocation examples.

---

## Jira Integration

All agents use GitKraken Jira tools to:
- **Read:** Fetch story details and Epic information
- **Create:** Generate issues and sub-tasks in "My Software Team" space
- **Link:** Establish Epic relationships and dependencies

If direct Jira creation is unavailable, agents output copy-paste-ready formatted text for manual creation.

---

## File Organization

```
.github/
  agents/
    story-writer.agent.md      ← Story decomposition instructions
    qa-test-writer.agent.md    ← Test case generation instructions
    sprint-planner.agent.md    ← Sprint estimation instructions

docs/
  Food_Delivery_App_PRD.md     ← Product requirements (21 features)
  agent-prompts.md             ← Usage examples

AGENTS.md                       ← This file
```

---

## Next Steps

To extend or customize the agent system:
- **Refine story templates** — Update acceptance criteria patterns in [.github/agents/story-writer.agent.md](.github/agents/story-writer.agent.md)
- **Enhance test coverage** — Add domain-specific test categories in [.github/agents/qa-test-writer.agent.md](.github/agents/qa-test-writer.agent.md)
- **Adjust estimation** — Tune Fibonacci anchors in [.github/agents/sprint-planner.agent.md](.github/agents/sprint-planner.agent.md) based on actual team velocity
- **Add backend instructions** — Create `.github/copilot-instructions.md` with API design standards, auth patterns, database schema, etc. (if applicable)

---

## AI Agent Capabilities & Limitations

### What Agents Can Do
✅ Read PRD and translate features into stories  
✅ Decompose complex features into FE/BE work  
✅ Generate test cases with BDD syntax  
✅ Estimate using Fibonacci scale  
✅ Create and link Jira issues  
✅ Suggest dependencies and constraints  

### What Agents Cannot Do
❌ Invent requirements beyond the PRD  
❌ Decide product priorities (user decides which feature to request)  
❌ Modify code or commit to git (only read/create issues)  
❌ Deploy or run tests (reference only)  
❌ Access external design tools directly (require Figma links as input)  

---

## Support

For questions about:
- **Story decomposition** → See [.github/agents/story-writer.agent.md](.github/agents/story-writer.agent.md) "Story Decomposition Rules"
- **Test case formats** → See [.github/agents/qa-test-writer.agent.md](.github/agents/qa-test-writer.agent.md) "Test Case Categories"
- **Estimation** → See [.github/agents/sprint-planner.agent.md](.github/agents/sprint-planner.agent.md) "Estimation Guidelines"
- **PRD details** → See [docs/Food_Delivery_App_PRD.md](docs/Food_Delivery_App_PRD.md)
