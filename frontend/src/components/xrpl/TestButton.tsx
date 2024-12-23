"use client";

import { Button } from "../ui/button";
import { sendXRP } from "@/actions/xrpl";

export default function TestButton() {
  return (
    <Button
      onClick={async () => {
        await sendXRP();
      }}
    >
      Test
    </Button>
  );
}
