"use client";

import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { breakfastContractConfig } from "@/lib/wagmi/contracts";
import { toast } from "@/hooks/use-toast";
import { useAccount, useReadContract } from "wagmi";
import { bigIntToNumber, convertToSGD } from "@/lib/utils";
import { usePrice } from "@/hooks/use-price";

const sellFormSchema = z.object({
  price: z.number().positive("Price must be positive"),
  amount: z.number().int().positive("Amount must be a positive integer"),
});

type SellFormValues = z.infer<typeof sellFormSchema>;

export default function SellForm({ currency }: { currency: string }) {
  const form = useForm<SellFormValues>({
    resolver: zodResolver(sellFormSchema),
    defaultValues: {
      price: 0,
      amount: 0,
    },
  });

  const { address } = useAccount();
  const { data: bfastAmount } = useReadContract({
    ...breakfastContractConfig,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });

  const { price: xrpPrice } = usePrice();

  const { watch } = form;
  const price = watch("price");
  const amount = watch("amount");

  const total = price * amount;

  async function onSubmit(values: SellFormValues) {
    try {
      const { amount, price } = values;

      if (amount > bigIntToNumber(bfastAmount)) {
        toast({
          title: "Error",
          description: "Insufficient balance",
        });

        return;
      }

      if (amount <= 0 || price <= 0) {
        toast({
          title: "Error",
          description: "Amount or price must be positive",
        });

        return;
      }

      await writeContract(config, {
        ...breakfastContractConfig,
        functionName: "placeSellOrder",
        args: [BigInt(amount * 10 ** 18), BigInt(price * 10 ** 18)],
      });

      toast({
        title: "Success",
        description: "Order placed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place order",
      });
    }
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                <p>Price</p>
                <div className="text-sm text-muted-foreground">XRP</div>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? parseFloat(e.target.value) : "",
                    )
                  }
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                <p>Amount</p>
                <div className="text-sm text-muted-foreground">{currency}</div>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? parseInt(e.target.value) : "",
                    )
                  }
                />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                Max: {bigIntToNumber(bfastAmount)} {currency}
              </p>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <div className="flex flex-col text-muted-foreground">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-sm">Total</span>
              <span className="text-sm">
                {total ? total.toFixed(2) : 0} XRP
              </span>
            </div>
            <p className="text-right text-sm text-muted-foreground">
              (${convertToSGD(xrpPrice, total)} SGD)
            </p>
          </div>
        </div>

        <Button type="submit" className="w-full" variant={"destructive"}>
          Sell {currency}
        </Button>
      </form>
    </Form>
  );
}
