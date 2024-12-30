import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { writeContract } from "@wagmi/core";
import { config } from "@/lib/wagmi/config";
import { breakfastContractConfig } from "@/lib/wagmi/contracts";
import { toast } from "@/hooks/use-toast";
import { bigIntToNumber } from "@/lib/utils";

interface Order {
  price: number;
  amount: number;
  order: any;
}

export default function BuyForm({
  currency,
  data,
}: {
  currency: string;
  data: Order[];
}) {
  const currPrice = data.length > 0 ? data[0].price : 0;
  const currAmount = data.length > 0 ? data[0].amount : 0;
  const currOrders = data.length > 0 ? data[0].order : [];

  return (
    <div className="mt-4 space-y-4">
      <p className="text-xs text-muted-foreground">
        Note: currently, our system only supports{" "}
        <span className="font-bold">MARKET</span> orders, future support for{" "}
        <span className="font-bold">LIMIT</span> orders is expected
      </p>
      <BuyFormComponent
        currency={currency}
        price={currPrice}
        amount={currAmount}
        orders={currOrders}
      />
    </div>
  );
}

function BuyFormComponent({
  currency,
  price,
  amount,
  orders,
}: {
  currency: string;
  price: number;
  amount: number;
  orders: any;
}) {
  const buyFormSchema = z.object({
    amount: z
      .number()
      .min(0, "Amount must be greater than 0")
      .max(amount, "Amount must be less than available amount"),
  });

  const form = useForm<z.infer<typeof buyFormSchema>>({
    resolver: zodResolver(buyFormSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const { watch } = form;

  const amountValue = watch("amount");
  const total = price * amountValue;

  const onSubmit = async (formData: z.infer<typeof buyFormSchema>) => {
    try {
      const { amount } = formData;
      let currAmount = amount;
      let i = 0;
      const tx = [];

      while (currAmount > 0) {
        const order = orders[i];
        const orderAmount = bigIntToNumber(order[1]);
        if (orderAmount > currAmount) {
          const data = await writeContract(config, {
            ...breakfastContractConfig,
            functionName: "buyOrder",
            args: [order[0], BigInt(currAmount * 10 ** 18)],
            value: BigInt(currAmount * price * 10 ** 18),
          });
        } else {
          const data = await writeContract(config, {
            ...breakfastContractConfig,
            functionName: "buyOrder",
            args: [order[0], BigInt(orderAmount * 10 ** 18)],
            value: BigInt(orderAmount * price * 10 ** 18),
          });
        }
        currAmount -= orderAmount;
        i += 1;
      }

      toast({
        title: "Success",
        description: "Successfully bought all tokens",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Failed to buy tokens, please try again. This could be due to network error, insufficient balance, or attempt to buy your own tokens.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div className="flex flex-col items-center justify-center">
          <p>Current market price: </p>
          {price === 0 && <p className="text-2xl font-bold">None available</p>}
          {price !== 0 && <p className="text-2xl font-bold">{price} XRP</p>}
        </div>

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
                Max: {amount.toFixed(0)} {currency}
              </p>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-sm">Total</span>
            <span className="text-sm">{total ? total.toFixed(2) : 0} XRP</span>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          variant={"success"}
          disabled={price === 0}
        >
          Buy {currency}
        </Button>
      </form>
    </Form>
  );
}
