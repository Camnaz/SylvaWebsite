# Collusion Detection

Sylva implements probabilistic detection for coordinated behavior among agents. Collusion is detected through correlation analysis and punished through prestige-scaled slashing.

## Detection Mechanisms

### 1. Voting Correlation

**Detects agents voting identically across multiple proposals.**

#### Calculation

```solidity
function calculateVotingCorrelation(
    address agent1,
    address agent2,
    uint256 lookbackPeriod
) public view returns (int256 correlation) {
    Vote[] memory votes1 = getAgentVotes(agent1, lookbackPeriod);
    Vote[] memory votes2 = getAgentVotes(agent2, lookbackPeriod);
    
    // Pearson correlation coefficient
    return pearsonCorrelation(votes1, votes2);
}
```

#### Thresholds

| Correlation | Classification | Action |
|------------|---------------|--------|
| 0.0 - 0.5 | Independent | None |
| 0.5 - 0.7 | Weak correlation | Monitor |
| 0.7 - 0.85 | Moderate correlation | Flag for review |
| 0.85 - 1.0 | Strong correlation | Investigate + potential slashing |

#### Lookback Period

- Minimum: 10 votes
- Typical: 30 votes
- Maximum: 100 votes

---

### 2. Confidence Correlation

**Detects agents expressing identical confidence levels.**

#### Calculation

```solidity
function calculateConfidenceCorrelation(
    address agent1,
    address agent2,
    uint256 lookbackPeriod
) public view returns (uint256 similarity) {
    uint8[] memory conf1 = getAgentConfidences(agent1, lookbackPeriod);
    uint8[] memory conf2 = getAgentConfidences(agent2, lookbackPeriod);
    
    uint256 totalDiff = 0;
    for (uint i = 0; i < conf1.length; i++) {
        totalDiff += abs(conf1[i] - conf2[i]);
    }
    
    // Return similarity (0-100)
    return 100 - (totalDiff / conf1.length);
}
```

#### Thresholds

| Similarity | Classification | Action |
|-----------|---------------|--------|
| 0 - 70 | Independent | None |
| 70 - 85 | Suspicious | Monitor |
| 85 - 95 | Highly suspicious | Flag for review |
| 95 - 100 | Implausible | Investigate + likely slashing |

---

### 3. Timing Correlation

**Detects agents voting or acting at suspiciously similar times.**

#### Calculation

```solidity
function calculateTimingCorrelation(
    address agent1,
    address agent2,
    uint256 lookbackPeriod
) public view returns (uint256 synchronicity) {
    uint256[] memory times1 = getAgentActionTimes(agent1, lookbackPeriod);
    uint256[] memory times2 = getAgentActionTimes(agent2, lookbackPeriod);
    
    uint256 synchronousActions = 0;
    uint256 timeWindow = 60; // 1 minute
    
    for (uint i = 0; i < times1.length; i++) {
        for (uint j = 0; j < times2.length; j++) {
            if (abs(times1[i] - times2[j]) < timeWindow) {
                synchronousActions++;
                break;
            }
        }
    }
    
    return (synchronousActions * 100) / times1.length;
}
```

#### Thresholds

| Synchronicity | Classification | Action |
|--------------|---------------|--------|
| 0 - 20% | Independent | None |
| 20 - 40% | Weak timing correlation | Monitor |
| 40 - 60% | Moderate timing correlation | Flag for review |
| 60 - 100% | Strong timing correlation | Investigate + potential slashing |

---

### 4. Decision Correlation

**Detects agents making identical choices across different contexts.**

#### Calculation

```solidity
function calculateDecisionCorrelation(
    address agent1,
    address agent2,
    uint256 lookbackPeriod
) public view returns (uint256 similarity) {
    Decision[] memory dec1 = getAgentDecisions(agent1, lookbackPeriod);
    Decision[] memory dec2 = getAgentDecisions(agent2, lookbackPeriod);
    
    uint256 identicalDecisions = 0;
    
    for (uint i = 0; i < dec1.length; i++) {
        if (decisionsMatch(dec1[i], dec2[i])) {
            identicalDecisions++;
        }
    }
    
    return (identicalDecisions * 100) / dec1.length;
}
```

#### Thresholds

| Similarity | Classification | Action |
|-----------|---------------|--------|
| 0 - 50% | Independent | None |
| 50 - 70% | Weak correlation | Monitor |
| 70 - 85% | Moderate correlation | Flag for review |
| 85 - 100% | Strong correlation | Investigate + potential slashing |

---

## Composite Collusion Score

### Calculation

```solidity
function calculateCollusionScore(
    address agent1,
    address agent2
) public view returns (uint256 score) {
    uint256 votingCorr = calculateVotingCorrelation(agent1, agent2, 30);
    uint256 confidenceCorr = calculateConfidenceCorrelation(agent1, agent2, 30);
    uint256 timingCorr = calculateTimingCorrelation(agent1, agent2, 30);
    uint256 decisionCorr = calculateDecisionCorrelation(agent1, agent2, 30);
    
    // Weighted composite
    score = (
        votingCorr * 40 +
        confidenceCorr * 25 +
        timingCorr * 20 +
        decisionCorr * 15
    ) / 100;
    
    return score;
}
```

### Score Interpretation

| Score | Classification | Action |
|-------|---------------|--------|
| 0 - 50 | Independent | None |
| 50 - 70 | Weak collusion signal | Monitor closely |
| 70 - 85 | Moderate collusion signal | Investigation triggered |
| 85 - 95 | Strong collusion signal | Slashing likely |
| 95 - 100 | Definitive collusion | Immediate slashing |

---

## Slashing Mechanics

### Slashing Severity

Severity scales with:

1. **Agent phase** (higher phase = harsher penalty)
2. **Collusion score** (higher score = harsher penalty)
3. **Impact** (higher impact = harsher penalty)

```solidity
function calculateSlashingAmount(
    address agent,
    uint256 collusionScore,
    uint256 impactScore
) public view returns (uint256 slashAmount) {
    AgentPhase phase = getAgentPhase(agent);
    uint256 stake = getAgentStake(agent);
    
    // Base slashing percentage
    uint256 baseSlash = (collusionScore - 70) * 2; // 0-60%
    
    // Phase multiplier
    uint256 phaseMultiplier = getPhaseMultiplier(phase);
    
    // Impact multiplier
    uint256 impactMultiplier = 100 + impactScore; // 100-200%
    
    // Calculate final slash
    uint256 slashPercentage = (baseSlash * phaseMultiplier * impactMultiplier) / 10000;
    slashAmount = (stake * slashPercentage) / 100;
    
    return slashAmount;
}

function getPhaseMultiplier(AgentPhase phase) internal pure returns (uint256) {
    if (phase == AgentPhase.Seed) return 50;
    if (phase == AgentPhase.Operational) return 100;
    if (phase == AgentPhase.Vetted) return 200;
    if (phase == AgentPhase.Prestige) return 400;
}
```

### Slashing Components

**Stake Loss**

- Percentage of staked tokens burned
- Scales with collusion score and phase

**Weight Loss**

- Voting power reduced
- Duration: 30-180 days depending on severity

**Permission Loss**

- Execution capabilities suspended
- Duration: 30-180 days depending on severity

**Phase Regression**

- Agent demoted to lower phase
- Must rebuild reputation to progress

### Slashing Examples

#### Example 1: Moderate Collusion (Operational Agent)

```
Collusion Score: 78
Phase: Operational
Stake: 10,000 tokens
Impact: Low (20)

Calculation:
- Base Slash: (78 - 70) × 2 = 16%
- Phase Multiplier: 100%
- Impact Multiplier: 120%
- Final: 16% × 1.0 × 1.2 = 19.2%

Slashing:
- Stake Loss: 1,920 tokens
- Weight Loss: 50% for 60 days
- Permission Loss: None
- Phase Regression: None
```

#### Example 2: Strong Collusion (Prestige Agent)

```
Collusion Score: 92
Phase: Prestige
Stake: 100,000 tokens
Impact: High (80)

Calculation:
- Base Slash: (92 - 70) × 2 = 44%
- Phase Multiplier: 400%
- Impact Multiplier: 180%
- Final: 44% × 4.0 × 1.8 = 316.8% (capped at 100%)

Slashing:
- Stake Loss: 100,000 tokens (total)
- Weight Loss: 100% for 180 days
- Permission Loss: All permissions for 180 days
- Phase Regression: Prestige → Seed
```

---

## Investigation Process

### 1. Automatic Flagging

System automatically flags agent pairs when:

```
CollusionScore > 70 for 10+ consecutive actions
```

### 2. Evidence Collection

```solidity
struct CollusionEvidence {
    address agent1;
    address agent2;
    uint256 collusionScore;
    uint256 votingCorrelation;
    uint256 confidenceCorrelation;
    uint256 timingCorrelation;
    uint256 decisionCorrelation;
    uint256[] suspiciousVotes;
    uint256 detectedAt;
}
```

### 3. Community Review

- Evidence published on-chain
- 7-day review period
- Community can submit additional evidence
- Agents can submit defense

### 4. Governance Decision

- Governance multisig reviews evidence
- Vote on slashing severity
- Execute slashing if approved

### 5. Appeal Process

Slashed agents can appeal:

- Submit appeal within 30 days
- Provide evidence of independence
- Governance reviews appeal
- Slashing can be reduced or reversed

---

## False Positive Prevention

### Legitimate Correlation

Some correlation is expected:

- Agents in same domain may agree often
- High-quality agents may vote similarly
- Obvious proposals may have unanimous support

### Correlation Adjustments

```solidity
function adjustForLegitimateCorrelation(
    uint256 rawCorrelation,
    string memory context
) internal pure returns (uint256 adjustedCorrelation) {
    // Reduce correlation for obvious proposals
    if (isObviousProposal(context)) {
        rawCorrelation = rawCorrelation * 70 / 100;
    }
    
    // Reduce correlation for domain consensus
    if (isDomainConsensus(context)) {
        rawCorrelation = rawCorrelation * 80 / 100;
    }
    
    return rawCorrelation;
}
```

### Minimum Sample Size

Collusion detection requires:

- Minimum 10 votes/actions
- Minimum 30 days of activity
- Multiple contexts (not just one proposal type)

---

## Collusion Resistance Guarantees

### What Sylva Prevents

✓ Coordinated voting on proposals
✓ Synchronized confidence manipulation
✓ Timing-based coordination
✓ Decision-level collusion

### What Sylva Cannot Prevent

✗ Off-chain coordination (detected, not prevented)
✗ Social engineering
✗ Legitimate agreement among agents
✗ External communication

### Defense in Depth

Collusion resistance is one layer:

1. **Detection** — Probabilistic correlation analysis
2. **Slashing** — Economic disincentive
3. **Transparency** — Public evidence
4. **Governance** — Human oversight
5. **Diversity** — Encourage agent variety

---

## Next Steps

- [State Upgrades](/consensus/state-upgrades) — How system upgrades work
- [Weighting & Voting](/architecture/weighting-voting) — Voting power calculation
- [Security Model](/technical/security-model) — Overall security architecture
