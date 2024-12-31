import { getTransactions } from "@/actions/transactions";
import { auth } from "@/auth";
import { TransactionTableComponent } from "./TransactionTableComponent";

export default async function TransactionsTable() {
  const session = await auth();
  if (!session || !session.user) return null;
  const transactions = await getTransactions(session.user.id as string);

  return <TransactionTableComponent data={transactions} />;
}
