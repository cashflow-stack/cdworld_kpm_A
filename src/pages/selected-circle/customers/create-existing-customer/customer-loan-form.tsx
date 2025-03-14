import { useState, useCallback, useEffect, useRef, memo, useMemo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { formSchema, FormSchema } from "./lib/schemas";
import { CustomerDetails } from "./widgets/customer-details";
import { LoanDetails } from "./widgets/loan-details";
import { PaidInstallmentDetails } from "./widgets/paid-installment-details";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/toolkit/store";
import { Calendar, LoaderCircle } from "lucide-react";
import {
  createLoanWithInstallments,
  resetAll,
} from "../state/customerOperationSlice";
import { InstallmentType } from "@/models/API";
import { Divider } from "@aws-amplify/ui-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  calculateDate,
  CurrencyFormatter,
  formatDate,
  formatDateToYYYYMMDD,
} from "@/toolkit/helper/helperFunctions";

// Success modal component
const SuccessModal = memo(
  ({
    customerName,
    onClose,
  }: {
    customerName: string;
    onClose: () => void;
  }) => (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-card w-full max-w-md rounded-lg shadow-lg p-8 space-y-6 border relative">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-primary">
            Loan Created Successfully!
          </h2>
          <p className="text-muted-foreground">
            The loan has been successfully created with all installment details
            for {customerName}.
          </p>
          <div className="w-full pt-4">
            <Button className="w-full" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
);

// Error modal component
const ErrorModal = memo(
  ({
    error,
    onBack,
    onRetry,
  }: {
    error: string;
    onBack: () => void;
    onRetry: () => void;
  }) => (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-card w-full max-w-md rounded-lg shadow-lg p-8 space-y-6 border relative">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-destructive">
            Failed to Create Loan
          </h2>
          <p className="text-muted-foreground">
            {error ||
              "An error occurred while creating the loan. Please try again."}
          </p>
          <div className="w-full pt-4 space-y-2">
            <Button variant="outline" onClick={onBack} className="w-full">
              Back to Summary
            </Button>
            <Button onClick={onRetry} className="w-full" variant="destructive">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
);

export default function CustomerLoanForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCircle, admin } = useSelector(
    (state: RootState) => state.dataHelper,
    (prev, next) => prev.selectedCircle?.id === next.selectedCircle?.id
  );
  const [date, setDate] = useState<Date>();
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showSummary && dialogRef.current) {
      const dialogContent = dialogRef.current.closest('[role="dialog"]');
      if (dialogContent) {
        dialogContent.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  }, [showSummary]);

  const handleShowSummary = useCallback(
    (value: boolean) => {
      setShowSummary(value);
    },
    [showSummary]
  );

  const type =
    selectedCircle?.day == "DAILY"
      ? "DAILY"
      : selectedCircle?.day == "MONTHLY"
      ? "MONTHLY"
      : "WEEKLY";

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      paidInstallments: 0,
      totalPaidAmount: 0,
      type: type,
      givenAmount: 0,
      amountPerInstallment: 0,
      totalInstallments: 0,
      paidInstallmentDetails: [],
      promissoryNote: false,
      emptyCheque: false,
    },
  });

  const onSubmit = useCallback(() => {
    setShowSummary(true);
  }, [showSummary]);

  const onFinalSubmit = useCallback(
    (
      values: FormSchema // Here you would typically send the form formValues to your backend
    ) =>
      dispatch(
        createLoanWithInstallments({
          admin: admin!,
          selectedCircle: selectedCircle!,
          installmentType: values.type as InstallmentType,
          promissoryNote: values.promissoryNote || false,
          emptyCheque: values.emptyCheque || false,
          ...values,
          loanBookId: `${values.loanBookId}`,
        })
      ),
    [dispatch, admin, selectedCircle]
  );

  return (
    <>
      <div ref={dialogRef} className="scroll-smooth">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Existing Customer Loan Form
          </DialogTitle>
          <DialogDescription>
            Fill the form to add existing loan for an existing customer.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CustomerDetails form={form} />
              <LoanDetails
                form={form}
                date={date}
                setDate={setDate}
                weekday={selectedCircle?.day!}
              />
            </div>
            <div className="lg:col-span-1">
              <PaidInstallmentDetails form={form} />
            </div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  handleShowSummary(false);
                  window.location.reload();
                }}
              >
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
      {showSummary && (
        <FinalSummary
          form={form}
          setSummary={() => handleShowSummary(false)}
          finalSubmit={() => onFinalSubmit(form.getValues())}
        />
      )}
    </>
  );
}

interface finalSummaryprops {
  form: UseFormReturn<FormSchema>;
  setSummary: () => void;
  finalSubmit: () => void;
}

const FinalSummary = memo(
  ({ form, setSummary, finalSubmit }: finalSummaryprops) => {
    const dispatch = useDispatch<AppDispatch>();
    const { status, error } = useSelector(
      (state: RootState) => state.customerOperations
    );
    const { cities } = useSelector((state: RootState) => state.cities);

    const handelOnClose = () => {
      form.reset();
      setSummary();
      dispatch(resetAll());
    };

    const formValues = form.getValues();
    const calculations = useMemo(
      () => ({
        isValidAmount:
          formValues.givenAmount <=
          formValues.amountPerInstallment * formValues.totalInstallments,
        cumulativePaidAmount: formValues.paidInstallmentDetails.reduce(
          (sum, installment) => sum + installment.amount,
          0
        ),
        remainingInstallments:
          formValues.totalInstallments - formValues.paidInstallments,
        remainingAmount:
          formValues.amountPerInstallment * formValues.totalInstallments -
          formValues.totalPaidAmount,
      }),
      [formValues]
    );

    if (status === "created") {
      return (
        <SuccessModal
          customerName={formValues.customerName}
          onClose={handelOnClose}
        />
      );
    }

    if (status === "failed") {
      return (
        <ErrorModal
          error={error || "something went wrong"}
          onBack={setSummary}
          onRetry={finalSubmit}
        />
      );
    }

    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-card w-full max-w-5xl rounded-lg shadow-lg px-6 space-y-4 border relative overflow-hidden max-h-[100vh]">
          <div
            className="absolute inset-0 backdrop-blur-lg opacity-30"
            style={{ backgroundImage: "var(--card-noise)" }}
          />

          <div className="relative flex flex-col h-full max-h-[calc(93vh)]">
            <h2 className="text-2xl font-bold text-primary">Summary</h2>

            <div className="grid grid-cols-12 gap-6 overflow-y-auto flex-grow">
              {/* Left Column - Customer & Loan Details */}
              <div className="col-span-12 md:col-span-5 space-y-6">
                {/* Customer Details Card */}
                <Card className="rounded-lg border-none p-4">
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    Customer Details
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="text-muted-foreground">Name:</span>{" "}
                      {formValues.customerName}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Mobile:</span>{" "}
                      {formValues.mobileNumber}
                    </p>
                    <p>
                      <span className="text-muted-foreground">City:</span>{" "}
                      {cities.find((city) => city.id === formValues.city)?.name}
                    </p>
                    {formValues.address && (
                      <p>
                        <span className="text-muted-foreground">Address:</span>{" "}
                        {formValues.address}
                      </p>
                    )}
                    {formValues.aadharNumber && (
                      <p>
                        <span className="text-muted-foreground">Aadhar:</span>{" "}
                        {formValues.aadharNumber}
                      </p>
                    )}
                  </div>
                </Card>

                {/* Loan Details Card */}
                <Card className="w-full border-none">
                  <CardContent className="p-4 space-y-4">
                    <h3 className="text-lg font-semibold text-primary mb-3">
                      Loan Details
                    </h3>
                    {CurrencyFormatter({
                      amount:
                        Number(formValues.amountPerInstallment) *
                          Number(formValues.totalInstallments) -
                          Number(formValues.totalPaidAmount) || 0,
                      className:
                        "font-lato font-semibold text-4xl text-teal-500",
                    })}
                    <div className="text-muted-foreground">
                      Balance(
                      {(
                        Number(formValues.amountPerInstallment) *
                        Number(formValues.totalInstallments)
                      ).toLocaleString("en-IN")}
                      &nbsp; - &nbsp;
                      {Number(formValues.totalPaidAmount).toLocaleString(
                        "en-IN"
                      ) || 0}
                      )
                    </div>

                    <Divider />

                    <div className="space-y-4 pt-2">
                      <div className="flex justify-between items-center">
                        <div className="font-semibold">Total Outstanding</div>
                        <div className="font-medium">
                          {CurrencyFormatter({
                            amount:
                              Number(formValues.amountPerInstallment) *
                              Number(formValues.totalInstallments),
                            className: "font-lato font-semibold text-xl",
                          })}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="">Given Amount</div>
                        <div className=" font-medium">
                          {CurrencyFormatter({
                            amount: Number(formValues.givenAmount),
                            className: "font-lato font-semibold text-xl",
                          })}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="">Per Installment</div>
                        <div className=" font-medium">
                          {CurrencyFormatter({
                            amount: Number(formValues.amountPerInstallment),
                            className: "font-lato font-semibold text-xl",
                          })}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-lg">Installment Type</div>
                        <div className="text-lg font-medium">
                          {formValues.type}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-lg">Remaining Payments</div>
                        <div className="text-lg font-semibold font-lato">
                          {Number(formValues.totalInstallments) -
                            Number(formValues.paidInstallments)}
                          ({formValues.totalInstallments}&nbsp;-&nbsp;
                          {formValues.paidInstallments || 0})
                        </div>
                      </div>
                    </div>

                    <Divider />

                    <div className="flex items-center justify-center gap-2 pt-2">
                      <Calendar className="h-5 w-5" />
                      <span className="text-lg font-sans font-semibold">
                        {formatDate(formatDateToYYYYMMDD(formValues.givenDate))}{" "}
                        &nbsp; &rarr; &nbsp;
                        {formatDate(
                          calculateDate({
                            date: formatDateToYYYYMMDD(formValues.givenDate),
                            installmentType: formValues.type as InstallmentType,
                            totalInstallments: Number(
                              formValues.totalInstallments
                            ),
                            paidInstallments: Number(
                              formValues.paidInstallments
                            ),
                          })
                        )}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Paid Installments Table */}
              <div className="col-span-12 md:col-span-7">
                <Card className="rounded-lg border-none h-full flex flex-col">
                  <div className="p-4 border-b bg-card">
                    <h3 className="text-lg font-semibold text-primary">
                      Paid Installments
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Total {formValues.paidInstallmentDetails.length} payments
                      recorded
                    </p>
                  </div>

                  <div className="overflow-y-auto flex-grow">
                    <table className="w-full">
                      <thead className="sticky top-0 bg-card z-10">
                        <tr className="border-b">
                          <th className="text-left p-3">No.</th>
                          <th className="text-left p-3">Date</th>
                          <th className="text-right p-3">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formValues.paidInstallmentDetails.map(
                          (installment, index) => (
                            <tr
                              key={index}
                              className="border-b last:border-0 hover:bg-muted/50"
                            >
                              <td className="p-3 text-muted-foreground">
                                {index + 1}
                              </td>
                              <td className="p-3">
                                {installment.date.toLocaleDateString()}
                              </td>
                              <td className="p-3 text-right font-medium">
                                ₹{installment.amount}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </div>

            {/* Footer - Validation Messages & Actions */}
            <div className="m-1 sticky bottom-0">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2 flex-grow">
                  {(!calculations.isValidAmount ||
                    calculations.cumulativePaidAmount !==
                      formValues.totalPaidAmount) && (
                    <div className="rounded-lg bg-destructive/10 p-3 text-red-500 text-sm">
                      {!calculations.isValidAmount && (
                        <p>⚠️ Given amount exceeds total installment value</p>
                      )}
                      {calculations.cumulativePaidAmount !==
                        formValues.totalPaidAmount && (
                        <p>
                          ⚠️ Total paid amount mismatch with installments sum
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={setSummary}
                    className="w-24"
                    disabled={status === "creating"}
                  >
                    Back
                  </Button>
                  {status === "creating" ? (
                    <Button disabled>
                      <LoaderCircle
                        className="-ms-1 me-2 animate-spin"
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      Please wait..
                    </Button>
                  ) : (
                    <Button
                      onClick={finalSubmit}
                      className="w-24"
                      disabled={
                        !calculations.isValidAmount ||
                        calculations.cumulativePaidAmount !==
                          formValues.totalPaidAmount
                      }
                    >
                      Confirm
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

FinalSummary.displayName = "FinalSummary";
