import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
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
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/toolkit/store";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import menuOptions from "@/constants/customerMenuOptions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CustomerMenuOptions } from "../widgets/CustomerMenuOptions";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { resetAll } from "../state/customerOperationSlice";
import BookViewToggle from "../../../../components/BookViewToggle";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filter, setFilter] = useState<TData[]>(data);
  const table = useReactTable({
    data: filter,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });
  const { cities, status } = useSelector((state: RootState) => state.cities);

  const citiesWithCount = cities.map((city) => ({
    id: city.id,
    name: city.name,
    count: data.filter((d: any) => d.cityId === city.id).length,
  }));
  const handelOnselect = (id: string) => {
    if (id === "all") {
      setFilter(data);
      return;
    }
    const filteredData = data.filter((d: any) => d.cityId === id);
    setFilter(filteredData);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between py-2">
        <h1 className="p-4 sm:p-0 sm:text-xl font-semibold">Loans Data</h1>
        <div className="flex flex-wrap gap-4 items-center">
          {status === "success" && (
            <Select onValueChange={(value) => handelOnselect(value)}>
              <SelectTrigger className="w-[220px]" defaultValue={"all"}>
                <SelectValue placeholder={`All Loans(${data.length})`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cities</SelectLabel>
                  <SelectItem value={"all"}>
                    All Loans({data.length})
                  </SelectItem>
                  {citiesWithCount.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}({city.count})
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          <Input
            placeholder="Filter with ID..."
            value={
              (table.getColumn("loanSerial")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("loanSerial")?.setFilterValue(event.target.value)
            }
            className="w-[150px]"
          />
          <span className="hidden sm:inline-flex">
            <MenuOptions />
          </span>
          <BookViewToggle />
        </div>
      </div>
      <table className="bg-card rounded-lg w-full table-auto">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                return (
                  <th
                    className={
                      index === 0 ? "sm:px-4 w-[250px]" : "text-center min-w-28"
                    }
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <tr
                className={index % 2 === 0 ? "dark:bg-muted/15 bg-muted-foreground/10" : ""}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    className={index === 0 ? "sm:px-4" : "text-center"}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center">
                No results.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export const MenuOptions = memo(() => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string>("");
  const handelSelect = useCallback((option: string) => {
    setSelected(option);
  }, []);
  const handelDialogClose = useCallback((onOpen: boolean) => {
    if (!onOpen) {
      setSelected("");
      dispatch(resetAll());
      window.location.reload();
    }
  }, []);
  return (
    <Dialog onOpenChange={(onOpen) => handelDialogClose(onOpen)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Menu
            <ChevronDown
              className="-me-1 ms-2 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={() => handelSelect(menuOptions.NEWCUSTOMER)}
              className="cursor-pointer py-2"
            >
              Add Loan (New / Existing)
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={() => handelSelect(menuOptions.EXISTINGCUSTOMER)}
              className="cursor-pointer py-2"
            >
              Add Loan with Installments
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem className="py-2">
            <Link className="text-cyan-5 w-full" to={"../bulk-posting"}>
              Installment Posting
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CustomerMenuOptions selected={selected} />
    </Dialog>
  );
});
