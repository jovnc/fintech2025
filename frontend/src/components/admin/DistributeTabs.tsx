import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "../ui/card";
import DistributeTokensForm from "./DistributeTokensForm";

export function DistributeTabs({
  selectedUserWallets,
}: {
  selectedUserWallets: (string | null)[];
}) {
  return (
    <Tabs defaultValue="bfast" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="bfast">BFAST</TabsTrigger>
        <TabsTrigger value="dinner">DINNER</TabsTrigger>
      </TabsList>
      <TabsContent value="bfast">
        <Card>
          <DistributeTokensForm
            wallets={selectedUserWallets}
            currency="BFAST"
          />
        </Card>
      </TabsContent>
      <TabsContent value="dinner">
        <Card>
          <DistributeTokensForm
            wallets={selectedUserWallets}
            currency="DINNER"
          />
        </Card>
      </TabsContent>
    </Tabs>
  );
}
