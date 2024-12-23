import { useDisconnect } from "wagmi";
import { Button } from "../ui/button";
import { Wallet } from "lucide-react";

export function DisconnectWalletButton() {
  const { disconnect } = useDisconnect();

  return (
    <Button
      variant="profile"
      className="w-full"
      onClick={() => disconnect()}
      size={"sm"}
    >
      <Wallet className="mr-2 h-4 w-4" />
      Disconnect
    </Button>
  );
}
