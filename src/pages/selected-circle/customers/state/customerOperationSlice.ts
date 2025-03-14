import {
  createCustomerLoanWithInstallments,
  createNewOrExistingCustomer,
} from "@/api/customerApi";
import { Admin, Circle, InstallmentType } from "@/models/API";
import {
  CustomerForm,
  LoanForm,
  SimplifiedCustomer,
} from "@/models/customModels/customModels";
import {
  calculateDate,
  formatDateTimeToISOString,
  formatDateToYYYYMMDD,
  formatYYYYDDMMToISOString,
} from "@/toolkit/helper/helperFunctions";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export type CreateCustomerState = {
  status:
    | "idle"
    | "failed"
    | "creating"
    | "created"
    | "updating"
    | "updated"
    | "deleting"
    | "deleted"
    | "customerDetailsAdded"
    | "loanDetailsAdded";
  error: string | null;
  customerDetails: CustomerForm | null;
  loanDetails: LoanForm | null;
  simplifiedCustomer: SimplifiedCustomer | null;
};

const initialState: CreateCustomerState = {
  status: "idle",
  error: null,
  customerDetails: null,
  loanDetails: null,
  simplifiedCustomer: null,
};

const customerOperationSlice = createSlice({
  name: "customerOperation",
  initialState,
  reducers: {
    addCustomerDetails: (state, action: PayloadAction<CustomerForm>) => {
      state.status = "customerDetailsAdded";
      state.error = null;
      state.customerDetails = action.payload;
    },
    addLoanDetails: (state, action: PayloadAction<LoanForm>) => {
      state.status = "loanDetailsAdded";
      state.error = null;
      state.loanDetails = action.payload;
    },
    resetAll: (state) => {
      state.status = "idle";
      state.error = null;
      state.customerDetails = null;
      state.loanDetails = null;
    },
    setFailed: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
    setIdleState: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomerAndLoan.pending, (state) => {
        state.status = "creating";
        state.error = null;
      })
      .addCase(createCustomerAndLoan.fulfilled, (state) => {
        state.status = "created";
        state.error = null;
      })
      .addCase(createCustomerAndLoan.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      })
      .addCase(createLoanWithInstallments.pending, (state) => {
        state.status = "creating";
        state.error = null;
      })
      .addCase(createLoanWithInstallments.fulfilled, (state) => {
        state.status = "created";
        state.error = null;
      })
      .addCase(createLoanWithInstallments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
  },
});

export const {
  addCustomerDetails,
  addLoanDetails,
  resetAll,
  setFailed,
  setIdleState,
} = customerOperationSlice.actions;
export default customerOperationSlice.reducer;

type CreateCustomerAndLoanProps = {
  admin: Admin;
  selectedCircle: Circle;
  isNewCustomer: boolean;
  customer: CustomerForm;
  loan: LoanForm;
};

type Customer = {
  cityID: string;
  customers: [
    {
      address: string;
      customerName: string;
      phone: string;
      uId: string;
    }
  ];
  documents?: {
    emptyCheque?: boolean;
    promissoryNote?: boolean;
  };
  guarantorDetails?: string;
  id: string;
  loanSerial: Array<string | null>;
};

type Loan = {
  collectibleAmount: number;
  endDate: string;
  givenAmount: number;
  id: string;
  installmentAmount: number;
  installmentType: string;
  loanSerial: string;
  nextDueDate: string;
  paidAmount: number;
  paidInstallments: number;
  totalInstallments: number;
};

type Installment = {
  city: string;
  customerName: string;
  description: string;
  dueDate: string;
  id: string;
  installmentAmount: number;
  installmentNumber: number;
  paidAmount: number;
};

type Transaction = {
  additionalInfo: {
    city: string;
    customerName: string;
    description: string;
    loanSerial: string;
    totalOutstandingAmount?: number;
  };
  amount: number;
  id: string;
};

type LoanSerialNumber = {
  id: string;
  serialNumber: string;
};

type AgentDetails = {
  agentID: string;
  name: string;
  phoneNumber: string;
};

export const createCustomerAndLoan = createAsyncThunk<
  boolean,
  CreateCustomerAndLoanProps,
  { rejectValue: string }
>(
  "customerOperation/createCustomerAndLoan",
  async (
    { customer, loan, admin, selectedCircle, isNewCustomer },
    { rejectWithValue }
  ) => {
    const customerId = uuid();
    const loanId = uuid();
    const installmentId = uuid();
    const endDate = calculateDate({
      installmentType: loan.installmentsType,
      date: loan.loanDate,
      totalInstallments: loan.totalInstallments,
      paidInstallments: 0,
    });
    const nextDueDate = calculateDate({
      installmentType: loan.installmentsType,
      date: loan.loanDate,
      totalInstallments: loan.paidInstallments + 1,
      paidInstallments: 0,
    });
    const emiPaymentDate = calculateDate({
      installmentType: loan.installmentsType,
      date: loan.loanDate,
      totalInstallments: loan.paidInstallments,
      paidInstallments: 0,
    });
    const customerJson: Customer = {
      cityID: customer.city.id,
      customers: [
        {
          address: customer.address,
          customerName: customer.customerName,
          phone: customer.mobileNumber,
          uId: customer.customerId,
        },
      ],
      documents: {
        emptyCheque: customer.emptyCheque,
        promissoryNote: customer.promissoryNote,
      },
      loanSerial: [`${loan.loanBookId}`],
      id: customerId,
    };
    const loanJson: Loan = {
      collectibleAmount: loan.installmentAmount * loan.totalInstallments,
      endDate,
      givenAmount: loan.loanAmount,
      id: loanId,
      installmentAmount: loan.installmentAmount,
      installmentType: loan.installmentsType as string,
      loanSerial: `${loan.loanBookId}`,
      nextDueDate,
      paidAmount: loan.totalPaidAmount,
      paidInstallments: loan.paidInstallments,
      totalInstallments: loan.totalInstallments,
    };
    const loanTransactionJson: Transaction = {
      additionalInfo: {
        city: customer.city.name,
        customerName: customer.customerName,
        description: "New Loan given to customer",
        loanSerial: `${loan.loanBookId}`,
        totalOutstandingAmount: loan.installmentAmount * loan.totalInstallments,
      },
      amount: loan.loanAmount,
      id: loanId,
    };
    const agentDetails: AgentDetails = {
      agentID: admin.id,
      name: admin.name,
      phoneNumber: admin.phoneNumber,
    };
    const loanSerialNumber: LoanSerialNumber = {
      id: selectedCircle.id,
      serialNumber: `${loan.loanBookId}`,
    };
    const installmentJson: Installment | null = isNewCustomer
      ? null
      : loan.totalPaidAmount === 0
      ? null
      : {
          city: customer.city.id,
          customerName: customer.customerName,
          description: isNewCustomer ? "New Customer" : "Existing Customer",
          dueDate: emiPaymentDate,
          id: installmentId,
          installmentAmount: loan.installmentAmount * loan.paidInstallments,
          installmentNumber: loan.paidInstallments,
          paidAmount: loan.totalPaidAmount,
        };
    try {
      const result = await createNewOrExistingCustomer({
        adminId: admin.id,
        circleId: selectedCircle.id,
        circleDateofCreation: selectedCircle.dateOfCreation,
        dateTime: formatYYYYDDMMToISOString(loan.loanDate),
        isNewCustomer,
        agentDetails: JSON.stringify(agentDetails),
        customerJson: JSON.stringify(customerJson),
        loanJson: JSON.stringify(loanJson),
        loanTransactionJson: JSON.stringify(loanTransactionJson),
        loanSerialNumberJson: JSON.stringify(loanSerialNumber),
        installmentJson: installmentJson
          ? JSON.stringify(installmentJson)
          : null,
      });
      return result;
    } catch (error) {
      console.log("Error in createCustomerAndLoan: ", error);
      return rejectWithValue("Failed to create customer and loan");
    }
  }
);

interface Payment {
  amount: number;
  date: Date;
}

interface CreateLoanWithInstallmentsProps {
  admin: Admin;
  selectedCircle: Circle;
  aadharNumber?: string;
  address?: string;
  amountPerInstallment: number;
  city: string;
  customerName: string;
  installmentType: InstallmentType;
  givenAmount: number;
  givenDate: Date;
  loanBookId: string;
  mobileNumber: string;
  paidInstallmentDetails: Payment[];
  paidInstallments: number;
  totalInstallments: number;
  totalPaidAmount: number;
  emptyCheque: boolean;
  promissoryNote: boolean;
}

type InstallmentPaymentInfo = {
  amount: number;
  paidDate: string;
};

export const createLoanWithInstallments = createAsyncThunk<
  boolean,
  CreateLoanWithInstallmentsProps,
  { rejectValue: string }
>(
  "customerOperation/createLoanWithInstallments",
  async ({ ...ph }, { rejectWithValue }) => {
    const customer = {
      cityID: ph.city,
      customers: [
        {
          address: ph.address || "ADDRESS NOT PROVIDED",
          customerName: ph.customerName,
          phone: `+91${ph.mobileNumber}`,
          uId: ph.aadharNumber || uuid(),
        },
      ],
      documents: {
        emptyCheque: ph.emptyCheque,
        promissoryNote: ph.promissoryNote,
      },
      loanSerial: [ph.loanBookId],
    };
    const loan = {
      collectibleAmount: ph.amountPerInstallment * ph.totalInstallments,
      endDate: calculateDate({
        installmentType: ph.installmentType,
        date: formatDateToYYYYMMDD(ph.givenDate),
        totalInstallments: ph.totalInstallments,
        paidInstallments: ph.paidInstallments,
      }),
      givenAmount: ph.givenAmount,
      installmentAmount: ph.amountPerInstallment,
      installmentType: ph.installmentType,
      loanSerial: ph.loanBookId,
      nextDueDate: calculateDate({
        installmentType: ph.installmentType,
        date: formatDateToYYYYMMDD(ph.givenDate),
        totalInstallments: ph.paidInstallments + 1 + ph.paidInstallments,
        paidInstallments: ph.paidInstallments,
      }),
      paidAmount: ph.totalPaidAmount,
      paidInstallments: ph.paidInstallments,
      totalInstallments: ph.totalInstallments,
    };
    const paidInstallments: InstallmentPaymentInfo[] =
      ph.paidInstallmentDetails.map((installment) => {
        return {
          amount: installment.amount,
          paidDate: formatDateTimeToISOString(installment.date),
        };
      });
    const agentDetails = {
      agentID: ph.admin.id,
      name: ph.admin.name,
      phoneNumber: ph.admin.phoneNumber,
    };

    try {
      // console.log(
      //   {
      //     adminId: ph.admin.id,
      //     circleId: ph.selectedCircle.id,
      //     circleName: ph.selectedCircle.circleName,
      //     circleDateofCreation: ph.selectedCircle.dateOfCreation,
      //     dateTime: formatDateTimeToISOString(ph.givenDate),
      //     customerJson: JSON.stringify(customer),
      //     loanJson: JSON.stringify(loan),
      //     installmentsJson: JSON.stringify(paidInstallments),
      //     agentDetails: JSON.stringify(agentDetails),
      //   },
      //   null,
      //   2
      // );
      
      await createCustomerLoanWithInstallments({
        adminId: ph.admin.id,
        circleId: ph.selectedCircle.id,
        circleName: ph.selectedCircle.circleName,
        circleDateofCreation: ph.selectedCircle.dateOfCreation,
        dateTime: formatDateTimeToISOString(ph.givenDate),
        customerJson: JSON.stringify(customer),
        loanJson: JSON.stringify(loan),
        installmentsJson: JSON.stringify(paidInstallments),
        agentDetails: JSON.stringify(agentDetails),
      });
      return true;
    } catch (error) {
      console.log("Error in createLoanWithInstallments: ", error);
      return rejectWithValue("Failed to create loan with installments");
    }
  }
);

/**
 *  // TODO: 1. Create Customer Input
      // const customerInput: CreateCustomerInput = {
      //   adminID: admin.id,
      //   circleDateOfCreation: selectedCircle.dateOfCreation,
      //   circleID: selectedCircle.id,
      //   cityAdminID: admin.id,
      //   cityID: customer.city.id,
      //   customerStatus: CustomerStatus.ACTIVE,
      //   customers: [
      //     {
      //       address: customer.address,
      //       customerName: customer.customerName,
      //       phone: `+91${customer.mobileNumber}`,
      //       uId: customer.customerId,
      //     },
      //   ],
      //   dateOfCreation: loan.loanDate,
      //   isGroupLoan: false,
      //   id: customerId,
      //   loanSerial: [`${loan.loanBookId}`],
      // };
      // // TODO: 2. Create Loan Input
      // const loanInput: CreateLoanInput = {
      //   adminID: admin.id,
      //   circleID: selectedCircle.id,
      //   collectibleAmount: loan.installmentAmount * loan.totalInstallments,
      //   customerAdminID: admin.id,
      //   customerID: customerId,
      //   dateOfCreation: formatYYYYDDMMToISOString(loan.loanDate),
      //   endDate,
      //   givenAmount: loan.loanAmount,
      //   id: loanId,
      //   installmentAmount: loan.installmentAmount,
      //   installmentType: getInstallmentsType({ day: selectedCircle.day }),
      //   loanSerial: `${loan.loanBookId}`,
      //   nextDueDate,
      //   paidAmount: loan.totalPaidAmount,
      //   paidInstallments: loan.paidInstallments,
      //   status: LoanStatus.ACTIVE,
      //   totalInstallments: loan.totalInstallments,
      // };
      // // TODO: 3. Create Transaction Input
      // const addtionalTransactionDeatils: AdditionalTransactionInfoInput = {
      //   city: customer.city.name,
      //   collectionAgentDetails: {
      //     agentID: admin.id,
      //     name: admin.name,
      //     phoneNumber: admin.phoneNumber,
      //   },
      //   customerName: customer.customerName,
      //   description: "New Loan given to customer",
      //   loanSerial: `${loan.loanBookId}`,
      //   paymentMethod: PaymentMethod.CASH,
      //   transactionEvent: TransactionEventType.NEW_LOAN,
      //   totalOutstandingAmount: loan.installmentAmount * loan.totalInstallments,
      // };
      // const transactionInput: CreateTransactionInput = {
      //   additionalInfo: addtionalTransactionDeatils,
      //   adminID: admin.id,
      //   amount: loan.loanAmount,
      //   circleDateOfCreation: selectedCircle.dateOfCreation,
      //   circleID: selectedCircle.id,
      //   dateTime: formatYYYYDDMMToISOString(loan.loanDate),
      //   id: loanId,
      //   transactionType: TransactionType.LOAN,
      // };
      // // TODO: 4. Create Installment Input if there is any outstanding amount
      // const installmentInput: CreateInstallmentInput | null =
      //   loan.totalPaidAmount > 0
      //     ? {
      //         adminID: admin.id,
      //         circleID: selectedCircle.id,
      //         city: customer.city.name,
      //         collectionAgentDetails: {
      //           agentID: admin.id,
      //           name: admin.name,
      //           phoneNumber: admin.phoneNumber,
      //         },
      //         customerName: customer.customerName,
      //         dueDate: emiPaymentDate,
      //         installmentAmount: loan.installmentAmount,
      //         installmentNumber: loan.paidInstallments,
      //         loanAdminID: admin.id,
      //         loanID: loanId,
      //         loanSerial: `${loan.loanBookId}`,
      //         paidAmount: loan.totalPaidAmount,
      //         paymentMethod: PaymentMethod.CASH,
      //         paidDate: formatYYYYDDMMToISOString(emiPaymentDate),
      //         status: InstallmentStatus.PAID,
      //       }
      //     : null;
      // const result = await addCustomerAndLoanDetails({
      //   customerInput,
      //   loanInput,
      //   transactionInput,
      //   installmentInput,
      // });
      // dispatch(addCustomer(result));
 */
