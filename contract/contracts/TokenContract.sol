/**
 * Contract 1: DiningCreditsToken
 * - Implements ERC20 standard for dining credits on the XRP EVM sidechain.
 */
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DiningCreditsToken is ERC20, Ownable {
    constructor() ERC20("NUS Dining Credits", "NUSDC") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals()); // Initial supply to the contract owner
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function transferCredits(address to, uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _transfer(msg.sender, to, amount);
    }
}