import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "../ui/card";
import ActiveListingTable from "./ActiveListingTable";
import CreditTable from "./CreditTable";
import TransactionsTable from "./TransactionsTable";

export default function TransactionsTabs() {
  return (
    <Tabs defaultValue="active" className="w-full rounded-lg bg-primary/10 p-5">
      <TabsList className="mb-20 grid w-full grid-cols-1 md:grid-cols-3">
        <TabsTrigger value="active">Your Active Listings</TabsTrigger>
        <TabsTrigger value="credit">Credit Claim History</TabsTrigger>
        <TabsTrigger value="transactions">Transaction History</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <Card>
          <ActiveListingTable />
        </Card>
      </TabsContent>
      <TabsContent value="credit">
        <Card>
          <CreditTable />
        </Card>
      </TabsContent>
      <TabsContent value="transactions">
        <Card>
          <TransactionsTable />
        </Card>
      </TabsContent>
    </Tabs>
  );
}
