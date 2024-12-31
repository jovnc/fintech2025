//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./Tradable.sol";
import "./CentralizedVault.sol";

contract BreakfastCreditsToken is ERC20, Ownable, Tradable {

    CentralizedVault private vault;
    address private constant DONATION_WALLET = address(0x000000000000000000000000000000000000dEaD); // Inaccessible wallet (example: a burn address)
    uint256 private totalDonations; // Tracks the total amount donated

    constructor(address payable vaultAddress) ERC20("Breakfast Tokens", "BFAST") Ownable(msg.sender) {
        vault = CentralizedVault(vaultAddress);
    }

    // Owner only: Mint new tokens
    function mint(uint amount) public onlyOwner {
        _mint(msg.sender, amount);
    }

    // Owner only: Burn tokens
    function burn(uint256 amount) public onlyOwner {
        require(balanceOf(msg.sender) >= amount, "Token: cannot burn more than you own");
        _burn(msg.sender, amount);
    }

    // Owner only: distribute tokens to specified addresses
    function distribute(address[] memory accounts, uint256 amount) public onlyOwner {
        // mint amount first
        mint(accounts.length * amount);
        for (uint256 i = 0; i < accounts.length; i++) {
            _transfer(msg.sender, accounts[i], amount);
        }
    }

    // User: Place a sell order
    function placeSellOrder(uint256 amount, uint256 price) public {
        require(amount <= balanceOf(msg.sender), "Token: cannot place an order with more than you own");
        _burn(msg.sender, amount); // remove amount from sender and place on hold
        _placeOrder(amount, price);
    }

    // User: Remove a sell order
    function removeOrder(uint256 orderId) public {
        _removeOrder(orderId);
        SellOrder memory order = _getOrder(orderId);
        _mint(msg.sender, order.amount); // return amount to sender that is placed on hold
    }

    // User: Buy a sell order
    function buyOrder(uint256 orderId, uint256 amount) public payable {
        SellOrder memory order = _getOrder((orderId));
        uint256 orderPrice = (order.price * amount)/(10**18);
        require(msg.value >= orderPrice, "Token: XRP sent must be greater or equal to order price");

        // transfer payment to seller
        uint256 sellerPayment = msg.value;

        // Deposit into the centralized vault
        vault.deposit{value: sellerPayment}(order.seller);

        // complete the order
        _buyOrder(orderId, amount);
        _mint(msg.sender, amount); // transfer token to buyer
    }

    // User: Update the price of a sell order
    function updateOrderPrice(uint256 orderId, uint256 newPrice) public {
        _updateOrderPrice(orderId, newPrice);
    }

    // User: List all sell orders
    function listOrders() public view returns (SellOrder[] memory) {
        return _listOrders();
    }

    // User: Claim a dining credit by burning one token 
    function claimDiningCredit() public {
        require(balanceOf(msg.sender) >= 1*10**18, "Token: Insufficient balance to claim dining credit");

        // Burn one token from the caller's account
        _burn(msg.sender, 1*10**18);
    }

    // User: donate tokens
    function donate(uint256 amount) public {
        require(amount > 0, "Donation amount must be greater than zero");

        // Transfer the donation to the inaccessible wallet
        _transfer(msg.sender, DONATION_WALLET, amount);

        // Update the total donations
        totalDonations += amount;
    }

    // User: get the total amount donated
    function getTotalDonations() public view returns (uint256) {
        return totalDonations;
    }
}