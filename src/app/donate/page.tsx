import { CommunityProgress } from "@/components/donate/CommunityProgress";
import { DonationForm } from "@/components/donate/DonationForm";
import React from "react";

export default function page() {
  const currentDonations = 75000;
  const donationGoal = 100000;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        Donate Your Unused Dining Credits
      </h1>
      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <p className="mb-4">
            Help your community by donating your unused dining credits. Every
            contribution makes a difference!
          </p>
          <DonationForm />
        </div>
        <div>
          <CommunityProgress current={currentDonations} goal={donationGoal} />
        </div>
      </div>
    </div>
  );
}
