"use client";
import { logOut } from "@/actions/auth";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logOut();
  };
  return (
    <form action={handleLogout}>
      <Button variant="outline">Logout</Button>
    </form>
  );
}
