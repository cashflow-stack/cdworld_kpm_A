import React from "react";

import { useRef, useMemo, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinanceBook } from "@/models/customModels/customModels";
import { useAppSelector } from "@/hooks/reduxHooks";
import BookViewToggle from "@/components/BookViewToggle";
import { MdLabelImportant } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CurrencyFormatter,
  getFormattedDate,
  formatDateToDDMMYY,
} from "@/toolkit/helper/helperFunctions";
import { IndianRupee, AlertCircle, RefreshCw, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MenuOptions } from "../customer-table/data-table";

// Shimmer loading component for table rows
const ShimmerRow = ({ columns }: { columns: number }) => {
  return (
    <tr className="animate-pulse">
      <td className="bg-muted/10 text-center">
        <div className="h-6 w-16 mx-auto bg-muted/50 rounded"></div>
      </td>
      <td className="bg-card font-medium sticky left-0 z-20 backdrop-blur-xl">
        <div className="py-1 border-b border-dashed">
          <div className="h-6 w-20 mx-auto bg-muted/50 rounded mb-1"></div>
          <div className="h-4 w-24 mx-auto bg-muted/30 rounded"></div>
        </div>
      </td>
      <td className="bg-background/50 sticky left-[150px] z-20 backdrop-blur-lg">
        <div className="py-1 border-b border-dashed">
          <div className="h-6 w-16 mx-auto bg-muted/50 rounded mb-1"></div>
          <div className="h-4 w-24 mx-auto bg-muted/30 rounded"></div>
        </div>
      </td>
      {Array(columns - 3)
        .fill(0)
        .map((_, index) => (
          <td
            key={index}
            className={`text-center ${index % 2 === 0 ? "" : "bg-muted/20"}`}
          >
            <div className="h-6 w-12 mx-auto bg-muted/40 rounded"></div>
          </td>
        ))}
    </tr>
  );
};

// Shimmer loading component for table headers
const ShimmerHeader = ({ columns }: { columns: number }) => {
  return (
    <tr>
      <th className="bg-background min-w-[80px] text-center">
        <div className="h-5 w-10 mx-auto bg-muted/40"></div>
      </th>
      <th className="bg-background min-w-[150px] text-center sticky left-0 z-50">
        <div className="h-5 w-16 mx-auto bg-muted/40"></div>
      </th>
      <th className="bg-background min-w-[150px] text-center sticky left-[150px] z-50">
        <div className="h-5 w-16 mx-auto bg-muted/40"></div>
      </th>
      {Array(columns - 3)
        .fill(0)
        .map((_, index) => (
          <th
            key={index}
            className={`text-center min-w-[80px] ${
              index % 2 === 0 ? "bg-card" : "bg-muted/50"
            }`}
          >
            <div className="h-5 w-14 mx-auto bg-muted/40 rounded"></div>
          </th>
        ))}
    </tr>
  );
};

// Error display component
const ErrorDisplay = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <AlertCircle className="text-destructive h-10 w-10 mb-4" />
      <h3 className="font-semibold text-lg text-destructive">
        Error Loading Data
      </h3>
      <p className="text-muted-foreground max-w-sm mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="gap-2">
          <RefreshCw className="h-4 w-4" /> Try Again
        </Button>
      )}
    </div>
  );
};

const LoanRow = React.memo(
  ({
    loan,
    allInstallmentDates,
    isEvenRow,
  }: {
    loan: FinanceBook;
    allInstallmentDates: string[];
    isEvenRow: boolean;
  }) => {
    const calculateRemainingBalance = useCallback((loan: FinanceBook) => {
      if (!loan.collectiableAmount || !loan.paidAmount) return 0;
      return loan.collectiableAmount - loan.paidAmount;
    }, []);
    const rowBgClass = isEvenRow
      ? "dark:bg-muted/20 bg-muted-foreground/5"
      : "";
    return (
      <tr className={`${rowBgClass}`}>
        {/* //! First Column: Date of Creation */}
        <td className="bg-muted/10 text-sm text-center">
          <div>
            {loan.dateOfCreation
              ? getFormattedDate(loan.dateOfCreation, "short")
              : "-"}
          </div>
        </td>

        {/* //! Second Column: Loan Serial and Customer Name */}
        <td className="dark:bg-card bg-muted-foreground/10 font-medium sticky left-0 z-20 backdrop-blur-xl">
          <div className="py-1 border-b border-dashed">
            <div className="flex items-center justify-center">
              <MdLabelImportant className="text-amber-500" /> &nbsp;
              <span className="font-lato text-lg font-medium">
                [ {loan.loanSerial} ]
              </span>
            </div>
            <div className="text-xs text-muted-foreground text-center mt-1">
              {loan.customerName.substring(0, 20)}
            </div>
          </div>
        </td>

        {/* //! Third Column: Balance Amount */}
        <td className="dark:bg-background/50 bg-muted-foreground/5 sticky left-[150px] z-20 backdrop-blur-lg">
          <div className="py-1 border-b border-dashed">
            <div className="font-medium text-center">
              {CurrencyFormatter({
                amount: calculateRemainingBalance(loan),
                className: "font-lato text-lg font-medium",
              })}
            </div>
            <div className="text-xs text-center mt-1">
              <span className="inline-flex items-center justify-center w-full">
                <span className="text-muted-foreground">
                  {loan.collectiableAmount?.toLocaleString() || 0}
                </span>
                <span className="mx-1 text-muted-foreground">-</span>
                <span className="text-muted-foreground">
                  {loan.paidAmount?.toLocaleString() || 0}
                </span>
              </span>
            </div>
          </div>
        </td>

        {/* //! Installment Columns */}
        {allInstallmentDates.map((date, index) => {
          const installment = loan.installments?.find(
            (inst) => inst.paidDate.split("T")[0] === date
          );
          return (
            <td
              key={`${loan.loanId}-${date}`}
              className={`text-center transition-colors duration-200
                 ${
                   index % 2 === 0
                     ? ""
                     : "dark:bg-muted/20 bg-muted-foreground/5"
                 }
               hover:rounded hover:ring hover:bg-card`}
            >
              {installment ? (
                <div>
                  <span className="font-semibold font-lato text-lg">
                    {installment.paidAmount.toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className="text-muted-foreground">-</span>
              )}
            </td>
          );
        })}
      </tr>
    );
  }
);

LoanRow.displayName = "LoanRow";

export default function FinanceBookView() {
  const { dailyRecords, weeklyRecords, monthlyRecords, status, error } =
    useAppSelector((state) => state.customers);
  const { cities, status: citiesStatus } = useAppSelector(
    (state) => state.cities
  );
  const tableRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("daily");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");

  // Function to handle retry when there's an error
  const handleRetry = useCallback(() => {
    // Here you would dispatch an action to reload the data
    // For example: dispatch(fetchCustomerRecords());
    console.log("Retrying data fetch");
  }, []);

  const dailyInstallmentDates = useMemo(() => {
    return Array.from(
      new Set(
        dailyRecords.flatMap(
          (item) =>
            item.installments?.map((inst) => inst.paidDate.split("T")[0]) || []
        )
      )
    ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  }, [dailyRecords]);

  const weeklyInstallmentDates = useMemo(() => {
    return Array.from(
      new Set(
        weeklyRecords.flatMap(
          (item) => item.installments?.map((inst) => inst.paidDate.split("T")[0]) || []
        )
      )
    ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  }, [weeklyRecords]);

  const monthlyInstallmentDates = useMemo(() => {
    return Array.from(
      new Set(
        monthlyRecords.flatMap(
          (item) => item.installments?.map((inst) => inst.paidDate.split("T")[0]) || []
        )
      )
    ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  }, [monthlyRecords]);

  // Function to get active records and installment dates based on tab
  const getActiveData = () => {
    switch (activeTab) {
      case "weekly":
        return {
          records: weeklyRecords,
          installmentDates: weeklyInstallmentDates,
        };
      case "monthly":
        return {
          records: monthlyRecords,
          installmentDates: monthlyInstallmentDates,
        };
      case "daily":
      default:
        return {
          records: dailyRecords,
          installmentDates: dailyInstallmentDates,
        };
    }
  };

  const { records: allRecords, installmentDates } = getActiveData();

  // Get city counts for records
  const citiesWithCount = useMemo(() => {
    return cities.map((city) => ({
      id: city.id,
      name: city.name,
      count: allRecords.filter((loan) => loan.cityID === city.id).length,
    }));
  }, [allRecords, cities]);

  // Handle city selection
  const handleCitySelect = useCallback((cityId: string) => {
    setSelectedCity(cityId);
  }, []);

  // Filter records based on search query and selected city
  const records = useMemo(() => {
    let filteredRecords = allRecords;

    // Apply city filter if not "all"
    if (selectedCity !== "all") {
      filteredRecords = filteredRecords.filter(
        (loan) => loan.cityID === selectedCity
      );
    }

    // Then apply search filter
    if (searchQuery.trim()) {
      filteredRecords = filteredRecords.filter(
        (loan) =>
          loan.loanSerial?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          false
      );
    }

    return filteredRecords;
  }, [allRecords, searchQuery, selectedCity]);

  // Determine the number of columns for shimmer effect
  const shimmerColumns =
    installmentDates.length > 0 ? installmentDates.length + 3 : 10;

  // Render content based on status
  const renderContent = () => {
    if (status === "success") {
      return (
        <table className="w-full table-auto">
          <thead className="sticky top-0 z-40 bg-background">
            <tr>
              {/* Date Column Header */}
              <th className="bg-background min-w-[80px] text-center">
                <div className="text-sm font-normal">Date</div>
              </th>

              {/* Loan ID Column Header */}
              <th className="bg-background min-w-[150px] text-center sticky left-0 z-50">
                <div className="text-sm font-normal">Loan Serial</div>
              </th>

              {/* Loan Details Column Header */}
              <th className="bg-background min-w-[150px] text-center sticky left-[150px] z-50">
                <div className="text-sm font-normal">Balance</div>
              </th>

              {/* Dynamic Installment Date Headers */}
              {installmentDates.map((date, index) => (
                <th
                  key={date}
                  className={`text-center min-w-[80px] ${
                    index % 2 === 0
                      ? "bg-card"
                      : "dark:bg-muted/50 bg-muted-foreground/30"
                  }`}
                >
                  <span className="font-lato text-sm font-medium">
                    {formatDateToDDMMYY(date)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td
                  colSpan={3 + installmentDates.length}
                  className="h-64 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <IndianRupee className="text-muted-foreground" size={36} />
                    <h3 className="font-semibold text-lg">No records found</h3>
                    <p className="text-muted-foreground max-w-sm">
                      There are no finance records matching the current filter.
                      Try changing the filter or add a new loan.
                    </p>
                    <MenuOptions />
                  </div>
                </td>
              </tr>
            ) : (
              records.map((loan, index) => (
                <LoanRow
                  key={loan.loanId}
                  loan={loan}
                  allInstallmentDates={installmentDates}
                  isEvenRow={index % 2 === 0}
                />
              ))
            )}
          </tbody>
        </table>
      );
    }

    if (status === "failed") {
      return (
        <table className="w-full table-auto">
          <thead className="sticky top-0 z-40 bg-background">
            <tr>
              <th colSpan={3 + installmentDates.length} className="py-4">
                <ErrorDisplay
                  message={error || "Failed to load finance book data"}
                  onRetry={handleRetry}
                />
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      );
    }
    return (
      <table className="w-full table-auto">
        <thead className="sticky top-0 z-40 bg-background">
          <ShimmerHeader columns={shimmerColumns} />
        </thead>
        <tbody>
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <ShimmerRow key={index} columns={shimmerColumns} />
            ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="sm:px-1 w-full space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Finance Book</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by loan serial..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* City filter dropdown */}
          {citiesStatus === "success" && (
            <Select onValueChange={handleCitySelect} value={selectedCity}>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={`All Cities (${allRecords.length})`}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cities</SelectLabel>
                  <SelectItem value="all">
                    All Cities ({allRecords.length})
                  </SelectItem>
                  {citiesWithCount.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name} ({city.count})
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}

          <Tabs
            defaultValue="daily"
            onValueChange={setActiveTab}
            value={activeTab}
          >
            <TabsList className="grid grid-cols-3 w-[300px]">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
          <BookViewToggle />
        </div>
      </div>

      {/* Show search and filter results count */}
      {(searchQuery.trim() || selectedCity !== "all") && (
        <div className="text-sm text-muted-foreground">
          Found {records.length} {records.length === 1 ? "result" : "results"}
          {searchQuery.trim() && ` for "${searchQuery}"`}
          {selectedCity !== "all" &&
            ` in ${
              cities.find((c) => c.id === selectedCity)?.name || "selected city"
            }`}
        </div>
      )}

      <div
        className="relative w-full h-[82vh] rounded-md border shadow-sm"
        ref={tableRef}
      >
        <div className="w-full h-full overflow-auto">{renderContent()}</div>
      </div>
    </div>
  );
}
