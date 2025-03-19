import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateCustomerData,
  resetUpdateState,
} from "./state/updateCustomerSlice";
import { SimplifiedCustomer } from "@/models/customModels/customModels";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { z } from "zod";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { FormSelect } from "@/components/FormFields";

const updateCustomerSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Enter valid 10-digit phone number"),
  aadharNumber: z
    .string()
    .regex(/^[0-9]{12}$/, "Enter valid 12-digit Aadhar number"),
  address: z.string().min(1, "Address is required"),
  emptyCheque: z.boolean().default(false),
  promissoryNote: z.boolean().default(false),
  cityID: z.string().optional(),
});

type UpdateCustomerFormValues = z.infer<typeof updateCustomerSchema>;

interface UpdateCustomerFormProps {
  customer: SimplifiedCustomer;
  onSubmission?: (status: "success" | "failed") => void;
}

export function UpdateCustomerForm({
  customer,
  onSubmission,
}: UpdateCustomerFormProps) {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.updateCustomer);
  const { cities } = useAppSelector((state) => state.cities);
  const form = useForm<UpdateCustomerFormValues>({
    resolver: zodResolver(updateCustomerSchema),
    defaultValues: {
      customerName: customer.customerName,
      phoneNumber: customer.customerPhone.substring(3),
      aadharNumber: customer.customeruId,
      address: customer.customerAddress,
      emptyCheque: customer.emptyCheque ?? false,
      promissoryNote: customer.promissoryNote ?? false,
      cityID: customer.cityId,
    },
  });

  useEffect(() => {
    if (status === "failed" || status === "success") {
      onSubmission?.(status);
      dispatch(resetUpdateState());
    }
  }, [status, dispatch]);

  function onSubmit(data: UpdateCustomerFormValues) {
    dispatch(
      updateCustomerData({
        ...data,
        oldCustomer: customer,
        customerId: customer.id,
        adminId: customer.adminID,
        phoneNumber: `+91${data.phoneNumber}`,
        cityID: data.cityID ?? null,
      })
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="aadharNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aadhar Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormSelect
          control={form.control}
          name="cityID"
          label="City"
          placeholder="Select city"
          keyPair={cities.map((city) => ({
            key: city.name,
            value: city.id,
          }))}
        />

        <FormField
          control={form.control}
          name="emptyCheque"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Empty Cheque Received</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="promissoryNote"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Promissory Note Received</FormLabel>
            </FormItem>
          )}
        />

        {status === "loading" ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Update Customer</Button>
        )}
      </form>
    </Form>
  );
}
