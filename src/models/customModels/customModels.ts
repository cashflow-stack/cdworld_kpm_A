import {
  City,
  InstallmentType,
  LoanStatus,
  PaymentMethod,
  TransactionType,
} from "../API";

export type modifiedCustomer = {
  adminID: string;
  city?: {
    id: string;
    name: string;
  };
  customers: Array<{
    address: string;
    customerName: string;
    phone: string;
    uId: string;
  }>;
  documents?: {
    __typename: "CustomerDocuments";
    emptyCheque?: boolean | null;
    promissoryNote?: boolean | null;
  } | null;
  id: string;
  installmentPaymentInfo?: {
    paidDate: string;
  };
  oldLoanInfo?: {
    closedDate: string;
  };
  loans?: {
    items: Array<{
      collectibleAmount: number;
      dateOfCreation: string;
      endDate: string;
      id: string;
      installmentType: InstallmentType;
      loanSerial: string;
      nextDueDate: string;
      paidAmount: number;
      paidInstallments: number;
      status: LoanStatus;
      totalInstallments: number;
    }>;
  };
};

export type SimplifiedCustomer = {
  id: string;
  adminID: string;
  cityId: string;
  cityName: string;
  customerName: string;
  customerPhone: string;
  customeruId: string;
  customerAddress: string;
  emptyCheque?: boolean | null;
  promissoryNote?: boolean | null;
  lastInstallmentPaidDate?: string | null;
  oldLoanClosingDate?: string | null;
  loanId?: string | null;
  collectibleAmount?: number | null;
  dateOfCreation?: string | null;
  endDate?: string | null;
  loanSerial?: string | null;
  nextDueDate?: string | null;
  paidAmount?: number | null;
  paidInstallments?: number | null;
  totalInstallments?: number | null;
  installmentType?: InstallmentType | null;
  status?: string | null;
  NoLoan: boolean;
};

export type SimplifiedLoan = {
  loanId: string;
  customerId: string;
  cityName: string;
  customerName: string;
  collectibleAmount: number;
  installmentAmount: number;
  loanDateOfCreation: string;
  loanSerial: string;
  totalPaidAmount: number;
  totalPaidInstallments: number;
  nextDueDate: string;
  hasInstallmentPaid: boolean;
  paidAmount: number;
};

export type CustomerForm = {
  type: string; // "existing" | "new"
  customerId: string;
  customerName: string;
  mobileNumber: string;
  address: string;
  city: City;
  emptyCheque: boolean;
  promissoryNote: boolean;
};
export type LoanForm = {
  loanBookId: string;
  loanAmount: number;
  installmentAmount: number;
  totalInstallments: number;
  paidInstallments: number;
  totalPaidAmount: number;
  loanDate: string;
  installmentsType: InstallmentType;
};

export type LoanPrintModel = {
  loanSerial: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  givenAmount: number;
  collectibleAmount: number;
  totalInstallments: number;
  installmentType: InstallmentType;
  oldId?: string | null;
  oldAmount?: number | null;
};

export type InstallmentPrintModel = {
  loanSerial: string;
  customerName: string;
  city: string;
  paidAmount: number;
  paymentMethod: PaymentMethod;
};

//* Pending Customers
export type PendingCustomer = {
  id: string;
  name: string;
  phoneNumber: string;
  loanSerial: string;
  city: string;
  pendingAmount: number;
  daysDelay: number;
  pendingInstallments: number;
};

export interface CustomerInfo {
  customerName: string;
  phone: string;
}

export interface CityInfo {
  name: string;
}

export interface CustomerDetails {
  customers: CustomerInfo[];
  city: City;
}

export interface UnpaidLoan {
  id: string;
  customer: CustomerDetails;
  endDate: string;
  dateOfCreation: string;
  nextDueDate: string;
  paidAmount: number;
  collectibleAmount: number;
  installmentAmount: number;
  installmentType: InstallmentType;
  paidInstallments: number;
  loanSerial: string;
  totalInstallments: number;
}

//----------------Pending Customers----------------

//* Simplified Transactions Model for Cash Account Entry
export type SimplifiedTransaction = {
  id: string;
  date: string;
  amount: number;
  description?: string;
  loanSerial?: string | null;
  customerName?: string | null;
  outstandingAmount?: number | null;
  customerAddress?: string | null;
  paymentMethod?: PaymentMethod | null;
  transactionType: TransactionType;
};

export type ByModifiedCircleCashQuery = {
  byCircleCash?: {
    __typename: "ModelCashAccountConnection";
    items: Array<{
      __typename: "CashAccount";
      adminEmailId: string;
      adminID: string;
      cashflowIn: number;
      cashflowOut: number;
      circleID: string;
      closingBalance: number;
      closingEntryDate: string;
      closingSnapshot: {
        __typename: "ClosingSnapshot";
        chits: number;
        deficit: number;
        excessCollection: number;
        expenses: number;
        incomes: number;
        interest: number;
        investments: number;
        loansGiven: number;
        repayments: number;
        withdrawals: number;
      };
      createdAt: string;
      description?: string | null;
      expireAt?: number | null;
      id: string;
      openingBalance: number;
      openingEntryDate: string;
      outstandingAmount: number;
      simplifiedTransactions: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type SimplifiedClosingEntry = {
  id: string;
  openingDate: string;
  closingDate: string;
  openingBalance: number;
  balance?: number;
  investment: number;
  collection: number;
  excess: number;
  interest: number;
  income: number;
  newLoans: number;
  withdrawals: number;
  expenses: number;
  deficit: number;
  chits: number;
};

export interface CalculatedEntry extends SimplifiedClosingEntry {
  calculation: {
    positiveTotal: number; // Sum of all positive entries
    negativeTotal: number; // Sum of all negative entries
    previousBalance: number; // Previous entry's final balance
    balance: number; // total - negativeTotal
  };
}

export interface LambdaResponse {
  success: boolean;
  message: string;
  error?: string;
}

// FinanceBook
export interface Installment {
  paidDate: string;
  paidAmount: number;
}

export type FinanceBook = {
  customerId: string;
  customerName: string;
  cityID: string;
  loanId?: string;
  collectiableAmount?: number;
  dateOfCreation?: string;
  loanSerial?: string;
  paidAmount?: number;
  installmentType?: string;
  status?: string;
  installments?: Installment[];
};

export interface Loan {
  id: string;
  collectibleAmount: number;
  dateOfCreation: string;
  loanSerial: string;
  paidAmount: number;
  installmentType: string;
  status: string;
  installments: {
    items: Installment[];
  };
}

export interface Customer {
  customerName: string;
}

export interface FinancialItem {
  id: string;
  customers: Customer[];
  cityID: string;
  loans: {
    items: Loan[];
  };
}