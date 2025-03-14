import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import loanMenuOptions from "@/constants/loanMoreOptions";
import { LoanOperationDialog } from "./Components/LoanOperationDialog";

export default function ModifyLoanOptions() {
  const [selected, setSelected] = useState<string>("");
  const handleSelect = useCallback((option: string) => {
    setSelected(option);
  }, []);
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreVertical aria-hidden="true" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <DialogTrigger asChild>
            <DropdownMenuItem disabled
              onSelect={() => handleSelect(loanMenuOptions.UPDATELOAN)}
            >
              <Edit size={16} className="opacity-80" aria-hidden="true" />
              &nbsp; Update Loan
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={() => handleSelect(loanMenuOptions.DELETELOAN)}
              className="text-red-500"
            >
              <Trash2 size={16} className="opacity-80" aria-hidden="true" />
              &nbsp; Delete Loan
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <LoanOperationDialog selected={selected} />
    </Dialog>
  );
}
