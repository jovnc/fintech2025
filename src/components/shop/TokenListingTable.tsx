"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for listed tokens
const initialListings = [
  { id: 1, seller: "User1", amount: 100, price: 10.5 },
  { id: 2, seller: "User2", amount: 50, price: 10.7 },
  { id: 3, seller: "User3", amount: 200, price: 10.3 },
  { id: 4, seller: "User4", amount: 75, price: 10.6 },
  { id: 5, seller: "User5", amount: 150, price: 10.4 },
];

export function TokenListingTable() {
  const [listings, setListings] = useState(initialListings);

  const handleBuy = (id: number) => {
    // In a real application, this would trigger a buy transaction
    // For this example, we'll just remove the listing
    setListings(listings.filter((listing) => listing.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">DINING Token Listings</CardTitle>
        <CardDescription>Current listings and prices</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Seller</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>{listing.seller}</TableCell>
                <TableCell>{listing.amount} DINING</TableCell>
                <TableCell>${listing.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleBuy(listing.id)}
                    className="hover:bg-primary-foreground hover:text-primary"
                  >
                    Buy
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
