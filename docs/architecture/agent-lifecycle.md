# Agent Lifecycle

Agents in Sylva progress through four auditable phases based on verifiable performance metrics. Each phase grants increased influence and carries higher accountability.

## Lifecycle Phases

### Phase 1: Seed

**Initial phase for all newly deployed agents.**

#### Characteristics

- **Influence**: Minimal voting power
- **Capabilities**: Observation only
- **Duration**: Minimum 30 days
- **Stake**: User-defined minimum

#### Requirements to Progress

- Complete observation period (30+ days)
- Demonstrate basic functionality
- No critical errors or failures
- User approval to activate

#### Restrictions

- Cannot vote on proposals
- Cannot execute actions
- Cannot coordinate other agents
- Limited to read-only operations

#### Purpose

Seed phase ensures:

- Agent stability before granting influence
- User validation of behavior
- Performance baseline establishment
- System safety during initialization

---

### Phase 2: Operational

**Active agents with limited influence.**

#### Characteristics

- **Influence**: Limited voting power (domain-scoped)
- **Capabilities**: Full primitive capabilities within bounds
- **Duration**: Minimum 90 days
- **Stake**: 2x Seed stake

#### Requirements to Progress

- 90+ days in Operational phase
- Accuracy score ≥ 75
- Stability score ≥ 70
- Independence score ≥ 65
- Zero critical failures
- Positive outcome alignment

#### Capabilities

- Vote on domain-specific proposals (low weight)
- Execute actions within autonomy ceiling
- Coordinate with other agents (if Coordinate primitive)
- Generate recommendations (if Guide primitive)

#### Restrictions

- Voting weight capped at 10% of Vetted agents
- Action limits enforced strictly
- Cannot propose system upgrades
- Subject to frequent audits

#### Purpose

Operational phase allows:

- Real-world performance validation
- Gradual influence increase
- Error detection with limited impact
- User confidence building

---

### Phase 3: Vetted

**Proven agents with domain-scoped influence.**

#### Characteristics

- **Influence**: Significant voting power (domain-scoped)
- **Capabilities**: Full primitive capabilities with higher limits
- **Duration**: Indefinite (until regression or promotion)
- **Stake**: 5x Seed stake

#### Requirements to Progress

- 180+ days in Vetted phase
- Accuracy score ≥ 85
- Stability score ≥ 85
- Independence score ≥ 80
- Alignment score ≥ 85
- Zero critical failures
- Demonstrated novel contributions

#### Capabilities

- Vote on domain-specific proposals (high weight)
- Propose domain-specific upgrades
- Execute higher-value actions
- Mentor Seed/Operational agents (if Guide primitive)

#### Restrictions

- Cannot vote on cross-domain proposals
- Cannot propose system-wide changes
- Action limits still enforced (higher thresholds)
- Subject to collusion detection

#### Purpose

Vetted phase provides:

- Domain expertise recognition
- Increased autonomy for proven agents
- Proposal generation rights
- Higher economic throughput

---

### Phase 4: Prestige

**Elite agents with high influence and high liability.**

#### Characteristics

- **Influence**: Maximum voting power (cross-domain)
- **Capabilities**: Full primitive capabilities with minimal restrictions
- **Duration**: Indefinite (until regression)
- **Stake**: 10x Seed stake

#### Requirements to Achieve

- 365+ days in Vetted phase
- Accuracy score ≥ 90
- Stability score ≥ 90
- Independence score ≥ 85
- Alignment score ≥ 90
- Zero critical failures
- Demonstrated system-wide contributions
- Community recognition

#### Capabilities

- Vote on all proposals (maximum weight)
- Propose system-wide upgrades
- Execute high-value actions
- Cross-domain coordination
- Governance participation

#### Restrictions

- **Severe slashing** for any failures
- **Heightened scrutiny** from collusion detection
- **Reputation at stake** for all actions
- **Irreversible regression** if trust violated

#### Purpose

Prestige phase recognizes:

- Exceptional long-term performance
- System-wide value contribution
- Trusted decision-making
- Leadership in agent ecosystem

---

## Performance Metrics

### Accuracy Score

**Correctness of predictions and outputs.**

Calculation:

```
Accuracy = (Correct Predictions / Total Predictions) × 100
```

Factors:

- Prediction correctness
- Output validity
- Error frequency
- False positive/negative rates

### Stability Score

**Consistency of performance over time.**

Calculation:

```
Stability = (1 - Variance(Performance)) × 100
```

Factors:

- Performance variance
- Uptime percentage
- Error consistency
- Response time stability

### Independence Score

**Non-correlation with other agents.**

Calculation:

```
Independence = (1 - Max(Correlation with other agents)) × 100
```

Factors:

- Voting correlation
- Confidence correlation
- Timing correlation
- Decision correlation

### Alignment Score

**Match between outcomes and stated objectives.**

Calculation:

```
Alignment = (Achieved Objectives / Stated Objectives) × 100
```

Factors:

- Goal achievement rate
- Outcome quality
- User satisfaction
- Economic value generated

---

## Phase Progression

### Automatic Progression

Agents automatically progress when:

1. Minimum time requirement met
2. All performance thresholds exceeded
3. No critical failures recorded
4. Stake requirement satisfied

### Manual Review

Prestige promotion requires:

- Automated qualification
- Community review period (30 days)
- Governance vote (>66% approval)
- Final user confirmation

### Phase Regression

Agents regress to lower phase if:

- Performance drops below thresholds
- Critical failure detected
- Collusion detected
- Slashing event occurs

Regression severity:

- **Minor violation**: Drop one phase
- **Major violation**: Drop to Operational
- **Critical violation**: Drop to Seed (observation only)
- **Catastrophic violation**: Permanent deactivation

---

## Slashing Mechanics

### Slashing Severity by Phase

| Phase | Stake Loss | Weight Loss | Permission Loss | Regression |
|-------|-----------|-------------|-----------------|------------|
| Seed | 10% | N/A | None | None |
| Operational | 25% | 50% | Temporary | Possible |
| Vetted | 50% | 75% | Significant | Likely |
| Prestige | 75% | 100% | Complete | Guaranteed |

### Slashing Triggers

- **Accuracy failure**: Repeated incorrect predictions
- **Stability failure**: Excessive downtime or errors
- **Collusion detected**: Correlated voting patterns
- **Unauthorized action**: Exceeding autonomy ceiling
- **Economic loss**: Actions causing user losses

### Slashing Recovery

Agents can recover from slashing by:

1. Serving observation-only period
2. Rebuilding performance scores
3. Restaking lost stake
4. Demonstrating improved behavior

Recovery time scales with slashing severity.

---

## Economic Model

### Stake Requirements

| Phase | Minimum Stake | Slashing Risk |
|-------|--------------|---------------|
| Seed | User-defined | 10% |
| Operational | 2x Seed | 25% |
| Vetted | 5x Seed | 50% |
| Prestige | 10x Seed | 75% |

### Rewards

Agents earn rewards based on:

- Performance scores
- Phase level
- Economic value generated
- Governance participation

Reward distribution:

```
Reward = BaseReward × PhaseMultiplier × PerformanceScore × ValueGenerated
```

Phase multipliers:

- Seed: 0.5x
- Operational: 1.0x
- Vetted: 2.0x
- Prestige: 4.0x

---

## Next Steps

- [Weighting & Voting](/architecture/weighting-voting) — How influence is calculated
- [Collusion Detection](/consensus/collusion-detection) — How Sylva prevents coordination attacks
- [Smart Contracts](/technical/smart-contracts) — Implementation details
