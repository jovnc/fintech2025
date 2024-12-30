"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useAccount, useWriteContract } from "wagmi";
import { breakfastContractConfig } from "@/lib/wagmi/contracts";

const mintFormSchema = z.object({
  amount: z.string(),
});

export default function BreakfastCreditMintingForm() {
  const { writeContractAsync } = useWriteContract();
  const { address, isConnected } = useAccount();
  const form = useForm<z.infer<typeof mintFormSchema>>({
    resolver: zodResolver(mintFormSchema),
    defaultValues: {
      amount: "",
    },
  });

  async function onSubmit(values: z.infer<typeof mintFormSchema>) {
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

      const mintAmount = Number(values.amount) * 10 ** 18;
      const res = await writeContractAsync({
        ...breakfastContractConfig,
        functionName: "mint",
        args: [BigInt(mintAmount)],
      });
      toast({
        title: "Form successfully submitted",
        description: <pre>{JSON.stringify(res, null, 2)}</pre>,
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
        className="mx-auto max-w-3xl space-y-8 p-6"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="Breakfast Credits"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the number of breakfast credits you would like to mint.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
