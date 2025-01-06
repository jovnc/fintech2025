"use client";

import * as React from "react";
import { ChevronUp, ChevronDown, Wallet } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "../auth/LogoutButton";
import { Separator } from "../ui/separator";
import { ConnectWalletModal } from "../wallet/ConnectWalletModal";
import { Button } from "../ui/button";
import { useAccount } from "wagmi";
import { DisconnectWalletButton } from "../wallet/DisconnectWalletButton";
import { AddXrpEvmButton } from "../wallet/AddXrpEvmButton";

interface ProfileMenuProps {
  username: string;
  avatarUrl: string;
}

export function ProfileMenu({ username, avatarUrl }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { address, isConnected } = useAccount();
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true); // Mark the component as hydrated after mounting
  }, []);

  if (!hydrated) return null;

  const truncatedAddress = address?.slice(0, 4);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border p-2 hover:bg-muted">
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <span className="text-xs font-medium">{username}</span>
          {isConnected && (
            <span className="text-2xs">{truncatedAddress}...</span>
          )}
          {!isConnected && <span className="text-2xs">No wallet</span>}
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 opacity-50" />
        ) : (
          <ChevronDown className="h-4 w-4 opacity-50" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex w-56 flex-col gap-2">
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onSelect={(e) => e.preventDefault()}
        >
          {!isConnected && (
            <ConnectWalletModal>
              <Button variant="ghost" className="w-full" size={"sm"}>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            </ConnectWalletModal>
          )}
          {isConnected && <DisconnectWalletButton />}
        </DropdownMenuItem>
        {isConnected && (
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onSelect={(e) => e.preventDefault()}
          >
            <AddXrpEvmButton />
          </DropdownMenuItem>
        )}
        <Separator />
        <DropdownMenuItem className="text-red-500 hover:cursor-pointer" asChild>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
