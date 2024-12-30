import Link from "next/link";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-20 bg-primary/5 p-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-row text-xl">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="mr-2 inline"
            />
            <span className="text-sm font-bold">FinishYourCredits</span>
          </Link>
          <Link
            href="/privacy"
            className="text-sm leading-none text-gray-600 hover:text-gray-800"
          >
            Devpost
          </Link>
        </div>
      </div>
    </footer>
  );
}
