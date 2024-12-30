import { getUsers } from "@/actions/users";
import { AccountsTable } from "@/components/admin/AccountsTable";
import { MintingTabs } from "@/components/admin/MintingTabs";

export default async function AdminPanel() {
  const users = await getUsers();

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center gap-4 p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-2xl font-bold">Admin Panel</h1>
        <p className="text-center text-xs text-muted-foreground">
          Note: this page is only accessible for admins, however for development
          purposes, this page will be accessible to all users.
        </p>
      </div>
      <div className="mt-8 w-full rounded-lg bg-primary/5 p-10">
        <h2 className="mb-4 text-xl font-bold">All Accounts</h2>
        <AccountsTable users={users} />
      </div>
      <div className="mt-8 flex w-full flex-col gap-4 rounded-lg bg-primary/5 p-8">
        <h2 className="text-xl font-bold">Token Minting</h2>
        <p className="text-sm text-muted-foreground">
          Only owner account wallet is allowed to mint credits
        </p>
        <MintingTabs />
      </div>
    </div>
  );
}
