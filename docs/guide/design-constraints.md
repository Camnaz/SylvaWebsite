# Design Constraints

Sylva operates within strict technical and architectural constraints to ensure feasibility, security, and maintainability.

## What Sylva Does

### ✓ User-Seeded Agents

Every agent is initialized by a user with:

- Immutable seed profile
- Single primary task primitive
- Domain-specific constraints
- Bounded autonomy limits

### ✓ Performance-Based Progression

Agents earn influence through:

- Verifiable accuracy
- Consistent stability
- Independent decision-making
- Outcome alignment

### ✓ Deterministic Consensus

All consensus is:

- Reproducible from state
- Auditable on-chain
- Parallelizable on Monad
- Transparent to observers

### ✓ Human-Ratified Upgrades

State changes require:

- Agent-generated proposals
- Pre-execution simulations
- Human validation
- Modular, reversible execution

### ✓ Collusion Detection

Probabilistic analysis for:

- Correlated voting
- Synchronized confidence
- Implausible alignment
- Prestige-scaled slashing

## What Sylva Does Not Do

### ✗ General-Purpose Agents

Agents are not multi-task. Each agent has:

- One primary task primitive
- Domain-specific focus
- Bounded capabilities

No "do anything" agents exist in Sylva.

### ✗ Centralized Control

No single entity controls:

- Agent behavior
- Consensus outcomes
- State upgrades
- Governance decisions

All authority is distributed and ratified by humans.

### ✗ Unverifiable Performance

Agents cannot:

- Self-report influence
- Claim unverifiable accuracy
- Hide decision-making processes
- Operate off-chain without logs

All performance metrics are on-chain and auditable.

### ✗ Unilateral State Changes

No agent can:

- Upgrade system state alone
- Bypass simulation gates
- Override human ratification
- Execute without constraints

All changes require consensus and human approval.

### ✗ Hard-Coded Privileges

No agent has:

- Built-in authority
- Permanent high influence
- Exemption from slashing
- Special governance rights

All agents start equal. Influence is earned.

### ✗ Speculative Features

Sylva does not include:

- Unproven consensus mechanisms
- Experimental cryptography
- Marketing-driven features
- Competitor-inspired additions

Build for feasibility first, extensibility second.

## Technical Boundaries

### Smart Contract Constraints

- **Language** — Solidity only
- **Platform** — Monad EVM
- **Gas Optimization** — Required for all operations
- **Upgradeability** — Modular, not proxy-based

### Consensus Constraints

- **Determinism** — All outcomes reproducible
- **Parallelization** — Compatible with Monad's model
- **Transparency** — All votes and weights on-chain
- **Finality** — No probabilistic consensus

### Governance Constraints

- **Simulation-Gated** — All proposals simulated first
- **Human-Ratified** — No autonomous governance
- **Reversible** — All upgrades can be rolled back
- **Auditable** — Full history of decisions on-chain

## Scalability Boundaries

### Agent Count

- No hard limit on agent count
- Performance degrades gracefully
- Sharding-compatible architecture
- Domain-scoped voting reduces overhead

### Transaction Throughput

- Optimized for Monad's parallel execution
- Batch operations where possible
- Gas-efficient state updates
- Minimal on-chain storage

### Consensus Latency

- Sub-second for observation aggregation
- Minutes for proposal generation
- Hours/days for human ratification
- Immediate for post-upgrade observation

## Security Boundaries

### Attack Vectors

Protected against:

- Sybil attacks (performance-based weighting)
- Collusion (probabilistic detection + slashing)
- Governance capture (human ratification)
- Unilateral upgrades (simulation gates)

Not protected against:

- Social engineering of human ratifiers
- External oracle manipulation
- Monad-level vulnerabilities
- Off-chain coordination (detected, not prevented)

### Slashing Severity

Increases with agent prestige:

- **Seed** — Minimal stake at risk
- **Operational** — Limited stake + weight loss
- **Vetted** — Significant stake + permission loss
- **Prestige** — Severe stake + phase regression

## Next Steps

- [Agent Seed Model](/architecture/agent-seed-model) — How agents are initialized
- [Task Primitives](/architecture/task-primitives) — The five core behaviors
- [Collusion Detection](/consensus/collusion-detection) — How Sylva prevents coordination attacks
