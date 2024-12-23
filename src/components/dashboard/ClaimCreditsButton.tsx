import React from "react";
import { Button } from "../ui/button";

const ClaimCreditsButton = () => {
  return (
    <Button
      className="sm:w-2/3 rounded-3xl  text-white bg-amber-900"
      variant="ghost"
    >
      Claim
    </Button>
  );
};

export default ClaimCreditsButton;
