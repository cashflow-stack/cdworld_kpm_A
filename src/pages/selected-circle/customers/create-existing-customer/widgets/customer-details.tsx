import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "../lib/schemas";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";
import { RootState } from "@/toolkit/store";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useId } from "react";

type CustomerDetailsProps = {
  form: UseFormReturn<FormSchema>;
};

export function CustomerDetails({ form }: CustomerDetailsProps) {
  const { cities } = useSelector((state: RootState) => state.cities);
  const id = useId();
  return (
    <div className="shadow-sm rounded-lg px-2 py-2">
      <h2 className="text-lg font-semibold mb-6">Customer Details</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group relative">
            <label
              htmlFor="customerName"
              className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
            >
              <span className="inline-flex bg-background px-3">
                Customer Name &nbsp;<span className="text-red-500">*</span>
              </span>
            </label>
            <Input
              id="customerName"
              {...form.register("customerName")}
              className="rounded-sm"
            />
            {form.formState.errors.customerName && (
              <p className="text-sm text-red-500">
                {form.formState.errors.customerName.message}
              </p>
            )}
          </div>

          <div className="group relative">
            <label
              htmlFor="mobileNumber"
              className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
            >
              <span className="inline-flex bg-background px-2">
                Mobile Number &nbsp;<span className="text-red-500">*</span>
              </span>
            </label>
            <Input
              id="mobileNumber"
              {...form.register("mobileNumber")}
              className="rounded-sm"
            />
            {form.formState.errors.mobileNumber && (
              <p className="text-sm text-red-500">
                {form.formState.errors.mobileNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="group relative">
          <label
            htmlFor="aadharNumber"
            className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
          >
            <span className="inline-flex bg-background px-2">
              Aadhar Card Number &nbsp;
              <span className="text-muted-foreground">(Optional)</span>
            </span>
          </label>
          <Input
            id="aadharNumber"
            {...form.register("aadharNumber")}
            className="rounded-sm"
          />
          {form.formState.errors.aadharNumber && (
            <p className="text-sm text-red-500">
              {form.formState.errors.aadharNumber.message}
            </p>
          )}
        </div>

        <div className="group relative">
          <label
            htmlFor="address"
            className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
          >
            <span className="inline-flex bg-background px-2">
              Address &nbsp;
              <span className="text-muted-foreground/70">(Optional)</span>
            </span>
          </label>
          <Textarea
            id="address"
            {...form.register("address")}
            className="rounded-sm"
          />
          {form.formState.errors.address && (
            <p className="text-sm text-red-500">
              {form.formState.errors.address.message}
            </p>
          )}
        </div>

        <div className="group relative">
          <Select
            value={form.watch("city") || ""}
            onValueChange={(value) => form.setValue("city", value)}
          >
            <SelectTrigger className="rounded-sm">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.id}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.city && (
            <p className="text-sm text-red-500">
              {form.formState.errors.city.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <p className="text-sm">
            Documents Collected
            <span className="text-muted-foreground/70">&nbsp;(Optional)</span>
          </p>
          <div className="flex space-x-4 items-center">
            <div className="flex flex-row items-center space-x-3 space-y-0 rounded-lg border p-3 shadow has-[[data-state=checked]]:border-ring">
              <Checkbox id={`${id}-a`} {...form.register("emptyCheque")}
                checked={form.watch("emptyCheque")}
                onCheckedChange={(value) => form.setValue("emptyCheque", value as boolean)}
              />
              <Label htmlFor={`${id}-a`}>Blank Cheque</Label>
            </div>
            <div className="flex flex-row items-center space-x-3 space-y-0 rounded-lg border p-3 shadow has-[[data-state=checked]]:border-ring">
              <Checkbox id={`${id}-b`} {...form.register("promissoryNote")}
                checked={form.watch("promissoryNote")}
                onCheckedChange={(value) => form.setValue("promissoryNote", value as boolean)}
              />
              <Label htmlFor={`${id}-b`}>Promissory Note</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
