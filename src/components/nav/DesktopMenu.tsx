"use client";
import Link from "next/link";
import { LoginModal } from "../auth/LoginModal";
import LogoutButton from "../auth/LogoutButton";
import { usePathname } from "next/navigation";

export default function DesktopMenu({
  navItems,
  session,
}: {
  navItems: { href: string; label: string }[];
  session: any;
}) {
  const pathname = usePathname();
  return (
    <div className="hidden md:flex items-center space-x-4">
      {navItems.map((item, idx) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={idx + "desktop"}
            href={item.href}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-muted ${
              isActive ? "text-primary bg-primary/10" : "text-muted-foreground"
            }`}
          >
            {/* <item.icon className="w-4 h-4 mr-2" /> */}
            {item.label}
          </Link>
        );
      })}
      {!session?.user && <LoginModal />}
      {session?.user && <LogoutButton />}
    </div>
  );
}
