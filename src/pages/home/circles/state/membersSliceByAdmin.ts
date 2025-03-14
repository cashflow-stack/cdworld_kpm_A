import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchMembers } from '@/api/membersApi';
import { Member } from '@/models/API';

export type MembersState = {
    members: Member[];
    status: 'idle' | 'loading' | 'failed' | 'success' | 'empty';
    error?: string;
};

const initialState: MembersState = {
    members: [],
    status: 'idle',
    error: undefined,
};

const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExistingMembers.pending, (state) => {
                state.status = 'loading';
                state.error = undefined;
            })
            .addCase(fetchExistingMembers.fulfilled, (state, action: PayloadAction<Member[]>) => {
                state.status = action.payload.length ? 'success' : 'empty';
                state.members = action.payload;
                state.error = undefined;
            })
            .addCase(fetchExistingMembers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? String(action.payload) : 'An unknown error occurred';
            });
    },
});

export const fetchExistingMembers = createAsyncThunk<Member[], { adminId: string, adminEmailId: string }, { rejectValue: string }>(
    'members/fetchMembers',
    async ({ adminId, adminEmailId }, { rejectWithValue }) => {
        try {
            const response = await fetchMembers({ adminId, adminEmailId });

            return response;
        } catch (e: string | any) {
            console.error(e);
            return rejectWithValue(e);
        }
    }
);

export default membersSlice.reducer;
