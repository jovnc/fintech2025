"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export function CreditMinting() {
  const [diningCredits, setDiningCredits] = useState("");
  const [breakfastCredits, setBreakfastCredits] = useState("");

  const handleMint = () => {
    // Here you would typically send a request to your backend to mint and distribute credits
    toast({
      title: "Credits Minted and Distributed",
      description: `${diningCredits} dining credits and ${breakfastCredits} breakfast credits have been minted and distributed to all users.`,
    });
    setDiningCredits("");
    setBreakfastCredits("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Mint and Distribute Credits</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="diningCredits">Dining Credits</Label>
          <Input
            id="diningCredits"
            type="number"
            value={diningCredits}
            onChange={(e) => setDiningCredits(e.target.value)}
            placeholder="Enter amount"
            min="0"
          />
        </div>
        <div>
          <Label htmlFor="breakfastCredits">Breakfast Credits</Label>
          <Input
            id="breakfastCredits"
            type="number"
            value={breakfastCredits}
            onChange={(e) => setBreakfastCredits(e.target.value)}
            placeholder="Enter amount"
            min="0"
          />
        </div>
      </div>
      <Button onClick={handleMint}>Mint and Distribute</Button>
    </div>
  );
}
