import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "../lib/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { InstallmentType, Weekday } from "@/models/API";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type LoanDetailsProps = {
  form: UseFormReturn<FormSchema>;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  weekday: Weekday;
};

export function LoanDetails({
  form,
  date,
  setDate,
  weekday,
}: LoanDetailsProps) {
  return (
    <div className="shadow-sm px-2 py-4">
      <h2 className="text-lg font-semibold mb-6">
        Loan Details <span className="text-red-500">*</span>
      </h2>
      {weekday !== Weekday.MONTHLY && (
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium leading-none text-foreground">
            Installment Type
          </legend>
          <RadioGroup
            onValueChange={(value) =>
              form.setValue("type", value as InstallmentType)
            }
            defaultValue={form.getValues("type")}
            className={`flex flex-wrap space-x-3 pb-8`}
          >
            {weekday === Weekday.DAILY && (
              <div className="relative flex flex-col items-start gap-4 rounded-lg border border-input p-3 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="DAILY"
                    className="after:absolute after:inset-0"
                  />
                  <Label>Daily</Label>
                </div>
              </div>
            )}

            <div className="relative flex flex-col items-start gap-4 rounded-lg border border-input p-3 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="WEEKLY"
                  className="after:absolute after:inset-0"
                />
                <Label>Weekly</Label>
              </div>
            </div>

            <div className="relative flex flex-col items-start gap-4 rounded-lg border border-input p-3 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="MONTHLY"
                  className="after:absolute after:inset-0"
                />
                <Label>Monthly</Label>
              </div>
            </div>
          </RadioGroup>
        </fieldset>
      )}
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group relative">
            <label
              htmlFor="loanBookId"
              className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
            >
              <span className="inline-flex bg-background px-2">
                Loan Serial
              </span>
            </label>
            <Input
              id="loanBookId"
              type="number"
              {...form.register("loanBookId", {
                valueAsNumber: true,
                onChange: (e) =>
                  form.setValue("loanBookId", parseFloat(e.target.value) || 0),
              })}
              className="rounded-sm"
            />
            {form.formState.errors.loanBookId && (
              <p className="text-sm text-red-500">
                {form.formState.errors.loanBookId.message}
              </p>
            )}
          </div>

          <div className="group relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal rounded-sm",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    form.setValue("givenDate", newDate as Date);
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("2000-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {form.formState.errors.givenDate && (
              <p className="text-sm text-red-500">
                {form.formState.errors.givenDate.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative">
            <label
              htmlFor="givenAmount"
              className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
            >
              <span className="inline-flex bg-background px-2">
                Given Amount
              </span>
            </label>
            <Input
              id="givenAmount"
              type="number"
              {...form.register("givenAmount", {
                valueAsNumber: true,
                onChange: (e) =>
                  form.setValue("givenAmount", parseFloat(e.target.value) || 0),
              })}
              className="rounded-sm font-lato text-lg font-semibold"
            />
            {form.formState.errors.givenAmount && (
              <p className="text-sm text-red-500">
                {form.formState.errors.givenAmount.message}
              </p>
            )}
          </div>

          <div className="group relative">
            <label
              htmlFor="amountPerInstallment"
              className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
            >
              <span className="inline-flex bg-background px-2">
                Amount per Installment
              </span>
            </label>
            <Input
              id="amountPerInstallment"
              type="number"
              {...form.register("amountPerInstallment", {
                valueAsNumber: true,
                onChange: (e) =>
                  form.setValue(
                    "amountPerInstallment",
                    parseFloat(e.target.value) || 0
                  ),
              })}
              className="rounded-sm font-lato text-lg font-semibold"
            />
            {form.formState.errors.amountPerInstallment && (
              <p className="text-sm text-red-500">
                {form.formState.errors.amountPerInstallment.message}
              </p>
            )}
          </div>
          <div className="group relative">
            <label
              htmlFor="totalInstallments"
              className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
            >
              <span className="inline-flex bg-background px-2">
                Total Installments
              </span>
            </label>
            <Input
              id="totalInstallments"
              type="number"
              {...form.register("totalInstallments", {
                valueAsNumber: true,
                onChange: (e) =>
                  form.setValue(
                    "totalInstallments",
                    parseInt(e.target.value) || 0
                  ),
              })}
              className="rounded-sm font-lato text-lg font-semibold"
            />
            {form.formState.errors.paidInstallmentDetails && (
              <p className="text-sm text-red-500">
                {form.formState.errors.paidInstallmentDetails.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group relative">
            <label
              htmlFor="paidInstallments"
              className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
            >
              <span className="inline-flex bg-background px-2">
                Paid Installments
              </span>
            </label>
            <Input
              id="paidInstallments"
              type="number"
              {...form.register("paidInstallments", {
                valueAsNumber: true,
                onChange: (e) => {
                  if (e.target.value > 300) {
                    e.target.value = 300;
                    return;
                  }
                  const value = parseInt(e.target.value) || 0;
                  const totalInstallments = form.getValues("totalInstallments");
                  if (value >= totalInstallments) {
                    form.setValue("paidInstallments", totalInstallments);
                  } else {
                    form.setValue("paidInstallments", value);
                  }
                  // Remove the array generation logic that was here
                },
              })}
              className="rounded-sm font-lato text-lg font-semibold"
            />
            {form.formState.errors.paidInstallments && (
              <p className="text-sm text-red-500">
                {form.formState.errors.paidInstallments.message}
              </p>
            )}
          </div>
          <div className="group relative">
            <label
              htmlFor="totalPaidAmount"
              className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
            >
              <span className="inline-flex bg-background px-2">
                Total Paid Amount
              </span>
            </label>
            <Input
              id="totalPaidAmount"
              type="number"
              {...form.register("totalPaidAmount", {
                valueAsNumber: true,
                onChange: (e) => {
                  const value = parseFloat(e.target.value) || 0;
                  const totalInstallments = form.getValues("totalInstallments");
                  const amountPerInstallment = form.getValues(
                    "amountPerInstallment"
                  );
                  if (value > totalInstallments * amountPerInstallment) {
                    e.target.value = totalInstallments * amountPerInstallment;
                    return;
                  }
                  form.setValue("totalPaidAmount", value);
                },
              })}
              className="rounded-sm font-lato text-lg font-semibold"
            />
            {form.formState.errors.totalPaidAmount && (
              <p className="text-sm text-red-500">
                {form.formState.errors.totalPaidAmount.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
