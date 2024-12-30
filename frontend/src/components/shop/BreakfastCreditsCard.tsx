"use client";

import { useReadContract } from "wagmi";
import OrderBook from "./OrderBook";
import TradingPanel from "./TradingPanel";
import { breakfastContractConfig } from "@/lib/wagmi/contracts";
import { bigIntToNumber } from "@/lib/utils";

export default function BreakfastCreditsCard() {
  const { data } = useReadContract({
    ...breakfastContractConfig,
    functionName: "listOrders",
  });

  const filteredData = data?.filter((order) => order.isActive); // only get active orders

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
      acc[price].order.push([order.id, order.amount]);
      return acc;
    },
    {},
  );

  const orderBookArray = orderBook ? Object.values(orderBook) : [];
  orderBookArray.sort((a, b) => a.price - b.price);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <TradingPanel currency="BFAST" data={orderBookArray} />
      <OrderBook currency="BFAST" data={orderBookArray} />
    </div>
  );
}
