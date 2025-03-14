import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useMemo } from "react";
import customerOptions from "@/constants/customerMoreOptions";
import MoreOptionsDialogs from "./MoreOptionsDialogs";
import { SimplifiedCustomer } from "@/models/customModels/customModels";
import { CustomerOptionsContext } from "@/context/appContexts";
import { useCustomerOptions } from "@/hooks/useCustomerOptions";

const menuItems = [
  {
    option: customerOptions.UPDATECUSTOMER,
    label: "Update Customer",
    disabled: false,
  },
  // {
  //   option: customerOptions.UPDATELOAN,
  //   label: "Update Loan",
  //   disabled: true,
  // },
  {
    option: customerOptions.ADDITIONALLOAN,
    label: "Additional Loan",
    disabled: true,
  },
];

export default function CustomerOptionsDialog({
  customer,
}: {
  customer: SimplifiedCustomer;
}) {
  const { selected, currentCustomer, setCurrentCustomer, handleSelect } =
    useCustomerOptions(customer);

  const contextValue = useMemo(
    () => ({
      currentCustomer,
      setCurrentCustomer,
    }),
    [currentCustomer, setCurrentCustomer]
  );

  const dropdownContent = useMemo(
    () => (
      <DropdownMenuContent className="shadow-lg">
        {menuItems.map(({ option, label, disabled }) => (
          <DialogTrigger asChild key={option}>
            <DropdownMenuItem
              onSelect={() => handleSelect(option)}
              disabled={disabled}
            >
              {label}
            </DropdownMenuItem>
          </DialogTrigger>
        ))}
      </DropdownMenuContent>
    ),
    [handleSelect]
  );

  return (
    <CustomerOptionsContext.Provider value={contextValue}>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" aria-label="Open edit menu">
              <MoreVertical
                className="h-4 w-4 text-muted-foreground"
                aria-hidden
              />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          {dropdownContent}
        </DropdownMenu>
        <MoreOptionsDialogs selected={selected} />
      </Dialog>
    </CustomerOptionsContext.Provider>
  );
}
