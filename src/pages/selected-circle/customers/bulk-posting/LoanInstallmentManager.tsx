// Import React and necessary hooks
import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
// Import UI components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X, Edit, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SimplifiedLoan } from "@/models/customModels/customModels";
import { CurrencyFormatter } from "@/toolkit/helper/helperFunctions";
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

// Simulated API call to update loans
// const updateLoans = async (loans: SimplifiedLoan[]): Promise<boolean> => {
//   await new Promise((resolve) => setTimeout(resolve, 1500));
//   console.log("Updating loans:", loans);
//   return true;
// };

export default function LoanInstallmentManager({
  simplifiedLoans,
  onClose,
}: {
  simplifiedLoans: SimplifiedLoan[];
  onClose: (loans: SimplifiedLoan[]) => void;
}) {
  // State for form data
  const [formData, setFormData] = useState({
    loanId: "",
    installmentAmount: "",
  });
  // State for the currently selected loan
  const [currentLoan, setCurrentLoan] = useState<SimplifiedLoan | null>(null);
  // State for all selected loans
  const [selectedLoans, setSelectedLoans] = useState<SimplifiedLoan[]>([]);
  // State to track which loan is being edited
  const [editingLoanId, setEditingLoanId] = useState<string | null>(null);
  // State for the installment amount being edited
  const [editInstallmentAmount, setEditInstallmentAmount] = useState("");
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State for error messages
  const [error, setError] = useState<string | null>(null);
  // State for the new paid amount calculation
  const [newPaidAmount, setNewPaidAmount] = useState<number | null>(null);
  // Refs for input fields
  const loanIdInputRef = useRef<HTMLInputElement>(null);
  const paymentAmountInputRef = useRef<HTMLInputElement>(null);

  // Focus on payment amount input when a loan is selected
  useEffect(() => {
    if (currentLoan && paymentAmountInputRef.current) {
      paymentAmountInputRef.current.focus();
    }
  }, [currentLoan]);

  // Handle changes in input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "installmentAmount" && currentLoan) {
      const paymentAmount = value
        ? parseFloat(value)
        : currentLoan.installmentAmount;
      const newPaid = currentLoan.totalPaidAmount + paymentAmount;
      setNewPaidAmount(newPaid);
    }
  };

  // Handle Enter key press in Loan ID input to fetch loan details
  const handleLoanIdKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && formData.loanId.trim() !== "") {
      e.preventDefault();
      await fetchLoanDetails(formData.loanId.trim());
    }
  };

  // Check if a loan is already selected
  const isLoanAlreadySelected = (loanId: string): boolean => {
    return selectedLoans.some((loan) => loan.loanSerial === loanId);
  };
  const hasInstallmentPaid = (loanId: string): boolean => {
    return simplifiedLoans.some(
      (loan) => loan.loanSerial === loanId && loan.hasInstallmentPaid === true
    );
  };

  // Fetch loan details based on Loan ID
  const fetchLoanDetails = async (loanId: string) => {
    setIsLoading(true);
    setError(null);
    setNewPaidAmount(null);

    if (isLoanAlreadySelected(loanId)) {
      setError("This loan is already in the selected loans list.");
      setIsLoading(false);
      setCurrentLoan(null);
      return;
    }
    if (hasInstallmentPaid(loanId)) {
      setError("This loan is already updated");
      setIsLoading(false);
      setCurrentLoan(null);
      return;
    }

    try {
      const details = await (async (
        loanId: string
      ): Promise<SimplifiedLoan | null> => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const loanDetails: Record<string, SimplifiedLoan> = {
          ...simplifiedLoans.reduce(
            (acc, loan) => ({ ...acc, [loan.loanSerial]: loan }),
            {}
          ),
        };
        return loanDetails[loanId] || null;
      })(loanId);

      if (details) {
        setCurrentLoan(details);
        setFormData((prevState) => ({
          ...prevState,
          installmentAmount: "",
        }));
      } else {
        setError("Loan ID not found");
        setCurrentLoan(null);
      }
    } catch (err) {
      setError("An error occurred while fetching loan details");
      setCurrentLoan(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission to record a payment
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentLoan) {
      const amountToAdd = formData.installmentAmount
        ? parseFloat(formData.installmentAmount)
        : currentLoan.installmentAmount;

      const updatedLoan = {
        ...currentLoan,
        paidAmount: amountToAdd,
      };
      setSelectedLoans((prevLoans) => [...prevLoans, updatedLoan]);
      setCurrentLoan(null);
      setFormData({ loanId: "", installmentAmount: "" });
      setNewPaidAmount(null);

      if (loanIdInputRef.current) {
        loanIdInputRef.current.focus();
      }

      console.log(
        `Payment of $${amountToAdd.toLocaleString()} recorded for loan ${
          updatedLoan.loanId
        }`
      );
    }
  };

  // Clear all selected loans
  const handleClearAll = () => {
    setSelectedLoans([]);
    console.log("All selected loans cleared");
  };

  // Submit all loan updates
  const handleSubmitAll = async () => {
    setIsSubmitting(true);
    onClose(selectedLoans);
    setIsSubmitting(false);
    // try {
    // const result = await updateLoans(selectedLoans);
    //   if (result) {
    //     setSelectedLoans([]);
    //   } else {
    //     throw new Error("Failed to update loans");
    //   }
    // } catch (error) {
    //   console.error("Error updating loans. Please try again.");
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  // Initiate editing of installment amount for a specific loan
  const handleEditInstallment = (loanId: string, currentAmount: number) => {
    setEditingLoanId(loanId);
    setEditInstallmentAmount(currentAmount.toString());
  };

  // Save the edited installment amount
  const handleSaveInstallment = (loanId: string) => {
    setSelectedLoans((prevLoans) =>
      prevLoans.map((loan) =>
        loan.loanId === loanId
          ? { ...loan, paidAmount: parseFloat(editInstallmentAmount) }
          : loan
      )
    );
    setEditingLoanId(null);
    console.log(`Installment amount for loan ${loanId} has been updated`);
  };

  // Cancel the editing of installment amount
  const handleCancelEdit = () => {
    setEditingLoanId(null);
    setEditInstallmentAmount("");
  };

  // Remove a loan from the selected loans list
  const handleRemoveLoan = (loanId: string) => {
    setSelectedLoans((prevLoans) =>
      prevLoans.filter((loan) => loan.loanId !== loanId)
    );
    console.log(`Loan ${loanId} has been removed from the selected loans`);
  };

  return (
    // Main container with flex layout
    <main className="flex flex-row items-center">
      <div className="w-full space-x-2 flex">
        <div className="aspect-auto bg-card h-96 p-4 rounded-lg">
          {/* Form to record a new payment */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              {/* Loan ID input field */}
              <div>
                <Label
                  htmlFor="loanId"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Enter Loan ID
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <Input
                    type="text"
                    id="loanId"
                    name="loanId"
                    value={formData.loanId}
                    onChange={handleInputChange}
                    onKeyDown={handleLoanIdKeyPress}
                    className="w-full pr-16"
                    placeholder="Enter Loan ID"
                    disabled={isLoading}
                    ref={loanIdInputRef}
                    autoComplete="off"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => fetchLoanDetails(formData.loanId.trim())}
                      disabled={isLoading || !formData.loanId.trim()}
                      className="h-full rounded-l-none"
                    >
                      Fetch
                    </Button>
                  </div>
                </div>
              </div>
              {/* Payment amount input field */}
              {currentLoan && (
                <div className="pt-4">
                  <Label
                    htmlFor="installmentAmount"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Payment Amount
                  </Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <Input
                      type="number"
                      id="installmentAmount"
                      name="installmentAmount"
                      value={formData.installmentAmount}
                      onChange={handleInputChange}
                      className="w-full pl-7 font-lato text-xl"
                      placeholder={currentLoan.installmentAmount.toString()}
                      ref={paymentAmountInputRef}
                      autoComplete="off"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 inline-flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-xl font-sans font-semibold">
                        ₹
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Loading indicator */}
            {isLoading && (
              <p className="text-sm text-muted-foreground">
                Loading loan details...
              </p>
            )}
            {/* Error message */}
            {error && (
              <div
                className="bg-red-100 dark:bg-red-950 border border-red-500 text-red-700 dark:text-red-200 px-4 py-2 rounded-md relative"
                role="alert"
              >
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline font-sans">{error}</span>
              </div>
            )}
            {/* Display current loan details */}
            {currentLoan && (
              <div className="py-2 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold mb-2">
                  {currentLoan.customerName}
                </h3>
                <div className="flex flex-col text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">
                      Per Installment:
                    </span>
                    <span className="font-medium font-lato text-base">
                      ₹{currentLoan.installmentAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">Paid Amount:</span>
                    <span className="font-medium font-lato text-base">
                      ₹{currentLoan.totalPaidAmount.toLocaleString()}
                      <span className="text-green-600 ml-2">
                        + ₹
                        {(formData.installmentAmount
                          ? parseFloat(formData.installmentAmount)
                          : currentLoan.installmentAmount
                        ).toLocaleString()}{" "}
                        = ₹
                        {(
                          newPaidAmount ||
                          currentLoan.totalPaidAmount +
                            currentLoan.installmentAmount
                        ).toLocaleString()}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Balance:</span>{" "}
                    &nbsp;
                    <span className="font-medium font-lato text-base">
                      ₹{currentLoan.collectibleAmount.toLocaleString()}
                      <span className="text-green-600 ml-2">
                        - ₹
                        {(
                          newPaidAmount ||
                          currentLoan.installmentAmount +
                            currentLoan.totalPaidAmount
                        ).toLocaleString()}
                        &nbsp; = ₹
                        {(
                          currentLoan.collectibleAmount -
                          (newPaidAmount ||
                            currentLoan.installmentAmount +
                              currentLoan.totalPaidAmount)
                        ).toLocaleString()}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            )}
            {/* Submit payment button */}
            {currentLoan && (
              <Button type="submit" className="w-full">
                Record Payment
              </Button>
            )}
          </form>
        </div>

        {/* Display list of selected loans with paid installments */}
        {selectedLoans.length > 0 && (
          <div className="aspect-auto bg-card rounded-lg p-4 flex-1">
            <h2 className="text-xl font-semibold">
              Installments ({selectedLoans.length})
            </h2>
            <div className="my-4 grid grid-cols-4 gap-4">
              {/* Map through selected loans and display each loan's details */}
              {selectedLoans.map((loan) => (
                <div
                  key={loan.loanId}
                  className="relative p-2 rounded-lg bg-emerald-500 border border-emerald-400 dark:shadow-lg dark:shadow-emerald-800/50 shadow-xl shadow-emerald-500/30"
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemoveLoan(loan.loanId)}
                    className="absolute top-1 right-1 text-red-600 bg-white/60 hover:text-red-700 hover:bg-red-300"
                  >
                    <Trash2 size={18} />
                  </Button>
                  <div className="flex gap-2 items-center">
                    Loan ID:&nbsp;
                    {loan.loanSerial}
                  </div>
                  {/* Conditional rendering for editing installment */}
                  {editingLoanId !== loan.loanId ? (
                    <div className="flex gap-2 font-lato font-semibold text-2xl items-center">
                      {CurrencyFormatter({ amount: loan.paidAmount })}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          handleEditInstallment(loan.loanId, loan.paidAmount)
                        }
                      >
                        <Edit size={18} />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center mt-2">
                      <Label
                        htmlFor={`edit-installment-${loan.loanId}`}
                        className="sr-only"
                      >
                        Edit Installment Amount
                      </Label>
                      <div className="rounded-md shadow-sm flex-1">
                        <Input
                          id={`edit-installment-${loan.loanId}`}
                          type="text"
                          value={editInstallmentAmount}
                          onChange={(e) =>
                            setEditInstallmentAmount(e.target.value)
                          }
                          className="w-full font-lato text-xl font-semibold border border-gray-300 rounded-md"
                        />
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleSaveInstallment(loan.loanId)}
                        className="ml-2 text-green-200 bg-green-950"
                      >
                        <Check size={20} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCancelEdit}
                        className="ml-1 text-red-200 bg-red-950"
                      >
                        <X size={20} />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Clear All</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Clear All</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to clear all selected loans? This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearAll}>
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button onClick={handleSubmitAll} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit All Updates"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
