"use client";
import React from "react";
import { Button } from "../ui/button";
import QRCode from "react-qr-code";

export default function GenerateQR() {
  const [isClicked, setIsClicked] = React.useState(false);

  if (isClicked) {
    return (
      <div className="mt-8">
        <QRCode value="1234" size={200} />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <Button onClick={() => setIsClicked(true)}>Generate QR Code</Button>
    </div>
  );
}
