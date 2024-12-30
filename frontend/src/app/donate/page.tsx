import DonationCards from "@/components/donate/DonationCards";

export default async function page() {
  return (
    <div className="mx-auto flex w-full flex-col gap-8 px-10 py-8">
      <div className="mb-10 flex w-full flex-col items-center justify-center gap-4">
        <h1 className="text-center text-3xl font-bold">
          Donate Your Unused Dining Credits
        </h1>
        <p className="mb-4 text-center text-sm text-muted-foreground">
          Help your community by donating your unused dining credits. Every
          contribution makes a difference!
        </p>
      </div>
      <DonationCards />
    </div>
  );
}
