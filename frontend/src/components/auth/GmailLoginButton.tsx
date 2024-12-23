import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import { login } from "@/actions/auth";

export default function GmailLoginButton() {
  return (
    <Button variant="outline" className="w-3/4" formAction={login}>
      <Mail className="w-5 h-5 mr-2" />
      Login with Gmail
    </Button>
  );
}
