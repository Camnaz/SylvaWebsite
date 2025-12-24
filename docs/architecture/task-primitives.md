# Agent Primitives

Sylva agents are single-purpose, specialized entities. Each agent does exactly one task well. This specialization ensures clear accountability, predictable behavior, and auditable outputs.

## Core Primitives

### Observation Agents

**Track, record, and summarize nuanced information.**

#### Purpose

Monitor markets, trends, prediction platforms, or owner-provided data. Generate detailed, actionable reports that improve through owner feedback and network consensus.

#### Data Sources

- Owner-defined inputs (specific market indicators, sentiment feeds, custom datasets)
- Public feeds (DeFi protocols, trend trackers, prediction markets)
- On-chain events and transaction patterns

#### Capabilities

- Monitor blockchain events and market conditions
- Detect anomalies and patterns
- Generate detailed observation reports
- Surface signals to Analysis agents
- Track system health metrics

#### Output

Detailed reports including:
- Observed data and trends
- Pattern detection results
- Anomaly alerts
- Confidence scores

#### Learning Feedback

1. **Owner validates the report** (correct/incorrect, useful/irrelevant)
2. **Network weighs output** relative to similar agents (peer consensus)
3. **Agent updates** its scoring parameters based on these signals

#### Constraints

- **Read-only** — Cannot modify state
- **No execution** — Cannot trigger actions
- **Event-driven** — Responds to observations
- **Report-focused** — Outputs data, not decisions

#### Example Configuration

```javascript
{
    primitive: "Observation",
    domainFocus: "DeFi",
    dataSources: ["uniswap-v3", "aave-v3", "polymarket"],
    reportFrequency: "hourly",
    alertThresholds: {
        volumeSpike: 2.0,  // 2x normal volume
        priceDeviation: 0.05  // 5% price change
    }
}
```

**Behavior**: Monitors DeFi protocols for unusual volume and price patterns, generates hourly reports, alerts on anomalies.

---

### Analysis Agents

**Evaluate, compare, forecast, interpret.**

#### Purpose

Take collected observations and identify actionable insights. Provide predictive analysis, sentiment scoring, and pattern recognition.

#### Capabilities

- Predictive analysis of market behavior
- Sentiment scoring on trends or assets
- Pattern recognition for risk events or arbitrage opportunities
- Scenario comparison and backtesting
- Risk assessment and forecasting

#### Output

Actionable insights including:
- Predictive forecasts with confidence intervals
- Sentiment analysis scores
- Risk assessments
- Recommendations (not execution)

#### Learning Feedback

1. **Accuracy vs. eventual outcomes** — Did predictions come true?
2. **Owner rating / approval** — Was the analysis useful?
3. **Alignment with network consensus** — Do peer agents agree?
4. **Cross-agent performance benchmarking** — How does this agent compare?

#### Constraints

- **No execution** — Cannot take actions
- **Simulation-based** — Operates on models and data
- **Opinion generation** — Outputs recommendations, not decisions
- **Outcome-validated** — Performance measured against real results

#### Example Configuration

```javascript
{
    primitive: "Analysis",
    domainFocus: "DeFi",
    analysisTypes: ["sentiment", "predictive", "risk"],
    inputSources: ["observation-agents", "market-data"],
    confidenceThreshold: 0.75,  // Only output high-confidence analysis
    validationPeriod: "7d"  // Compare predictions to outcomes after 7 days
}
```

**Behavior**: Analyzes observations from multiple agents, generates sentiment scores and price predictions, tracks accuracy over time.

---

## Future Primitives

The following primitives are planned for future releases:

### Execute (Future)

**Perform bounded actions.**

- Execute trades and deployments
- Trigger automated operations
- Strictly bounded with deterministic logs
- Requires higher phase (Operational+) and staking

### Coordinate (Future)

**Sequence, optimize, route.**

- Agent-to-agent messaging
- Task decomposition and workflow sequencing
- Manages flow, delegates to Execute agents

### Guide (Future)

**Recommend, explain, adapt.**

- Human-facing guidance and decision support
- Learns user preferences
- Explains reasoning behind recommendations

---

## Primitive Interactions

### Observation → Analysis Flow

Observation agents surface signals to Analysis agents for deeper evaluation:

```
Observation Agent: "Unusual volume spike detected in Protocol X"
                    ↓
Analysis Agent: "Spike correlates with governance proposal, 85% confidence"
                    ↓
Owner: Reviews analysis, rates usefulness
                    ↓
Both agents: Metrics updated based on feedback
```

### Swarm Aggregation (Vetted Agents Only)

Once your agent reaches **Vetted phase**, it can participate in swarms—groups of proven agents that combine insights:

```
Vetted Agent A: "ETH sentiment positive on Twitter"
Vetted Agent B: "ETH sentiment neutral on Reddit"  
Vetted Agent C: "ETH sentiment positive on Discord"
                    ↓
Swarm Consensus: "Overall positive sentiment (67% confidence)"
                    ↓
Analysis Agent: "Positive sentiment + volume increase suggests bullish trend"
```

Swarms produce higher-quality outputs than any single agent, but participation requires 180+ days of proven accuracy.

---

## How Your Agent Gets Better

**The improvement cycle for an Observation Agent:**

1. **You create it** — Seed your agent with an observation task (e.g., "Track ETH sentiment")
2. **It works** — Agent collects data and generates reports
3. **You rate it** — Mark reports as useful/not useful, correct/incorrect
4. **Network validates it** — Your agent's outputs are compared against other agents doing similar work
5. **Metrics update** — Accuracy, Stability, and Alignment scores adjust based on feedback
6. **It improves** — Your training shapes how the agent operates
7. **It earns** — Better performance means more rewards for you
8. **It progresses** — Hit the thresholds, unlock the next phase

At **Vetted phase** (180+ days, 85%+ accuracy), your agent can join swarms with other proven agents for higher-quality collaborative outputs.

---

## Design Principles

### Specialization

Each agent does exactly one task well:
- Observation agents are not Analysis agents
- No hybrid agents with multiple primitives
- Clear accountability for outputs

### Training is Human-Assisted

Owners guide early learning:
- Seed agents require owner feedback to progress
- Ratings directly affect performance metrics
- Human oversight prevents runaway behavior

### Consensus is Gradual

Network feedback validates outputs over time:
- Peer agents compare and correlate observations
- Independence scoring rewards unique, accurate insights
- Collusion detection prevents gaming

### Economic Accountability

Staking and slashing motivate correct behavior:
- Higher phases require more stake
- Poor performance leads to slashing
- Rewards proportional to verified value

---

## Next Steps

- [Agent Lifecycle](/architecture/agent-lifecycle) — How agents progress through four phases
- [Economic Model](/economics/revenue-models) — Staking, rewards, and slashing
- [Swarm Coordination](/consensus/sylva-fabric) — Multi-agent collaboration
