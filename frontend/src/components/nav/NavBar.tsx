import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { auth } from "@/auth";
import DesktopMenu from "./DesktopMenu";
import { ProfileMenu } from "./ProfileMenu";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/shop", label: "Buy / Sell" },
  { href: "/donate", label: "Donate" },
  { href: "/admin", label: "Admin" },
];

export async function Navbar({}) {
  const session = await auth();

  return (
    <nav className="w-full">
      <div className="px-10 sm:px-8 lg:px-10">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold ">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
            </Link>
          </div>
          <div className="flex flex-row items-center space-x-4">
            {/* Desktop menu */}
            {session && <DesktopMenu navItems={navItems} session={session} />}
            {!session && (
              <DesktopMenu navItems={[navItems[0]]} session={session} />
            )}

            {/* Mobile menu button */}
            {session?.user && (
              <ProfileMenu
                username={session?.user?.name || ""}
                avatarUrl={session?.user?.image || ""}
              />
            )}
            {session && <MobileMenu navItems={navItems} session={session} />}
            {!session && (
              <MobileMenu navItems={[navItems[0]]} session={session} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}