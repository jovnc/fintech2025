// "use client";
// import { getWalletBalance } from "@/actions/wallet";
// import { toast } from "@/hooks/use-toast";
// import { useEffect, useState } from "react";

// export default function WalletBalance({ userId }: { userId: string }) {
//   const [walletBalance, setWalletBalance] = useState(0);

//   useEffect(() => {
//     const handleGetWalletBalance = async () => {
//       try {
//         const res = await getWalletBalance(userId);
//         setWalletBalance(res);
//       } catch (error) {
//         toast({
//           title: "Not linked to wallet",
//           description: "Please link a wallet to your account",
//         });
//       }
//     };
//     handleGetWalletBalance();
//   });

//   return (
//     <div>
//       <h1>Wallet Balance</h1>
//       <p>Your wallet balance: {walletBalance} XRP</p>
//     </div>
//   );
// }
