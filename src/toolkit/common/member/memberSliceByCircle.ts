import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Circle, Member, MemberRole, MemberStatus } from "@/models/API";
import { fetchMembersByCircle } from "@/api/membersApi";
import { RootState } from "@/toolkit/store";

export type MembersState = {
  members: Member[];
  status: "idle" | "loading" | "failed" | "success" | "empty";
  error?: string;
};

const initialState: MembersState = {
  members: [],
  status: "idle",
  error: undefined,
};

const selectedCircleMember = createSlice({
  name: "circleMembers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExistingMembers.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(
        fetchExistingMembers.fulfilled,
        (state, action: PayloadAction<Member[]>) => {
          state.status = action.payload.length ? "success" : "empty";
          state.members = action.payload;
          state.error = undefined;
        }
      )
      .addCase(fetchExistingMembers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
  },
});

export default selectedCircleMember.reducer;

export const fetchExistingMembers = createAsyncThunk<
  Member[],
  { circle: Circle },
  { rejectValue: string }
>(
  "circleMembers/fetchMembers",
  async (
    { circle },
    { rejectWithValue, getState }
  ) => {
    try {
      const response = await fetchMembersByCircle({
        circleId: circle.id,
        circleDateOfCreation: circle.dateOfCreation,
      });
      const state = getState() as RootState;
      const { admin } = state.dataHelper;
      if (!admin) {
        throw new Error("Admin not found");
      }
      const adminMember: Member = {
        __typename: "Member",
        adminEmailId: admin.emailId,
        adminID: admin.id,
        createdAt: new Date().toISOString(),
        emailId: admin.emailId,
        id: admin.id,
        memberRole: MemberRole.PARTNER,
        name: admin.name,
        phoneNumber: admin.phoneNumber,
        status: MemberStatus.ACTIVE,
        updatedAt: new Date().toISOString(),
      };
      const circleAsMember: Member = {
        __typename: "Member",
        adminEmailId: admin.emailId,
        adminID: admin.id,
        createdAt: new Date().toISOString(),
        emailId: admin.emailId,
        id: circle.id,
        memberRole: MemberRole.PARTNER,
        name: circle.circleName,
        phoneNumber: admin.phoneNumber,
        status: MemberStatus.ACTIVE,
        updatedAt: new Date().toISOString(),
      };

      return [adminMember, circleAsMember, ...response];
    } catch (e: string | any) {
      console.error(e);
      return rejectWithValue(e);
    }
  }
);
