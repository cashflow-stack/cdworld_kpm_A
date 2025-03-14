import { useState, useCallback, useEffect, memo, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CheckCircle2, LoaderCircle, XCircle } from "lucide-react";
import { FormFields } from "./widgets/FormFields";
import { SummaryScreen } from "./widgets/SummaryScreen";
import {
  formSchema,
  FormData,
  checkOutstandingAmount,
  checkDate,
} from "./utils/formSchema";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/toolkit/store";
import {
  createCustomerAndLoan,
  resetAll,
} from "../state/customerOperationSlice";
import { v4 as uuidv4 } from "uuid";
import { CustomerForm, LoanForm } from "@/models/customModels/customModels";
import { formatDateToYYYYMMDD } from "@/toolkit/helper/helperFunctions";
import { fetchLastClosingEntry } from "@/toolkit/common/last-closing-entry/closingSlice";
import { selectLoanFormData } from "./utils/selectors";
import { InstallmentType, Weekday } from "@/models/API";

const NewOrExistingCustomerLoanForm = memo(() => {
  const { selectedCircle, admin, status, cities, cashAccount } = useSelector(
    selectLoanFormData,
    shallowEqual
  );

  const type =
    selectedCircle?.day === Weekday.DAILY
      ? "DAILY"
      : selectedCircle?.day === Weekday.MONTHLY
      ? "MONTHLY"
      : "WEEKLY";

  const dispatch = useDispatch<AppDispatch>();

  const [customerType, setCustomerType] = useState<"new" | "existing">("new");
  const [currentStep, setCurrentStep] = useState<
    "form" | "summary" | "success" | "error"
  >("form");

  const form = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(
      () => ({
        customerType: "new",
        customerName: "",
        mobileNumber: "",
        aadharCardNumber: "",
        address: "",
        city: "",
        guarantorDetails: "",
        type: type,
        givenDate: new Date(),
        givenAmount: "",
        amountPerInstallment: "",
        totalInstallments: "",
        paidInstallments: "",
        totalPaidAmount: "",
        emptyCheque: false,
        promissoryNote: false,
      }),
      []
    ),
  });

  useEffect(() => {
    dispatch(fetchLastClosingEntry({ selectedCircleID: selectedCircle?.id! }));
  }, [dispatch, selectedCircle?.id]);

  useEffect(() => {
    switch (status) {
      case "idle":
        setCurrentStep("form");
        break;
      case "created":
        setCurrentStep("success");
        break;
      case "failed":
        setCurrentStep("error");
        break;
      default:
        break;
    }
  }, [status]);

  const handleSubmit = useCallback(
    (values: FormData) => {
      const city = cities.find((city) => city.id === values.city);
      const isNewCustomer = values.customerType === "new";
      const customer: CustomerForm = {
        type: values.customerType,
        customerId: values.aadharCardNumber || uuidv4(),
        customerName: values.customerName,
        mobileNumber: `+91${values.mobileNumber}`,
        address: values.address || "Not Available",
        city: city!,
        emptyCheque: values.emptyCheque || false,
        promissoryNote: values.promissoryNote || false,
      };
      const loan: LoanForm = {
        loanBookId: `${values.loanBookId}`,
        loanAmount: Number(values.givenAmount),
        installmentAmount: Number(values.amountPerInstallment),
        totalInstallments: Number(values.totalInstallments),
        paidInstallments: Number(values.paidInstallments || 0),
        totalPaidAmount: Number(values.totalPaidAmount || 0),
        loanDate: formatDateToYYYYMMDD(values.givenDate),
        installmentsType: values.type as InstallmentType,
      };
      dispatch(
        createCustomerAndLoan({
          admin: admin!,
          selectedCircle: selectedCircle!,
          customer,
          loan,
          isNewCustomer,
        })
      );
    },
    [dispatch, cities, selectedCircle, admin]
  );

  const onSubmit = useCallback(async () => {
    const result = await form.trigger();
    if (result) {
      setCurrentStep("summary");
    }
  }, [form]);

  const handleStartOver = useCallback(() => {
    form.reset();
    form.setValue("givenDate", new Date());
    setCurrentStep("form");
    setCustomerType("new");
    dispatch(resetAll());
  }, [form, dispatch]);

  return (
    <>
      <DialogHeader className={currentStep === "summary" ? "hidden" : ""}>
        <DialogTitle>Customer and Loan Form</DialogTitle>
        <DialogDescription>
          Fill the customer and loan details
        </DialogDescription>
      </DialogHeader>
      <div className="aspect-auto w-full max-w-3xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8">
              {currentStep === "form" && (
                <FormFields
                  form={form}
                  customerType={customerType}
                  setCustomerType={setCustomerType}
                  cashAccount={cashAccount}
                  weekday={selectedCircle?.day!}
                />
              )}
              {currentStep === "summary" && (
                <div className="space-y-8">
                  <SummaryScreen
                    data={form.getValues()}
                    cashAccount={cashAccount}
                  />
                </div>
              )}
              {currentStep === "success" && (
                <div className="text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Submission Successful</h3>
                  <p>Customer and loan have been successfully created.</p>
                </div>
              )}
              {currentStep === "error" && (
                <div className="text-center space-y-4">
                  <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Submission Failed</h3>
                  <p>
                    There was an error submitting your form. Please try again.
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-between pt-5">
              {currentStep === "form" && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      handleStartOver();
                      window.location.reload();
                    }}
                  >
                    Exit
                  </Button>
                  <Button type="button" onClick={form.handleSubmit(onSubmit)}>
                    Review
                  </Button>
                </>
              )}
              {currentStep === "summary" && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep("form")}
                  >
                    Back
                  </Button>
                  <>
                    {status === "creating" ? (
                      <Button disabled>
                        <LoaderCircle
                          className="-ms-1 me-2 animate-spin"
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        Button
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={form.handleSubmit(handleSubmit)}
                        disabled={
                          !checkOutstandingAmount(form.getValues()) ||
                          !checkDate(form.getValues(), cashAccount!)
                        }
                      >
                        Submit
                      </Button>
                    )}
                  </>
                </>
              )}
              {(currentStep === "success" || currentStep === "error") && (
                <Button type="button" onClick={handleStartOver}>
                  Start Over
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
});

export default NewOrExistingCustomerLoanForm;
