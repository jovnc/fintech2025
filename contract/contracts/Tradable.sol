//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Tradable {

    struct SellOrder {
        uint256 id;
        address seller;
        uint256 amount;
        uint256 price;
        bool active;
        uint256 startTime;
    }

    SellOrder[] internal orders; // all orders

    error NotSeller();
    error OrderDoesNotExist();


    constructor() {}

    function _placeOrder(uint256 amount, uint256 price) internal {
        require(amount > 0 && price > 0, "Tradable: amount and price must be positive and not null");
        
        uint256 orderId = orders.length;
        SellOrder memory newOrder = SellOrder(orderId, msg.sender, amount, price, true, block.timestamp);

        orders.push(newOrder);
    }

    function _removeOrder(uint256 orderId) internal {
        require(orders[orderId].seller == msg.sender && orders[orderId].active == true, "Tradable: that order is not yours or order was already fulfilled");

        orders[orderId].active = false;
    }

    function _updateOrderPrice(uint256 orderId, uint256 newPrice) internal {
        require(orders[orderId].seller == msg.sender && orders[orderId].active == true && newPrice > 0, "Tradable: that order is not yours, order was already fulfilled or price is invalid");

        orders[orderId].price = newPrice;
    }

    function _buyOrder(uint256 orderId, uint256 amount) internal {
        require(orders[orderId].seller != msg.sender && orders[orderId].active == true && amount <= orders[orderId].amount, "Tradable: that order is not yours, order was already fulfilled or amount is invalid");

        orders[orderId].amount -= amount;

        if (orders[orderId].amount == 0) {
            orders[orderId].active = false;
        }
    }

    function _getOrder(uint256 orderId) internal view returns (SellOrder memory) {
        return orders[orderId];
    }

    function _listOrders() internal view returns (SellOrder[] memory) {
        return orders;
    }

    function _listOrdersByUser(address user) internal view returns (SellOrder[] memory) {
        SellOrder[] memory userOrders;
        uint256 count = 0;

        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].seller == user) {
                userOrders[count] = orders[i];
                count++;
            }
        }
        return userOrders;
    }

}