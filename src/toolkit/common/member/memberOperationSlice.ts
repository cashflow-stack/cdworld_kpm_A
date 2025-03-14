import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Member, MemberRole } from "@/models/API";
import { addMemberToExistingCircle } from "@/api/memberCircleAssignments/addMemberToExistingCircle";
import { RootState } from "@/toolkit/store";
import { removeCircleMember } from "@/api/circleMemberApi";

type memberOperationState = {
  status:
    | "idle"
    | "failed"
    | "creating"
    | "created"
    | "updating"
    | "updated"
    | "deleting"
    | "deleted";
  member: Member | null;
  error?: string;
};

const initialState: memberOperationState = {
  status: "idle",
  member: null,
};

const memberOperationSlice = createSlice({
  name: "memberOperations",
  initialState,
  reducers: {
    resetMemberOperation: (state) => {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMember.pending, (state) => {
        state.status = "creating";
        state.error = undefined;
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.status = "created";
        state.member = action.payload;
        state.error = undefined;
      })
      .addCase(createMember.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      })
      .addCase(removeMember.pending, (state) => {
        state.status = "deleting";
        state.error = undefined;
      })
      .addCase(removeMember.fulfilled, (state) => {
        state.status = "deleted";
        state.error = undefined;
      })
      .addCase(removeMember.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
  },
});

export default memberOperationSlice.reducer;
export const { resetMemberOperation } = memberOperationSlice.actions;

export type CreateMemberInput = {
  name?: string;
  phone?: string;
  email?: string;
  circleId: string;
  circleDateOfCreation: string;
  existingMember?: Member;
  memberRole?: MemberRole;
};

//! Create a new member
export const createMember = createAsyncThunk<
  Member,
  CreateMemberInput,
  { rejectValue: string }
>(
  "memberOperations/createMember",
  async (input: CreateMemberInput, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { admin } = state.dataHelper;
    if (!admin) {
      return rejectWithValue("Admin not found");
    }
    try {
      const response = await addMemberToExistingCircle({
        adminId: admin.id,
        adminEmail: admin.emailId,
        memberName: input.name,
        memberPhone: `+91${input.phone}`,
        memberEmail: input.email,
        circleid: input.circleId,
        circleDateOfcreation: input.circleDateOfCreation,
        member: input.existingMember,
        memberRole: input.memberRole || MemberRole.AGENT,
      });
      return response;
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      return rejectWithValue(errorMessage);
    }
  }
);

// remove a member from a circle which takes in the member id and circle id
export const removeMember = createAsyncThunk<
  void,
  { memberId: string; circleId: string },
  { rejectValue: string }
>("memberOperations/removeMember", async (input, { rejectWithValue }) => {
  try {
    await removeCircleMember({
      memberId: input.memberId,
      circleId: input.circleId,
    });
  } catch (e: any) {
    const errorMessage = e.response.data.message;
    return rejectWithValue(errorMessage);
  }
});
