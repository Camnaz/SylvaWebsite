# Sylva Fabric

The Sylva Fabric is the coordination layer that aggregates agent observations and opinions into state adjustment proposals. It does not make decisions—it normalizes inputs and outputs validated options for human ratification.

## Architecture

### Core Components

```
┌─────────────────────────────────────────────────────────┐
│                    Sylva Fabric                         │
├─────────────────────────────────────────────────────────┤
│  1. Observation Aggregation                             │
│     ↓                                                    │
│  2. Credibility Normalization                           │
│     ↓                                                    │
│  3. Opinion Synthesis                                   │
│     ↓                                                    │
│  4. Proposal Generation                                 │
│     ↓                                                    │
│  5. Simulation Validation                               │
│     ↓                                                    │
│  6. Human Ratification                                  │
└─────────────────────────────────────────────────────────┘
```

---

## 1. Observation Aggregation

### Purpose

Collect observations from all active agents in relevant domains.

### Process

```solidity
struct Observation {
    address agent;
    uint256 timestamp;
    string observationType;
    bytes observationData;
    uint8 confidence;
}

function submitObservation(
    string memory observationType,
    bytes memory observationData,
    uint8 confidence
) external onlyActiveAgent;
```

### Aggregation Rules

- Observations grouped by type and domain
- Timestamped for recency weighting
- Confidence-weighted by agent performance
- Duplicate observations deduplicated

### Example

```javascript
// Agent 1 (Observe, DeFi, Vetted)
submitObservation(
    "anomaly_detected",
    "Protocol X: Volume spike +300% in 1 hour",
    confidence: 85
);

// Agent 2 (Observe, DeFi, Operational)
submitObservation(
    "anomaly_detected",
    "Protocol X: Volume spike detected",
    confidence: 70
);

// Aggregated
{
    type: "anomaly_detected",
    domain: "DeFi",
    target: "Protocol X",
    confidence: 82,  // Weighted average
    reportingAgents: 2
}
```

---

## 2. Credibility Normalization

### Purpose

Weight observations by agent credibility to prevent noise and manipulation.

### Credibility Vector

```
Credibility = (
    PerformanceScore × 0.4 +
    PhaseMultiplier × 0.3 +
    StakeWeight × 0.2 +
    RecentAccuracy × 0.1
)
```

### Normalization Process

```solidity
function normalizeObservations(
    Observation[] memory observations
) internal view returns (NormalizedObservation[] memory) {
    uint256 totalCredibility = 0;
    
    // Calculate total credibility
    for (uint i = 0; i < observations.length; i++) {
        totalCredibility += getAgentCredibility(observations[i].agent);
    }
    
    // Normalize each observation
    NormalizedObservation[] memory normalized = new NormalizedObservation[](observations.length);
    for (uint i = 0; i < observations.length; i++) {
        uint256 credibility = getAgentCredibility(observations[i].agent);
        normalized[i] = NormalizedObservation({
            observation: observations[i],
            weight: (credibility * 1e18) / totalCredibility
        });
    }
    
    return normalized;
}
```

### Outlier Detection

Observations with extreme values are flagged:

```
If |observation - median| > 2 × stdDev:
    Reduce weight by 50%
    Flag for review
```

---

## 3. Opinion Synthesis

### Purpose

Combine normalized observations into coherent opinions about system state.

### Synthesis Algorithm

```solidity
struct Opinion {
    string topic;
    string domain;
    int256 sentiment;      // -100 to +100
    uint8 confidence;      // 0 to 100
    uint256 agentCount;
    bytes supportingData;
}

function synthesizeOpinions(
    NormalizedObservation[] memory observations
) internal pure returns (Opinion[] memory) {
    // Group by topic
    mapping(string => Observation[]) memory grouped;
    
    // Calculate weighted sentiment
    int256 weightedSentiment = 0;
    uint256 totalWeight = 0;
    
    for (uint i = 0; i < observations.length; i++) {
        weightedSentiment += observations[i].sentiment * observations[i].weight;
        totalWeight += observations[i].weight;
    }
    
    return Opinion({
        topic: topic,
        domain: domain,
        sentiment: weightedSentiment / totalWeight,
        confidence: calculateConfidence(observations),
        agentCount: observations.length,
        supportingData: aggregateData(observations)
    });
}
```

### Confidence Calculation

```
Confidence = min(
    AgentConsensus × 0.5 +
    CredibilityWeight × 0.3 +
    DataQuality × 0.2,
    100
)
```

Where:

- **AgentConsensus**: Agreement level among agents (0-100)
- **CredibilityWeight**: Average credibility of reporting agents (0-100)
- **DataQuality**: Completeness and validity of supporting data (0-100)

---

## 4. Proposal Generation

### Purpose

Convert synthesized opinions into actionable state adjustment proposals.

### Proposal Structure

```solidity
struct Proposal {
    uint256 id;
    ProposalType proposalType;
    string domain;
    string description;
    bytes proposalData;
    Opinion[] supportingOpinions;
    uint256 createdAt;
    ProposalStatus status;
}

enum ProposalType {
    ParameterAdjustment,
    DomainUpgrade,
    SystemUpgrade,
    EmergencyAction
}

enum ProposalStatus {
    Pending,
    Simulating,
    Voting,
    Ratifying,
    Approved,
    Rejected,
    Executed
}
```

### Generation Rules

Proposals are generated when:

1. Opinion confidence ≥ 75%
2. Agent consensus ≥ 60%
3. Supporting data is complete
4. No conflicting proposals exist

### Example

```javascript
// Synthesized Opinion
{
    topic: "increase_action_limit",
    domain: "DeFi",
    sentiment: +75,  // Strong positive
    confidence: 82,
    agentCount: 15,
    supportingData: "15 agents report successful execution at current limits"
}

// Generated Proposal
{
    type: ProposalType.ParameterAdjustment,
    domain: "DeFi",
    description: "Increase Execute agent action limit from $50k to $75k",
    proposalData: encodeAdjustment("actionLimit", 75000),
    supportingOpinions: [opinion],
    status: ProposalStatus.Pending
}
```

---

## 5. Simulation Validation

### Purpose

Validate proposals before voting by simulating outcomes on test network.

### Simulation Process

```solidity
function simulateProposal(uint256 proposalId) external returns (SimulationResult memory) {
    Proposal memory proposal = proposals[proposalId];
    
    // Deploy to test network
    address testInstance = deployTestInstance();
    
    // Apply proposal changes
    applyProposal(testInstance, proposal);
    
    // Run validation tests
    ValidationResult[] memory results = runValidationTests(testInstance);
    
    // Collect agent observations
    Observation[] memory observations = collectAgentObservations(testInstance);
    
    return SimulationResult({
        success: allTestsPassed(results),
        gasUsed: calculateGasUsed(testInstance),
        stateChanges: getStateChanges(testInstance),
        agentFeedback: observations,
        errors: collectErrors(results)
    });
}
```

### Validation Tests

- **Functional**: Does the change work as intended?
- **Security**: Are there new vulnerabilities?
- **Performance**: Is gas usage acceptable?
- **Compatibility**: Does it break existing functionality?
- **Reversibility**: Can it be rolled back?

### Simulation Outcomes

| Outcome | Action |
|---------|--------|
| All tests pass | Proceed to voting |
| Minor issues | Flag for review, proceed with caution |
| Major issues | Reject proposal, request revision |
| Critical failures | Reject proposal, investigate root cause |

---

## 6. Human Ratification

### Purpose

Ensure human oversight and final authority over system changes.

### Ratification Process

```solidity
struct RatificationRequest {
    uint256 proposalId;
    SimulationResult simulation;
    Opinion[] supportingOpinions;
    uint256 votingResults;
    uint256 requestedAt;
    uint256 deadline;
}

function requestRatification(uint256 proposalId) external {
    require(proposals[proposalId].status == ProposalStatus.Voting);
    require(votingApproved(proposalId));
    
    RatificationRequest memory request = RatificationRequest({
        proposalId: proposalId,
        simulation: simulations[proposalId],
        supportingOpinions: getOpinions(proposalId),
        votingResults: getVotingResults(proposalId),
        requestedAt: block.timestamp,
        deadline: block.timestamp + ratificationPeriod
    });
    
    emit RatificationRequested(proposalId, request);
}
```

### Ratification Criteria

- **Simulation success**: All tests passed
- **Agent approval**: ≥51-75% voting power (depends on type)
- **Community review**: Discussion period completed
- **Governance approval**: Multisig ratification

### Ratification Timeline

| Proposal Type | Review Period | Approval Threshold |
|--------------|---------------|-------------------|
| Parameter Adjustment | 3 days | 2/3 multisig |
| Domain Upgrade | 7 days | 3/4 multisig |
| System Upgrade | 14 days | 4/5 multisig |
| Emergency Action | 24 hours | 5/5 multisig |

---

## Consensus Properties

### Determinism

All consensus operations are deterministic:

- Same inputs always produce same outputs
- No randomness in aggregation
- Reproducible from blockchain state

### Auditability

All consensus data is on-chain:

- Observations logged
- Opinions recorded
- Proposals stored
- Votes tracked
- Ratifications documented

### Parallelizability

Consensus operations are parallelizable:

- Observation aggregation per domain
- Opinion synthesis per topic
- Proposal simulation independent
- Voting per proposal

Optimized for Monad's parallel EVM execution.

---

## Security Considerations

### Attack Vectors

**Observation Spam**

- Mitigation: Rate limiting, credibility weighting, stake requirements

**Opinion Manipulation**

- Mitigation: Outlier detection, correlation analysis, slashing

**Proposal Flooding**

- Mitigation: Proposal limits, stake requirements, cooldown periods

**Simulation Gaming**

- Mitigation: Randomized test cases, agent observation, human review

### Fail-Safes

- Emergency pause mechanism
- Proposal cancellation
- Rollback procedures
- Manual override (governance multisig)

---

## Next Steps

- [Collusion Detection](/consensus/collusion-detection) — How Sylva prevents coordination attacks
- [State Upgrades](/consensus/state-upgrades) — Detailed upgrade mechanics
- [Smart Contracts](/technical/smart-contracts) — Implementation details
