import Link from "next/link";
import Image from "next/image";
import { LoginModal } from "../auth/LoginModal";
import MobileMenu from "./MobileMenu";
import { auth } from "@/auth";
import LogoutButton from "../auth/LogoutButton";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
];

export async function Navbar() {
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

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item, idx) => (
              <Link
                key={idx + "desktop"}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            {!session?.user && <LoginModal />}
            {session?.user && <LogoutButton />}
          </div>

          {/* Mobile menu button */}
          <MobileMenu navItems={navItems} session={session} />
        </div>
      </div>
    </nav>
  );
}
