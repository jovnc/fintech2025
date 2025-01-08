"use client";

import { useReadContract } from "wagmi";
import OrderBook from "./OrderBook";
import TradingPanel from "./TradingPanel";

import { bigIntToNumber } from "@/lib/utils";
import { dinnerContractConfig } from "@/lib/wagmi/contracts";

export default function DinnerCreditsCard() {
  const { data } = useReadContract({
    ...dinnerContractConfig,
    functionName: "listOrders",
  });

  const filteredData = data?.filter((order) => order.active); // only get active orders

  // accumulate orders with the same price
  const orderBook = filteredData?.reduce(
    (
      acc: { [key: number]: { price: number; amount: number; order: any } },
      order,
    ) => {
      const price = bigIntToNumber(order.price);
      if (!acc[price]) {
        acc[price] = {
          price: price,
          amount: 0,
          order: [],
        };
      }
      acc[price].amount += bigIntToNumber(order.amount);
      acc[price].order.push([order.id, order.amount, order.seller]);
      return acc;
    },
    {},
  );

  const orderBookArray = orderBook ? Object.values(orderBook) : [];
  orderBookArray.sort((a, b) => a.price - b.price);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <TradingPanel currency="DINNER" data={orderBookArray} />
      <OrderBook currency="DINNER" data={orderBookArray} />
    </div>
  );
}
