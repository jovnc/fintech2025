"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import {
  breakfastContractConfig,
  dinnerContractConfig,
} from "@/lib/wagmi/contracts";
import { createCreditClaim } from "@/actions/credits";
import { useSession } from "next-auth/react";

const OTPFormSchema = z.object({
  otp: z
    .string()
    .length(4, "OTP must be 4 characters")
    .regex(/^\d{4}$/, "OTP must be 4 digits"),
});

export default function OTPForm({
  setIsSuccess,
  writeContractAsync,
  type,
}: {
  setIsSuccess: (value: boolean) => void;
  writeContractAsync: any;
  type: string;
}) {
  const form = useForm<z.infer<typeof OTPFormSchema>>({
    resolver: zodResolver(OTPFormSchema),
    defaultValues: {
      otp: "",
    },
  });
  const { data } = useSession();
  if (!data || !data.user) return null;
  const id = data.user.id;

  async function onSubmit(values: z.infer<typeof OTPFormSchema>) {
    if (values.otp === "1234" && type === "Breakfast") {
      try {
        const txHash = await writeContractAsync({
          ...breakfastContractConfig,
          functionName: "claimDiningCredit",
          args: [],
        });
        const res = await createCreditClaim(
          id as string,
          txHash as string,
          type,
        );
        setIsSuccess(true);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to claim credits. Please try again",
        });
      }
    } else if (values.otp === "1234" && type === "Dinner") {
      try {
        const txHash = await writeContractAsync({
          ...dinnerContractConfig,
          functionName: "claimDiningCredit",
          args: [],
        });
        const res = await createCreditClaim(
          id as string,
          txHash as string,
          type,
        );
        setIsSuccess(true);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to claim credits. Please try again",
        });
      }
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please try again",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row items-end justify-center gap-4"
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormDescription>
                Instead of using the QR code, you can also key in the code
                manually.
              </FormDescription>
              <FormControl>
                <InputOTP maxLength={4} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
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
