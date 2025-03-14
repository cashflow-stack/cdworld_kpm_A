import React from "react";
import { SimplifiedCustomer } from "@/models/customModels/customModels";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  BadgeCheck,
  ChevronsRight,
  CircleCheck,
  // CircleCheckBig,
  // Ellipsis
} from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { HoverCardArrow } from "@radix-ui/react-hover-card";
import { MdLabelImportant } from "react-icons/md";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { InstallmentType, LoanStatus } from "@/models/API";
import { AppDispatch } from "@/toolkit/store";
import { useDispatch } from "react-redux";
import { addSelectedSimplifiedCustomerData } from "@/toolkit/helper/helperSlice";
import {
  CurrencyFormatter,
  formatDate,
  formatDateToYYYYMMDD,
  calculateDifferenceInDays,
} from "@/toolkit/helper/helperFunctions";
import CustomerOptionsDialog from "../update-customer/CustomerOptionsDialog";

export const customerDataColumns: ColumnDef<SimplifiedCustomer>[] = [
  {
    accessorKey: "loanSerial",
    header: "Loan Details",
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <CustomerDetails
          cityName={customer.cityName}
          customerAddress={customer.customerAddress}
          customerName={customer.customerName}
          customeruId={customer.customeruId}
          customerPhone={customer.customerPhone}
          loanSerial={customer.loanSerial}
          endDate={customer.endDate}
          status={customer.status}
          installmentType={customer.installmentType}
          blankCheque={customer.emptyCheque}
          promissoryNote={customer.promissoryNote}
        />
      );
    },
  },
  {
    accessorKey: "dateOfCreation",
    header: "Given Date",
    cell: ({ row }) => {
      const customer = row.original;
      if (!customer.NoLoan) {
        return <div>{formatDate(customer.dateOfCreation!)}</div>;
      } else {
        return <div>-</div>;
      }
    },
  },
  {
    accessorKey: "totalInstallments",
    header: "Installments",
    cell: ({ row }) => {
      const customer = row.original;
      if (!customer.NoLoan) {
        return (
          <LoanProgress
            paid={customer.paidInstallments}
            total={customer.totalInstallments}
          />
        );
      } else {
        return <div>No Loan</div>;
      }
    },
  },
  {
    accessorKey: "nextDueDate",
    header: "Next Due Date",
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <>
          <div>{customer.nextDueDate && formatDate(customer.nextDueDate!)}</div>
          <>
            {nextDueDate({
              dueDate: customer.nextDueDate,
              status: customer.status,
              lastPaidDate: customer.lastInstallmentPaidDate,
              dateOfCreation: customer.dateOfCreation,
            })}
          </>
        </>
      );
    },
  },
  {
    accessorKey: "collectibleAmount",
    cell: ({ row }) => {
      const customer = row.original;
      if (!customer.NoLoan) {
        return (
          <div className="grid gap-1">
            <div className="text-base font-bold font-lato">
              {CurrencyFormatter({
                amount: customer.collectibleAmount! - customer.paidAmount!,
              })}
            </div>
            <div className="text-muted-foreground text-xs tracking-wide">
              ({customer.collectibleAmount!.toLocaleString()} {" - "}
              {customer.paidAmount!.toLocaleString()})
            </div>
          </div>
        );
      } else {
        return <div>-</div>;
      }
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Balance Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "more",
    header: "More",
    cell: ({ row }) => {
      const dispatch = useDispatch<AppDispatch>();
      const simplifiedCustomer = row.original;
      return (
        <div className="flex gap-6 justify-end">
          <Link
            className="text-cyan-5 underline underline-offset-2 underline-transparent hover:text-cyan-6"
            to={"../selected-customer"}
            onClick={() => {
              dispatch(addSelectedSimplifiedCustomerData(simplifiedCustomer));
            }}
          >
            <Button
              size={"icon"}
              variant="ghost"
              aria-label="Open edit menu"
              className="bg-muted/20"
            >
              <ChevronsRight />
            </Button>
          </Link>
          <CustomerOptionsDialog customer={simplifiedCustomer} />
        </div>
      );
    },
  },
];

interface CustomerDetailsProps {
  customerName: string;
  customerPhone: string;
  loanSerial: string | null | undefined;
  cityName: string;
  customeruId: string;
  customerAddress: string;
  endDate: string | null | undefined;
  status: string | null | undefined;
  installmentType: InstallmentType | null | undefined;
  blankCheque: boolean | null | undefined;
  promissoryNote: boolean | null | undefined;
}

const CustomerDetails = React.memo(function CustomerDetails({
  cityName,
  customerAddress,
  customerName,
  endDate,
  customeruId,
  loanSerial,
  customerPhone,
  status,
  installmentType,
  blankCheque,
  promissoryNote,
}: CustomerDetailsProps) {
  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const today = formatDate(new Date());
  const isclosedToday = status === LoanStatus.CLOSED && endDate === today;
  const isunderReview = status === LoanStatus.UNDERREVIEW;
  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 text-lg text-muted-foreground items-center">
          <MdLabelImportant className="text-amber-500" />[
          <span className="font-semibold font-lato text-base text-primary">
            {loanSerial}
          </span>
          ]
          {isclosedToday ? (
            <Badge variant="secondary" className="gap-1.5 items-center">
              <BadgeCheck className="text-green-500" size={18} />
              Closed
            </Badge>
          ) : null}
          {isunderReview ? (
            <Badge variant="secondary" className="gap-1.5 items-center">
              <CircleCheck className="text-orange-500" size={18} />
              <span>On Review</span>
            </Badge>
          ) : (
            installmentType && (
              <Badge variant="outline" className="gap-1.5 font-normal">
                <span
                  className={`size-1.5 rounded-full ${
                    installmentType === InstallmentType.DAILY
                      ? "bg-fuchsia-500"
                      : installmentType === InstallmentType.MONTHLY
                      ? "bg-amber-500"
                      : "bg-blue-500"
                  }`}
                  aria-hidden="true"
                />
                {installmentType.charAt(0).toUpperCase() +
                  installmentType.slice(1).toLowerCase()}
              </Badge>
            )
          )}
        </div>
        <div className="flex gap-2 text-muted-foreground/50 text-sm">
          <span>{`${customerPhone}`.substring(3).replace(/\*/g, ".")}</span>
          <span>&#8226;</span>
          <span>{`${cityName}`.substring(0, 15)}</span>
        </div>
      </div>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link to="#" className="font-medium text-sm hover:underline text-chart-1/90">
            @{customerName}
          </Link>
        </HoverCardTrigger>
        <HoverCardContent side="right" className="w-96 p-6 shadow-lg">
          <div className="flex space-x-6">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarFallback className="font-cinzel font-bold text-lg bg-primary/10 text-primary">
                {`${customerName}`.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2.5">
              <h4 className="text-xl font-semibold tracking-tight">
                {customerName}
              </h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span className="font-medium text-foreground">Aadhar:</span>
                  {customeruId.toUpperCase().slice(0, 12)}
                </p>
                {customerAddress && (
                  <p className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      Address:
                    </span>
                    {customerAddress}
                  </p>
                )}
                <p className="flex items-center gap-2">
                  <span className="font-medium text-foreground">City:</span>
                  {cityName}
                </p>
              </div>
              <div className="pt-2 border-t">
                <h5 className="font-medium mb-2">Documents Status</h5>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center gap-2">
                    <Badge
                      variant={blankCheque ? "default" : "destructive"}
                      className={`px-2 py-0 ${
                        blankCheque ? "bg-green-500" : ""
                      }`}
                    >
                      Blank Cheque
                    </Badge>
                    {blankCheque ? "✓" : "✗"}
                  </p>
                  <p className="flex items-center gap-2">
                    <Badge
                      variant={promissoryNote ? "default" : "destructive"}
                      className={`px-2 py-0 ${
                        promissoryNote ? "bg-green-500" : ""
                      }`}
                    >
                      Promissory Note
                    </Badge>
                    {promissoryNote ? "✓" : "✗"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <HoverCardArrow className="fill-background" />
        </HoverCardContent>
      </HoverCard>
    </>
  );
});

interface LoanProgressProps {
  paid: number | null | undefined;
  total: number | null | undefined;
}

const LoanProgress = React.memo(function LoanProgress({
  paid = 0,
  total = 0,
}: LoanProgressProps) {
  paid = paid || 0;
  total = total || 0;
  const remaining = (paid / total) * 100;
  return (
    <div className="bg-secondary/15 rounded px-5 py-3">
      <Progress value={remaining} />
      <div className="flex mt-2 justify-between">
        <div className="font-bold font-lato">{paid}</div>
        <div className="font-bold font-lato">{total}</div>
      </div>
    </div>
  );
});

function nextDueDate({
  dueDate,
  status,
  lastPaidDate,
  dateOfCreation,
  endDate,
}: {
  dueDate: string | null | undefined;
  status: string | null | undefined;
  lastPaidDate: string | null | undefined;
  dateOfCreation: string | null | undefined;
  endDate?: string | null | undefined;
}) {
  if (!dueDate) {
    return <div>-</div>;
  }
  // console.log(paidAmount, perInstallmentAmount);
  //! steps to follow to get the next due date
  // 1. compare the due date with the current date
  // 2. if the due date is less than the current date, then show the diffenece in days
  // 3. if the due date is greater than the current date, then show remaining days

  const today = formatDateToYYYYMMDD(new Date());
  if (status === LoanStatus.CLOSED) {
    switch (true) {
      case endDate === today:
        return <div className="text-green-500 text-sm">Closed Today</div>;
      default:
        return <div className="text-gray-500 text-sm">Loan Closed</div>;
    }
  } else {
    const dueDateObj = new Date(`${dueDate}T00:00:00`);
    const diffInDays = calculateDifferenceInDays(
      dueDateObj,
      new Date(`${today}T00:00:00`)
    );
    const lastPaid = lastPaidDate || dateOfCreation!;

    switch (true) {
      case dateOfCreation! === today:
        return <div className="text-green-500 text-sm">New Loan</div>;
      case lastPaid === today:
        return <div className="text-green-500 text-sm">Paid Today</div>;
      case diffInDays === 1:
        return <div className="text-green-500 text-sm">Due Tomorrow</div>;
      case diffInDays === 0:
        return <div className="text-red-500 text-sm">Due Today</div>;
      case diffInDays === -1:
        return <div className="text-red-500 text-sm">Due Yesterday</div>;
      case diffInDays < 0:
        return (
          <div className="text-red-500 text-sm">{`${Math.abs(
            diffInDays
          )} days ago`}</div>
        );
      default:
        return (
          <div className="text-green-500 text-sm">{`${diffInDays} days left`}</div>
        );
    }
  }
}
