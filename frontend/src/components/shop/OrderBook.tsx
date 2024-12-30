"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Order {
  price: number;
  amount: number;
}

export default function OrderBook({
  data,
  currency,
}: {
  data: Order[];
  currency: string;
}) {
  return (
    <Card className="w-full">
      <CardHeader className="border">
        <CardTitle className="text-sm font-medium">Order Book</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-2 gap-4 border-b border-gray-800 p-3 text-xs text-gray-400">
          <div className="text-center">Price (XRP)</div>
          <div className="text-center">Volume ({currency})</div>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {data &&
            data.map((order, id) => (
              <div
                key={id}
                className={
                  "grid w-full grid-cols-2 gap-4 p-3 text-xs transition-colors hover:bg-muted-foreground/5"
                }
              >
                <div className="text-center">{order.price}</div>
                <div className="text-center">{order.amount}</div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
