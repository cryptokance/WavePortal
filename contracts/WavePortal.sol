// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    //address[] listOfSenders;
    mapping(address => uint256) numberOfWavesBySenders;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function wave() public {
        totalWaves += 1;
        numberOfWavesBySenders[msg.sender] += 1;
        console.log("%s has waved and he has now waved %s times!", msg.sender, numberOfWavesBySenders[msg.sender]);
        
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

}
