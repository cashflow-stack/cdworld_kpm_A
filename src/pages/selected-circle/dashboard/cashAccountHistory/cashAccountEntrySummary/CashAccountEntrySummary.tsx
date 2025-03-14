import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalculatedEntry } from "@/models/customModels/customModels";
import { Maximize, Printer } from "lucide-react";
import {
  fetchTransactionDetails,
  resetSummary,
} from "./state/cashAccountEntrySummarySlice";
import { getFormattedDate } from "@/toolkit/helper/helperFunctions";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { CashBagSummary } from "@/components/cash-bag-summary/CashBagSummary";
import { FinancialActivities } from "@/components/financial-activities/FinancialActivities";

import CashAccountReport from "./SummarySheet/CashAccountReport";
import { CashflowTransactionTabs } from "./widgets/CashflowTransactionTabs";
import { printHistoryDialog } from "@/utils/printHistoryDialog";

export default function CashAccountEntrySummary({
  entry,
}: {
  entry: CalculatedEntry;
}) {
  const dispatch = useAppDispatch();
  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && dispatch(resetSummary())}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size={"icon"}
          onClick={() => {
            dispatch(fetchTransactionDetails(entry.id));
          }}
        >
          <Maximize size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(100vh-30px)] sm:max-w-[min(100vw-30px)] ">
        <DialogHeader className=" space-y-0 text-left">
          <DialogTitle className="border-b border-border px-6 py-4 text-lg">
            <span>
              Closing Entry Summary{" "}
              <span className="text-sm text-muted-foreground font-normal">
                ({getFormattedDate(entry.openingDate, "short")} &rarr;{" "}
                {getFormattedDate(entry.closingDate, "short")})
              </span>
            </span>
          </DialogTitle>
          <DialogDescription>{}</DialogDescription>
        </DialogHeader>
        <AccountEntryDetail />
      </DialogContent>
    </Dialog>
  );
}

function AccountEntryDetail() {
  const { ...ts } = useAppSelector((state) => state.cashAccountEntrySummary);
  if (ts.status === "success") {
    return (
      <div className="overflow-y-auto">
        <div className="container p-4 mx-auto space-y-4">
          <div className="lg:grid lg:grid-cols-3 lg:gap-4 space-y-4 lg:space-y-0">
            {/* Left column - spans 2 columns on large screens */}
            <div className="col-span-2 space-y-8">
              {/* //! Main card */}
              <CashAccountReport />

              {/*//! Bottom card */}
              <CashflowTransactionTabs ts={ts} />
            </div>

            {/* //* Right column cards */}
            <div className="space-y-4">
              {/*//! Top right card */}
              <CashBagSummary
                capital={ts.capital}
                collectionAmount={ts.collectionAmount}
                newLoanPayments={ts.newLoanPayments}
                assumedCapital={ts.assumedCapital}
                range={ts.range}
              >
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      printHistoryDialog({
                        transactions: ts.transactions,
                        range: ts.range,
                      })
                    }
                  >
                    <Printer size={20} />
                  </Button>
                </div>
              </CashBagSummary>

              {/*//! Bottom right card */}
              <FinancialActivities data={ts} />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (ts.status === "failed") {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="space-y-4 text-center">
          <p className="text-red-500 font-medium">
            Failed to load summary data
          </p>
          <p className="text-muted-foreground text-sm">{ts.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-96 items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
        <p className="text-muted-foreground animate-pulse">
          Loading summary...
        </p>
      </div>
    </div>
  );
}
