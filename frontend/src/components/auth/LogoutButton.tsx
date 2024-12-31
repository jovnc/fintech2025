"use client";
import { logOut } from "@/actions/auth";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useAccount, useDisconnect } from "wagmi";

export default function LogoutButton() {
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();
  const handleLogout = async () => {
    if (isConnected) {
      disconnect();
    }
    await logOut();
  };
  return (
    <form action={handleLogout} className="flex flex-row items-center gap-2">
      <Button
        onClick={handleLogout}
        className="w-full text-red-500"
        variant={"profile"}
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </Button>
    </form>
  );
}
