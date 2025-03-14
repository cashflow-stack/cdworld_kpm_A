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
import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/toolkit/store";
import {
  createNewtransactionEntry,
  resetTransactionState,
  updateTransactionEntry,
} from "../../state/transaction/transactionOperations";
import {
  ErrorNotification,
  SuccessNotification,
} from "@/components/Notification";
import { ReloadIcon } from "@radix-ui/react-icons";
import { isoStringToDate } from "@/toolkit/helper/helperFunctions";

const addVehicleExpensesSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive({ message: "Please enter a number greater than 0" }),
  description: z.string().optional(),
  paymentMethod: z.string({ message: "Please select a Payment Method" }),
  selectedVehicleId: z.string({ message: "Please Enter Vehicle Number" }),
  date: z.date({ message: "Please pick a date" }),
});

const AddVehicleExpenses = ({ transaction }: { transaction?: Transaction }) => {
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

  const defaultValues = useMemo(() => ({
    amount: transaction?.amount || 0,
    description: transaction
      ? "Updated Vehicle Expenses"
      : "Vehicle Expenses",
    paymentMethod: transaction?.additionalInfo.paymentMethod || PaymentMethod.CASH,
    date: isoStringToDate({ dateString: transaction?.dateTime || date }),
  }), [transaction, date]);

  const addVehicleExpensesForm = useForm<z.infer<typeof addVehicleExpensesSchema>>({
    resolver: zodResolver(addVehicleExpensesSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = useCallback((values: z.infer<typeof addVehicleExpensesSchema>) => {
    if (transaction) {
      dispatch(
        updateTransactionEntry({
          id: transaction.id,
          adminID: transaction.adminID,
          amount: values.amount,
          description: `${values.description ?? "Vehicle Expenses"} ${values.selectedVehicleId}`,
          paymentMethod: values.paymentMethod as PaymentMethod,
          date: values.date,
          incomeOrExpenseType: IncomeOrExpenseType.VEHICLEEXPENSE,
          transactionType: TransactionType.VEHICLEEXPENSE,
          initialAmount: transaction.amount,
        })
      );
      return;
    }
    dispatch(
      createNewtransactionEntry({
        amount: values.amount,
        description: `${values.description ?? "Vehicle Expenses"} ${values.selectedVehicleId}`,
        transactionType: TransactionType.VEHICLEEXPENSE,
        paymentMethod: values.paymentMethod as PaymentMethod,
        date: values.date,
        incomeOrExpenseType: IncomeOrExpenseType.VEHICLEEXPENSE,
      })
    );
  }, [dispatch, transaction]);

  return (
    <>
      {step === 1 ? (
        <>
          <DialogHeader>
            <DialogTitle>Add Vehicle Expenses</DialogTitle>
            <DialogDescription>
              Please enter the details of an expense for a vehicle
            </DialogDescription>
          </DialogHeader>
          <Form {...addVehicleExpensesForm}>
            <form
              onSubmit={addVehicleExpensesForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormInput
                control={addVehicleExpensesForm.control}
                label="Amount"
                name="amount"
                placeholder="Please Enter the Amount"
                isAmount={true}
              />
              <FormInput
                control={addVehicleExpensesForm.control}
                label="Description"
                name="description"
                placeholder="Enter Description"
              />
              <div className="grid grid-cols-2 gap-2 space-y-2.5">
                <FormSelect
                  control={addVehicleExpensesForm.control}
                  label="PaymentMethod"
                  name="paymentMethod"
                  placeholder="Select Payment Method"
                  options={Object.values(PaymentMethod).map((method) => method)}
                />
                <DateInput
                  control={addVehicleExpensesForm.control}
                  label="Date"
                  name="date"
                  placeholder="Pick a date"
                  fromDate={range[0]}
                />
              </div>
              <FormInput
                control={addVehicleExpensesForm.control}
                label="Vehicle"
                name="selectedVehicleId"
                placeholder="Enter Vehicle Number"
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
              text="Failed to add Vehicle Expenses"
            />
          ) : (
            <SuccessNotification
              onClose={() => {
                dispatch(resetTransactionState());
              }}
              text="Vehicle Expenses added successfully"
            />
          )}
        </>
      )}
    </>
  );
};

export default AddVehicleExpenses;
