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

const donateFormSchema = z.object({
  credits: z.number().int().positive("Credits must be a positive integer"),
});

export function DonationForm() {
  const form = useForm<z.infer<typeof donateFormSchema>>({
    resolver: zodResolver(donateFormSchema),
    defaultValues: {
      credits: 0,
    },
  });

  const onSubmit = async () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="credits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
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
