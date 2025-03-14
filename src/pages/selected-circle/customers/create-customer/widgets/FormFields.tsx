import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormData } from "../utils/formSchema";
import { useSelector } from "react-redux";
import { RootState } from "@/toolkit/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CashAccount, Weekday } from "@/models/API";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface FormFieldsProps {
  form: ReturnType<typeof useForm<FormData>>;
  customerType: "new" | "existing";
  setCustomerType: (value: "new" | "existing") => void;
  cashAccount: CashAccount | null;
  weekday: Weekday;
}

export const FormFields: React.FC<FormFieldsProps> = ({
  form,
  customerType,
  setCustomerType,
  cashAccount,
  weekday,
}) => {
  const { cities } = useSelector((state: RootState) => state.cities);
  return (
    <>
      <Tabs
        value={customerType}
        onValueChange={(value) => {
          setCustomerType(value as "new" | "existing");
          form.setValue("customerType", value as "new" | "existing");
        }}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new">New Customer</TabsTrigger>
          <TabsTrigger value="existing">Existing Customer</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Customer Fields */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Customer Name&nbsp;<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Mobile Number&nbsp;<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="10-digit Mobile Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="aadharCardNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Aadhar Card Number&nbsp;
              <span className="text-muted-foreground/50">(Optional)</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="12-Digit Aadhar Number" {...field} />
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
            <FormLabel>
              Address &nbsp;
              <span className="text-muted-foreground/50">(Optional)</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Address eg-(123 Main St, Apartment 4B)"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              City&nbsp;<span className="text-red-500">*</span>
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="guarantorDetails"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Guarantor Details &nbsp;
              <span className="text-muted-foreground/50">(Optional)</span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter guarantor name, contact information, and any other relevant details"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <h3 className="text-sm font-medium">
          Documents Collected&nbsp;
          <span className="text-muted-foreground/50">(Optional)</span>
        </h3>

        <div className="space-x-4 flex items-center">
          <FormField
            control={form.control}
            name="promissoryNote"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-lg border p-3 shadow has-[[data-state=checked]]:border-ring">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Promissory Note</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emptyCheque"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-3 shadow has-[[data-state=checked]]:border-ring">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Empth Cheque</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Loan Fields */}
      <div className="space-y-6 border-t border-input py-6">
        <h3 className="text-lg font-medium">
          Loan Details&nbsp;<span className="text-red-500">*</span>
        </h3>
        {weekday !== Weekday.MONTHLY && (
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Installment Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className={`flex flex-wrap ${
                      weekday === Weekday.DAILY
                        ? "justify-between"
                        : "justify-start gap-4"
                    }`}
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="loanBookId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Serial</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Loan Serial"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? "" : parseFloat(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="givenDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Given Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) => {
                        const isNewCustomer = customerType === "new";
                        const lastClosingDate = new Date(
                          cashAccount?.closingEntryDate ?? "1900-01-01"
                        );
                        return (
                          date > new Date() ||
                          date <
                            (isNewCustomer
                              ? lastClosingDate
                              : new Date("1900-01-01"))
                        );
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="givenAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Given Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Given Amount (9,800)"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? "" : parseFloat(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amountPerInstallment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount per Installment</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Per Installment (1,000)"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? "" : parseFloat(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="totalInstallments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Installments</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Total Installments (10)"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? "" : parseInt(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {customerType === "existing" && (
            <FormField
              control={form.control}
              name="paidInstallments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid Installments</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : parseInt(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {customerType === "existing" && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="totalPaidAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Paid Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? ""
                            : parseFloat(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
    </>
  );
};
