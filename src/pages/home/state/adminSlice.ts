import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Admin, Member } from '@/models/API';
import { getOwner } from '@/api/adminApi';
import { addAdminData, addMemberData } from '@/toolkit/helper/helperSlice';
import { getAccessToken } from '@/hooks/useAdminDetails';
import { getMemberById } from '@/api/membersApi';

export type AdminState = {
    admin: Admin | null;
    member: Member | null;
    status: 'idle' | 'loading' | 'failed' | 'success';
    error?: string; // Optional error property
};

const initialState: AdminState = {
    admin: null,
    member: null,
    status: 'idle',
    error: undefined, // Initialize the error as undefined
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        resetAdmin: (state) => {
            state.admin = null;
            state.member = null;
            state.status = 'idle';
            state.error = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdmin.pending, (state) => {
                state.status = 'loading';
                state.error = undefined; // Clear any existing error
            })
            .addCase(fetchAdmin.fulfilled, (state, action: PayloadAction<Admin | Member>) => {
                // id there is a admin then set the admin else set the member
                action.payload.__typename === "Member" ? state.member = action.payload : state.admin = action.payload;
                state.status = 'success';
                state.error = undefined; // Clear any existing error
            })
            .addCase(fetchAdmin.rejected, (state, action) => {
                state.status = 'failed';
                // Set the error message based on the action payload
                state.error = action.payload ? String(action.payload) : 'An unknown error occurred';
            });
    },
});

export const fetchAdmin = createAsyncThunk<Admin | Member, { userID: string, email: string }, { rejectValue?: string }>(
    'admin/fetchAdmin',
    async ({ userID, email }, { rejectWithValue, dispatch }) => {
        try {
            const token = await getAccessToken();
            const userGroup = token?.payload['cognito:groups'] as string[];
            if (userGroup[0] !== "ADMINS") {
                const response = await getMemberById({ id: token?.payload['sub']!, name: token?.payload['name'] as string });
                dispatch(addMemberData(response))
                return response;
            } else {
                const response = await getOwner({ userID, email });
                dispatch(addAdminData(response))
                return response;
            }

        } catch (e: any) {
            // Handle the error based on your HTTP client's error structure
            const errorMessage = e.response.data.message;
            // Use rejectWithValue to return a custom error message
            return rejectWithValue(errorMessage);
        }
    }
);

export default adminSlice.reducer;
export const { resetAdmin } = adminSlice.actions;