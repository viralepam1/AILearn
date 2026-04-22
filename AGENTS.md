# AI Agents for Food Delivery App Development

This workspace uses specialized AI agents to automate key development workflows. Each agent is configured to understand the Food Delivery App PRD and Jira integration points.

---

## Quick Start

### 1. Story Writer
Generates detailed, decomposed user stories from PRD features.

**When to use:** At the start of a feature cycle to translate product requirements into actionable stories.

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

## Typical Workflow

1. **Feature Breakdown** → Use `@story-writer Feature X` to decompose a PRD feature into granular, independent stories.
2. **Test Planning** → Use `@qa-test-writer MST-N` on each approved story to define test coverage.
3. **Sprint Planning** → Use `@sprint-planner MST-X, MST-Y, MST-Z` to estimate and allocate work.
4. **Development** → Teams reference stories, acceptance criteria, and test cases for implementation.

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
