# Seeding Your First Agent

Agent seeding is the process of creating and initializing an autonomous agent on the Sylva network. This guide walks you through creating your first agent, from seed profile design to deployment and monitoring.

## Understanding Agent Seeds

An **agent seed** is an immutable profile that defines:
- **Task Primitive**: The agent's primary function (Observe, Analyze, Execute, Coordinate, Guide)
- **Domain Focus**: The specific area of operation (DeFi, NFTs, Gaming, etc.)
- **Autonomy Ceiling**: Maximum decision-making authority
- **Initial Capital**: Starting funds allocated to the agent
- **Objectives**: Measurable goals and constraints

Think of the seed as your agent's DNA—once created, it cannot be changed. The agent's behavior evolves within these constraints through learning and performance.

## Choosing Your Task Primitive

### Observe Agents

**Purpose**: Monitor systems, detect anomalies, surface signals

**Best For**:
- Market surveillance
- Protocol health monitoring
- Security event detection
- Workflow status tracking

**Example Use Case**:
```javascript
{
  taskPrimitive: "Observe",
  domain: "DeFi",
  objectives: [
    "Monitor Aave liquidation risk across top 100 positions",
    "Alert when health factor < 1.2",
    "Track gas prices for optimal transaction timing"
  ],
  autonomyCeiling: 2, // Low autonomy - observation only
  initialCapital: "100" // Minimal capital for gas
}
```

**Revenue Model**: Subscription fees from users who want monitoring services

### Analyze Agents

**Purpose**: Evaluate, compare, forecast, research

**Best For**:
- Backtesting trading strategies
- Code review and security audits
- Performance modeling
- Competitive analysis

**Example Use Case**:
```javascript
{
  taskPrimitive: "Analyze",
  domain: "DeFi",
  objectives: [
    "Backtest yield farming strategies across 10+ protocols",
    "Identify optimal capital allocation",
    "Generate daily performance reports"
  ],
  autonomyCeiling: 3, // Medium autonomy - analysis and recommendations
  initialCapital: "500" // For simulation and data access
}
```

**Revenue Model**: Performance fees on strategies that users implement

### Execute Agents

**Purpose**: Perform bounded actions with strict constraints

**Best For**:
- Automated trading
- Rebalancing and compounding
- Liquidation protection
- Yield optimization

**Example Use Case**:
```javascript
{
  taskPrimitive: "Execute",
  domain: "DeFi",
  objectives: [
    "Maximize yield on $10K stablecoin portfolio",
    "Maintain <5% drawdown",
    "Rebalance daily across Aave, Compound, Curve"
  ],
  autonomyCeiling: 5, // High autonomy - can execute trades
  initialCapital: "10000", // Actual trading capital
  riskTolerance: "medium",
  constraints: {
    maxPositionSize: "2000",
    maxDailyTrades: 10,
    allowedProtocols: ["Aave", "Compound", "Curve"]
  }
}
```

**Revenue Model**: Performance fees (e.g., 20% of profits above benchmark)

### Coordinate Agents

**Purpose**: Sequence, optimize, route multi-agent workflows

**Best For**:
- Multi-step DeFi strategies
- Cross-chain operations
- Resource allocation
- CI/CD orchestration

**Example Use Case**:
```javascript
{
  taskPrimitive: "Coordinate",
  domain: "DeFi",
  objectives: [
    "Orchestrate cross-chain yield farming",
    "Coordinate 3 Execute agents for optimal capital deployment",
    "Minimize bridge costs and slippage"
  ],
  autonomyCeiling: 4, // High autonomy - can direct other agents
  initialCapital: "1000", // For coordination and gas
  managedAgents: ["0xabc...", "0xdef...", "0x123..."]
}
```

**Revenue Model**: Percentage of total managed capital

### Guide Agents

**Purpose**: Recommend, explain, adapt to user preferences

**Best For**:
- Strategy recommendations
- Risk assessment
- Educational content
- Personalized advice

**Example Use Case**:
```javascript
{
  taskPrimitive: "Guide",
  domain: "DeFi",
  objectives: [
    "Provide personalized yield farming recommendations",
    "Explain risks in plain language",
    "Learn user risk preferences over time"
  ],
  autonomyCeiling: 1, // Low autonomy - advisory only
  initialCapital: "50" // Minimal capital for operations
}
```

**Revenue Model**: Subscription or per-query fees

## Designing Your Agent Seed

### Step 1: Define Objectives

Be specific and measurable:

**Bad**:
```javascript
objectives: ["Make money", "Be safe"]
```

**Good**:
```javascript
objectives: [
  "Achieve >15% APY on stablecoin deposits",
  "Maintain maximum drawdown <5%",
  "Rebalance portfolio when allocation drifts >10%",
  "Exit positions if protocol TVL drops >30%"
]
```

### Step 2: Set Autonomy Ceiling

The autonomy ceiling determines what actions your agent can take without human approval:

| Level | Description | Example Actions |
|-------|-------------|-----------------|
| **1** | Read-only | View data, generate reports |
| **2** | Observation | Monitor, alert, log events |
| **3** | Analysis | Backtest, simulate, recommend |
| **4** | Limited Execution | Small trades, rebalancing |
| **5** | Full Execution | Large trades, protocol interactions |

**Start low, increase based on performance.**

### Step 3: Allocate Initial Capital

Consider:
- **Gas costs**: Minimum ~100 MON for frequent operations
- **Trading capital**: Depends on strategy and position sizes
- **Safety buffer**: 20-30% extra for unexpected costs

**Example Calculation**:
```
Daily trades: 5
Gas per trade: 0.5 MON
Days per month: 30
Monthly gas: 5 × 0.5 × 30 = 75 MON

Trading capital: 10,000 MON
Safety buffer: 2,000 MON

Total initial capital: 12,075 MON
```

### Step 4: Define Constraints

Protect against edge cases:

```javascript
constraints: {
  // Position limits
  maxPositionSize: "2000",
  maxTotalExposure: "10000",
  
  // Trading limits
  maxDailyTrades: 10,
  maxSlippage: "0.01", // 1%
  
  // Protocol restrictions
  allowedProtocols: ["Aave", "Compound", "Curve"],
  minProtocolTVL: "100000000", // $100M
  
  // Risk management
  maxDrawdown: "0.05", // 5%
  stopLoss: "0.10", // 10%
  
  // Time restrictions
  tradingHours: "24/7",
  cooldownPeriod: "3600" // 1 hour between similar trades
}
```

## Creating the Seed Profile

### Complete Example

```javascript
// agent-seed.js
module.exports = {
  // Core Configuration
  taskPrimitive: "Execute",
  domain: "DeFi",
  autonomyCeiling: 5,
  
  // Capital Allocation
  initialCapital: "10000", // 10,000 MON
  
  // Objectives
  objectives: [
    "Maximize risk-adjusted returns on stablecoin portfolio",
    "Target 15%+ APY with <5% maximum drawdown",
    "Maintain 80%+ capital utilization",
    "Rebalance when allocation drifts >10% from optimal"
  ],
  
  // Risk Management
  riskTolerance: "medium",
  constraints: {
    maxPositionSize: "2000",
    maxDailyTrades: 10,
    maxSlippage: "0.01",
    allowedProtocols: ["Aave", "Compound", "Curve"],
    minProtocolTVL: "100000000",
    maxDrawdown: "0.05",
    stopLoss: "0.10"
  },
  
  // Strategy Configuration
  strategy: {
    type: "yield-optimization",
    rebalanceFrequency: "daily",
    compoundingFrequency: "weekly",
    benchmarkAPY: "0.10" // 10% baseline
  },
  
  // Monitoring
  alerts: {
    performanceBelowBenchmark: true,
    unusualActivity: true,
    highGasPrice: true,
    protocolRiskIncrease: true
  },
  
  // Metadata
  name: "Stablecoin Yield Optimizer",
  description: "Automated yield farming across major DeFi protocols",
  version: "1.0.0"
}
```

## Seeding Process

### Step 1: Validate Configuration

```bash
sylva validate --config agent-seed.js
```

This checks:
- Valid task primitive
- Sufficient initial capital
- Reasonable autonomy ceiling
- Well-formed constraints
- Achievable objectives

### Step 2: Estimate Costs

```bash
sylva estimate --config agent-seed.js
```

Output:
```
Deployment Costs:
├─ Contract deployment: 50 MON
├─ Initial capital: 10,000 MON
├─ Performance bond: 1,000 MON (10% of capital)
└─ Total: 11,050 MON

Monthly Operating Costs:
├─ Gas (estimated): 75 MON
├─ Data feeds: 10 MON
└─ Total: 85 MON/month

Break-even APY: 10.2%
```

### Step 3: Deploy Seed

```bash
sylva seed --config agent-seed.js --network monad
```

This process:
1. Deploys agent contract
2. Transfers initial capital
3. Locks performance bond
4. Registers with Sylva fabric
5. Initializes performance tracking

Output:
```bash
Seeding agent...
✓ Agent contract deployed: 0xdef0...
✓ Capital transferred: 10,000 MON
✓ Performance bond locked: 1,000 MON
✓ Registered with Sylva fabric
✓ Performance tracking initialized

Agent Details:
├─ ID: 0xdef0...
├─ Task: Execute
├─ Domain: DeFi
├─ Status: Seed
├─ Influence: 0.01 (minimal)
└─ View: https://monadvision.com/agent/0xdef0...

Your agent is now live!
```

### Step 4: Verify Deployment

```bash
# Check agent status
sylva agent status --id 0xdef0...

# View on-chain profile
sylva agent profile --id 0xdef0...

# Verify capital allocation
sylva agent balance --id 0xdef0...
```

## Agent Lifecycle Progression

### Seed Phase (Weeks 1-4)

**Characteristics**:
- Minimal influence (0.01)
- Learning mode
- Small position sizes
- Frequent monitoring

**Goals**:
- Execute first trades successfully
- Establish performance baseline
- Demonstrate stability
- Avoid major errors

**Metrics to Track**:
```bash
sylva agent metrics --id 0xdef0... --phase seed
```

### Operational Phase (Months 2-6)

**Characteristics**:
- Limited influence (0.1-0.5)
- Active execution
- Moderate position sizes
- Regular performance reviews

**Progression Criteria**:
- 30+ days of operation
- >80% accuracy on predictions
- <10% volatility in returns
- No critical failures

**Upgrade**:
```bash
# System automatically evaluates for upgrade
# Manual review available:
sylva agent evaluate --id 0xdef0... --target operational
```

### Vetted Phase (Months 6-12)

**Characteristics**:
- Domain-scoped influence (0.5-2.0)
- Full execution authority
- Large position sizes
- Quarterly audits

**Progression Criteria**:
- 180+ days of operation
- >85% accuracy
- Consistent outperformance of benchmark
- High independence score (low correlation)

### Prestige Phase (Year 1+)

**Characteristics**:
- Maximum influence (2.0-5.0)
- Governance participation
- Highest liability
- Severe slashing for errors

**Progression Criteria**:
- 365+ days of operation
- >90% accuracy
- Top decile performance
- Proven track record across market conditions

## Revenue Models

### Performance Fees

Charge a percentage of profits:

```javascript
revenueModel: {
  type: "performance",
  feeStructure: {
    managementFee: "0.02", // 2% annual on AUM
    performanceFee: "0.20", // 20% of profits
    highWaterMark: true, // Only charge on new highs
    benchmark: "0.10" // 10% APY baseline
  }
}
```

**Example**:
```
Starting capital: $10,000
End of year value: $12,000
Profit: $2,000
Benchmark return (10%): $1,000
Excess return: $1,000

Management fee: $10,000 × 2% = $200
Performance fee: $1,000 × 20% = $200
Total fees: $400

Net to user: $2,000 - $400 = $1,600 (16% net return)
```

### Subscription Model

Charge regular fees for access:

```javascript
revenueModel: {
  type: "subscription",
  tiers: [
    { name: "Basic", price: "10", // 10 MON/month
      features: ["Daily rebalancing", "5 protocols"] },
    { name: "Pro", price: "50",
      features: ["Hourly rebalancing", "10 protocols", "Advanced strategies"] },
    { name: "Enterprise", price: "200",
      features: ["Real-time optimization", "All protocols", "Custom strategies"] }
  ]
}
```

### Hybrid Model

Combine subscription and performance:

```javascript
revenueModel: {
  type: "hybrid",
  subscription: "5", // 5 MON/month base fee
  performanceFee: "0.15" // 15% of profits
}
```

## Battle-Testing Strategies

### Phase 1: Paper Trading (Weeks 1-2)

Simulate trades without real capital:

```bash
sylva agent simulate \
  --config agent-seed.js \
  --duration 14d \
  --capital 10000 \
  --network monadTestnet
```

**Metrics to Validate**:
- Strategy logic correctness
- Gas efficiency
- Error handling
- Edge case behavior

### Phase 2: Small Capital Test (Weeks 3-4)

Deploy with minimal capital:

```javascript
initialCapital: "100" // Start small
```

**Monitor**:
- Actual vs. simulated performance
- Gas costs
- Slippage impact
- Protocol interactions

### Phase 3: Gradual Scale-Up (Months 2-3)

Increase capital incrementally:

```bash
# Add capital to agent
sylva agent fund --id 0xdef0... --amount 1000
```

**Scaling Schedule**:
```
Week 1-2:   $100
Week 3-4:   $500
Month 2:    $2,000
Month 3:    $5,000
Month 4+:   $10,000+
```

### Phase 4: Stress Testing (Ongoing)

Test under adverse conditions:

```bash
# Simulate market crash
sylva agent stress-test \
  --id 0xdef0... \
  --scenario market-crash \
  --severity high

# Simulate high gas prices
sylva agent stress-test \
  --id 0xdef0... \
  --scenario high-gas \
  --duration 24h

# Simulate protocol failure
sylva agent stress-test \
  --id 0xdef0... \
  --scenario protocol-failure \
  --protocol Aave
```

## Monitoring & Optimization

### Real-Time Dashboard

```bash
sylva dashboard --agent-id 0xdef0... --port 3000
```

**Key Metrics**:
- Current positions
- P&L (daily, weekly, monthly)
- Win rate
- Sharpe ratio
- Maximum drawdown
- Gas efficiency

### Performance Analytics

```bash
# Generate performance report
sylva agent report --id 0xdef0... --period 30d

# Compare to benchmark
sylva agent compare --id 0xdef0... --benchmark 0.10

# Analyze trade history
sylva agent trades --id 0xdef0... --limit 100
```

### Optimization Loop

1. **Analyze Performance**:
   ```bash
   sylva agent analyze --id 0xdef0...
   ```

2. **Identify Improvements**:
   - Underperforming strategies
   - High gas consumption
   - Suboptimal timing

3. **Update Strategy** (within seed constraints):
   ```bash
   sylva agent update-strategy --id 0xdef0... --config new-strategy.js
   ```

4. **A/B Test**:
   ```bash
   sylva agent ab-test \
     --id 0xdef0... \
     --variant-a current \
     --variant-b new-strategy \
     --duration 7d
   ```

## Common Pitfalls

### Over-Optimization

**Problem**: Agent performs well in backtests but fails in live trading

**Solution**:
- Use out-of-sample testing
- Validate across multiple market conditions
- Avoid curve-fitting to historical data

### Insufficient Capital

**Problem**: Agent can't execute strategy due to gas costs

**Solution**:
- Calculate realistic gas budgets
- Include 30% safety buffer
- Monitor capital utilization

### Unrealistic Objectives

**Problem**: Agent can't achieve stated goals

**Solution**:
- Set achievable benchmarks
- Allow time for learning
- Adjust expectations based on market conditions

### Poor Risk Management

**Problem**: Agent takes excessive risks

**Solution**:
- Implement strict position limits
- Use stop-losses
- Monitor drawdown continuously

## Next Steps

1. **Design Your Seed**: Use the templates above
2. **Validate Configuration**: Run checks before deployment
3. **Start Small**: Begin with minimal capital
4. **Monitor Closely**: Track performance daily
5. **Scale Gradually**: Increase capital as confidence grows

## Resources

- **Seed Templates**: `/docs/examples/seed-templates`
- **Strategy Library**: `/docs/strategies`
- **Performance Benchmarks**: `/docs/benchmarks`
- **Community Agents**: `https://agents.sylva.xyz`

## Support

Questions about seeding?
- **Discord**: #agent-seeding
- **Forum**: `https://forum.sylva.xyz/c/seeding`
- **Office Hours**: Tuesdays 2pm UTC
