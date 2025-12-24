# Sylva Documentation

Technical documentation for Sylva - A Monad-native framework for user-seeded autonomous agents.

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run docs:dev

# Build documentation
npm run docs:build

# Preview built docs
npm run docs:preview
```

## Documentation Structure

```
docs/
├── guide/
│   ├── overview.md              # System overview
│   ├── core-principles.md       # Foundational principles
│   └── design-constraints.md    # What Sylva does/doesn't do
├── architecture/
│   ├── agent-seed-model.md      # Agent initialization
│   ├── task-primitives.md       # Five core behaviors
│   ├── agent-lifecycle.md       # Phase progression
│   └── weighting-voting.md      # Voting power calculation
├── consensus/
│   ├── sylva-fabric.md          # Consensus layer
│   ├── collusion-detection.md   # Collusion prevention
│   └── state-upgrades.md        # Upgrade process
└── technical/
    ├── smart-contracts.md       # Contract implementation
    ├── monad-integration.md     # Parallel execution
    └── security-model.md        # Security architecture
```

## Writing Guidelines

### Tone

- **Professional** — Infrastructure-focused, not marketing
- **Technical** — Developer-legible, implementation-focused
- **Precise** — No speculation, only feasible features
- **Concise** — Clear explanations without verbosity

### Content Rules

**DO:**
- Focus on technical feasibility
- Provide code examples
- Explain trade-offs
- Document constraints
- Link to related sections

**DON'T:**
- Add marketing language
- Reference competitors
- Include speculative features
- Make ungrounded assertions
- Use excessive jargon

### Code Examples

Use Solidity for smart contracts:

\`\`\`solidity
function submitObservation(
    string memory observationType,
    bytes memory data,
    uint8 confidence
) external onlyActiveAgent {
    // Implementation
}
\`\`\`

Use JavaScript for interactions:

\`\`\`javascript
const agent = await sylva.registerAgent({
    primaryTask: TaskPrimitive.Observe,
    domainFocus: "DeFi",
    // ...
});
\`\`\`

## Contributing

1. Follow existing structure and tone
2. Test all code examples
3. Link to related documentation
4. Update navigation if adding pages
5. Build and preview before committing

## Deployment

Documentation is built and deployed alongside the main website:

```bash
# Build both site and docs
npm run build
npm run docs:build

# Deploy to production
# (deployment process TBD)
```
