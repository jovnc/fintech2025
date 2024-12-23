"use client";

import * as React from "react";
import {
  ChevronUp,
  ChevronDown,
  LayoutGrid,
  User,
  Sun,
  LogOut,
  Wallet,
} from "lucide-react";
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

interface ProfileMenuProps {
  username: string;
  avatarUrl: string;
}

export function ProfileMenu({ username, avatarUrl }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { address, isConnected } = useAccount();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg p-2 hover:bg-muted border">
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <span className="text-xs font-medium">{username}</span>
          {isConnected && (
            <span className="text-2xs">{address?.slice(0, 4)}...</span>
          )}
          {!isConnected && <span className="text-2xs">No wallet</span>}
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 opacity-50" />
        ) : (
          <ChevronDown className="h-4 w-4 opacity-50" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 flex flex-col gap-2">
        {/* <DropdownMenuItem className="hover:cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>My Profile</span>
        </DropdownMenuItem> */}
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
        <Separator />
        <DropdownMenuItem className="text-red-500 hover:cursor-pointer" asChild>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
