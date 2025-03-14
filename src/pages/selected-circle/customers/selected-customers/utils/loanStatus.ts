import { InstallmentStatus, Loan } from "@/models/API";

interface LoanCalculation {
  givenAmount: number;
  paidAmount: number;
  outstandingBalance: number;
  result: number;
  loanDuration: number;
  interestPercentage: number;
}

export function getLoanStatus(loan: Loan): {
  status: InstallmentStatus;
  message: string;
  additionalInfo?: string;
  calculation: LoanCalculation;
} {
  const {
    paidAmount,
    givenAmount,
    collectibleAmount,
    dateOfCreation,
    updatedAt,
  } = loan;
  const loanDuration = Math.ceil(
    (new Date(updatedAt).getTime() - new Date(dateOfCreation).getTime()) /
      (1000 * 3600 * 24)
  );
  const interestEarned = paidAmount - givenAmount;
  const interestPercentage =
    (interestEarned / givenAmount) * (365 / loanDuration) * 100;

  if (paidAmount < givenAmount) {
    const loss = collectibleAmount - paidAmount;
    return {
      status: InstallmentStatus.BUSINESSLOSS,
      message:
        "Terminating the loan now will result in a business loss. The amount the customer paid is less than the amount given to him.",
      additionalInfo:
        'To finalize the loan, we\'ll create a dummy installment called "BUSINESS LOSS" Which won\'t appear in printed documents. The outstanding balance will be subtracted from the Total Customers Outstanding and reflected in the "Daily Sheet".',
      calculation: {
        givenAmount,
        paidAmount,
        outstandingBalance: collectibleAmount,
        result: loss,
        loanDuration,
        interestPercentage,
      },
    };
  } else if (paidAmount > givenAmount && paidAmount < collectibleAmount) {
    const writeOff = collectibleAmount - paidAmount;
    return {
      status: InstallmentStatus.WRITEOFF,
      message:
        "Terminating the loan now will result in a write-off because the customer still has an outstanding balance to pay.",
      additionalInfo:
        'To finalize the loan, we\'ll create a dummy installment called "WRITE-OFF". Which won\'t appear in printed documents. The outstanding balance will be subtracted from the Total Customers Outstanding and reflected in the "Daily Sheet".',
      calculation: {
        givenAmount,
        paidAmount,
        outstandingBalance: collectibleAmount,
        result: writeOff,
        loanDuration,
        interestPercentage,
      },
    };
  } else if (paidAmount > collectibleAmount) {
    const excess = paidAmount - collectibleAmount;
    return {
      status: InstallmentStatus.EXCESSPAYMENT,
      message:
        "You can close this loan now. The collected amount exceeds the outstanding balance, and any excess will be adjusted in the daily sheet.",
      calculation: {
        givenAmount,
        paidAmount,
        outstandingBalance: collectibleAmount,
        result: excess,
        loanDuration,
        interestPercentage,
      },
    };
  } else if (paidAmount === collectibleAmount) {
    return {
      status: InstallmentStatus.PAID,
      message: "The loan has been fully paid. You can now close this loan.",
      calculation: {
        givenAmount,
        paidAmount,
        outstandingBalance: collectibleAmount,
        result: interestEarned,
        loanDuration,
        interestPercentage,
      },
    };
  }

  // Default case (should never happen if the conditions are exhaustive)
  return {
    status: InstallmentStatus.WRITEOFF,
    message:
      "Unable to determine the exact status of your loan. Please contact customer support for more information.",
    calculation: {
      givenAmount: 0,
      paidAmount: 0,
      outstandingBalance: 0,
      result: 0,
      loanDuration: 0,
      interestPercentage: 0,
    },
  };
}
