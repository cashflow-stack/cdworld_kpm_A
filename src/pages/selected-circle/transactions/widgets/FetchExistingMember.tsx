import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { AppDispatch, RootState } from "@/toolkit/store";
import { FormSelect } from "@/components/FormFields";
import { fetchExistingMembers } from "@/toolkit/common/member/memberSliceByCircle";

const GetMembersList = ({ control }: { control: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCircle = useSelector(
    (state: RootState) => state.dataHelper.selectedCircle
  );

  // Get the members from the store
  const { members, status } = useSelector(
    (state: RootState) => state.selectedCircleMembers
  );

  const fetchMembers = useCallback(() => {
    if (selectedCircle) {
      dispatch(fetchExistingMembers({ circle: selectedCircle }));
    }
  }, [dispatch, selectedCircle]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "failed") {
    return <div className="text-red-500 font-bold">Failed to load members</div>;
  }

  return (
    <FormSelect
      control={control}
      label="Members"
      name="selectedPartnerId"
      placeholder="Select Partner"
      keyPair={members.map((member) => ({
        key: member.name,
        value: member.id,
      }))}
    />
  );
};

export default GetMembersList;
