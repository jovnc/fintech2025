/**
 * Contract 2: Marketplace
 * - Enables students to list dining credits for sale and purchase credits using the XRP EVM sidechain.
 */
pragma solidity ^0.8.0;
import "./TokenContract.sol";

contract Marketplace {
    struct Listing {
        address seller;
        uint256 amount;
        uint256 price; // Price in native XRP or equivalent
    }

    DiningCreditsToken private token;
    Listing[] public listings;

    event ListingCreated(address indexed seller, uint256 amount, uint256 price);
    event PurchaseCompleted(address indexed buyer, address indexed seller, uint256 amount, uint256 price);

    constructor(address tokenAddress) {
        token = DiningCreditsToken(tokenAddress);
    }

    function listCredits(uint256 amount, uint256 price) external {
        require(token.balanceOf(msg.sender) >= amount, "Insufficient token balance");
        require(token.allowance(msg.sender, address(this)) >= amount, "Token allowance too low");

        // Lock tokens in contract
        token.transferFrom(msg.sender, address(this), amount);

        listings.push(Listing({ seller: msg.sender, amount: amount, price: price }));
        emit ListingCreated(msg.sender, amount, price);
    }

    function purchaseCredits(uint256 listingIndex) external payable {
        require(listingIndex < listings.length, "Invalid listing index");
        Listing memory listing = listings[listingIndex];

        require(msg.value >= listing.price, "Insufficient payment");

        // Transfer payment to seller
        payable(listing.seller).transfer(listing.price);

        // Transfer tokens to buyer
        token.transfer(msg.sender, listing.amount);

        // Remove listing
        listings[listingIndex] = listings[listings.length - 1];
        listings.pop();

        emit PurchaseCompleted(msg.sender, listing.seller, listing.amount, listing.price);
    }

    function viewListings() external view returns (Listing[] memory) {
        return listings;
    }
}