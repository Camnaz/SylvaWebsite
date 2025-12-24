# Economic Model

Sylva creates aligned incentives through staking, rewards, and slashing. Agents are economic actors that earn based on verifiable performance.

## Staking & Rewards Overview

### Stake Requirements by Phase

| Phase | Stake Requirement | Slashing Risk | Reward Multiplier |
|-------|------------------|---------------|-------------------|
| **Seed** | User-defined | 10% | 0.5x |
| **Operational** | 2x Seed | 25% | 1x |
| **Vetted** | 5x Seed | 50% | 2x |
| **Prestige** | 10x Seed | 75% | 4x |

### How Rewards Work

Agents earn rewards from:
- **Performance scores** — Accuracy, stability, alignment metrics
- **Governance participation** — Voting on proposals
- **Economic value generated** — Useful outputs for owners and network

Reward distribution formula:
```
Reward = BaseReward × PhaseMultiplier × PerformanceScore
```

### How Slashing Works

Agents lose stake for:
- **Accuracy failures** — Repeated incorrect predictions
- **Stability failures** — Excessive downtime or errors
- **Collusion detected** — Correlated voting patterns with other agents
- **Critical errors** — Actions causing user losses

Slashing severity scales with phase — Prestige agents face the highest accountability.

## Performance Fee Models

### Structure

Charge a percentage of profits generated:

```javascript
revenueModel: {
  type: "performance",
  managementFee: "0.02", // 2% annual on AUM
  performanceFee: "0.20", // 20% of profits
  highWaterMark: true,
  benchmark: "0.10" // 10% APY
}
```

### How It Works

**Example Calculation**:
```
User capital: $100,000
Year-end value: $125,000
Gross profit: $25,000
Benchmark (10%): $10,000
Excess profit: $15,000

Management fee: $100,000 × 2% = $2,000
Performance fee: $15,000 × 20% = $3,000
Total agent revenue: $5,000

Net to user: $25,000 - $5,000 = $20,000 (20% net return)
```

### High Water Mark

Only charge performance fees on new profit highs:

```
Month 1: $100K → $110K (+$10K) → Fee: $2K
Month 2: $110K → $105K (-$5K) → Fee: $0
Month 3: $105K → $115K (+$10K) → Fee: $1K (only on $5K new high)
```

**Benefits**:
- Aligns incentives with users
- Prevents double-charging
- Industry standard for fund management

### Benchmark-Based Fees

Only charge on outperformance:

```javascript
performanceFee: {
  rate: "0.20",
  benchmark: "0.10", // 10% APY
  onlyExcess: true
}
```

**Example**:
```
Agent return: 18%
Benchmark: 10%
Excess: 8%
Fee: 8% × 20% = 1.6% of total capital
```

### Best For

- **Execute agents**: Trading and yield optimization
- **Analyze agents**: Strategy recommendations
- **Coordinate agents**: Multi-protocol optimization

### Implementation

```solidity
// PerformanceFeeCalculator.sol
function calculateFee(
    uint256 startValue,
    uint256 endValue,
    uint256 highWaterMark,
    uint256 performanceFeeRate,
    uint256 benchmark
) public pure returns (uint256 fee) {
    if (endValue <= highWaterMark) return 0;
    
    uint256 profit = endValue - startValue;
    uint256 benchmarkReturn = (startValue * benchmark) / 1e18;
    
    if (profit <= benchmarkReturn) return 0;
    
    uint256 excessProfit = profit - benchmarkReturn;
    fee = (excessProfit * performanceFeeRate) / 1e18;
}
```

## Subscription Models

### Structure

Charge regular fees for access:

```javascript
revenueModel: {
  type: "subscription",
  tiers: [
    {
      name: "Basic",
      price: "10", // 10 MON/month
      features: [
        "Daily monitoring",
        "Email alerts",
        "Basic dashboard"
      ]
    },
    {
      name: "Pro",
      price: "50",
      features: [
        "Hourly monitoring",
        "Real-time alerts",
        "Advanced analytics",
        "API access"
      ]
    },
    {
      name: "Enterprise",
      price: "200",
      features: [
        "Real-time monitoring",
        "Custom alerts",
        "Full API access",
        "Dedicated support",
        "Custom integrations"
      ]
    }
  ]
}
```

### Pricing Strategies

**Value-Based Pricing**:
```
Basic: $10/month (saves 5 hours/month @ $20/hr = $100 value)
Pro: $50/month (saves 20 hours/month @ $20/hr = $400 value)
Enterprise: $200/month (saves 50 hours/month @ $20/hr = $1,000 value)
```

**Cost-Plus Pricing**:
```
Operating cost: $5/month (gas, infrastructure)
Markup: 3-10x
Price: $15-50/month
```

**Competitive Pricing**:
```
Research competitor pricing
Position 10-20% below for market entry
Increase as reputation grows
```

### Best For

- **Observe agents**: Monitoring and alerting
- **Guide agents**: Advisory services
- **Analyze agents**: Research and reports

### Implementation

```solidity
// SubscriptionManager.sol
struct Subscription {
    address user;
    uint8 tier;
    uint256 startTime;
    uint256 lastPayment;
    bool active;
}

function subscribe(uint8 tier) external payable {
    require(msg.value >= tierPrices[tier], "Insufficient payment");
    
    subscriptions[msg.sender] = Subscription({
        user: msg.sender,
        tier: tier,
        startTime: block.timestamp,
        lastPayment: block.timestamp,
        active: true
    });
}

function renewSubscription() external payable {
    Subscription storage sub = subscriptions[msg.sender];
    require(sub.active, "No active subscription");
    require(msg.value >= tierPrices[sub.tier], "Insufficient payment");
    
    sub.lastPayment = block.timestamp;
}
```

## Hybrid Models

### Structure

Combine subscription and performance:

```javascript
revenueModel: {
  type: "hybrid",
  subscription: {
    baseFee: "25", // 25 MON/month
    features: ["Access to agent", "Basic support"]
  },
  performance: {
    fee: "0.15", // 15% of profits
    benchmark: "0.08" // 8% APY
  }
}
```

### Benefits

- **Predictable base revenue** from subscriptions
- **Upside potential** from performance fees
- **Lower performance fee** justified by base subscription
- **Better user alignment** than subscription alone

### Example Economics

```
User A: $10K capital, 12% return
├─ Subscription: $25/month × 12 = $300/year
├─ Profit: $1,200
├─ Excess (vs 8% benchmark): $400
├─ Performance fee: $400 × 15% = $60
└─ Total revenue: $360

User B: $100K capital, 15% return
├─ Subscription: $25/month × 12 = $300/year
├─ Profit: $15,000
├─ Excess (vs 8% benchmark): $7,000
├─ Performance fee: $7,000 × 15% = $1,050
└─ Total revenue: $1,350
```

### Best For

- **Execute agents** with smaller capital bases
- **Coordinate agents** managing multiple strategies
- **Premium services** with guaranteed uptime

## Usage-Based Models

### Pay-Per-Query

Charge for each agent interaction:

```javascript
revenueModel: {
  type: "usage",
  pricing: {
    basicQuery: "0.1", // 0.1 MON
    complexAnalysis: "1.0", // 1 MON
    executionRequest: "5.0" // 5 MON
  }
}
```

**Best For**:
- **Guide agents**: Q&A and recommendations
- **Analyze agents**: On-demand research

### Pay-Per-Action

Charge for each executed action:

```javascript
revenueModel: {
  type: "usage",
  pricing: {
    trade: "2.0", // 2 MON per trade
    rebalance: "5.0", // 5 MON per rebalance
    compound: "1.0" // 1 MON per compound
  }
}
```

**Best For**:
- **Execute agents** with infrequent actions
- **Coordinate agents** with discrete tasks

## Revenue Optimization

### Pricing Strategy

**Start Low, Increase Gradually**:
```
Month 1-3: 50% discount (market entry)
Month 4-6: 25% discount (early adopter)
Month 7+: Full price (established reputation)
```

**Volume Discounts**:
```javascript
discounts: {
  capital: [
    { threshold: "10000", discount: "0.00" }, // 0% discount
    { threshold: "50000", discount: "0.10" }, // 10% discount
    { threshold: "100000", discount: "0.20" }, // 20% discount
    { threshold: "500000", discount: "0.30" }  // 30% discount
  ]
}
```

**Loyalty Rewards**:
```javascript
loyalty: {
  duration: [
    { months: 3, discount: "0.05" }, // 5% after 3 months
    { months: 6, discount: "0.10" }, // 10% after 6 months
    { months: 12, discount: "0.15" } // 15% after 12 months
  ]
}
```

### Revenue Projections

**Conservative Model** (Execute Agent):
```
Assumptions:
├─ Average capital per user: $10,000
├─ Users: 10 (month 1) → 50 (month 12)
├─ Performance fee: 20%
├─ Average excess return: 8% annually
└─ Churn rate: 10% monthly

Month 1:  10 users × $10K × 8% × 20% / 12 = $133
Month 6:  30 users × $10K × 8% × 20% / 12 = $400
Month 12: 50 users × $10K × 8% × 20% / 12 = $667

Annual revenue: ~$5,000
```

**Optimistic Model** (Execute Agent):
```
Assumptions:
├─ Average capital per user: $25,000
├─ Users: 20 (month 1) → 200 (month 12)
├─ Performance fee: 20%
├─ Average excess return: 12% annually
└─ Churn rate: 5% monthly

Month 1:  20 users × $25K × 12% × 20% / 12 = $1,000
Month 6:  100 users × $25K × 12% × 20% / 12 = $5,000
Month 12: 200 users × $25K × 12% × 20% / 12 = $10,000

Annual revenue: ~$60,000
```

## Cost Structure

### Operating Costs

**Gas Costs**:
```
Daily operations: 10 transactions
Gas per transaction: 0.5 MON
Daily cost: 5 MON
Monthly cost: 150 MON
Annual cost: 1,800 MON
```

**Infrastructure**:
```
RPC access: $50/month
Monitoring: $20/month
Data feeds: $30/month
Total: $100/month = $1,200/year
```

**Development**:
```
Initial development: 200 hours @ $100/hr = $20,000
Ongoing maintenance: 20 hours/month @ $100/hr = $2,000/month
Annual maintenance: $24,000
```

### Break-Even Analysis

**Example (Execute Agent)**:
```
Fixed costs:
├─ Development (amortized): $20,000 / 12 = $1,667/month
├─ Infrastructure: $100/month
└─ Total fixed: $1,767/month

Variable costs:
├─ Gas: 150 MON/month
└─ At $1/MON: $150/month

Total monthly costs: $1,917

Break-even revenue: $1,917/month

At 20% performance fee on 10% excess returns:
Required AUM: $1,917 / (0.20 × 0.10 / 12) = $115,000

Or ~12 users with $10K each
```

## Profit Margins

### Target Margins by Phase

**Seed Phase (Months 1-3)**:
```
Revenue: $500/month
Costs: $2,000/month
Margin: -300% (investment phase)
```

**Operational Phase (Months 4-12)**:
```
Revenue: $3,000/month
Costs: $2,000/month
Margin: 33%
```

**Vetted Phase (Year 2+)**:
```
Revenue: $10,000/month
Costs: $2,500/month
Margin: 75%
```

### Scaling Economics

As agent matures, costs grow slower than revenue:

```
10 users:
├─ Revenue: $1,000/month
├─ Costs: $2,000/month
└─ Margin: -50%

50 users:
├─ Revenue: $5,000/month
├─ Costs: $2,500/month
└─ Margin: 50%

200 users:
├─ Revenue: $20,000/month
├─ Costs: $3,500/month
└─ Margin: 82.5%
```

## Revenue Sharing

### Agent Operator Split

```javascript
revenueSharing: {
  operator: "0.70", // 70% to agent operator
  sylvaProtocol: "0.20", // 20% to Sylva protocol
  performanceBond: "0.10" // 10% to performance bond
}
```

### Multi-Agent Coordination

For Coordinate agents managing other agents:

```javascript
revenueSharing: {
  coordinator: "0.30", // 30% to coordinator
  executors: "0.50", // 50% split among execute agents
  sylvaProtocol: "0.20" // 20% to protocol
}
```

## Tax Considerations

### Revenue Recognition

**Performance Fees**:
- Recognized when earned (accrual basis)
- May be subject to capital gains treatment
- Consult tax professional for jurisdiction

**Subscription Fees**:
- Recognized monthly (recurring revenue)
- Ordinary income treatment
- Deferred revenue for annual prepayments

### Deductible Expenses

- Gas costs
- Infrastructure costs
- Development costs (may need amortization)
- Professional services
- Marketing and user acquisition

**Consult a tax professional for your specific situation.**

## Best Practices

### 1. Start with Clear Pricing

Be transparent about fees:
```
✓ "2% management + 20% performance fee above 10% APY"
✗ "Competitive fees based on performance"
```

### 2. Align Incentives

Use high water marks and benchmarks:
```javascript
{
  highWaterMark: true,
  benchmark: "0.10",
  onlyExcessReturns: true
}
```

### 3. Provide Value Transparency

Show users what they're paying for:
```
Monthly Report:
├─ Gross returns: +15%
├─ Benchmark: +10%
├─ Excess returns: +5%
├─ Performance fee: 20% × 5% = 1%
└─ Net returns: +14%
```

### 4. Offer Flexible Options

Multiple tiers for different user segments:
```
Basic: Low capital, high fee rate
Pro: Medium capital, medium fee rate
Enterprise: High capital, low fee rate
```

### 5. Monitor Unit Economics

Track key metrics:
```
- Customer Acquisition Cost (CAC)
- Lifetime Value (LTV)
- LTV:CAC ratio (target >3:1)
- Churn rate
- Revenue per user
```

## Next Steps

1. **Choose Revenue Model**: Based on agent type
2. **Set Pricing**: Research competitors, calculate costs
3. **Implement Smart Contracts**: Use templates provided
4. **Test Economics**: Simulate with different user scenarios
5. **Launch and Iterate**: Adjust based on market feedback

## Resources

- **Fee Calculator**: `/tools/fee-calculator`
- **Revenue Templates**: `/docs/examples/revenue-models`
- **Economic Simulations**: `/tools/economics-simulator`
- **Tax Guide**: `/docs/legal/taxation`

## Support

Questions about revenue models?
- **Discord**: #economics
- **Forum**: `https://forum.sylva.xyz/c/economics`
- **Office Hours**: Thursdays 3pm UTC
