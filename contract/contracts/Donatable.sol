//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Donatable {
    address public constant DONATION_WALLET = address(0x000000000000000000000000000000000000dEaD); // Inaccessible wallet (example: a burn address)
    uint256 public totalDonations; // Tracks the total amount donated

    event DonationReceived(address indexed donor, uint256 amount);

    constructor() {}

    // Donate function: sends funds to an inaccessible wallet
    function _donate(uint256 amount) internal {
        require(amount > 0, "Donation amount must be greater than zero");

        // Transfer the donation to the inaccessible wallet
        (bool success, ) = DONATION_WALLET.call{value: amount}("");
        require(success, "Donation transfer failed");

        // Update the total donations
        totalDonations += amount;

        emit DonationReceived(msg.sender, msg.value);
    }

    // Function to get the total amount donated
    function _getTotalDonations() internal view returns (uint256) {
        return totalDonations;
    }

}