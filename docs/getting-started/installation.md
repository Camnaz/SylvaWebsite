# Installation & Setup

This guide walks you through setting up a local Sylva development environment and connecting to the Monad network.

## Prerequisites

### System Requirements

**Minimum**:
- CPU: 4 cores
- RAM: 8 GB
- Storage: 50 GB SSD
- OS: Linux (Ubuntu 22.04+), macOS (12+), or Windows (WSL2)

**Recommended**:
- CPU: 8+ cores
- RAM: 16 GB
- Storage: 100 GB NVMe SSD
- OS: Linux (Ubuntu 22.04+)

### Software Dependencies

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**: Latest stable version
- **Git**: v2.30.0 or higher
- **Docker**: v20.10.0 or higher (optional, for containerized setup)

## Quick Start

### 1. Install Sylva CLI

```bash
npm install -g @sylva/cli
```

Verify installation:
```bash
sylva --version
# Expected output: @sylva/cli v0.1.0
```

### 2. Initialize Project

Create a new Sylva project:
```bash
mkdir my-sylva-agent
cd my-sylva-agent
sylva init
```

You'll be prompted to configure:
- Project name
- Agent task primitive (Observe, Analyze, Execute, Coordinate, Guide)
- Network (Monad Mainnet, Monad Testnet, Local)

Example:
```bash
? Project name: my-trading-agent
? Task primitive: Execute
? Network: Monad Testnet
✓ Project initialized successfully
```

### 3. Install Dependencies

```bash
npm install
```

This installs:
- `@sylva/core`: Core agent framework
- `@sylva/monad`: Monad network integration
- `@sylva/consensus`: Consensus aggregation utilities
- `ethers`: Ethereum library for smart contract interaction

## Network Configuration

### Monad Mainnet

Add Monad Mainnet to your configuration:

```javascript
// sylva.config.js
module.exports = {
  networks: {
    monad: {
      url: "https://rpc.monad.xyz",
      chainId: 10143,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: "auto",
      timeout: 60000
    }
  }
}
```

**Network Details**:
- RPC URL: `https://rpc.monad.xyz`
- Chain ID: `10143`
- Block Explorer: `https://monadvision.com`
- Native Token: `MON`

### Monad Testnet

For development and testing:

```javascript
// sylva.config.js
module.exports = {
  networks: {
    monadTestnet: {
      url: "https://testnet-rpc.monad.xyz",
      chainId: 10144,
      accounts: [process.env.TESTNET_PRIVATE_KEY],
      gasPrice: "auto"
    }
  }
}
```

**Get Testnet MON**:
```bash
sylva faucet --network monadTestnet --address YOUR_ADDRESS
```

Or visit: `https://faucet.monad.xyz`

### Local Development Network

Run a local Monad node for testing:

```bash
# Using Docker
docker run -d \
  --name monad-local \
  -p 8545:8545 \
  -p 8546:8546 \
  monad/node:latest

# Verify connection
sylva network status --network local
```

## Environment Setup

### 1. Create Environment File

```bash
cp .env.example .env
```

### 2. Configure Environment Variables

```bash
# .env

# Network Configuration
MONAD_RPC_URL=https://rpc.monad.xyz
MONAD_CHAIN_ID=10143

# Account Configuration
PRIVATE_KEY=your_private_key_here
AGENT_OWNER_ADDRESS=your_address_here

# Agent Configuration
AGENT_TASK_PRIMITIVE=Execute
AGENT_DOMAIN=DeFi
AGENT_AUTONOMY_CEILING=5

# API Keys (optional)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key

# Monitoring (optional)
TENDERLY_ACCESS_KEY=your_tenderly_key
TENDERLY_PROJECT_ID=your_project_id
```

### 3. Secure Your Keys

**Never commit private keys to version control.**

```bash
# Add to .gitignore
echo ".env" >> .gitignore
echo "*.key" >> .gitignore
```

For production, use:
- Hardware wallets (Ledger, Trezor)
- Key management services (AWS KMS, HashiCorp Vault)
- Multi-sig wallets for high-value agents

## Smart Contract Deployment

### 1. Compile Contracts

```bash
sylva compile
```

This compiles:
- Agent seed contracts
- Consensus aggregation contracts
- Performance tracking contracts

### 2. Deploy to Testnet

```bash
sylva deploy --network monadTestnet
```

Output:
```bash
Deploying contracts to Monad Testnet...
✓ AgentFactory deployed at: 0x1234...
✓ ConsensusAggregator deployed at: 0x5678...
✓ PerformanceTracker deployed at: 0x9abc...

Deployment complete!
```

### 3. Verify Contracts

```bash
sylva verify --network monadTestnet --contract AgentFactory
```

## Agent Seeding

### 1. Create Agent Seed Profile

```javascript
// agent-seed.js
module.exports = {
  taskPrimitive: "Execute",
  domain: "DeFi",
  autonomyCeiling: 5,
  initialCapital: "1000", // in MON
  riskTolerance: "medium",
  objectives: [
    "Maximize yield on stablecoin deposits",
    "Maintain <5% drawdown",
    "Rebalance daily"
  ]
}
```

### 2. Seed Your Agent

```bash
sylva seed --config agent-seed.js --network monadTestnet
```

This creates:
- On-chain agent profile
- Performance tracking contract
- Initial capital allocation

Output:
```bash
Seeding agent...
✓ Agent profile created
✓ Agent ID: 0xdef0...
✓ Initial capital: 1000 MON
✓ Status: Seed phase

Your agent is now live!
View at: https://monadvision.com/agent/0xdef0...
```

## Connecting to the Network

### 1. Register as Validator (Optional)

To participate in consensus:

```bash
sylva validator register \
  --stake 10000 \
  --commission 0.05 \
  --network monadTestnet
```

Requirements:
- Minimum stake: 10,000 MON
- Uptime: >95%
- Hardware: Meets minimum requirements

### 2. Join Agent Network

Connect your agent to the Sylva fabric:

```bash
sylva network join --agent-id 0xdef0...
```

This enables:
- Consensus participation
- Performance tracking
- Collusion detection
- State upgrade voting

### 3. Monitor Agent Status

```bash
# Check agent status
sylva agent status --id 0xdef0...

# View performance metrics
sylva agent metrics --id 0xdef0...

# Monitor consensus participation
sylva agent consensus --id 0xdef0...
```

## Development Workflow

### 1. Local Testing

```bash
# Start local node
sylva node start

# Deploy contracts
sylva deploy --network local

# Run agent locally
sylva agent run --config agent-seed.js --network local
```

### 2. Testnet Deployment

```bash
# Deploy to testnet
sylva deploy --network monadTestnet

# Seed agent
sylva seed --config agent-seed.js --network monadTestnet

# Monitor performance
sylva agent monitor --id YOUR_AGENT_ID
```

### 3. Mainnet Deployment

```bash
# Final checks
sylva audit --config agent-seed.js

# Deploy to mainnet
sylva deploy --network monad

# Seed agent with real capital
sylva seed --config agent-seed.js --network monad
```

## Monitoring & Debugging

### Real-Time Monitoring

```bash
# Watch agent activity
sylva agent watch --id YOUR_AGENT_ID

# Stream logs
sylva logs --follow --agent-id YOUR_AGENT_ID
```

### Performance Dashboard

Access web dashboard:
```bash
sylva dashboard --port 3000
```

Visit: `http://localhost:3000`

### Debugging

Enable debug mode:
```bash
DEBUG=sylva:* sylva agent run --config agent-seed.js
```

View transaction traces:
```bash
sylva trace --tx-hash 0xabc123...
```

## Troubleshooting

### Connection Issues

**Problem**: Cannot connect to Monad RPC

**Solution**:
```bash
# Test RPC connection
curl -X POST https://rpc.monad.xyz \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

# Try alternative RPC
export MONAD_RPC_URL=https://rpc-backup.monad.xyz
```

### Deployment Failures

**Problem**: Contract deployment fails

**Solution**:
```bash
# Check gas price
sylva gas-price --network monadTestnet

# Increase gas limit
sylva deploy --gas-limit 5000000 --network monadTestnet

# Verify account balance
sylva balance --address YOUR_ADDRESS
```

### Agent Not Seeding

**Problem**: Agent seed transaction reverts

**Solution**:
```bash
# Check agent configuration
sylva validate --config agent-seed.js

# Verify capital requirements
sylva requirements --task-primitive Execute

# Check contract state
sylva contract call AgentFactory isValidSeed --args YOUR_SEED_HASH
```

## Next Steps

Now that you have Sylva installed and configured:

1. **Read the Architecture Guide**: Understand agent lifecycle and consensus
2. **Explore Task Primitives**: Learn about the five agent types
3. **Build Your First Agent**: Follow the tutorial for your chosen primitive
4. **Join the Community**: Connect with other developers

## Resources

- **Documentation**: https://docs.sylva.xyz
- **GitHub**: https://github.com/oleacomputer/sylva
- **Discord**: https://discord.gg/sylva
- **Forum**: https://forum.sylva.xyz

## Support

Need help?
- **Discord**: #support channel
- **Email**: support@oleacomputer.com
- **GitHub Issues**: Report bugs and request features
