import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput, { DateInput, FormSelect } from "@/components/FormFields";
import { PaymentMethod, Transaction } from "@/models/API";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/toolkit/store";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  ErrorNotification,
  SuccessNotification,
} from "@/components/Notification";
import {
  createNewDayCaptialEntry,
  resetTransactionState,
  updateDayCaptialEntry,
} from "../../state/transaction/transactionOperations";
import { isoStringToDate } from "@/toolkit/helper/helperFunctions";

const addCaptialSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive({ message: "Please enter a number greater than 0" }),
  description: z.string().optional(),
  date: z.date({ message: "Please pick a date" }),
  paymentMethod: z.string({ message: "Please select a Payment Method" }),
});

const AddCaptial = ({ transaction }: { transaction?: Transaction }) => {
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
      description:
        transaction?.additionalInfo.description ||
        "Day Captial Balance Added to Circle",
      paymentMethod: "CASH",
      date: isoStringToDate({ dateString: transaction?.dateTime || date }),
    }),
    [transaction, date]
  );

  const dayCapitalForm = useForm<z.infer<typeof addCaptialSchema>>({
    resolver: zodResolver(addCaptialSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof addCaptialSchema>) => {
      const { amount, description, date, paymentMethod } = values;
      if (transaction) {
        dispatch(
          updateDayCaptialEntry({
            initialAmount: transaction.amount,
            adminID: transaction.adminID,
            id: transaction.id,
            amount,
            description: `${description}`,
            date: date,
            paymentMethod,
          })
        );
        return;
      }
      dispatch(
        createNewDayCaptialEntry({
          amount,
          description: description || "Day Captial Balance Added to Circle",
          date,
          paymentMethod,
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
            <DialogTitle>
              {transaction ? "Update Captial" : "Add Captial"}
            </DialogTitle>
            <DialogDescription>
              Please enter the amount you are given to the Agent
            </DialogDescription>
          </DialogHeader>
          <Form {...dayCapitalForm}>
            <form
              onSubmit={dayCapitalForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormInput
                control={dayCapitalForm.control}
                label="Amount"
                name="amount"
                placeholder="Please Enter the Amount"
                isAmount={true}
              />
              <FormInput
                control={dayCapitalForm.control}
                label="Description"
                name="description"
                placeholder="Enter Description"
              />
              <div className="grid grid-cols-2 gap-2 space-y-2.5">
                <FormSelect
                  control={dayCapitalForm.control}
                  label="PaymentMethod"
                  name="paymentMethod"
                  placeholder="Select Payment Method"
                  options={Object.values(PaymentMethod).map((method) => method)}
                />
                <DateInput
                  control={dayCapitalForm.control}
                  label="Date"
                  name="date"
                  placeholder="Pick a date"
                  fromDate={range[0]}
                />
              </div>
              <DialogFooter>
                {status === "creating" || status === "updating" ? (
                  <Button disabled>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit">
                    {transaction ? "Update Captial" : "Add Captial"}
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
              text="Failed to add Capital"
            />
          ) : (
            <SuccessNotification
              onClose={() => {
                dispatch(resetTransactionState());
              }}
              text={
                transaction
                  ? "Capital Updated Successfully"
                  : "Capital Added Successfully"
              }
            />
          )}
        </>
      )}
    </>
  );
};

export default AddCaptial;
