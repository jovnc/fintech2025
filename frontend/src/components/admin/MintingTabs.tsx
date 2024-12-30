import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BreakfastCreditMintingForm from "./BreakfastCreditMintingForm";
import { Card } from "../ui/card";
import DinnerCreditMintingForm from "./DinnerCreditsMintingForm";

export function MintingTabs() {
  return (
    <Tabs defaultValue="bfast" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="bfast">BFAST</TabsTrigger>
        <TabsTrigger value="dinner">DINNER</TabsTrigger>
      </TabsList>
      <TabsContent value="bfast">
        <Card>
          <BreakfastCreditMintingForm />
        </Card>
      </TabsContent>
      <TabsContent value="dinner">
        <Card>
          <DinnerCreditMintingForm />
        </Card>
      </TabsContent>
    </Tabs>
  );
}
