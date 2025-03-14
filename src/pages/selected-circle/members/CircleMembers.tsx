import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useCallback, memo } from "react";
import {
  LuArrowBigDown,
  LuArrowBigUp,
  LuKeySquare,
  LuUserMinus,
  LuEllipsis
  // LuArrowBigDown,
  // LuArrowBigUp,
  // LuKeySquare,
} from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "./data-table/data-table";
import { columns } from "./data-table/columns";
import { Member, MemberStatus } from "@/models/API";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/toolkit/store";
import { fetchExistingMembers } from "@/toolkit/common/member/memberSliceByCircle";
import {
  formatDateToYYYYMMDD,
  formatPhoneNumber,
} from "@/toolkit/helper/helperFunctions";
import { fetchIncomeAndExpense } from "./state/incomeAndExpenseSlice";
import CreateNewCircle from "@/pages/home/circles/widgets/CreateNewCircle";
import { removeMember } from "@/toolkit/common/member/memberOperationSlice";
import { UnlinkMemberDialog } from "./widgets/UnlinkMemberDialog";

export default function CircleMembers() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCircle } = useSelector(
    (state: RootState) => state.dataHelper
  );
  const { status } = useSelector((state: RootState) => state.memberOperations);
  useEffect(() => {
    if (selectedCircle) {
      dispatch(
        fetchExistingMembers({
          circle: selectedCircle
        })
      );
    }
  }, [dispatch, selectedCircle, status]);
  return <CircleMembersScreen />;
}

function CircleMembersScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCircle } = useSelector(
    (state: RootState) => state.dataHelper
  );
  const { members, status } = useSelector(
    (state: RootState) => state.selectedCircleMembers
  );

  const [selectedMember, setSelectedMember] = useState<string | null>(
    members.length > 0 ? members[0]?.id : null
  );
  useEffect(() => {
    if (members.length > 0) {
      setSelectedMember(members[0]?.id);
    }
  }, [members]);

  const [unlinkDialogOpen, setUnlinkDialogOpen] = useState(false);
  const [memberToUnlink, setMemberToUnlink] = useState<Member | null>(null);

  const handleUnlinkClick = useCallback((member: Member) => {
    setMemberToUnlink(member);
    setUnlinkDialogOpen(true);
  }, []);

  const now = formatDateToYYYYMMDD(new Date());

  useEffect(() => {
    if (selectedMember) {
      dispatch(
        fetchIncomeAndExpense({
          memberId: selectedMember,
          date: now,
          circleId: selectedCircle?.id!,
        })
      );
    } else {
      dispatch(
        fetchIncomeAndExpense({
          memberId: members[0]?.id,
          date: now,
          circleId: selectedCircle?.id!,
        })
      );
    }
  }, [dispatch, selectedMember, selectedCircle, now]);

  const handleMemberClick = useCallback((memberName: string) => {
    setSelectedMember(memberName);
  }, []);

  const handleUnlinkConfirm = useCallback(() => {
    if (!selectedCircle || !memberToUnlink) return console.log("Error");
    dispatch(
      removeMember({ memberId: memberToUnlink.id, circleId: selectedCircle.id })
    );
  }, [dispatch, selectedCircle, memberToUnlink]);

  if (status === "success") {
    return (
      <>
        <div className="flex items-center flex-wrap mx-5 my-2 justify-between">
          <h2 className="text-xl my-2 sm:my-0 font-semibold tracking-tight">
            Members({members.length})
          </h2>
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 flex items-center justify-between">
            {selectedCircle && (
              <CreateNewCircle
                stepNo={2}
                circleID={selectedCircle.id}
                circleDate={selectedCircle.dateOfCreation}
              />
            )}
          </div>
        </div>
        <>
          <div className="md:hidden py-2 px-4">
            <Select
              defaultValue={selectedMember || ""}
              onValueChange={(value) => setSelectedMember(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Member" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Members</SelectLabel>
                  {members.map((member) => (
                    <SelectItem
                      key={member.id}
                      value={member.id}
                      onClick={() => handleMemberClick(member.id)}
                    >
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <main className="grid flex-1 gap-4 overflow-auto p-4 pt-0 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative hidden w-full flex-col items-start gap-8 md:flex">
              <Card className="w-full">
                <CardContent className="grid gap-4 p-2">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className={`flex items-center cursor-pointer gap-4 p-4 rounded-md ${
                        selectedMember === member.id
                          ? "bg-secondary/30"
                          : "hover:bg-secondary/20"
                      }`}
                      onClick={() => handleMemberClick(member.id)}
                    >
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarFallback className="font-cinzel font-semibold">
                          {member.name.charAt(0).toLocaleUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          {member.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatPhoneNumber(member.phoneNumber)}
                        </p>
                      </div>
                      {member.status === MemberStatus.ACTIVE ? (
                        <Badge
                          variant="outline"
                          className="ml-auto font-medium"
                        >
                          {member.memberRole}
                        </Badge>
                      ) : (
                        <Badge
                          variant="destructive"
                          className="ml-auto font-medium"
                        >
                          Disabled
                        </Badge>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <LuEllipsis className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            className="flex gap-2 items-center"
                            onClick={() => handleUnlinkClick(member)}
                          >
                            <LuUserMinus className="h-4 w-4" />
                            Unlink
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex gap-2 items-center"
                            disabled
                          >
                            <LuKeySquare className="h-4 w-4" />
                            Change Password
                          </DropdownMenuItem>
                          <DropdownMenuItem disabled>
                            {member.status === MemberStatus.ACTIVE ? (
                              <span className="flex gap-2 items-center">
                                <LuArrowBigDown className="h-5 w-5" />
                                <span>Disable</span>
                              </span>
                            ) : (
                              <span className="flex gap-2 items-center">
                                <LuArrowBigUp className="h-5 w-5" />
                                <span>Enable</span>
                              </span>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
              <FetchMemberTransactionData />
            </div>
          </main>
        </>
        {memberToUnlink && (
          <UnlinkMemberDialog
            isOpen={unlinkDialogOpen}
            onClose={() => setUnlinkDialogOpen(false)}
            onConfirm={handleUnlinkConfirm}
            memberName={memberToUnlink.name}
          />
        )}
      </>
    );
  } else if (status === "failed") {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-lg text-muted-foreground">Failed to Load members</p>
      </div>
    );
  } else if (status === "empty") {
    <div className="flex items-center justify-center h-96">
      <p className="text-lg text-muted-foreground">No members found</p>
    </div>;
  }

  return <div>Loading...</div>;
}

const FetchMemberTransactionData = memo(function FetchMemberTransactionData() {
  const { incomeAndExpense, status } = useSelector(
    (state: RootState) => state.incomeAndExpense
  );

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  } else if (status === "failed") {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-lg text-muted-foreground">
          Failed to Load Income and Expense
        </p>
      </div>
    );
  }

  return <DataTable columns={columns} data={incomeAndExpense} />;
});
