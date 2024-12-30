"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { writeContract } from "@wagmi/core";
import { config } from "@/lib/wagmi/config";
import {
  breakfastContractConfig,
  dinnerContractConfig,
} from "@/lib/wagmi/contracts";

export function DonationForm({
  currency,
  amount,
}: {
  currency: string;
  amount: number;
}) {
  const donateFormSchema = z.object({
    credits: z
      .number()
      .int()
      .positive("Credits must be a positive integer")
      .max(amount, "Credits must be less than or equal to the amount"),
  });
  const form = useForm<z.infer<typeof donateFormSchema>>({
    resolver: zodResolver(donateFormSchema),
    defaultValues: {
      credits: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof donateFormSchema>) => {
    try {
      const { credits } = data;
      if (currency === "BFAST") {
        const data = await writeContract(config, {
          ...breakfastContractConfig,
          functionName: "donate",
          args: [BigInt(credits * 10 ** 18)],
        });
      } else {
        const data = await writeContract(config, {
          ...dinnerContractConfig,
          functionName: "donate",
          args: [BigInt(credits * 10 ** 18)],
        });
      }
      toast({
        title: "Donation successful",
        description: `Donated ${credits} ${currency} credits`,
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Donation failed",
        description: "An error occurred while donating credits",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="credits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount ({currency})</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? parseInt(e.target.value) : "",
                    )
                  }
                />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                Max: {amount} {currency}
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Donate
        </Button>
      </form>
    </Form>
  );
}
