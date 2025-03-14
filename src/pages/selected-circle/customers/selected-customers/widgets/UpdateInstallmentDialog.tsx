import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormInput, { DateInput } from "@/components/FormFields";
import { Installment, Loan } from "@/models/API";
import { Button } from "@/components/ui/button";
import { Edit, Loader2 } from "lucide-react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/toolkit/store";
import { fetchLastClosingEntry } from "@/toolkit/common/last-closing-entry/closingSlice";
import {
  ErrorNotification,
  SuccessNotification,
} from "@/components/Notification";
import {
  resetInstallmentOperation,
  updateInstallment,
} from "../state/installmentOperationSlice";
import { validateClosingDate } from "@/toolkit/helper/helperFunctions";

const formSchema = z.object({
  amount: z.number().min(2).max(100000),
  date: z.date().optional(),
});

export default function UpdateInstallmentDialog({
  allInstallments,
  installment,
  loan,
}: {
  allInstallments: Installment[];
  installment: Installment;
  loan: Loan;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { cashAccount } = useSelector((state: RootState) => state.closing);
  const { status } = useSelector(
    (state: RootState) => state.installmentOperations
  );

  useEffect(() => {
    dispatch(fetchLastClosingEntry({ selectedCircleID: installment.circleID }));
  }, [dispatch, installment.circleID]);

  const lastClosingDate = useMemo(() => new Date(cashAccount?.closingEntryDate!), [cashAccount]);
  const installmentPaidDate = useMemo(() => new Date(installment.paidDate!), [installment]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    reValidateMode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: installment.paidAmount!,
      date: new Date(installment.paidDate!),
    },
  });

  const onSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    dispatch(
      updateInstallment({
        allInstallments,
        loan,
        installment,
        newAmount: values.amount,
        newDate: validateClosingDate(
          cashAccount?.closingEntryDate!,
          values.date!
        ),
      })
    );
    form.reset();
  }, [dispatch, allInstallments, loan, installment, cashAccount, form]);

  const onDialogClose = useCallback((value?: boolean) => {
    dispatch(resetInstallmentOperation());
    setIsDialogOpen(value || false);
    form.reset();
  }, [dispatch, form]);

  if (installmentPaidDate < lastClosingDate || loan.status === "CLOSED") {
    return (
      <Button
        size={"icon"}
        variant={"ghost"}
        disabled={true}
        className="cursor-not-allowed"
      >
        <Edit size={20} />
      </Button>
    );
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={onDialogClose}>
      <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
        <Button size={"icon"} variant={"ghost"}>
          <Edit size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Update Installment</DialogTitle>
          <DialogDescription>
            Update the amount and date of the installment.
          </DialogDescription>
        </DialogHeader>
        {status === "updated" && (
          <SuccessNotification
            text="Installment updated successfully"
            onClose={onDialogClose}
          />
        )}
        {status === "failed" && (
          <ErrorNotification
            text="Failed to update installment"
            onClose={onDialogClose}
          />
        )}
        {status !== "updated" && status !== "failed" && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormInput
                control={form.control}
                label="Amount"
                name="amount"
                placeholder="Enter Updated Amount"
                isAmount={true}
                fromDate={cashAccount?.closingEntryDate}
              />
              <DateInput
                control={form.control}
                label="Date"
                name="date"
                placeholder="Select Date"
                fromDate={cashAccount?.closingEntryDate}
              />
              <DialogFooter>
                {status === "updating" ? (
                  <Button disabled>
                    <Loader2 className="animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit">Save changes</Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
