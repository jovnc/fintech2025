"use client";

import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

interface Order {
  price: number;
  amount: number;
}

export default function TradingPanel({
  currency,
  data,
}: {
  currency: string;
  data: Order[];
}) {
  return (
    <Card className="w-full p-4 ">
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger
            value="buy"
            className="flex-1 data-[state=active]:bg-green-500 hover:cursor-pointer border"
          >
            Buy
          </TabsTrigger>
          <TabsTrigger
            value="sell"
            className="flex-1 data-[state=active]:bg-red-500 hover:cursor-pointer border"
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
