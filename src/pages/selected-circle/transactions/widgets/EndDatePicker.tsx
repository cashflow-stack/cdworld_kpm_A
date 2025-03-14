import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import {
  formatDateTimeToISOString,
  getFormattedDate,
  getTimeFromISODateTime,
  isoDateTimeToDate,
  processDate,
} from "@/toolkit/helper/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/toolkit/store";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { fetchTransactions } from "../state/transaction/transactionSlice";
import { createSelector } from '@reduxjs/toolkit';
import { CalendarIcon } from "lucide-react";

const FormSchema = z.object({
  toDate: z.date({
    required_error: "A date is required.",
  }),
});

const selectCashAccount = (state: RootState) => state.transactions.cashAccount;
const selectToDate = (state: RootState) => state.transactions.date;
const selectSelectedCircle = (state: RootState) => state.dataHelper.selectedCircle;

const selectCombinedData = createSelector(
  [selectCashAccount, selectToDate, selectSelectedCircle],
  (cashAccount, toDate, selectedCircle) => ({
    cashAccount,
    toDate,
    selectedCircle,
  })
);

export function EndDatePicker() {
  const dispatch = useDispatch<AppDispatch>();
  const { cashAccount, toDate, selectedCircle } =
    useSelector(selectCombinedData);
  const lastClosingDate = cashAccount?.closingEntryDate;
  const today = toDate ? new Date(toDate.split("T")[0]) : new Date();
  const [date, setDate] = useState<Date | undefined>(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      toDate: date,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!selectedCircle) return;
    dispatch(
      fetchTransactions({
        toDate: formatDateTimeToISOString(data.toDate),
        selectedCircleID: selectedCircle?.id,
      })
    );
  }

  return (
    <div className="flex items-center">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">
            <span className="text-muted-foreground">@From</span> &nbsp;&nbsp;
            {lastClosingDate
              ? `${getFormattedDate(lastClosingDate, "short")}`
              : `${getFormattedDate(
                  `${processDate({ operation: "start" })}`,
                  "short"
                )}`}
            &nbsp; &nbsp; &#x27F6;
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-50">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Last Closing Entry:</h4>
              <p className="text-xs text-muted-foreground">
                {lastClosingDate
                  ? "All the information below is from all transactions starting the next moment after your last closing entry on "
                  : "No closing found. All transactions will be visible starting from the moment you created a closing entry."}
              </p>
              {lastClosingDate && (
                <div className="flex items-center pt-2 font-medium text-rose-500 dark:text-brand">
                  <CalendarIcon size={16} className="mr-2 opacity-70" />{" "}
                  <span className="text-xs">
                    {lastClosingDate
                      ? `${getFormattedDate(
                          lastClosingDate,
                          "long"
                        )} at ${getTimeFromISODateTime(lastClosingDate)}`
                      : "No closing date"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      <Form {...form}>
        <form className="flex gap-2 items-center">
          <FormField
            control={form.control}
            name="toDate"
            render={({ field }) => (
              <FormItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-[150px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "LLL dd, y")
                        ) : date ? (
                          format(date, "LLL dd, y")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-1"/>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="flex w-auto flex-col p-0">
                    <Calendar
                      initialFocus
                      mode="single"
                      defaultMonth={date}
                      selected={date}
                      onSelect={(selection) => {
                        setDate(selection);
                        if (selection) {
                          field.onChange(selection);
                        }
                      }}
                      disabled={(date) =>
                        date > new Date() ||
                        date <
                          new Date(
                            `${
                              lastClosingDate
                                ? isoDateTimeToDate(lastClosingDate)
                                : new Date()
                            }`
                          )
                      }
                    />
                    <Button
                      disabled={!date}
                      onClick={() => form.handleSubmit(onSubmit)()}
                      className="mx-3 mb-3"
                    >
                      Submit
                    </Button>
                    <PopoverClose asChild></PopoverClose>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
