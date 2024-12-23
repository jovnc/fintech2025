import { cn } from "@/lib/utils";
import GmailLoginButton from "./GmailLoginButton";
import MetamaskLoginButton from "../wallet/MetamaskLoginButton";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("w-full flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Login / Register with your Google account
        </p>
      </div>
      <div className="flex flex-col gap-6 items-center">
        <GmailLoginButton />
      </div>
      {/* <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div> */}
    </form>
  );
}
