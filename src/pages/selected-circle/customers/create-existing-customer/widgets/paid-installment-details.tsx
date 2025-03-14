import { UseFormReturn, useWatch } from "react-hook-form";
import { FormSchema } from "../lib/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react"; // Import the X icon

type PaidInstallmentDetailsProps = {
  form: UseFormReturn<FormSchema>;
};

export function PaidInstallmentDetails({ form }: PaidInstallmentDetailsProps) {
  const totalPaidAmount = useWatch({
    control: form.control,
    name: "totalPaidAmount",
    defaultValue: 0,
  });

  const paidInstallmentDetails = useWatch({
    control: form.control,
    name: "paidInstallmentDetails",
    defaultValue: [],
  });

  const loanDate = useWatch({
    control: form.control,
    name: "givenDate",
  });

  // Create a ref to store the timeout ID
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Add this flag to track whether dates have been actively selected
  const [selectedDateIndexes, setSelectedDateIndexes] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    // Initialize with one empty installment if totalPaidAmount > 0 and no installments exist
    if (totalPaidAmount > 0 && paidInstallmentDetails.length === 0) {
      form.setValue("paidInstallmentDetails", [
        { date: new Date(), amount: 0 },
      ]);
      // Don't mark as selected when auto-initializing
    }
  }, [totalPaidAmount, form]);

  useEffect(() => {
    // Calculate the sum of all entered installment amounts
    const currentTotal = paidInstallmentDetails.reduce(
      (sum, detail) => sum + (detail.amount || 0),
      0
    );

    // Get the last installment that's being edited
    const lastInstallment =
      paidInstallmentDetails[paidInstallmentDetails.length - 1];

    // Calculate remaining amount to allocate
    const remainingAmount = totalPaidAmount - currentTotal;

    // Check if we need to add another empty installment field
    // Only add a new field if the last installment is fully filled AND there's still amount left to allocate
    const shouldAddNewInstallment =
      paidInstallmentDetails.length > 0 &&
      lastInstallment?.date instanceof Date && // Last installment has a date
      lastInstallment?.amount > 0 && // Last installment has a non-zero amount
      remainingAmount > 0; // There's actually remaining amount to allocate

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (shouldAddNewInstallment) {
      // Set a new timeout to add the installment after a delay
      timeoutRef.current = setTimeout(() => {
        form.setValue("paidInstallmentDetails", [
          ...paidInstallmentDetails,
          { date: new Date(), amount: 0 },
        ]);
        // Don't mark as selected when auto-initializing
      }, 800); // 800ms delay before generating new installment
    }

    // Update the paidInstallments count based on valid entries
    const validInstallments = paidInstallmentDetails.filter(
      (detail) => detail.date !== null && detail.amount > 0
    ).length;
    form.setValue("paidInstallments", validInstallments);

    // Cleanup function to clear the timeout when the component unmounts or dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [paidInstallmentDetails, totalPaidAmount, form]);

  // Function to remove an installment
  const removeInstallment = (indexToRemove: number) => {
    const updatedInstallments = [...paidInstallmentDetails];
    updatedInstallments.splice(indexToRemove, 1);
    form.setValue("paidInstallmentDetails", updatedInstallments);
  };

  // Only render fields for installments that should be displayed
  const displayInstallments =
    paidInstallmentDetails.length > 0
      ? paidInstallmentDetails
      : totalPaidAmount > 0
      ? [{ date: "", amount: 0 }]
      : [];

  return (
    <div className="shadow-sm p-4 max-h-[calc(90vh)] overflow-y-auto bg-muted-foreground/5 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Paid Installments Details
      </h2>
      {displayInstallments.map((_, index) => (
        <div
          key={index}
          className="mb-4 p-3 border bg-zinc-900 rounded-md relative"
        >
          {/* X button to remove the installment */}
          {paidInstallmentDetails.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full hover:bg-destructive/20"
              onClick={() => removeInstallment(index)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove installment</span>
            </Button>
          )}

          <h3 className="font-medium mb-3 text-sm">Installment {index + 1}</h3>
          <div className="grid grid-cols-2 gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "rounded-sm text-sm",
                    !selectedDateIndexes.has(index) && "text-muted-foreground"
                  )}
                >
                  {selectedDateIndexes.has(index) ? (
                    format(
                      form.watch(`paidInstallmentDetails.${index}.date`),
                      "PP"
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  onSelect={(date) => {
                    if (date) {
                      form.setValue(
                        `paidInstallmentDetails.${index}.date`,
                        date
                      );
                      // Mark this index as having a selected date
                      setSelectedDateIndexes((prev) => {
                        const updated = new Set(prev);
                        updated.add(index);
                        return updated;
                      });
                    }
                  }}
                  disabled={(date) =>
                    date > new Date() || (loanDate && date < loanDate)
                  }
                />
              </PopoverContent>
            </Popover>
            {form.formState.errors.paidInstallmentDetails?.[index]?.date && (
              <p className="text-xs text-red-500">
                {
                  form.formState.errors.paidInstallmentDetails[index]?.date
                    ?.message
                }
              </p>
            )}
            <Input
              id={`paidInstallmentDetails.${index}.amount`}
              type="number"
              placeholder="Amount"
              {...form.register(`paidInstallmentDetails.${index}.amount`, {
                valueAsNumber: true,
                onChange: (e) => {
                  let value = parseFloat(e.target.value) || 0;

                  // Calculate the total of all other installments except this one
                  const otherInstallmentsTotal = paidInstallmentDetails.reduce(
                    (sum, detail, i) =>
                      i !== index ? sum + (detail.amount || 0) : sum,
                    0
                  );

                  // Ensure we don't exceed the total paid amount
                  const maxAmount = totalPaidAmount - otherInstallmentsTotal;
                  if (value > maxAmount) {
                    value = maxAmount;
                  }

                  form.setValue(
                    `paidInstallmentDetails.${index}.amount`,
                    value
                  );
                },
              })}
              className="rounded-sm font-lato text-lg tracking-wide font-semibold"
            />
            {form.formState.errors.paidInstallmentDetails?.[index]?.amount && (
              <p className="text-xs text-red-500">
                {
                  form.formState.errors.paidInstallmentDetails[index]?.amount
                    ?.message
                }
              </p>
            )}
          </div>
        </div>
      ))}
      {displayInstallments.length === 0 && (
        <p className="text-center text-muted-foreground">
          No paid installments added yet. Enter a total paid amount to begin.
        </p>
      )}

      <div className="mt-4 flex justify-between">
        <div className="text-sm text-muted-foreground">
          {totalPaidAmount > 0 ? (
            <>
              <span>Allocated: </span>
              <span
                className={
                  paidInstallmentDetails.reduce(
                    (sum, detail) => sum + (detail.amount || 0),
                    0
                  ) === totalPaidAmount
                    ? "text-green-500"
                    : "text-amber-400"
                }
              >
                {paidInstallmentDetails.reduce(
                  (sum, detail) => sum + (detail.amount || 0),
                  0
                )}{" "}
                / {totalPaidAmount}
              </span>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
