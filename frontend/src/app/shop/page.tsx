import BreakfastCreditsCard from "@/components/shop/BreakfastCreditsCard";

export default function page() {
  return (
    <div className="flex h-full w-full flex-col gap-4 py-4">
      <h1 className="justify-self-center text-center text-2xl font-bold">
        Trade your credits
      </h1>
      <h2 className="justify-self-center px-10 text-center text-xs text-muted-foreground">
        Have too much credits or looking to buy some cheap meals? This is the
        right place for you to trade credits!
      </h2>
      {/* Breakfast Credits */}
      <div className="flex flex-col gap-4 bg-primary/5 p-8">
        <h3 className="text-lg font-bold">Breakfast Credits (BFAST)</h3>
        <BreakfastCreditsCard />

        {/* Dinner Credits */}
      </div>
    </div>
  );
}
