// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract Donation {
    uint256 public lastDonation;

    function donate() external payable {
        require(msg.value > 0, "Must send some ETH");
        lastDonation = msg.value;
    }
}
