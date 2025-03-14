import { modifyCustomer } from "@/api/customerApi";
import { UpdateCustomerInput } from "@/models/API";
import { SimplifiedCustomer } from "@/models/customModels/customModels";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type UpdateCustomerState = {
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
};

const initialState: UpdateCustomerState = {
  status: "idle",
  error: null,
};

interface CustomerUpdateRequestProps {
  oldCustomer: SimplifiedCustomer;
  customerId: string;
  adminId: string;
  aadharNumber: string | null;
  customerName: string | null;
  phoneNumber: string | null;
  address: string | null;
  emptyCheque?: boolean | null;
  promissoryNote?: boolean | null;
}

export const updateCustomerData = createAsyncThunk(
  "updateCustomer/update",
  async (
    {
      oldCustomer,
      customerId,
      adminId,
      aadharNumber,
      customerName,
      phoneNumber,
      address,
      emptyCheque,
      promissoryNote,
    }: CustomerUpdateRequestProps,
    { rejectWithValue }
  ) => {
    if (!customerId || !adminId) {
      return rejectWithValue("Customer ID and Admin ID are required");
    }

    const updatedCustomer: UpdateCustomerInput = {
      id: customerId,
      adminID: adminId,
      customers: [
        {
          address: address ?? oldCustomer.customerAddress,
          customerName: customerName ?? oldCustomer.customerName,
          phone: phoneNumber ?? oldCustomer.customerPhone,
          uId: aadharNumber ?? oldCustomer.customeruId,
        },
      ],
      documents: {
        emptyCheque: emptyCheque ?? oldCustomer.emptyCheque,
        promissoryNote: promissoryNote ?? oldCustomer.promissoryNote,
      },
    };

    try {
      const result = await modifyCustomer({ updatedCustomer });
      return result;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to update customer";
      console.error("Customer update failed:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const updateCustomerSlice = createSlice({
  name: "updateCustomer",
  initialState,
  reducers: {
      resetUpdateState: (state) => {
        state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCustomerData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
        .addCase(updateCustomerData.fulfilled, (state) => {
        state.status = "success";
        state.error = null;
      })
        .addCase(updateCustomerData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetUpdateState } = updateCustomerSlice.actions;
export default updateCustomerSlice.reducer;
