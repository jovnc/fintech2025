"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Label } from "../ui/label";

export function DonationForm() {
  const [credits, setCredits] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the donation to your backend
    // For now, we'll just show a success message
    toast({
      title: "Donation Successful",
      description: `Thank you for donating ${credits} dining credits!`,
    });
    setCredits("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="credits">Dining Credits to Donate</Label>
        <Input
          id="credits"
          type="number"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
          placeholder="Enter amount"
          min="1"
          required
          className="mt-1"
        />
      </div>
      <Button type="submit" className="w-full">
        Donate Credits
      </Button>
    </form>
  );
}
