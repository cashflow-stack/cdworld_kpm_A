import { Card, CardContent } from "@/components/ui/card";
import {
  FormData,
  checkDate,
  checkOutstandingAmount,
} from "../utils/formSchema";
import {
  calculateDate,
  CurrencyFormatter,
  formatDate,
  formatDateToYYYYMMDD,
} from "@/toolkit/helper/helperFunctions";
import { useSelector } from "react-redux";
import { RootState } from "@/toolkit/store";
import { CashAccount, InstallmentType } from "@/models/API";
import { Calendar } from "lucide-react";
import { Divider } from "@aws-amplify/ui-react";

interface SummaryScreenProps {
  data: FormData;
  cashAccount: CashAccount | null;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({
  data,
  cashAccount,
}) => {
  const isValidOutstandingAmount = checkOutstandingAmount(data);
  const isDateValid = checkDate(data, cashAccount!);
  const { cities } = useSelector((state: RootState) => state.cities);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-base underline font-bold mb-4">Customer Details:</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            "customerName",
            "mobileNumber",
            "aadharCardNumber",
            "address",
            "city",
            "guarantorDetails",
          ].map((key) => (
            <div key={key}>
              <p className="font-semibold">
                {key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, " $1")}
                :
              </p>
              <p>
                {key === "city"
                  ? cities.find((city) => city.id === data.city)?.name || "N/A"
                  : data[key as keyof FormData] instanceof Date
                  ? (data[key as keyof FormData] as Date).toLocaleDateString()
                  : data[key as keyof FormData]?.toString() || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        {!isDateValid && (
          <div className="text-red-500 font-bold mb-4">
            Error: Given date must be less than or equal to the last closing
            date.
          </div>
        )}
        {!isValidOutstandingAmount && (
          <div className="text-red-500 font-bold mb-4">
            Error: The outstanding amount is less than the given amount.
          </div>
        )}
        <h3 className="text-base font-bold underline">Loan Details:</h3>
        <Card className="w-full border-none cursor-pointer">
          <CardContent className="p-4 space-y-4">
            <div>
              {data.customerType !== "existing" ? (
                <>
                  {CurrencyFormatter({
                    amount:
                      Number(data.amountPerInstallment) *
                      Number(data.totalInstallments),
                    className: "font-lato font-semibold text-4xl",
                  })}
                  <div className="text-muted-foreground">
                    Total Outstanding(
                    {Number(data.amountPerInstallment).toLocaleString("en-IN")}
                    &nbsp;x&nbsp;
                    {Number(data.totalInstallments)})
                  </div>
                </>
              ) : (
                <div className="text-chart-2">
                  {CurrencyFormatter({
                    amount:
                      Number(data.amountPerInstallment) *
                        Number(data.totalInstallments) -
                        Number(data.totalPaidAmount) || 0,
                    className: "font-lato font-semibold text-4xl",
                  })}
                  <div>
                    Balance(
                    {(
                      Number(data.amountPerInstallment) *
                      Number(data.totalInstallments)
                    ).toLocaleString("en-IN")}
                    &nbsp;&minus;&nbsp;
                    {Number(data.totalPaidAmount).toLocaleString("en-IN") || 0})
                  </div>
                </div>
              )}
            </div>

            <Divider />

            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                {data.customerType === "existing" ? (
                  <>
                    <div className="font-semibold">Total Outstanding</div>
                    <div className="font-medium">
                      {CurrencyFormatter({
                        amount:
                          Number(data.amountPerInstallment) *
                          Number(data.totalInstallments),
                        className: "font-lato font-semibold text-xl",
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-chart-2 font-semibold">Interest</div>
                    <div className="text-chart-2  font-medium">
                      {CurrencyFormatter({
                        amount:
                          Number(data.amountPerInstallment) *
                            Number(data.totalInstallments) -
                          Number(data.givenAmount),
                        className: "font-lato font-semibold text-xl",
                      })}
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="">Given Amount</div>
                <div className=" font-medium">
                  {CurrencyFormatter({
                    amount: Number(data.givenAmount),
                    className: "font-lato font-semibold text-xl",
                  })}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="">Per Installment</div>
                <div className=" font-medium">
                  {CurrencyFormatter({
                    amount: Number(data.amountPerInstallment),
                    className: "font-lato font-semibold text-xl",
                  })}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-lg">Installment Type</div>
                <div className="text-lg font-medium">{data.type}</div>
              </div>
              {data.customerType === "existing" ? (
                <div className="flex justify-between items-center">
                  <div className="text-lg">Remaining Payments</div>
                  <div className="text-lg font-semibold font-lato text-chart-3">
                    {Number(data.totalInstallments) -
                      Number(data.paidInstallments)}
                    ({data.totalInstallments}&nbsp;-&nbsp;
                    {data.paidInstallments || 0})
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div className="text-lg">Total Payments</div>
                  <div className="text-lg font-semibold font-lato">
                    {data.totalInstallments}
                  </div>
                </div>
              )}
            </div>

            <Divider />

            <div className="flex items-center justify-center gap-2 pt-2">
              <Calendar className="h-5 w-5" />
              <span className="text-lg font-sans font-semibold">
                {formatDate(formatDateToYYYYMMDD(data.givenDate))} &nbsp; &rarr;
                &nbsp;
                {formatDate(
                  calculateDate({
                    date: formatDateToYYYYMMDD(data.givenDate),
                    installmentType: data.type as InstallmentType,
                    totalInstallments: Number(data.totalInstallments),
                    paidInstallments: 0,
                  })
                )}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
