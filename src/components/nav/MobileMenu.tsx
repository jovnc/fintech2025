"use client";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu({
  navItems,
  session,
}: {
  navItems: { href: string; label: string }[];
  session: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
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
          <SheetTitle></SheetTitle>
          <div className="flex flex-col space-y-4 mt-4">
            {/* <h2 className="text-lg font-semibold">Menu</h2> */}
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={idx + "mobile"}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-muted ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {/* <item.icon className="w-4 h-4 mr-2" /> */}
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
