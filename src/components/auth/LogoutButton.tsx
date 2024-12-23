"use client";
import { logOut } from "@/actions/auth";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logOut();
  };
  return (
    <form action={handleLogout} className="flex flex-row items-center gap-2">
      <Button
        onClick={handleLogout}
        className="w-full text-red-500"
        variant={"ghost"}
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </Button>
    </form>
  );
}
