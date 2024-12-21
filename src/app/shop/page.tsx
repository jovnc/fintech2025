import { DININGPriceChart } from "@/components/shop/DININGPriceChart";
import { SalesVolume } from "@/components/shop/SalesVolume";
import { TokenListingTable } from "@/components/shop/TokenListingTable";

export default function page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 text-primary">
      {/* Breakfast Credits */}
      <div className="flex flex-col gap-4 p-4">
        <DININGPriceChart />
        <SalesVolume />
        <TokenListingTable />
      </div>

      {/* Dinner Credits */}
      <div className="flex flex-col gap-4 p-4">
        <DININGPriceChart />
        <SalesVolume />
        <TokenListingTable />
      </div>
    </div>
  );
}
