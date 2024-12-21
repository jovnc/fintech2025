import Image from "next/image";

export default async function page() {
  return (
    <div className="grid xl:grid-cols-2 gap-x-12 h-full w-full p-10 font-serif text-amber-950">
      <div className="flex justify-center items-center">
        <Image src="/logo.png" width={500} height={500} alt="Logo" />
      </div>
      <div className="pt-5">
        <div className="font-bold text-center text-3xl">
          A better way to utilise your dining credits.
        </div>
        <div className="flex justify-center gap-x-12 py-8">
          <div className="flex flex-col justify-center">
            <Image
              src="/buy.png"
              width={150}
              height={150}
              alt="buy"
              className="p-5"
            />
            <div className="text-center text-xl font-semibold">Buy</div>
            <div className="text-center text-lg text-gray-500">
              credits from others
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <Image
              src="/sell.png"
              width={150}
              height={150}
              alt="sell"
              className="p-5"
            />
            <div className="text-center text-xl font-semibold">Sell</div>
            <div className="text-center text-lg text-gray-500">
              unused credits
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <Image
              src="/donate.png"
              width={150}
              height={150}
              alt="donate"
              className="p-5"
            />
            <div className="text-center text-xl font-semibold">Donate</div>
            <div className="text-center text-lg text-gray-500">
              credits to charity
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
