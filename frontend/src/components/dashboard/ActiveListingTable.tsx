"use client";

import {
  breakfastContractConfig,
  dinnerContractConfig,
} from "@/lib/wagmi/contracts";
import { useAccount, useReadContract } from "wagmi";

import * as React from "react";
import { ListingsTable } from "./ListingsTable";

export default function ActiveListingTable() {
  const { address } = useAccount();
  const { data: bfastData } = useReadContract({
    ...breakfastContractConfig,
    functionName: "listOrders",
  });

  const { data: dinnerData } = useReadContract({
    ...dinnerContractConfig,
    functionName: "listOrders",
  });

  const bfastOrders =
    bfastData?.map((order: any) => ({
      ...order,
      type: "breakfast",
    })) || [];

  const dinnerOrders =
    dinnerData?.map((order: any) => ({
      ...order,
      type: "dinner",
    })) || [];

  const combinedData = [...bfastOrders, ...dinnerOrders];
  const filteredData = combinedData.filter(
    (order) => order.seller === address && order.isActive,
  );

  return <ListingsTable listings={filteredData} />;
}
