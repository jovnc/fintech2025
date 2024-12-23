import { useDisconnect } from "wagmi";
import { Button } from "../ui/button";
import { MetamaskIcon } from "./MetamaskIcon";

export function DisconnectWalletButton() {
  const { disconnect } = useDisconnect();

  return (
    <Button
      variant="ghost"
      className="w-full"
      onClick={() => disconnect()}
      size={"sm"}
    >
      <MetamaskIcon className="mr-2" />
      Disconnect
    </Button>
  );
}
