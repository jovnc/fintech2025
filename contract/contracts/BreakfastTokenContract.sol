//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./Tradable.sol";
import "./Donatable.sol";
import "./CentralizedVault.sol";

contract BreakfastCreditsToken is ERC20, Ownable, Tradable, ReentrancyGuard, Donatable {

    CentralizedVault private vault;

    event CreditClaimed(address indexed claimer);

    constructor(address vaultAddress) ERC20("Breakfast Tokens", "BFAST") Ownable(msg.sender) {
        vault = CentralizedVault(vaultAddress);
    }

    // Owner only: Mint new tokens
    function mint(address account, uint256 amount) public onlyOwner returns (bool) {
        _mint(account, amount);
        return true;
    }

    // Owner only: Burn tokens
    function burn(address account, uint256 amount) public onlyOwner returns (bool)  {
        _burn(account, amount);
        return true;
    }

    // Owner only: distribute tokens to specified addresses
    function distribute(address[] memory accounts, uint256 amount) public onlyOwner returns (bool) {
        for (uint256 i = 0; i < accounts.length; i++) {
            _transfer(owner(), accounts[i], amount);
        }
        return true;
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
    function buyOrder(uint256 orderId, uint256 amount) public payable nonReentrant {
        SellOrder memory order = _getOrder((orderId));
        uint256 orderPrice = order.price * amount;
        require(msg.value >= orderPrice, "Token: XRP sent must be greater or equal to order price");
        address owner = owner();

        // transfer payment to seller and owner
        uint256 ownerFee = msg.value/100; // 1% fee for owner
        uint256 sellerPayment = msg.value - ownerFee; // remaining 99% goes to seller

        // Deposit into the centralized vault
        vault.deposit{value: sellerPayment}(order.seller);
        vault.deposit{value: ownerFee}(owner);

        // complete the order
        _buyOrder(orderId, amount);
        _mint(msg.sender, amount); // transfer token to buyer
    }

    // User: Buy multiple sell orders at the same price
    function bulkBuy(uint256 amount, uint256 price) public payable nonReentrant {
        require(amount > 0, "Token: Total amount must be greater than zero");
        require(price > 0, "Token: Price must be greater than zero");

         // Retrieve all sell orders at the specified price
        SellOrder[] storage availableOrders = ordersByPrice[price];
        require(availableOrders.length > 0, "Token: No sell orders available at the specified price");

        uint256 remainingAmount = amount;

        uint256 i = 0;
        while (remainingAmount > 0) {
            SellOrder storage order = availableOrders[i];

            // Skip inactive orders or orders from the buyer
            if (!order.active || order.seller == msg.sender) {
                continue;
            }

            uint256 amountToBuy = remainingAmount > order.amount ? order.amount : remainingAmount;
            buyOrder(order.id, amountToBuy);
            remainingAmount -= amountToBuy;
        }
    }

    // User: Update the price of a sell order
    function updateOrderPrice(uint256 orderId, uint256 newPrice) public {
        _updateOrderPrice(orderId, newPrice);
    }

    // User: Get a sell order by ID
    function getOrder(uint256 orderId) public view returns (SellOrder memory) {
        return _getOrder(orderId);

    }

    // User: List all sell orders
    function listOrders() public view returns (SellOrder[] memory) {
        return _listOrders();
    }

    // User: Claim a dining credit by burning one token 
    function claimDiningCredit() public nonReentrant {
        require(balanceOf(msg.sender) >= 1*10**18, "Token: Insufficient balance to claim dining credit");

        // Burn one token from the caller's account
        _burn(msg.sender, 1*10**18);

        // Emit an event for the claim
        emit CreditClaimed(msg.sender);
    }

    // User: List all the sell orders placed by the caller
    function listOrdersByUser() public view returns (SellOrder[] memory) {
        return _listOrdersByUser(msg.sender);
    }

    // User: donate tokens
    function donate(uint256 amount) public {
        _donate(amount);
    }

    // User: get the total amount donated
    function getTotalDonations() public view returns (uint256) {
        return _getTotalDonations();
    }

}