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

interface Order {
  price: number;
  amount: number;
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
      />
    </div>
  );
}

function BuyFormComponent({
  currency,
  price,
  amount,
}: {
  currency: string;
  price: number;
  amount: number;
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

  const onSubmit = (formData: z.infer<typeof buyFormSchema>) => {
    console.log(formData);
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
            <span className="text-sm">
              {total ? total.toFixed(2) : 0} {currency}
            </span>
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
