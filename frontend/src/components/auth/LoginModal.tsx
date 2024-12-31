import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";

export function LoginModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="w-3/4 px-4">
        <DialogTitle></DialogTitle>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
