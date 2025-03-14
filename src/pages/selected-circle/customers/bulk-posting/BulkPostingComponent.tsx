import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  Suspense,
} from "react";

import { Loader2, Edit2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  FormatCurrency,
  formatDateToYYYYMMDD,
} from "@/toolkit/helper/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/toolkit/store";
import { fetchSimplifiedLoans } from "./state/postingSlice";
import { SimplifiedLoan } from "@/models/customModels/customModels";
// import { SummaryScreen } from "./SummaryScreen";
import { selectCombinedData } from "./selectors";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DateInput } from "@/components/FormFields";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const FormSchema = z.object({
  postingDate: z.date({
    required_error: "A date must be provided for the installment posting.",
  }),
});

const LoanInstallmentManager = React.lazy(
  () => import("./LoanInstallmentManager")
);

const SummaryScreen = React.lazy(() => import("./SummaryScreen"));

// Component for bulk posting of installment payments
const BulkPosting = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    selectedCircle,
    loansData,
    simplifiedLoansStatus: status,
    lastClosingEntry,
  } = useSelector(selectCombinedData);

  const [date, setDate] = useState<string>("");
  const [loans, setLoans] = useState<SimplifiedLoan[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDateSubmitted, setIsDateSubmitted] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const loansContainerRef = useRef<HTMLDivElement>(null);
  let inputIndex = 0;

  useEffect(() => {
    if (loansData) {
      setLoans(loansData);
    }
  }, [loansData]);

  // Fetch loans whenever the posting date is submitted
  const fetchLoans = useCallback(
    async (selectedDate: Date) => {
      // Check if a circle is selected
      if (!selectedCircle) return;
      setIsLoading(true);
      await dispatch(
        fetchSimplifiedLoans({
          circleID: selectedCircle.id,
          selectedPostingDate: selectedDate,
        })
      );
      setIsLoading(false);
    },
    [selectedCircle, date, dispatch]
  );

  // Initialize form with validation schema
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  //* DateInput Submit Handler
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Format and set the selected date
    setDate(formatDateToYYYYMMDD(data.postingDate));
    setIsDateSubmitted(true);
    setIsEditingDate(false);
    // Fetch loans for the selected date
    fetchLoans(data.postingDate);
  }

  // Handle editing of the posting date
  const handleEditDate = () => {
    setIsEditingDate(true);
  };

  // Clear search input
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Filter loans based on the search term
  const filteredLoans = useMemo(() => {
    return loans.filter((loan) =>
      loan.loanSerial.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [loans, searchTerm]);

  const groupLoansByCity = (loans: SimplifiedLoan[]) => {
    return loans.reduce((acc, loan) => {
      const city = loan.cityName || "Unknown City";
      if (!acc[city]) {
        acc[city] = [];
      }
      acc[city].push(loan);
      return acc;
    }, {} as Record<string, SimplifiedLoan[]>);
  };

  const groupedLoans = useMemo(
    () => groupLoansByCity(filteredLoans),
    [filteredLoans]
  );

  // Handle changes in the paid amount for a loan
  const handleAmountChange = useCallback(
    (loanId: string, value: string) => {
      // Convert input value to a numeric value
      const numericValue = Number(value.replace(/[^0-9.-]+/g, "")) || 0;
      // Update the paid amount for the corresponding loan
      setLoans((prevLoans) =>
        prevLoans.map((loan) =>
          loan.loanId === loanId ? { ...loan, paidAmount: numericValue } : loan
        )
      );
    },
    [setLoans]
  );

  // Autofill installment amount when input is focused
  const handleInputFocus = (loanId: string) => {
    setLoans((prevLoans) =>
      prevLoans.map((loan) =>
        loan.loanId === loanId && loan.hasInstallmentPaid === false
          ? { ...loan, paidAmount: loan.installmentAmount }
          : loan
      )
    );
  };

  //* After Posting Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show the summary screen after submission
    setShowSummary(true);
  };

  // Clear all entered paid amounts
  const clearAll = useCallback(() => {
    setLoans(loansData);
  }, [loansData]);

  // Handle keyboard navigation between input fields
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Navigate to the next or previous input field based on key press
    if (e.key === "Enter" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) nextInput.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className="mx-5">
      <div className="flex items-center flex-wrap justify-between">
        <h2 className="text-xl sm:my-0 font-semibold tracking-tight">
          Installments Posting
        </h2>
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 flex items-center justify-between">
          {isDateSubmitted && (
            <>
              <div className="relative w-full mr-4">
                <Input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by loan ID"
                  className="w-full"
                  autoComplete="off"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    ✕
                  </button>
                )}
              </div>
              <Button type="button" variant="outline" onClick={handleEditDate}>
                {new Date(date).toLocaleDateString()}&nbsp;&nbsp;
                <Edit2 size={15} />
              </Button>
            </>
          )}
        </div>
      </div>
      {!isDateSubmitted || isEditingDate ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <DateInput
                control={form.control}
                name="postingDate"
                placeholder="Pick a date"
                label="Select Date"
                formDescription="Choose a date for Installments Posting."
                fromDate={lastClosingEntry?.closingEntryDate}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : isEditingDate ? (
                  "Update Date"
                ) : (
                  "Submit Date"
                )}
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <>
          {status !== "success" ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p className="ml-2 text-xl font-medium text-gray-600">
                Loading loans...
              </p>
            </div>
          ) : (
            <Tabs defaultValue="showAll">
              <TabsList>
                <TabsTrigger
                  value="showAll"
                  onClick={() => {
                    clearAll();
                  }}
                >
                  Show All
                </TabsTrigger>
                <TabsTrigger value="selectLoanId">Loan Selection</TabsTrigger>
              </TabsList>
              <TabsContent value="showAll">
                <form onSubmit={handleSubmit}>
                  <div ref={loansContainerRef} className="px-4">
                    {Object.entries(groupedLoans).map(([city, loans]) => (
                      <div key={city} className="mb-8">
                        <h3 className="text-lg font-semibold mb-4">
                          {city} ({loans.length})
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2 sm:gap-4">
                          {loans.map((loan) => {
                            const currentIndex = inputIndex++;
                            return (
                              <div
                                key={loan.loanId}
                                className={`p-4 bg-card rounded-xl shadow-sm transition-colors duration-200 ${
                                  loan.paidAmount > 0
                                    ? "bg-emerald-500 border border-emerald-400 dark:shadow-lg dark:shadow-emerald-800/50 shadow-xl shadow-emerald-500/30"
                                    : "shadow-xl border"
                                }`}
                              >
                                <Label
                                  htmlFor={loan.loanId}
                                  className={`block text-sm font-medium mb-1 ${
                                    loan.paidAmount > 0
                                      ? "text-white/90"
                                      : "text-primary"
                                  }`}
                                >
                                  Loan ID: {loan.loanSerial}
                                </Label>
                                {/* Input field for entering installment amount */}
                                <Input
                                  type="text"
                                  aria-label={`Installment amount for loan ID ${loan.loanSerial}`}
                                  id={loan.loanId}
                                  value={
                                    loan.hasInstallmentPaid
                                      ? FormatCurrency(
                                          loan.paidAmount
                                        ).substring(1)
                                      : loan.paidAmount > 0
                                      ? FormatCurrency(
                                          loan.paidAmount
                                        ).substring(1)
                                      : ""
                                  }
                                  onChange={(e) =>
                                    handleAmountChange(
                                      loan.loanId,
                                      e.target.value
                                        .replace(/[^0-9.]/g, "")
                                        .slice(0, 6)
                                    )
                                  }
                                  onFocus={() => handleInputFocus(loan.loanId)}
                                  onKeyDown={(e) =>
                                    handleKeyDown(e, currentIndex)
                                  }
                                  disabled={loan.hasInstallmentPaid}
                                  ref={(el) =>
                                    (inputRefs.current[currentIndex] = el)
                                  }
                                  placeholder="Enter amount"
                                  className={`w-full border rounded-md shadow-sm ${
                                    loan.paidAmount > 0 &&
                                    "text-white border-white/40 font-bold font-lato text-lg"
                                  }`}
                                  autoComplete="off"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between mt-8">
                      <AlertDialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-300 hover:text-red-700"
                            title="Clear all entered loan amounts"
                          >
                            Clear All
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action will clear all entered loan amounts.
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                clearAll();
                                setIsDialogOpen(false);
                              }}
                            >
                              Clear All
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Button type="submit" variant="default">
                        Submit
                      </Button>
                    </div>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="selectLoanId">
                <Suspense fallback={<div>Loading...</div>}>
                  <LoanInstallmentManager
                    simplifiedLoans={filteredLoans}
                    onClose={(loans) => {
                      setLoans(loans);
                      setShowSummary(true);
                    }}
                  />
                </Suspense>
              </TabsContent>
            </Tabs>
          )}
        </>
      )}
      {showSummary && (
        <Suspense fallback={<div>Loading...</div>}>
          <SummaryScreen
            date={date}
            loans={loans.filter(
              (loan) =>
                loan.hasInstallmentPaid === false && loan.paidAmount !== 0
            )}
            onClose={() => setShowSummary(false)}
          />
        </Suspense>
      )}
    </div>
  );
};

export default BulkPosting;
