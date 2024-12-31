"use client";

import { useState } from "react";
import { MoreVertical, Trash, Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { writeContract } from "@wagmi/core";
import { config } from "@/lib/wagmi/config";
import {
  breakfastContractConfig,
  dinnerContractConfig,
} from "@/lib/wagmi/contracts";
import { toast } from "@/hooks/use-toast";

type Listing = {
  id: string;
  amount: number;
  price: number;
  type: string;
};

// Define the form schema
const formSchema = z.object({
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Price must be a valid number.",
  }),
});

export default function ListingActions({ listing }: { listing: Listing }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { id, type } = listing;

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (type === "breakfast") {
      try {
        await writeContract(config, {
          ...breakfastContractConfig,
          functionName: "updateOrderPrice",
          args: [BigInt(id), BigInt(Number(values.price) * 10 ** 18)],
        });
        toast({
          title: "Success",
          description: "Order price updated",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update order price",
        });
      }
    } else {
      try {
        await writeContract(config, {
          ...dinnerContractConfig,
          functionName: "updateOrderPrice",
          args: [BigInt(id), BigInt(Number(values.price) * 10 ** 18)],
        });
        toast({
          title: "Success",
          description: "Order price updated",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update order price",
        });
      }
    }
    setEditDialogOpen(false);
    setDropdownOpen(false);
  };

  const handleRemove = async () => {
    if (type === "breakfast") {
      try {
        await writeContract(config, {
          ...breakfastContractConfig,
          functionName: "removeOrder",
          args: [BigInt(id)],
        });
        toast({
          title: "Success",
          description: "Order removed",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to remove order",
        });
      }
    } else {
      try {
        await writeContract(config, {
          ...dinnerContractConfig,
          functionName: "removeOrder",
          args: [BigInt(id)],
        });
        toast({
          title: "Success",
          description: "Order removed",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to remove order",
        });
      }
    }
    setRemoveDialogOpen(false);
    setDropdownOpen(false);
  };

  return (
    <div>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setEditDialogOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Listing
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setRemoveDialogOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Remove Listing
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <DialogContent className="w-3/4 px-4">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to remove this listing?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              listing.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRemoveDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRemove}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Listing</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
