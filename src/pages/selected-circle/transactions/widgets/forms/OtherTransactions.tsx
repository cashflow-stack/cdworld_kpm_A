import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import FormInput, { FormSelect, DateInput } from "@/components/FormFields";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  IncomeOrExpenseType,
  PaymentMethod,
  Transaction,
  TransactionType,
} from "@/models/API";
import { otherIncomeOrExpenses } from "@/constants/transactionOptions";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/toolkit/store";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  ErrorNotification,
  SuccessNotification,
} from "@/components/Notification";
import {
  createNewtransactionEntry,
  resetTransactionState,
  updateTransactionEntry,
} from "../../state/transaction/transactionOperations";
import {
  getValueByKey,
  isoStringToDate,
} from "@/toolkit/helper/helperFunctions";

const otherTransactionsFormSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive({ message: "Please enter a number greater than 0" }),
  description: z.string().optional(),
  date: z.date({ message: "Please pick a date" }),
  paymentMethod: z.string({ message: "Please select a Payment Method" }),
  transactionType: z.string({ message: "Please select a Transaction Type" }),
});

const OtherTransactions = ({ transaction }: { transaction?: Transaction }) => {
  const [step, setStep] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const { date, range } = useSelector((state: RootState) => state.transactions);
  const { status } = useSelector(
    (state: RootState) => state.transactionOperations
  );

  useEffect(() => {
    if (status === "created" || status === "updated" || status === "failed") {
      setStep(2);
    } else {
      setStep(1);
    }
  }, [status]);

  const defaultValues = useMemo(
    () => ({
      amount: transaction?.amount || 0,
      description: transaction
        ? "Updated Circle Income or Expense"
        : "Circle Income or Expense",
      paymentMethod: transaction?.additionalInfo.paymentMethod || "CASH",
      transactionType:
        getValueByKey(
          otherIncomeOrExpenses,
          "transactionType",
          transaction?.transactionType,
          "label"
        ) || "Agent Expense",
      date: isoStringToDate({ dateString: transaction?.dateTime || date }),
    }),
    [transaction, date]
  );

  const otherTransactionsForm = useForm<
    z.infer<typeof otherTransactionsFormSchema>
  >({
    resolver: zodResolver(otherTransactionsFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof otherTransactionsFormSchema>) => {
      const { amount, description, paymentMethod, date, transactionType } =
        values;

      const selectedOption = otherIncomeOrExpenses.find(
        (option) => option.label === transactionType
      );
      const selectedTtype = selectedOption?.transactionType as TransactionType;
      const selectedItype =
        selectedOption?.incomeOrExpenseType as IncomeOrExpenseType;

      if (transaction) {
        dispatch(
          updateTransactionEntry({
            id: transaction.id,
            adminID: transaction.adminID,
            amount,
            description: `${description}`,
            date,
            paymentMethod: paymentMethod as PaymentMethod,
            transactionType: selectedTtype,
            incomeOrExpenseType: selectedItype,
            initialAmount: transaction.amount,
          })
        );
        return;
      }

      dispatch(
        createNewtransactionEntry({
          amount,
          description: description || "Other Transactions",
          paymentMethod: paymentMethod as PaymentMethod,
          date,
          transactionType: selectedTtype,
          incomeOrExpenseType: selectedItype,
        })
      );
    },
    [dispatch, transaction]
  );

  return (
    <>
      {step === 1 ? (
        <>
          <DialogHeader>
            <DialogTitle>Other Income/Expense Type</DialogTitle>
            <DialogDescription>
              Please enter the details for the transaction type
            </DialogDescription>
          </DialogHeader>
          <Form {...otherTransactionsForm}>
            <form
              onSubmit={otherTransactionsForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormInput
                control={otherTransactionsForm.control}
                label="Amount"
                name="amount"
                placeholder="Please Enter the Amount"
                isAmount={true}
              />
              <FormInput
                control={otherTransactionsForm.control}
                label="Description"
                name="description"
                placeholder="Enter Description"
              />
              <div className="grid grid-cols-2 gap-2 space-y-2.5">
                <FormSelect
                  control={otherTransactionsForm.control}
                  label="PaymentMethod"
                  name="paymentMethod"
                  placeholder="Select Payment Method"
                  options={Object.values(PaymentMethod).map((method) => method)}
                />

                <DateInput
                  control={otherTransactionsForm.control}
                  label="Date"
                  name="date"
                  placeholder="Pick a date"
                  fromDate={range[0]}
                />
              </div>
              <FormSelect
                control={otherTransactionsForm.control}
                label="Transaction Type"
                name="transactionType"
                placeholder="Select Transaction Type"
                options={otherIncomeOrExpenses.map((option) => option.label)}
              />
              <DialogFooter>
                {status === "creating" || status === "updating" ? (
                  <Button disabled>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                    <Button type="submit">
                    {transaction ? "Update" : "Submit"}
                    </Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </>
      ) : (
        <>
          {status === "failed" ? (
            <ErrorNotification
              onClose={() => {
                dispatch(resetTransactionState());
              }}
              text="Failed to create transaction"
            />
          ) : (
            <SuccessNotification
              onClose={() => {
                dispatch(resetTransactionState());
              }}
              text="Transaction created successfully"
            />
          )}
        </>
      )}
    </>
  );
};

export default OtherTransactions;
