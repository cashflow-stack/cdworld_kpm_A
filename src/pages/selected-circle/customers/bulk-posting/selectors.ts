import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/toolkit/store";

export const selectedCircleData = (state: RootState) =>
  state.dataHelper.selectedCircle;
export const lastClosingEntryData = (state: RootState) =>
  state.closing.cashAccount;
export const closingEntryStatus = (state: RootState) => state.closing.status;
export const loansData = (state: RootState) => state.bulkPosting.loans;
export const simplifiedLoansStatus = (state: RootState) =>
  state.bulkPosting.status;

export const selectCombinedData = createSelector(
  [
    selectedCircleData,
    lastClosingEntryData,
    closingEntryStatus,
    loansData,
    simplifiedLoansStatus,
  ],
  (
    selectedCircle,
    lastClosingEntry,
    closingEntryStatus,
    loansData,
    simplifiedLoansStatus
  ) => ({
    selectedCircle,
    lastClosingEntry,
    closingEntryStatus,
    loansData,
    simplifiedLoansStatus,
  })
);