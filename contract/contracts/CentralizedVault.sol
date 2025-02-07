// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CentralizedVault {
    mapping(address => uint256) private _balances;

    constructor() {}

    // Only callable by the owner
    function deposit(address user) public payable {
        require(msg.value > 0, "Vault: Deposit amount must be greater than zero");
        _balances[user] += msg.value;
    }

    // Allow users to withdraw their ETH
    function withdraw(uint256 amount) public {
        require(_balances[msg.sender] >= amount, "Vault: Insufficient balance");
        _balances[msg.sender] -= amount;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Vault: Transfer failed");
    }

    // Check the ETH balance of a user
    function getBalance(address user) public view returns (uint256) {
        return _balances[user];
    }

    receive() external payable {
        deposit(msg.sender);  
    }
}