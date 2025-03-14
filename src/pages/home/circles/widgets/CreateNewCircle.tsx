import { useEffect, useState, useMemo, memo } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import circleDays from "@/constants/circleDays";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MemberRole, Weekday } from "@/models/API";
import useAdminDetails from "@/hooks/useAdminDetails";
import { AppDispatch, RootState } from "@/toolkit/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchExistingMembers } from "../state/membersSliceByAdmin";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  createCircle,
  resetCircleOperation,
} from "../state/circleOperationSlice";
import { useTranslation } from "react-i18next";
import {
  createMember,
  resetMemberOperation,
} from "@/toolkit/common/member/memberOperationSlice";
import {
  ErrorNotification,
  SuccessNotification,
} from "@/components/Notification";
import { formatDateToYYYYMMDD } from "@/toolkit/helper/helperFunctions";
import { FormSelect } from "@/components/FormFields";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import { Calendar } from "@/components/ui/calendar";

type CreateNewMemberProps = {
  stepNo?: number;
  circleID?: string;
  circleDate?: string;
};

export default function CreateNewCircle({
  stepNo,
  circleID,
  circleDate,
}: CreateNewMemberProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState<number>(stepNo || 1);
  const dispatch = useDispatch<AppDispatch>();
  const { circle, status } = useSelector(
    (state: RootState) => state.circleOperations
  );

  useEffect(() => {
    if (status === "created") {
      const timeoutId = setTimeout(() => {
        setStep(2);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [status]);

  const { status: memberCreationStatus } = useSelector(
    (state: RootState) => state.memberOperations
  );

  useEffect(() => {
    if (memberCreationStatus === "failed") {
      console.log("Failed to create member");
      setStep(3);
    } else if (memberCreationStatus === "created") {
      console.log("Member created successfully");
      setStep(3);
    }
  }, [memberCreationStatus]);

  const dialogHandlers = useMemo(
    () => ({
      onOpenChange: (isOpen: boolean) => {
        if (!isOpen) {
          dispatch(resetCircleOperation());
          dispatch(resetMemberOperation());
          setStep(stepNo || 1);
        }
      },
    }),
    [dispatch, stepNo]
  );

  return (
    <Dialog onOpenChange={dialogHandlers.onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          {!stepNo
            ? t("createCirclePopup.addCircleBtn")
            : t("createCirclePopup.addMemberBtn")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {step === 1
              ? `${t("createCirclePopup.createCircleHeading")} (1/2)`
              : step === 2 && stepNo
              ? `${t("createCirclePopup.addNewMemberToCircle")}`
              : step === 2
              ? `${t("createCirclePopup.assignAgentHeading")} (2/2)`
              : null}
          </DialogTitle>
          <DialogDescription>
            {step === 1
              ? t("createCirclePopup.createCircleSubHeading")
              : step === 2 && stepNo
              ? t("createCirclePopup.assignNewMemberSubHeading")
              : step === 2
              ? t("createCirclePopup.assignAgentSubHeading")
              : null}
          </DialogDescription>
        </DialogHeader>
        {step === 1 ? (
          <MemoizedCircleDetails />
        ) : step === 2 ? (
          <MemoizedCircleMembers
            id={circleID ?? circle?.id!}
            dateOfCreation={circleDate ?? circle?.dateOfCreation!}
            fromMembers={stepNo === 2}
          />
        ) : memberCreationStatus === "failed" ? (
          <ErrorNotification
            onClose={() => {
              setStep(stepNo || 1);
            }}
            text="Email already exists or Error in creating member"
          />
        ) : (
          <SuccessNotification
            onClose={() => {
              setStep(stepNo || 1);
            }}
            text="Member created successfully"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

//! assign members to the circle
const formTwoSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long.",
    })
    .max(30, {
      message: "Name must be at most 30 characters long.",
    })
    .trim(),
  phoneNumber: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters long.",
    })
    .max(10, {
      message: "Phone number must be at most 10 characters long.",
    })
    .trim(),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .trim(),
  role: z.string({ message: "Please select a role." }),
});

const formThreeSchema = z.object({
  memberId: z.string({
    message: "Please select a member.",
  }),
});
function CircleMembers({
  id,
  dateOfCreation,
  fromMembers,
}: {
  id: string;
  dateOfCreation: string;
  fromMembers: boolean;
}) {
  const { t } = useTranslation();
  const { userID, email } = useAdminDetails();
  const dispatch = useDispatch<AppDispatch>();
  const { status: memberCreationStatus } = useSelector(
    (state: RootState) => state.memberOperations
  );

  // 1. Define your form.
  const formTwo = useForm<z.infer<typeof formTwoSchema>>({
    resolver: zodResolver(formTwoSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      role: "AGENT",
    },
  });
  // 1.1. Define your form for existing members.
  const formThree = useForm<z.infer<typeof formThreeSchema>>({
    resolver: zodResolver(formThreeSchema),
  });

  // 2. Define a submit handler new member.
  function handleSubmitNewMember(values: z.infer<typeof formTwoSchema>) {
    dispatch(
      createMember({
        circleId: id,
        circleDateOfCreation: dateOfCreation,
        name: values.name,
        phone: values.phoneNumber,
        email: values.email,
        memberRole: values.role as MemberRole,
      })
    );
    formTwo.reset();
    formThree.reset();
  }

  // 2.1. Define a submit handler for existing member.
  function handleExistingMemberSelect(value: z.infer<typeof formThreeSchema>) {
    const member = members.find((member) => member.id === value.memberId);
    dispatch(
      createMember({
        circleId: id,
        circleDateOfCreation: dateOfCreation,
        existingMember: member,
      })
    );
  }

  useEffect(() => {
    dispatch(fetchExistingMembers({ adminId: userID, adminEmailId: email }));
  }, [userID, email, dispatch]);

  const { members, status } = useSelector((state: RootState) => state.members);

  return (
    <Tabs defaultValue="new">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="new">{t("createCirclePopup.new")}</TabsTrigger>
        <TabsTrigger value="existing">
          {t("createCirclePopup.existing")}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="new">
        <Form {...formTwo}>
          <form
            onSubmit={formTwo.handleSubmit(handleSubmitNewMember)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={formTwo.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("createNewMemberForm.name")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("createNewMemberForm.namePlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formTwo.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("createNewMemberForm.phone")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("createNewMemberForm.phonePlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formTwo.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("createNewMemberForm.email")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("createNewMemberForm.emailPlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {fromMembers && (
              <FormSelect
                label="Member Role"
                control={formTwo.control}
                name="role"
                placeholder="Select the role of the member"
                keyPair={Object.values(MemberRole).map((role) => ({
                  key: role,
                  value: role,
                }))}
              />
            )}

            <DialogFooter className="grid grid-cols-6">
              {memberCreationStatus === "creating" ||
              memberCreationStatus === "created" ? (
                <div className="col-start-4 col-end-7 place-self-end">
                  <Button disabled>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    {t("wait")}
                  </Button>
                </div>
              ) : (
                <>
                  <DialogClose asChild className="col-start-1 col-end-3">
                    <Button variant="ghost">
                      {t("createNewMemberForm.close")}
                    </Button>
                  </DialogClose>
                  <Button type="submit" className="col-start-5 col-end-7">
                    {t("createNewMemberForm.submit")}
                  </Button>
                </>
              )}
            </DialogFooter>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="existing">
        <Form {...formThree}>
          <form
            onSubmit={formThree.handleSubmit(handleExistingMemberSelect)}
            className="space-y-8"
          >
            <FormField
              control={formThree.control}
              name="memberId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("createNewMemberForm.selectAgent")}</FormLabel>
                  {status === "loading" ? (
                    <p>Loading...</p>
                  ) : status === "failed" ? (
                    <p>Failed to load data</p>
                  ) : status === "empty" ? (
                    <p>No data found</p>
                  ) : (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue
                          placeholder={t(
                            "createNewMemberForm.selectAgentPlaceholder"
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Existing Members</SelectLabel>
                          {fromMembers
                            ? members.map((role) => (
                                <SelectItem key={role.id} value={role.id}>
                                  {role.name}
                                </SelectItem>
                              ))
                            : members
                                .filter(
                                  (member) =>
                                    member.memberRole === MemberRole.AGENT
                                )
                                .map((role) => (
                                  <SelectItem key={role.id} value={role.id}>
                                    {role.name}
                                  </SelectItem>
                                ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="grid grid-cols-6">
              {memberCreationStatus === "creating" ||
              memberCreationStatus === "created" ? (
                <div className="col-start-5 col-end-7">
                  <Button disabled>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    {t("wait")}
                  </Button>
                </div>
              ) : (
                <>
                  <DialogClose asChild className="col-start-1 col-end-2">
                    <Button variant="ghost">
                      {t("createNewMemberForm.close")}
                    </Button>
                  </DialogClose>
                  <Button type="submit" className="col-start-5 col-end-7">
                    {t("createNewMemberForm.submit")}
                  </Button>
                </>
              )}
            </DialogFooter>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
}

//! create new circle
const formOneSchema = z.object({
  circlename: z
    .string()
    .min(2, {
      message: "Circle Name must be at least 3 characters long.",
    })
    .max(30, {
      message: "Circle Name must be at most 30 characters long.",
    })
    .trim(),
  weekday: z.string({
    message: "Please select a weekday.",
  }),
  dateOfCreation: z.date({
    message: "Please select a date.",
  }),
});

function CircleDetails() {
  const { t } = useTranslation();
  const { status } = useSelector((state: RootState) => state.circleOperations);
  const dispatch = useDispatch<AppDispatch>();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formOneSchema>>({
    resolver: zodResolver(formOneSchema),
    defaultValues: {
      circlename: "",
      // weekday: "SUNDAY",
      dateOfCreation: new Date(),
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formOneSchema>) {
    dispatch(
      createCircle({
        circleName: values.circlename,
        dateOfCreation: formatDateToYYYYMMDD(values.dateOfCreation),
        day: values.weekday as Weekday,
      })
    );
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* 🔥 Use the form fields. */}
        <FormField
          control={form.control}
          name="circlename"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("createNewCircleForm.circleName")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("createNewCircleForm.circleNamePlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weekday"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("createNewCircleForm.circleDay")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3">
                    <SelectValue
                      placeholder={t("createNewCircleForm.selectDay")}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Frequency</SelectLabel>
                    {circleDays.map((circleDay) => (
                      <SelectItem key={circleDay.key} value={circleDay.value}>
                        {t(`weekdays.${circleDay.key}`)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="dateOfCreation"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t("createNewCircleForm.date")}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("2020-04-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <DialogFooter className="grid grid-flow-col grid-cols-2 items-center">
          {status === "created" && (
            <FormDescription className="text-green-400 font-semibold">
              Circle created successfully
            </FormDescription>
          )}
          {status === "failed" && (
            <FormDescription className="text-red-400 font-semibold">
              Failed to create circle please try again
            </FormDescription>
          )}
          {status === "creating" || status === "created" ? (
            <div className="col-start-2 grid justify-items-stretch">
              <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                {t("wait")}
              </Button>
            </div>
          ) : (
            <div className="col-start-2 grid justify-items-stretch">
              <Button type="submit">{t("createNewCircleForm.next")}</Button>
            </div>
          )}
        </DialogFooter>
      </form>
    </Form>
  );
}

const MemoizedCircleDetails = memo(CircleDetails);
const MemoizedCircleMembers = memo(CircleMembers);

/**
 * Design a multistep dialogue with two steps for creating a circle and assigning members to it.
 * The first step should include the following inputs: 1) Circle Name input field, 2) Selection of weekdays, and 3) A 'Proceed to Next Step' button.
 * The second step should have inputs for: 1) Tabs to create a new member or select a member from an existing list.
 * By default, the 'New Member' tab is selected, which includes input fields for Name, Phone Number, Email, and a dropdown menu to select the member's role.
 * If the user selects the 'Existing Members' tab, it should display a list of existing members.
 */
