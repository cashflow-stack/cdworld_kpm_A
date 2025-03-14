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
import GetMembersList from "../FetchExistingMember";
import { useEffect, useState, useMemo, useCallback } from "react";
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
import {
  getValueByKey,
  isoStringToDate,
} from "@/toolkit/helper/helperFunctions";
import { cashAdjustment } from "@/constants/transactionOptions";

const addInvestmentSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive({ message: "Please enter a number greater than 0" }),
  description: z.string().optional(),
  adjustmentType: z.string(),
  selectedPartnerId: z.string({ message: "Please select a Partner" }),
  date: z.date({ message: "Please pick a date" }),
});

export default function CashAdjustments({
  transaction,
}: {
  transaction?: Transaction;
}) {
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
      description:
        transaction?.additionalInfo.description || "Cash Adjustments",
      adjustmentType:
        getValueByKey(
          cashAdjustment,
          "transactionType",
          transaction?.transactionType,
          "label"
        ) || "Deficit",
      paymentMethod: transaction?.additionalInfo.paymentMethod || "CASH",
      date: isoStringToDate({ dateString: transaction?.dateTime || date }),
      selectedPartnerId: transaction?.additionalInfo.memberID || "",
    }),
    [transaction, date]
  );

  const addInvestmentForm = useForm<z.infer<typeof addInvestmentSchema>>({
    resolver: zodResolver(addInvestmentSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof addInvestmentSchema>) => {
      const { amount, description, date, selectedPartnerId, adjustmentType } =
        values;
      const member = members.find((member) => member.id === selectedPartnerId);
      const type = adjustmentType == "Deficit" ? "DEFICIT" : "EXCESSCOLLECTION";
      const adjustmentDescription =
        adjustmentType == "Deficit" ? "Deficit" : "Excess Collection";
      if (transaction) {
        // update transaction
        dispatch(
          updateTransactionEntry({
            id: transaction.id,
            adminID: transaction.adminID,
            amount,
            description: `${description}`,
            date,
            paymentMethod: PaymentMethod.CASH,
            incomeOrExpenseType: type as IncomeOrExpenseType,
            transactionType: type as TransactionType,
            memberName: member?.name,
            memberID: member?.id,
            initialAmount: transaction.amount,
          })
        );
        return;
      }
      dispatch(
        createNewtransactionEntry({
          amount,
          description: adjustmentDescription,
          date,
          paymentMethod: PaymentMethod.CASH,
          incomeOrExpenseType: type as IncomeOrExpenseType,
          transactionType: type as TransactionType,
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
            <DialogTitle>
              {transaction ? "Update Cash Adjustment" : "Add Cash Adjustment"}
            </DialogTitle>
            <DialogDescription>
              Please enter the details of the Cash Adjustment
            </DialogDescription>
          </DialogHeader>
          <Form {...addInvestmentForm}>
            <form
              onSubmit={addInvestmentForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormInput
                control={addInvestmentForm.control}
                label="Amount"
                name="amount"
                placeholder="Please Enter the Amount"
                isAmount={true}
              />
              <FormInput
                control={addInvestmentForm.control}
                label="Description"
                name="description"
                placeholder="Enter Description"
              />
              <div className="grid grid-cols-2 gap-2 space-y-2.5">
                <FormSelect
                  control={addInvestmentForm.control}
                  label="Adjustment Type"
                  name="adjustmentType"
                  placeholder="Select Adjustment Type"
                  options={cashAdjustment.map((option) => option.label)}
                />
                <DateInput
                  control={addInvestmentForm.control}
                  label="Date"
                  name="date"
                  placeholder="Pick a date"
                  fromDate={range[0]}
                />
              </div>
              <GetMembersList control={addInvestmentForm.control} />
              <DialogFooter>
                {status === "creating" || status === "updating" ? (
                  <Button disabled>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit">
                    {transaction
                      ? "Update Cash Adjustment"
                      : "Add Cash Adjustment"}
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
              text="Failed to add Investment"
            />
          ) : (
            <SuccessNotification
              onClose={() => {
                dispatch(resetTransactionState());
              }}
              text="Investment added successfully"
            />
          )}
        </>
      )}
    </>
  );
}
