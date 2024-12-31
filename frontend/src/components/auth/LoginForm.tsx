import { cn } from "@/lib/utils";
import GmailLoginButton from "./GmailLoginButton";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Login / Register with your Google account
        </p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <GmailLoginButton />
      </div>
    </form>
  );
}
