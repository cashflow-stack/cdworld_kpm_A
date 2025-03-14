import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LuUsers } from "react-icons/lu";
import { MenuOptions } from "../customer-table/data-table";
import React from "react";

const CustomersPageEmpty = React.memo(function CustomersPageEmpty() {
  return (
    <Card className="w-[350px] flex flex-col items-center mt-32 justify-center self-center">
      <CardHeader>
        <CardTitle className="flex flex-col items-center">
          <LuUsers
            strokeWidth={1}
            size={64}
            className="text-3xl text-foreground"
          />
          <div className="scroll-m-20 text-2xl text-center font-semibold tracking-tight">
            No Customers Yet
          </div>
        </CardTitle>
        <CardDescription className="text-center">
          Add customers to start building your customer base.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MenuOptions />
      </CardContent>
    </Card>
  );
});

export default CustomersPageEmpty;
