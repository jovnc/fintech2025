"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useAccount, useWriteContract } from "wagmi";
import {
  breakfastContractConfig,
  dinnerContractConfig,
} from "@/lib/wagmi/contracts";

const distributeFormSchema = z.object({
  amount: z.string(),
});

function DistributeTokensForm({
  wallets,
  currency,
}: {
  wallets: (string | null)[];
  currency: string;
}) {
  // remove all null values from wallets
  wallets = wallets ? wallets.filter((wallet) => wallet !== null) : [];
  const { writeContractAsync } = useWriteContract();
  const { address, isConnected } = useAccount();
  const form = useForm<z.infer<typeof distributeFormSchema>>({
    resolver: zodResolver(distributeFormSchema),
    defaultValues: {
      amount: "",
    },
  });

  async function onSubmit(values: z.infer<typeof distributeFormSchema>) {
    try {
      if (!isConnected) {
        toast({
          title: "Not connected",
          description: "Please connect your wallet to mint tokens",
        });
        return;
      }

      if (address !== "0xF04bC8FdFC8b1c03Fa77885574Ae6Ea041E26bdc") {
        toast({
          title: "Unauthorized",
          description: "Only the faucet wallet can mint tokens",
        });
        return;
      }

      if (wallets.length === 0) {
        toast({
          title: "No users selected",
          description: "Please select users to distribute tokens to",
        });
        return;
      }

      const mintAmount = Number(values.amount) * 10 ** 18;
      if (currency === "BFAST") {
        await writeContractAsync({
          ...breakfastContractConfig,
          functionName: "distribute",
          args: [
            wallets as unknown as readonly `0x${string}`[],
            BigInt(mintAmount),
          ],
        });
      } else {
        await writeContractAsync({
          ...dinnerContractConfig,
          functionName: "distribute",
          args: [
            wallets as unknown as readonly `0x${string}`[],
            BigInt(mintAmount),
          ],
        });
      }
      toast({
        title: "Form successfully submitted",
        description: "Tokens distributed successfully",
      });
    } catch (error) {
      console.error("Form submission error", error);
      toast({
        title: "Form submission error",
        description: error as string,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-8"
      >
        <p className="text-sm font-bold">Distribute Tokens</p>
        <p className="text-xs text-muted-foreground">
          Select the users that you want to distribute tokens to in the table.
          This will automatically mint the necessary tokens and distribute to
          all selected users
        </p>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder={`${currency} credits`}
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default DistributeTokensForm;
