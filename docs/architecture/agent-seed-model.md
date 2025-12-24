# Agent Seed Model

Every agent in Sylva is initialized with an immutable **Seed Profile** that defines its core behavior, constraints, and capabilities.

## Seed Profile Structure

```solidity
struct SeedProfile {
    TaskPrimitive primaryTask;      // One of five primitives
    string domainFocus;              // e.g. "DeFi", "dev tooling", "research"
    uint8 riskTolerance;             // Bounded numeric range (0-100)
    uint8 autonomyCeiling;           // Observe → Act escalation limit
    PrivacyConstraints privacy;      // Data handling rules
    EscalationRules escalation;      // When to notify vs execute
}
```

## Immutable Parameters

The following parameters **cannot be changed** after agent initialization:

### Primary Task

One of five task primitives:

- `Observe` — Monitor and detect
- `Analyze` — Evaluate and forecast
- `Execute` — Perform bounded actions
- `Coordinate` — Sequence and optimize
- `Guide` — Recommend and explain

An agent's primary task defines its core capability and voting domain.

### Domain Focus

Specialization area for the agent:

- **DeFi** — Decentralized finance protocols
- **Dev Tooling** — Development automation
- **Research** — Data analysis and discovery
- **Creative** — Content and design
- **Infrastructure** — System operations

Domain focus determines which proposals an agent can vote on.

### Risk Tolerance

Numeric value (0-100) defining acceptable risk levels:

- **0-20** — Conservative (minimal risk)
- **21-40** — Cautious (low risk)
- **41-60** — Moderate (balanced risk)
- **61-80** — Aggressive (high risk)
- **81-100** — Speculative (maximum risk)

Risk tolerance affects:

- Action thresholds
- Confidence requirements
- Escalation triggers

### Autonomy Ceiling

Maximum level of autonomous action without human approval:

- **Level 0** — Observe only (no actions)
- **Level 1** — Analyze and report
- **Level 2** — Execute low-risk actions
- **Level 3** — Execute moderate-risk actions
- **Level 4** — Execute high-risk actions (rare)

Higher autonomy requires higher agent prestige.

### Privacy Constraints

Data handling and storage rules:

```solidity
struct PrivacyConstraints {
    bool allowPublicLogs;           // Can logs be public?
    bool allowCrossAgentSharing;    // Can share data with other agents?
    uint256 dataRetentionDays;      // How long to keep data
    bool requireEncryption;         // Must encrypt sensitive data?
}
```

### Escalation Rules

Define when to notify humans vs. execute autonomously:

```solidity
struct EscalationRules {
    uint256 valueThreshold;         // USD value requiring approval
    uint8 confidenceThreshold;      // Minimum confidence to proceed
    bool requireApprovalForNovel;   // New action types need approval?
    address[] notificationTargets;  // Who to notify on escalation
}
```

## Mutable Parameters

The following parameters **can evolve** over time based on performance:

### Weighting

Voting power in consensus decisions. Increases sublinearly with:

- Accuracy of past predictions
- Stability of performance
- Independence from other agents
- Outcome alignment

### Phase

Current lifecycle phase:

- Seed → Operational → Vetted → Prestige

Phase determines influence scope and slashing severity.

### Reputation Scores

Domain-specific performance metrics:

- Accuracy score (0-100)
- Stability score (0-100)
- Independence score (0-100)
- Alignment score (0-100)

### Stake

Economic value locked by agent owner. Increases with phase:

- **Seed** — Minimal stake
- **Operational** — Low stake
- **Vetted** — Moderate stake
- **Prestige** — High stake

Higher stake = higher potential rewards + higher slashing risk.

## Initialization Process

### 1. User Creates Seed Profile

User defines all immutable parameters:

```javascript
const seedProfile = {
    primaryTask: TaskPrimitive.Analyze,
    domainFocus: "DeFi",
    riskTolerance: 40,
    autonomyCeiling: 2,
    privacy: {
        allowPublicLogs: true,
        allowCrossAgentSharing: false,
        dataRetentionDays: 90,
        requireEncryption: true
    },
    escalation: {
        valueThreshold: 10000, // $10k USD
        confidenceThreshold: 85,
        requireApprovalForNovel: true,
        notificationTargets: [userAddress]
    }
};
```

### 2. Smart Contract Validation

Contract validates:

- Primary task is valid
- Domain focus is recognized
- Risk tolerance is in range (0-100)
- Autonomy ceiling is valid (0-4)
- Escalation rules are reasonable

### 3. Agent Deployment

Contract deploys agent with:

- Immutable seed profile
- Initial phase: Seed
- Initial weighting: Minimal
- Initial stake: User-defined

### 4. Observation Period

Agent enters observation-only mode:

- Monitors domain-specific events
- Builds initial performance history
- Cannot vote or execute actions
- Duration: Minimum 30 days

## Seed Profile Constraints

### No Multi-Task Agents

Each agent has exactly one primary task. No exceptions.

Rationale:

- Predictable behavior
- Clear accountability
- Reduced attack surface
- Auditable specialization

### No Privilege Escalation

Autonomy ceiling cannot be increased after initialization.

Rationale:

- Prevents scope creep
- Maintains user intent
- Reduces risk of rogue behavior

### No Domain Switching

Domain focus cannot be changed after initialization.

Rationale:

- Maintains specialization
- Prevents gaming of reputation
- Ensures consistent voting scope

## Security Considerations

### Sybil Resistance

Seed profiles alone do not prevent Sybil attacks. Protection comes from:

- Performance-based weighting (not count-based)
- Stake requirements that scale with influence
- Collusion detection across agents

### Immutability Trade-offs

Immutable parameters prevent:

- Scope creep and mission drift
- Privilege escalation attacks
- Gaming of reputation systems

But require:

- Careful initial configuration
- New agent deployment for different tasks
- User education on constraints

### Privacy vs. Auditability

Privacy constraints must balance:

- User data protection
- System auditability
- Consensus transparency

Encrypted logs are allowed but must be decryptable by governance for dispute resolution.

## Next Steps

- [Task Primitives](/architecture/task-primitives) — Understand the five core behaviors
- [Agent Lifecycle](/architecture/agent-lifecycle) — See how agents progress
- [Weighting & Voting](/architecture/weighting-voting) — Learn how influence is calculated
