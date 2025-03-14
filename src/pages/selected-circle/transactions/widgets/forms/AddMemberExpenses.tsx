import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import FormInput, { FormSelect, DateInput } from "@/components/FormFields";
import {
  IncomeOrExpenseType,
  PaymentMethod,
  Transaction,
  TransactionType,
} from "@/models/API";
import { Button } from "@/components/ui/button";
import { memberExpense } from "@/constants/transactionOptions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/toolkit/store";
import GetMembersList from "../FetchExistingMember";
import {
  createNewtransactionEntry,
  resetTransactionState,
  updateTransactionEntry,
} from "../../state/transaction/transactionOperations";
import { useEffect, useState, useMemo, useCallback } from "react";
import {
  ErrorNotification,
  SuccessNotification,
} from "@/components/Notification";
import { ReloadIcon } from "@radix-ui/react-icons";
import { isoStringToDate } from "@/toolkit/helper/helperFunctions";

const addExpensesSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive({ message: "Please enter a number greater than 0" }),
  description: z.string().optional(),
  expenseType: z.string(),
  paymentMethod: z.string({ message: "Please select a Payment Method" }),
  selectedPartnerId: z.string({ message: "Please select a Partner" }),
  date: z.date({ message: "Please pick a date" }),
});

/**
 * Renders a form for adding expenses.
 *
 * @returns The rendered AddExpenses form component.
 */
function AddMemberExpensesForm({ transaction }: { transaction?: Transaction }) {
  const [step, setStep] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const { members } = useSelector(
    (state: RootState) => state.selectedCircleMembers
  );
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
        ? "Updated Member (Or) Agent Expenses"
        : "Agent (Or) Member Expenses",
      expenseType: "AGENTLOAN",
      paymentMethod:
        transaction?.additionalInfo.paymentMethod || PaymentMethod.CASH,
      date: isoStringToDate({ dateString: transaction?.dateTime || date }),
      selectedPartnerId: transaction?.additionalInfo.memberID || "",
    }),
    [transaction, date]
  );

  const addExpensesForm = useForm<z.infer<typeof addExpensesSchema>>({
    resolver: zodResolver(addExpensesSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof addExpensesSchema>) => {
      const {
        date,
        amount,
        description,
        paymentMethod,
        selectedPartnerId,
        expenseType,
      } = values;
      const member = members.find((member) => member.id === selectedPartnerId);
      if (transaction) {
        dispatch(
          updateTransactionEntry({
            id: transaction.id,
            adminID: transaction.adminID,
            amount,
            description: `${description}`,
            date,
            paymentMethod: paymentMethod as PaymentMethod,
            incomeOrExpenseType: expenseType as IncomeOrExpenseType,
            transactionType: TransactionType.MEMBEREXPENSE,
            memberName: member?.name,
            memberID: member?.id,
            initialAmount: transaction.amount,
          })
        );
        return;
      }

      dispatch(
        createNewtransactionEntry({
          date,
          amount,
          description: description ?? "Agent (Or) Member Expenses",
          paymentMethod: paymentMethod as PaymentMethod,
          incomeOrExpenseType: expenseType as IncomeOrExpenseType,
          transactionType: TransactionType.MEMBEREXPENSE,
          memberName: member?.name,
          memberID: member?.id,
        })
      );
    },
    [dispatch, transaction, members]
  );

  return (
    <>
      {step === 1 ? (
        <>
          <DialogHeader>
            <DialogTitle>Add Expenses</DialogTitle>
            <DialogDescription>
              Please enter the details of an expense for an agent or member
            </DialogDescription>
          </DialogHeader>
          <Form {...addExpensesForm}>
            <form
              onSubmit={addExpensesForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormInput
                control={addExpensesForm.control}
                label="Amount"
                name="amount"
                placeholder="Please Enter the Amount"
                isAmount={true}
              />
              <FormInput
                control={addExpensesForm.control}
                label="Description"
                name="description"
                placeholder="Enter Description"
              />
              <div className="grid grid-cols-2 gap-2 space-y-2.5">
                <FormSelect
                  control={addExpensesForm.control}
                  label="PaymentMethod"
                  name="paymentMethod"
                  placeholder="Select Payment Method"
                  options={Object.values(PaymentMethod).map((method) => method)}
                />
                <DateInput
                  control={addExpensesForm.control}
                  label="Date"
                  name="date"
                  placeholder="Pick a date"
                  fromDate={range[0]}
                />
              </div>
              <GetMembersList control={addExpensesForm.control} />
              <FormSelect
                control={addExpensesForm.control}
                label="Expense Type"
                name="expenseType"
                placeholder="Select Expense Type"
                keyPair={memberExpense.map((expense) => ({
                  key: expense.label,
                  value: expense.incomeOrExpenseType,
                }))}
              />
              <DialogFooter>
                {status === "creating" || status === "updating" ? (
                  <Button disabled>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                    <Button type="submit">
                    {transaction ? "Update Expense" : "Add Expense"}
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
              text="Failed to add Expenses"
            />
          ) : (
            <SuccessNotification
              onClose={() => {
                dispatch(resetTransactionState());
              }}
              text="Expenses added successfully"
            />
          )}
        </>
      )}
    </>
  );
}

export default AddMemberExpensesForm;
