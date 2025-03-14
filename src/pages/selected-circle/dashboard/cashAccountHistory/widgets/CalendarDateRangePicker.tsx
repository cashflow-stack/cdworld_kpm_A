import { zodResolver } from "@hookform/resolvers/zod";
import { subDays, format, subMonths } from "date-fns";
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
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import {
  formatDateToYYYYMMDD,
  processDate,
} from "@/toolkit/helper/helperFunctions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { fetchClosingHistory } from "../state/closingHistorySlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";

const FormSchema = z.object({
  range: z
    .object({
      from: z.string().nullable().optional(),
      to: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
});

export function CalendarDateRangePicker() {
  const dispatch = useAppDispatch();
  const { selectedCircle } = useAppSelector((state) => state.dataHelper);
  const { range } = useAppSelector((state) => state.closingHistory);

  const [date, setDate] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    const today = new Date();
    const lastMonth = subMonths(today, 1);
    setDate({
      from:
        range?.[0] ||
        new Date(
          lastMonth.getFullYear(),
          lastMonth.getMonth(),
          lastMonth.getDate()
        ),
      to:
        range?.[1] ||
        new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    });
  }, [selectedCircle, range]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const start = processDate({
      operation: "start",
      dateString: data?.range?.from,
    });
    const end = processDate({ operation: "end", dateString: data?.range?.to });
    if (selectedCircle) {
      dispatch(
        fetchClosingHistory({
          circleID: selectedCircle?.id!,
          fromDate: start,
          toDate: end,
        })
      );
    }
    setDate({
      from: new Date(start.split("T")[0]),
      to: new Date(end.split("T")[0]),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-4 items-center"
      >
        <FormField
          control={form.control}
          name="range"
          render={({ field }) => (
            <FormItem>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon
                        size={16}
                        className="mr-2 text-muted-foreground"
                      />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")}
                            <span className="text-muted-foreground px-2">
                              &rarr;
                            </span>
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="flex w-auto flex-col space-y-2 p-2"
                  align="end"
                >
                  <Select
                    onValueChange={(value) => {
                      const previousDay = subDays(new Date(), Number(value));
                      if (
                        value !== "30" &&
                        value !== "90" &&
                        value !== "180" &&
                        value !== "365"
                      ) {
                        setDate({
                          from: previousDay,
                          to: previousDay,
                        });
                        field.onChange({
                          from: formatDateToYYYYMMDD(previousDay),
                          to: formatDateToYYYYMMDD(previousDay),
                        });
                      } else {
                        setDate({
                          from: previousDay,
                          to: new Date(),
                        });
                        field.onChange({
                          from: formatDateToYYYYMMDD(previousDay),
                          to: formatDateToYYYYMMDD(new Date()),
                        });
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Range" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="0">Today</SelectItem>
                      <SelectItem value="1">Yesterday</SelectItem>
                      <SelectItem value="2">2 Days Back</SelectItem>
                      <SelectItem value="3">3 Days Back</SelectItem>
                      <SelectItem value="4">4 Days Back</SelectItem>
                      <SelectItem value="5">5 Days Back</SelectItem>
                      <SelectItem value="6">6 Days Back</SelectItem>
                      <SelectItem value="30">Last One Month</SelectItem>
                      <SelectItem value="90">Last Three Months</SelectItem>
                      <SelectItem value="180">Last Six Months</SelectItem>
                      <SelectItem value="365">Last One Year</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <div className="rounded-md border"></div> */}
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={(selection) => {
                      setDate(selection);
                      if (selection) {
                        field.onChange({
                          from:
                            selection.from &&
                            formatDateToYYYYMMDD(selection.from),
                          to:
                            selection.to && formatDateToYYYYMMDD(selection.to),
                        });
                      }
                    }}
                    numberOfMonths={2}
                    disabled={(date) =>
                      date > new Date() || date < new Date("2015-01-01")
                    }
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="text-sm"
                    variant="default"
                    disabled={!date}
                    onClick={() => onSubmit(form.getValues())}
                  >
                    {" "}
                    Submit
                  </Button>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
