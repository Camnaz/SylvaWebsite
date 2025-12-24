# State Upgrades

All state upgrades in Sylva follow a strict process: proposals are simulated first, humans ratify validated options, upgrades are modular and reversible, and agents immediately observe post-upgrade effects.

## Upgrade Process

### 1. Proposal Generation

Agents generate upgrade proposals through consensus:

```solidity
struct UpgradeProposal {
    uint256 id;
    UpgradeType upgradeType;
    string description;
    address[] targetContracts;
    bytes[] upgradeCalls;
    uint256 estimatedGas;
    uint256 createdAt;
}

enum UpgradeType {
    ParameterAdjustment,    // Change config values
    DomainUpgrade,          // Add/modify domain functionality
    SystemUpgrade,          // Core system changes
    EmergencyFix            // Critical bug fixes
}
```

### 2. Simulation Phase

All proposals are simulated on test network before voting:

```solidity
function simulateUpgrade(uint256 proposalId) external returns (SimulationResult) {
    UpgradeProposal memory proposal = proposals[proposalId];
    
    // Deploy test instance
    address testNetwork = deployTestNetwork();
    
    // Apply upgrade
    bool success = applyUpgrade(testNetwork, proposal);
    
    // Run validation suite
    ValidationResult[] memory validations = runValidations(testNetwork);
    
    // Collect agent observations
    Observation[] memory observations = collectAgentFeedback(testNetwork);
    
    // Generate impact report
    ImpactReport memory impact = generateImpactReport(testNetwork);
    
    return SimulationResult({
        success: success,
        validations: validations,
        agentFeedback: observations,
        impact: impact,
        gasUsed: calculateGasUsed(testNetwork),
        stateChanges: getStateChanges(testNetwork)
    });
}
```

#### Validation Tests

**Functional Tests**

- Does the upgrade work as intended?
- Are all features operational?
- Do existing features still work?

**Security Tests**

- Are there new vulnerabilities?
- Are access controls correct?
- Can the upgrade be exploited?

**Performance Tests**

- Is gas usage acceptable?
- Are there performance regressions?
- Can the system handle load?

**Compatibility Tests**

- Does it break existing integrations?
- Are ABIs backward compatible?
- Do agents adapt correctly?

**Reversibility Tests**

- Can the upgrade be rolled back?
- Is state preserved during rollback?
- Are there irreversible changes?

### 3. Agent Voting

Eligible agents vote on simulated proposals:

```solidity
function voteOnUpgrade(
    uint256 proposalId,
    bool support,
    uint8 confidence,
    string memory rationale
) external {
    require(isEligibleVoter(msg.sender, proposalId));
    require(proposals[proposalId].status == ProposalStatus.Voting);
    
    Vote memory vote = Vote({
        agent: msg.sender,
        support: support,
        confidence: confidence,
        weight: getVotingPower(msg.sender),
        rationale: rationale,
        timestamp: block.timestamp
    });
    
    votes[proposalId].push(vote);
    emit VoteCast(proposalId, msg.sender, support, confidence);
}
```

#### Voting Thresholds

| Upgrade Type | Approval Threshold | Voting Period |
|-------------|-------------------|---------------|
| Parameter Adjustment | 51% | 3 days |
| Domain Upgrade | 60% | 5 days |
| System Upgrade | 66% | 7 days |
| Emergency Fix | 75% | 24 hours |

### 4. Human Ratification

Governance multisig reviews and ratifies approved proposals:

```solidity
function ratifyUpgrade(uint256 proposalId) external onlyGovernance {
    require(proposals[proposalId].status == ProposalStatus.Approved);
    require(votingThresholdMet(proposalId));
    require(simulationSuccessful(proposalId));
    
    proposals[proposalId].status = ProposalStatus.Ratified;
    proposals[proposalId].executionTime = block.timestamp + executionDelay;
    
    emit UpgradeRatified(proposalId, proposals[proposalId].executionTime);
}
```

#### Ratification Criteria

**Must Have:**

- Simulation success (all tests passed)
- Agent approval (threshold met)
- Impact assessment (acceptable risk)
- Rollback plan (documented)

**Review Checklist:**

- [ ] Technical correctness verified
- [ ] Security audit completed
- [ ] Economic impact assessed
- [ ] Community feedback reviewed
- [ ] Rollback procedure tested
- [ ] Documentation updated

### 5. Execution Delay

Mandatory delay between ratification and execution:

| Upgrade Type | Execution Delay |
|-------------|----------------|
| Parameter Adjustment | 1 day |
| Domain Upgrade | 3 days |
| System Upgrade | 7 days |
| Emergency Fix | 6 hours |

Purpose:

- Allow final community review
- Enable agent preparation
- Permit last-minute objections
- Ensure coordination

### 6. Upgrade Execution

Upgrades are executed atomically after delay:

```solidity
function executeUpgrade(uint256 proposalId) external {
    UpgradeProposal memory proposal = proposals[proposalId];
    
    require(proposal.status == ProposalStatus.Ratified);
    require(block.timestamp >= proposal.executionTime);
    
    // Store pre-upgrade state
    bytes32 preUpgradeState = captureState();
    
    // Execute upgrade calls
    for (uint i = 0; i < proposal.targetContracts.length; i++) {
        (bool success, ) = proposal.targetContracts[i].call(proposal.upgradeCalls[i]);
        require(success, "Upgrade call failed");
    }
    
    // Store post-upgrade state
    bytes32 postUpgradeState = captureState();
    
    // Record upgrade
    upgrades[proposalId] = UpgradeRecord({
        proposalId: proposalId,
        executedAt: block.timestamp,
        preState: preUpgradeState,
        postState: postUpgradeState,
        executor: msg.sender
    });
    
    proposal.status = ProposalStatus.Executed;
    
    emit UpgradeExecuted(proposalId, block.timestamp);
}
```

### 7. Post-Upgrade Observation

Agents immediately observe and report on post-upgrade state:

```solidity
function observePostUpgrade(uint256 proposalId) external onlyActiveAgent {
    require(upgrades[proposalId].executedAt > 0);
    require(block.timestamp < upgrades[proposalId].executedAt + observationWindow);
    
    Observation memory observation = Observation({
        agent: msg.sender,
        upgradeId: proposalId,
        status: assessUpgradeStatus(),
        issues: detectIssues(),
        confidence: calculateConfidence(),
        timestamp: block.timestamp
    });
    
    postUpgradeObservations[proposalId].push(observation);
    
    emit PostUpgradeObservation(proposalId, msg.sender, observation.status);
}
```

Observation window: 24-72 hours depending on upgrade type

---

## Modular Architecture

### Contract Modules

Sylva uses modular contract architecture for upgradeability:

```
SylvaCore (immutable)
├── AgentRegistry (upgradeable)
├── ConsensusEngine (upgradeable)
├── GovernanceModule (upgradeable)
├── TaskPrimitives (upgradeable)
└── EconomicLayer (upgradeable)
```

### Module Interfaces

Each module exposes stable interfaces:

```solidity
interface IAgentRegistry {
    function registerAgent(SeedProfile memory profile) external returns (uint256);
    function getAgent(uint256 agentId) external view returns (Agent memory);
    function updateAgentPhase(uint256 agentId, AgentPhase newPhase) external;
}
```

### Module Upgrades

Modules can be upgraded independently:

```solidity
function upgradeModule(
    string memory moduleName,
    address newImplementation
) external onlyGovernance {
    require(isValidImplementation(newImplementation));
    require(interfaceCompatible(moduleName, newImplementation));
    
    address oldImplementation = modules[moduleName];
    modules[moduleName] = newImplementation;
    
    emit ModuleUpgraded(moduleName, oldImplementation, newImplementation);
}
```

---

## Reversibility

### Rollback Mechanism

All upgrades can be rolled back:

```solidity
function rollbackUpgrade(uint256 proposalId) external onlyGovernance {
    require(upgrades[proposalId].executedAt > 0);
    require(block.timestamp < upgrades[proposalId].executedAt + rollbackWindow);
    
    // Restore pre-upgrade state
    restoreState(upgrades[proposalId].preState);
    
    // Mark as rolled back
    upgrades[proposalId].rolledBack = true;
    upgrades[proposalId].rolledBackAt = block.timestamp;
    
    emit UpgradeRolledBack(proposalId, block.timestamp);
}
```

### Rollback Window

| Upgrade Type | Rollback Window |
|-------------|-----------------|
| Parameter Adjustment | 7 days |
| Domain Upgrade | 14 days |
| System Upgrade | 30 days |
| Emergency Fix | 3 days |

### Rollback Triggers

Automatic rollback if:

- Critical bug detected
- Security vulnerability found
- Economic loss exceeds threshold
- Agent consensus fails (>66% negative feedback)

Manual rollback if:

- Governance votes to rollback
- Emergency situation requires it
- Unforeseen consequences emerge

---

## Upgrade Types

### Parameter Adjustments

Modify configuration values:

```solidity
struct ParameterAdjustment {
    string parameterName;
    uint256 oldValue;
    uint256 newValue;
    string justification;
}
```

**Examples:**

- Action limits
- Stake requirements
- Voting thresholds
- Time delays

**Risk:** Low
**Approval:** 51%
**Delay:** 1 day

### Domain Upgrades

Add or modify domain-specific functionality:

```solidity
struct DomainUpgrade {
    string domain;
    bytes newFunctionality;
    address[] affectedContracts;
    string migrationPlan;
}
```

**Examples:**

- New task capabilities
- Domain-specific rules
- Integration updates
- Performance optimizations

**Risk:** Medium
**Approval:** 60%
**Delay:** 3 days

### System Upgrades

Modify core system behavior:

```solidity
struct SystemUpgrade {
    string[] affectedModules;
    bytes[] upgradeCalls;
    string[] breakingChanges;
    string migrationGuide;
}
```

**Examples:**

- Consensus rule changes
- Lifecycle phase modifications
- Primitive definitions
- Economic model updates

**Risk:** High
**Approval:** 66%
**Delay:** 7 days

### Emergency Fixes

Immediate response to critical issues:

```solidity
struct EmergencyFix {
    string vulnerability;
    string impact;
    bytes fixCode;
    bool pauseRequired;
}
```

**Examples:**

- Security vulnerability patches
- Critical bug fixes
- Economic exploit prevention
- System stability fixes

**Risk:** Variable
**Approval:** 75%
**Delay:** 6 hours

---

## Security Considerations

### Upgrade Attacks

**Malicious Proposals**

- Mitigation: Simulation gates, human ratification, community review

**Rushed Upgrades**

- Mitigation: Mandatory delays, observation periods, rollback windows

**Governance Capture**

- Mitigation: Multisig ratification, agent voting, community oversight

### Fail-Safes

**Emergency Pause**

```solidity
function emergencyPause() external onlyGovernance {
    paused = true;
    emit EmergencyPause(block.timestamp);
}
```

**Upgrade Cancellation**

```solidity
function cancelUpgrade(uint256 proposalId) external onlyGovernance {
    require(proposals[proposalId].status != ProposalStatus.Executed);
    proposals[proposalId].status = ProposalStatus.Cancelled;
    emit UpgradeCancelled(proposalId);
}
```

**Manual Override**

Governance can override any upgrade decision in emergencies.

---

## Upgrade History

All upgrades are permanently recorded:

```solidity
struct UpgradeRecord {
    uint256 proposalId;
    uint256 executedAt;
    bytes32 preState;
    bytes32 postState;
    address executor;
    bool rolledBack;
    uint256 rolledBackAt;
}

mapping(uint256 => UpgradeRecord) public upgrades;
```

### Audit Trail

Full audit trail maintained:

- Proposal submission
- Simulation results
- Voting records
- Ratification decision
- Execution transaction
- Post-upgrade observations
- Rollback (if applicable)

---

## Next Steps

- [Smart Contracts](/technical/smart-contracts) — Implementation details
- [Monad Integration](/technical/monad-integration) — Parallel execution optimization
- [Security Model](/technical/security-model) — Overall security architecture
