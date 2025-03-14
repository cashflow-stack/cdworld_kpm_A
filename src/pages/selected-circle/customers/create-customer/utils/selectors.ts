import { RootState } from "@/toolkit/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectLoanFormData = createSelector(
  // Input selectors
  (state: RootState) => state.dataHelper.selectedCircle,
  (state: RootState) => state.dataHelper.admin,
  (state: RootState) => state.customerOperations.status,
  (state: RootState) => state.cities.cities,
  (state: RootState) => state.closing.cashAccount,

  // Output selector
  (selectedCircle, admin, status, cities, cashAccount) => ({
    selectedCircle,
    admin,
    status,
    cities,
    cashAccount,
  })
);
