import { LoginForm } from "@/components/auth/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full max-w-sm flex-col items-center justify-center gap-4">
            <Image
              src="/logo.png"
              alt="Image"
              height={200}
              width={200}
              className="items-center justify-center"
            />
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
