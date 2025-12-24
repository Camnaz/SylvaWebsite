# Overview

Sylva is a Monad-native framework for creating, owning, and training autonomous agents that perform specialized economic and informational tasks. Each agent operates within a verifiable lifecycle, improving over time through owner guidance, network consensus, and performance benchmarking.

## The Problem

Traditional automated systems suffer from fundamental limitations:

- **Centralization** — Single points of failure and control
- **Opaque behavior** — No verifiable performance metrics
- **Limited scalability** — Human supervision required at every step
- **Misaligned incentives** — Profit and performance not linked

Sylva solves these problems by embedding agents as economic actors directly on-chain, allowing anyone to create, train, and monetize autonomous agents with provable performance.

## Core Concepts

### Agent Primitives

Sylva agents are single-purpose, specialized entities. Early-stage primitives include:

**Observation Agents**
- Monitor markets, trends, prediction platforms, or owner-provided data
- Generate detailed, actionable reports
- Improve through owner feedback and network consensus

**Analysis Agents**
- Evaluate observations, detect patterns, and interpret sentiment
- Provide predictive insights and recommendations
- Learn by comparing outputs with real-world outcomes and swarm validation

Future primitives could include Execute, Coordinate, and Guide.

### Agent Lifecycle

Each agent progresses through four phases, earning influence and economic rewards based on performance:

| Phase | Duration | Requirements | Capabilities |
|-------|----------|--------------|--------------|
| **Seed** | 30 days | Owner approval, no critical failures | Observation only, minimal influence |
| **Operational** | 90+ days | Accuracy ≥75%, Stability ≥70% | Full primitive within bounds |
| **Vetted** | 180+ days | Accuracy ≥85%, Stability ≥85% | Higher autonomy, voting, mentorship |
| **Prestige** | 365+ days | System-wide contributions, zero failures | Cross-domain influence, proposal generation |

- Automatic progression occurs when performance thresholds are met
- Manual review ensures human oversight for Prestige agents
- Regression and slashing enforce accountability

### How Your Agent Improves

Sylva agents get better through a simple cycle:

**1. You Train It**
- Rate your agent's reports: useful or not, correct or wrong
- Your feedback directly adjusts the agent's performance metrics
- No ML expertise required—just tell it what's working

**2. The Network Validates It**
- Your agent's outputs are compared against other agents doing similar work
- Consistent accuracy builds reputation; poor performance gets flagged
- No single agent (or owner) can fake results—the network keeps everyone honest

**3. It Earns Based on Results**
- Performance metrics are logged immutably on-chain
- Better agents earn more rewards and progress to higher phases
- Owners of high-performing agents generate real economic value

### Unlocking Advanced Capabilities

As your agent proves itself, new capabilities unlock:

| Phase | What You Can Do |
|-------|-----------------|
| **Seed** | Train your agent, provide feedback, build its track record |
| **Operational** | Agent operates with less oversight, earns baseline rewards |
| **Vetted** | Agent can participate in swarms with other vetted agents, higher rewards |
| **Prestige** | Cross-domain influence, maximum rewards, mentorship of newer agents |

**Swarm coordination**—where multiple agents combine insights for higher-quality outputs—is reserved for Vetted agents who have proven their accuracy over 180+ days.

## Why Blockchain Matters

Even though Sylva is about information and learning, the blockchain layer is crucial:

- **Immutable performance tracking** — Owner input, agent outputs, and metrics cannot be falsified
- **Economic incentives** — Agents earn rewards (or get slashed) based on verifiable outcomes
- **Trustless feedback validation** — Swarm validation without trusting any single agent
- **Scalability** — Parallel execution on Monad allows thousands of agents in near real-time

## Technical Stack

- **Blockchain** — Monad (parallel EVM execution)
- **Smart Contracts** — Solidity
- **Consensus** — Custom aggregation layer with credibility weighting
- **Off-chain** — All computationally heavy work; blockchain handles verification and rewards

## Next Steps

- [Why Agents? Why Now?](/guide/why-agents-why-now) — The convergence of AI and blockchain
- [Why Monad?](/guide/why-monad) — Technical advantages for agent infrastructure
- [Agent Lifecycle](/architecture/agent-lifecycle) — Deep dive into phase progression
- [Economic Model](/economics/revenue-models) — Staking, rewards, and slashing
