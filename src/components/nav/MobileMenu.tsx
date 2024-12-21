"use client";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import Link from "next/link";

export default function MobileMenu({
  navItems,
  session,
}: {
  navItems: { href: string; label: string }[];
  session: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:hidden flex items-center">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[240px] sm:w-[300px]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <nav className="flex flex-col space-y-4 mt-4">
            {navItems.map((item, idx) => (
              <Link
                key={idx + "mobile"}
                href={item.href}
                className=" px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
