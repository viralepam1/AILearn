# Copilot Instructions — Food Delivery App Development

This workspace uses AI agents to automate product-to-code workflows for a Food Delivery App. These instructions help any AI coding agent (Copilot, etc.) be immediately productive.

---

## Project Overview

**Goal:** Build a feature-complete food delivery mobile app using PRD-driven development with specialized AI agents for story generation, testing, and sprint planning.

**Key Documents:**
- [AGENTS.md](AGENTS.md) — Main reference for all AI agents (Story Writer, QA Test Writer, Sprint Planner)
- [docs/Food_Delivery_App_PRD.md](docs/Food_Delivery_App_PRD.md) — Complete product requirements for 21+ features
- [docs/agent-prompts.md](docs/agent-prompts.md) — Usage examples for invoking agents

---

## Agent System

### Available AI Agents

1. **Story Writer** (`@story-writer`)
   - Decomposes PRD features into granular FE/BE user stories
   - Creates stories as Jira issues in "My Software Team" space
   - Usage: `@story-writer Feature 7: Dashboard (Home)`

2. **QA Test Writer** (`@qa-test-writer`)
   - Generates BDD and negative test cases from user stories
   - Creates test cases as Jira sub-tasks
   - Usage: `@qa-test-writer MST-42`

3. **Sprint Planner** (`@sprint-planner`)
   - Estimates stories (Fibonacci: 1, 2, 3, 5, 8, 13)
   - Groups stories into 2-week sprints
   - Usage: `@sprint-planner MST-10, MST-11, MST-12`

4. **RN Project Setup** (`@rn-setup`)
   - Scaffolds React Native project with navigation, Zustand, API layer, screens
   - Enforces SOLID, Hook-Screen pattern, Atomic Design, TypeScript strict
   - Usage: `@rn-setup Setup the project foundation — navigation, state management, API layer, theme, and Login screen`

5. **GitHub Push** (`@github-push`)
   - Creates a feature branch (`feature/<ticket-id>-<kebab-title>`), commits changes, pushes, and opens a PR
   - Commit format: `[TICKET-ID] <short imperative sentence>`
   - Usage: `@github-push MST-42, splash screen animation`

**For details, see:** [AGENTS.md](AGENTS.md)

---

## Development Conventions

### Story Decomposition

- **One responsibility per story** — Each story should be independently deliverable
- **FE + BE separation** — Same functionality creates two separate stories
  - E.g., "[FE] Dashboard — Category Filter" + "[BE] Dashboard — Filter API"
- **Story size** — Target 1–3 days of development work per story
- **No estimates** — Sprint Planner assigns story points; developers don't

### Story Naming Pattern

Every story title **must start with** `[FE]` or `[BE]`:

```
[FE] <Feature Name> — <Specific Scope>
[BE] <Feature Name> — <Specific Scope>
```

**Examples:**
- `[FE] Dashboard — Category Chips Horizontal Scroll`
- `[BE] Cart — Add Item to Cart Endpoint`
- `[FE] Authentication — Sign Up Form Validation`

### Jira Labels

Every story includes:
- `FE` or `BE` — Indicates frontend or backend work
- Feature name in kebab-case (e.g., `dashboard-home`, `order-tracking`)

### Epic Organization

One Epic per PRD feature:
- Epic name matches PRD section (e.g., "Dashboard (Home)", "Order Tracking")
- All related stories are children of the Epic
- Created automatically by Story Writer agent

---

## Product Context

### App Scope (Must Include)
- ✅ Splash screen with first-launch detection
- ✅ Onboarding carousel (3 slides)
- ✅ Authentication (Sign Up, Log In, Forgot Password)
- ✅ Location permissions
- ✅ Dashboard with restaurants & cuisines
- ✅ Search & filters
- ✅ Restaurant view & menu
- ✅ Product details with quantity selector
- ✅ Cart with multi-item support
- ✅ Order confirmation
- ✅ Real-time order tracking
- ✅ Order history
- ✅ Ratings & reviews
- ✅ User profile & address management
- ✅ Favorites / wishlist
- ✅ Notifications
- ✅ Settings
- ✅ FAQs

### App Scope (Out of Scope — Phase 1)
- ❌ Payment gateway (COD only)
- ❌ Chat / messaging
- ❌ Restaurant admin panel
- ❌ Promotions / coupons (not mentioned in Phase 1 PRD)

### Financial Context
- **Currency:** INR (₹)
- **Payment Method:** Cash on Delivery (COD) only
- **No payment gateway integration needed**

---

## When to Use Each Agent

| Scenario | Agent | Example |
|----------|-------|---------|
| Starting a feature sprint | Story Writer | "Convert Feature 7 to stories" |
| Quality assurance planning | QA Test Writer | "Generate test cases for MST-42" |
| Sprint allocation | Sprint Planner | "Plan 3 sprints from stories MST-10 to MST-25" |

**For interactive examples, see:** [docs/agent-prompts.md](docs/agent-prompts.md)

---

## Jira Integration

### Project Details
- **Project Name:** My Software Team
- **Provider:** jira (used in all agent tool calls)

### Workflow
1. **Story Creation** — Story Writer creates issues with acceptance criteria and API contracts
2. **Test Planning** — QA Test Writer creates sub-tasks for test cases
3. **Sprint Allocation** — Sprint Planner moves stories into sprints with estimates
4. **Development** — Teams implement and link pull requests to stories

### Story Template (Created by Story Writer)

```markdown
### [FE/BE] Story Title

**Type:** User Story  
**Epic:** <Feature Name>  
**Project:** My Software Team  
**Labels:** FE or BE, feature-name

---

**As a** [user role],  
**I want** [goal],  
**So that** [value].

---

#### Description
[Clear description from PRD]

#### Acceptance Criteria
- [ ] AC1 — testable criterion
- [ ] AC2 — …

#### API Contract (BE only)
- **Endpoint:** `METHOD /api/path`
- **Request:** `{ … }`
- **Response:** `{ … }`
- **Error codes:** 400, 401, 404, etc.

#### UI / Interaction Notes (FE only)
[Component behavior, animations, states, accessibility]

#### Design Reference
[Figma link if provided]

#### Dependencies
[Blocking stories, if any]
```

---

## File Structure

```
/Users/viralpatel/Developement/AI Learn/
├── AGENTS.md                           ← Start here for agent reference
├── .github/
│   └── agents/
│       ├── story-writer.agent.md      ← Story decomposition rules
│       ├── qa-test-writer.agent.md    ← Test case generation rules
│       └── sprint-planner.agent.md    ← Estimation & sprint rules
├── docs/
│   ├── Food_Delivery_App_PRD.md       ← Complete PRD (21 features)
│   └── agent-prompts.md               ← Usage examples
└── .github/
    └── copilot-instructions.md        ← This file
```

---

## Key Constraints for AI Agents

### PRD Fidelity
- ⚠️ **Do not invent features** — Only translate what's in `docs/Food_Delivery_App_PRD.md`
- ⚠️ **Flag ambiguities** — If PRD is unclear, note as "Open question" in story Notes section
- ⚠️ **No scope expansion** — COD only (no payment gateway), no chat, no coupons (Phase 1)

### Story Quality
- ⚠️ **Acceptance criteria must be testable** — No vague words ("should work well")
- ⚠️ **API contracts match PRD exactly** — Copy endpoint specs verbatim
- ⚠️ **Edge cases explicit** — Call out error states, empty states, max limits
- ⚠️ **Story size** — Keep to 1–3 days work; split if larger

### Estimation
- ⚠️ **No developer points** — Sprint Planner handles all sizing
- ⚠️ **Fibonacci scale only** — 1, 2, 3, 5, 8, 13 (no 0, 21, or decimals)
- ⚠️ **Consider complexity, not effort** — Same story takes different time for different devs

---

## Common Agent Tasks

### Task 1: Convert a PRD Feature to Stories
```
User: @story-writer Feature 11: Cart
Agent: 
  1. Reads docs/Food_Delivery_App_PRD.md Section 11
  2. Identifies all functional requirements
  3. Decomposes into FE + BE stories
  4. Creates as Jira issues
  5. Presents for user review/approval
```

### Task 2: Generate Test Cases for a Story
```
User: @qa-test-writer MST-42
Agent:
  1. Fetches story MST-42 from Jira
  2. Reads relevant PRD section for context
  3. Generates:
     - Happy path (BDD)
     - Negative cases
     - Edge cases
  4. Creates sub-tasks in Jira
```

### Task 3: Plan a Sprint
```
User: @sprint-planner MST-10, MST-11, MST-12, …
Agent:
  1. Fetches all stories from Jira
  2. Reads PRD for dependency context
  3. Estimates each story (Fibonacci)
  4. Groups into 2-week sprints
  5. Creates sprints in Jira
```

---

## Troubleshooting

### "Cannot create story because Epic doesn't exist"
→ Story Writer automatically creates Epics; if this error occurs, check Jira permissions or create Epic manually in "My Software Team" project.

### "Jira connection failed"
→ Verify GitKraken is configured and Jira credentials are valid. Agents will output copy-paste-ready text if direct creation is unavailable.

### "Story is too large (13+ points)"
→ Story Writer or Sprint Planner should split into smaller stories. Each story should be 1–3 days of work.

### "Missing Figma link in story"
→ Figma link is optional. If provided by user, Story Writer embeds it; if not provided, section is omitted from story.

---

## Links & References

| Document | Purpose |
|----------|---------|
| [AGENTS.md](AGENTS.md) | Full agent reference & workflow |
| [docs/Food_Delivery_App_PRD.md](docs/Food_Delivery_App_PRD.md) | Complete product spec |
| [docs/agent-prompts.md](docs/agent-prompts.md) | Usage examples |
| [.github/agents/story-writer.agent.md](.github/agents/story-writer.agent.md) | Story template & rules |
| [.github/agents/qa-test-writer.agent.md](.github/agents/qa-test-writer.agent.md) | Test case format & rules |
| [.github/agents/sprint-planner.agent.md](.github/agents/sprint-planner.agent.md) | Estimation & sprint rules |

---

## Getting Started

1. **Read** [AGENTS.md](AGENTS.md) to understand agent capabilities
2. **Try** `@story-writer Feature 1: Splash Screen` to see agents in action
3. **Review** the generated stories in Jira "My Software Team" space
4. **Iterate** — Refine agent instructions based on your team's feedback

