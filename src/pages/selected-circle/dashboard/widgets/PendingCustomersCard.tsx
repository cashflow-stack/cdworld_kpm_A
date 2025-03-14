import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ClockArrowDown, Printer } from "lucide-react";
import { useAppSelector } from "@/hooks/reduxHooks";
import { printCustomers } from "@/utils/printPendingCustomers";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CurrencyFormatter } from "@/toolkit/helper/helperFunctions";
import clsx from "clsx";

// Define the customer interface
interface Customer {
  id: string;
  name: string;
  phoneNumber: string;
  loanSerial: string;
  city: string;
  pendingAmount: number;
  daysDelay: number;
}

// PendingCustomerRow component
function PendingCustomerRow({
  customer,
  index,
}: {
  customer: Customer;
  index: number;
}) {
  return (
    <TableRow
      key={customer.id}
      className={clsx("sm:flex-row", {
        "bg-muted-foreground/5": index % 2 === 0,
      })}
    >
      <TableCell className="flex flex-col sm:block">
        <div className="font-medium">{customer.name}</div>
        <div className="text-sm text-muted-foreground mt-1 sm:mt-0">
          {customer.phoneNumber} | ID: {customer.loanSerial}
        </div>
        <div className="text-sm text-muted-foreground">{customer.city}</div>
      </TableCell>
      <TableCell className="text-right">
        {CurrencyFormatter({
          amount: customer.pendingAmount,
          className: "text-lg font-lato",
        })}
        <div className="text-sm text-muted-foreground text-red-600">
          {customer.daysDelay} {customer.daysDelay === 1 ? "day" : "days"} late
        </div>
      </TableCell>
    </TableRow>
  );
}

export function PendingCustomersCard() {
  const pendingCustomers = useAppSelector(
    (state) => state.pendingCustomers.pendingCustomers
  );

  const handlePrint = () => {
    printCustomers(pendingCustomers);
  };

  // Add loading state
  if (!pendingCustomers) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col rounded-t-lg">
        <CardTitle className="flex items-center justify-between text-lg tracking-normal">
          <div className="flex items-center">
            <ClockArrowDown size={22} className="mr-2 inline-block" />
            Pending List ({pendingCustomers.length})
          </div>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer size={18} />
          </Button>
        </CardTitle>
      </CardHeader>
      <ScrollArea className="h-[calc(70vh)]">
        <CardContent className="px-4 pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left text-base">
                  Customer Details
                </TableHead>
                <TableHead className="text-right text-base">
                  Amount Due
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingCustomers.map((customer, index) => (
                <PendingCustomerRow
                  key={customer.id}
                  customer={customer}
                  index={index}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </Card>
  );
}
