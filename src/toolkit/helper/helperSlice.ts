import {
  Admin,
  // CashAccount,
  Circle,
  Installment,
  Loan,
  Member,
} from "@/models/API";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SimplifiedCustomer } from "@/models/customModels/customModels";

export type helperState = {
  admin: Admin | null;
  member: Member | null;
  circles: Circle[] | null;
  selectedCircle: Circle | null;
  selectedCustomer: SimplifiedCustomer | null;
  // lastClosingEntry: CashAccount | null;
  loan: Loan | null;
  installment: Installment | null;
  isBookViewOpen: boolean;
};

// Load admin from local storage if it exists
const loadAdminFromLocalStorage = (): Admin | null => {
  const savedAdmin = localStorage.getItem("admin");
  if (savedAdmin) {
    try {
      return JSON.parse(savedAdmin);
    } catch (error) {
      console.error("Error parsing admin from localStorage", error);
      return null;
    }
  }
  return null;
};

// Load selectedCircle from local storage if it exists
const loadSelectedCircleFromLocalStorage = (): Circle | null => {
  const savedCircle = localStorage.getItem("selectedCircle");
  if (savedCircle) {
    try {
      return JSON.parse(savedCircle);
    } catch (error) {
      console.error("Error parsing selectedCircle from localStorage", error);
      return null;
    }
  }
  return null;
};

// Load selectedCustomer from local storage if it exists
const loadSelectedCustomerFromLocalStorage = (): SimplifiedCustomer | null => {
  const savedCustomer = localStorage.getItem("selectedCustomer");
  if (savedCustomer) {
    try {
      return JSON.parse(savedCustomer);
    } catch (error) {
      console.error("Error parsing selectedCustomer from localStorage", error);
      return null;
    }
  }
  return null;
};

const loadAllCirclesFromLocalStorage = (): Circle[] | null => {
  const savedCircles = localStorage.getItem("circles");
  if (savedCircles) {
    try {
      return JSON.parse(savedCircles);
    } catch (error) {
      console.error("Error parsing circles from localStorage", error);
      return null;
    }
  }
  return null;
};

// const loadLastClosingEntryFromLocalStorage = (): CashAccount | null => {
//   const savedLastClosingEntry = localStorage.getItem("lastClosingEntry");
//   console.log("savedLastClosingEntry", savedLastClosingEntry);
//   if (savedLastClosingEntry) {
//     try {
//       return JSON.parse(savedLastClosingEntry);
//     } catch (error) {
//       console.error("Error parsing lastClosingEntry from localStorage", error);
//       return null;
//     }
//   }
//   return null;
// };

const initialState: helperState = {
  admin: loadAdminFromLocalStorage(),
  member: null,
  circles: loadAllCirclesFromLocalStorage(),
  selectedCircle: loadSelectedCircleFromLocalStorage(),
  selectedCustomer: loadSelectedCustomerFromLocalStorage(),
  // lastClosingEntry: loadLastClosingEntryFromLocalStorage(),
  loan: null,
  installment: null,
  isBookViewOpen: false,
};

const helperSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {
    addAdminData: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
      // Save admin to local storage
      localStorage.setItem("admin", JSON.stringify(action.payload));
    },
    addMemberData: (state, action: PayloadAction<Member>) => {
      state.member = action.payload;
    },
    addAllCirclesData: (state, action: PayloadAction<Circle[]>) => {
      state.circles = action.payload;
      // Save circles to local storage
      localStorage.setItem("circles", JSON.stringify(action.payload));
    },
    onAddNewCircle: (state, action: PayloadAction<Circle>) => {
      // Add new circle to the existing circles
      state.circles?.push(action.payload);
      // Resetting circles to local storage after adding new circle to the state
      localStorage.setItem("circles", JSON.stringify(state.circles));
    },
    addSelectedCircleData: (state, action: PayloadAction<Circle>) => {
      state.selectedCircle = action.payload;
      // Save selectedCircle to local storage
      localStorage.setItem("selectedCircle", JSON.stringify(action.payload));
    },
    addSelectedSimplifiedCustomerData: (
      state,
      action: PayloadAction<SimplifiedCustomer>
    ) => {
      state.selectedCustomer = action.payload;
      // Save selectedCircle to local storage
      localStorage.setItem("selectedCustomer", JSON.stringify(action.payload));
    },
    // addLastClosingEntry: (state, action: PayloadAction<CashAccount>) => {
    //   state.lastClosingEntry = action.payload;
    //   // Save lastClosingEntry to local storage
    //   localStorage.setItem("lastClosingEntry", JSON.stringify(action.payload));
    // },

    resetHelper: (state) => {
      state.loan = null;
      state.admin = null;
      state.member = null;
      state.circles = null;
      state.installment = null;
      state.selectedCircle = null;
      // state.lastClosingEntry = null;
      state.selectedCustomer = null;
      localStorage.removeItem("admin");
      localStorage.removeItem("circles");
      localStorage.removeItem("selectedCircle");
      localStorage.removeItem("selectedCustomer");
      // localStorage.removeItem("lastClosingEntry");
    },
    setIsBookViewOpen: (state, action: PayloadAction<boolean>) => {
      state.isBookViewOpen = action.payload;
    },
  },
});

export default helperSlice.reducer;
export const {
  addAdminData,
  addMemberData,
  addAllCirclesData,
  onAddNewCircle,
  addSelectedCircleData,
  addSelectedSimplifiedCustomerData,
  // addLastClosingEntry,
  resetHelper,
  setIsBookViewOpen,
} = helperSlice.actions;

export const adminData = (state: RootState) => state.dataHelper.admin;
export const circleData = (state: RootState) => state.dataHelper.selectedCircle;
