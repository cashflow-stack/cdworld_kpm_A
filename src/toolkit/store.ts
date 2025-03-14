import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "@/pages/home/state/adminSlice";
import circleReducer from "@/pages/home/circles/state/circlesSlice";
import circleOperationReducer from "@/pages/home/circles/state/circleOperationSlice";
import memberReducer from "@/pages/home/circles/state/membersSliceByAdmin";
import memberOperationReducer from "@/toolkit/common/member/memberOperationSlice";
import helperReducer from "./helper/helperSlice";
import customerReduces from "@/pages/selected-circle/customers/state/customerSlice";
import customerOperationReduces from "@/pages/selected-circle/customers/state/customerOperationSlice";
import citiesReducers from "@/toolkit/common/city/citiesSlice";
import loansReducer from "@/pages/selected-circle/customers/selected-customers/state/loanSlice";
import loanOperationReducers from "@/pages/selected-circle/customers/selected-customers/state/loanOperationSlice";
import installmentsReducer from "@/pages/selected-circle/customers/selected-customers/state/installmentSlice";
import installmentsOperationReducer from "@/pages/selected-circle/customers/selected-customers/state/installmentOperationSlice";
import transactionReducer from "@/pages/selected-circle/transactions/state/transaction/transactionSlice";
import treansactionOperationReducer from "@/pages/selected-circle/transactions/state/transaction/transactionOperations";
import selectedCircleMemberReducer from "@/toolkit/common/member/memberSliceByCircle";
import cityOperationsReducer from "@/toolkit/common/city/cityOperatationsSlice";
import closingEntryReducer from "@/toolkit/common/last-closing-entry/closingSlice";
import closingEntryOperationsReducer from "@/pages/selected-circle/transactions/state/closing/closingOperations";
import incomeAndExpanseReducer from "@/pages/selected-circle/members/state/incomeAndExpenseSlice";
import recentActivityReducer from "@/pages/selected-circle/dashboard/state/recentActivitySlice";
import outStandingReducer from "@/pages/selected-circle/dashboard/state/outstandingAmountSlice";
import chartsDataReducer from "@/pages/selected-circle/dashboard/state/chartsDataSlice";
import generatePdfSliceReducer from "@/pages/selected-circle/transactions/pdf/state/generatePdfSlice";
import loanClosureReducer from "@/pages/selected-circle/customers/selected-customers/state/closeLoanSlice";
import bulkPostingReducer from "@/pages/selected-circle/customers/bulk-posting/state/postingSlice";
import bulkPostingOperationReducer from "@/pages/selected-circle/customers/bulk-posting/state/postingOperations";
import pendingCustomersReducer from "@/pages/selected-circle/dashboard/state/pendingCustomersSlice";
import closingHistoryReducer from "@/pages/selected-circle/dashboard/cashAccountHistory/state/closingHistorySlice";
import cashAccountEntrySummaryReducer from "@/pages/selected-circle/dashboard/cashAccountHistory/cashAccountEntrySummary/state/cashAccountEntrySummarySlice";
import updateCustomerReducer from "@/pages/selected-circle/customers/update-customer/state/updateCustomerSlice";
export const store = configureStore({
  reducer: {
    admin: adminReducer,
    members: memberReducer,
    memberOperations: memberOperationReducer,
    circles: circleReducer,
    circleOperations: circleOperationReducer,
    dataHelper: helperReducer,
    customers: customerReduces,
    customerOperations: customerOperationReduces,
    cities: citiesReducers,
    cityOperations: cityOperationsReducer,
    loans: loansReducer,
    loanOperations: loanOperationReducers,
    installments: installmentsReducer,
    installmentOperations: installmentsOperationReducer,
    transactions: transactionReducer,
    transactionOperations: treansactionOperationReducer,
    selectedCircleMembers: selectedCircleMemberReducer,
    closing: closingEntryReducer,
    closingOperations: closingEntryOperationsReducer,
    incomeAndExpense: incomeAndExpanseReducer,
    recentActivity: recentActivityReducer,
    outstandingAmount: outStandingReducer,
    chartsData: chartsDataReducer,
    generatePdf: generatePdfSliceReducer,
    loanClosing: loanClosureReducer,
    bulkPosting: bulkPostingReducer,
    bulkPostingOperations: bulkPostingOperationReducer,
    pendingCustomers: pendingCustomersReducer,
    closingHistory: closingHistoryReducer,
    cashAccountEntrySummary: cashAccountEntrySummaryReducer,
    updateCustomer: updateCustomerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
