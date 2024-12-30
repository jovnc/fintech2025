// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract CentralizedVault is Ownable, ReentrancyGuard {
    mapping(address => uint256) private _balances;

    event Deposit(address indexed from, uint256 amount);
    event Withdrawal(address indexed to, uint256 amount);

    constructor() Ownable(msg.sender) {}

    // Only callable by the owner
    function deposit(address user) external payable {
        require(msg.value > 0, "Vault: Deposit amount must be greater than zero");
        _balances[user] += msg.value;
        emit Deposit(user, msg.value);
    }

    // Allow users to withdraw their ETH
    function withdraw(uint256 amount) public nonReentrant {
        require(_balances[msg.sender] >= amount, "Vault: Insufficient balance");
        _balances[msg.sender] -= amount;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Vault: Transfer failed");

        emit Withdrawal(msg.sender, amount);
    }

    // Check the ETH balance of a user
    function getBalance(address user) public view returns (uint256) {
        return _balances[user];
    }

}