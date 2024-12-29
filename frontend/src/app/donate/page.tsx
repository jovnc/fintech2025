import { CommunityProgress } from "@/components/donate/CommunityProgress";
import { DonationForm } from "@/components/donate/DonationForm";
import React from "react";

export default async function page() {
  return (
    <div className="container mx-auto px-4 py-8 w-full">
      <div className="flex flex-col gap-4 w-full items-center justify-center mb-10">
        <h1 className="text-3xl font-bold text-center">
          Donate Your Unused Dining Credits
        </h1>
        <p className="mb-4 text-muted-foreground text-center text-sm">
          Help your community by donating your unused dining credits. Every
          contribution makes a difference!
        </p>
      </div>
      <div className="grid gap-16 md:grid-cols-2">
        <DonationForm />
        <CommunityProgress />
      </div>
    </div>
  );
}
