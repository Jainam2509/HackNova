// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// NOTE: Minimal illustrative contract.
// In real life, use proper role control, pausing, events, and audits.
contract SubsidyManager {
    address public owner;
    mapping(bytes32 => bool) public eligibleMilestones; // keccak(projectId, milestoneId) => bool

    event Attested(bytes32 indexed key, bool eligible, address indexed attestor);

    constructor() {
        owner = msg.sender;
    }

    function setEligibility(string calldata projectId, string calldata milestoneId, bool eligible) external {
        require(msg.sender == owner, "only owner");
        bytes32 key = keccak256(abi.encode(projectId, milestoneId));
        eligibleMilestones[key] = eligible;
        emit Attested(key, eligible, msg.sender);
    }

    function isMilestoneEligible(string calldata projectId, string calldata milestoneId) external view returns (bool) {
        bytes32 key = keccak256(abi.encode(projectId, milestoneId));
        return eligibleMilestones[key];
    }
}
