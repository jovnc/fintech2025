"use client";

import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

interface Order {
  price: number;
  amount: number;
  order: any;
}

export default function DinnerTradingPanel({
  currency,
  data,
}: {
  currency: string;
  data: Order[];
}) {
  return (
    <Card className="w-full p-4">
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger
            value="buy"
            className="flex-1 border hover:cursor-pointer data-[state=active]:bg-green-500"
          >
            Buy
          </TabsTrigger>
          <TabsTrigger
            value="sell"
            className="flex-1 border hover:cursor-pointer data-[state=active]:bg-red-500"
          >
            Sell
          </TabsTrigger>
        </TabsList>
        <TabsContent value="buy">
          <BuyForm currency={currency} data={data} />
        </TabsContent>
        <TabsContent value="sell">
          <SellForm currency={currency} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
