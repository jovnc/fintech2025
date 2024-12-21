import { auth } from "@/auth";
import WalletBalance from "@/components/wallet/WalletBalance";
import WalletSetup from "@/components/wallet/WalletSetup";

export default async function page() {
  const session = await auth();
  if (!session) {
    return <div>You do not have access</div>; // change to show langing page
  }
  return (
    <div>
      <WalletSetup userId={session?.user?.id ?? ""} />
      {/* <WalletBalance userId={session?.user?.id ?? ""} /> */}
      <p>Home</p>
    </div>
  );
}
