/**
 * CurrencyFormatter component.
 *
 * @component
 * @param {CurrencyFormatterProps} props - The props for the CurrencyFormatter component.
 * @param {number} props.amount - The amount to be formatted.
 * @param {string} props.className - The CSS class name for the component.
 * @returns {JSX.Element} The formatted amount wrapped in a span element.
 */

import {
  InstallmentType,
  Transaction,
  TransactionType,
  Weekday,
} from "@/models/API";
import { SimplifiedTransaction } from "@/models/customModels/customModels";

interface CurrencyFormatterProps {
  amount: number | undefined | null;
  className?: string;
}

export const CurrencyFormatter: React.FC<CurrencyFormatterProps> = ({
  amount,
  className,
}) => {
  const safeAmount = Number(amount || 0);
  const formattedAmount = safeAmount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // check if the amount is negative
  if (safeAmount < 0) {
    return (
      <span className={className}>
        <span className="font-sans font-medium">-</span>
        <span className="font-sans font-medium">
          {formattedAmount.slice(1, 2)}
        </span>
        <span>{formattedAmount.slice(2)}</span>
      </span>
    );
  }

  return (
    <span className={className}>
      <span className="font-sans font-medium">
        {formattedAmount.slice(0, 1)}
      </span>
      <span>{formattedAmount.slice(1)}</span>
    </span>
  );
};

/**
 * Converts an ISO date-time string to a date string.
 *
 * @param isoDateTime - The ISO date-time string to convert.
 * @returns The date string extracted from the ISO date-time string. 2024-08-31T17:47:38.730Z - 2024-08-31
 */
export const isoDateTimeToDate = (isoDateTime: string): string => {
  return isoDateTime.split("T")[0];
};

/**
 * Formats a date string into a specific format(01-Jan-2024).
 *
 * @param dateString - The date string to be formatted.
 * @returns The formatted date string.
 */
export const formatDate = (dateString: string): string => {
  dateString = dateString.split("T")[0];
  const date = new Date(dateString);
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    })
    .replace(/ /g, "-");
};

// Utility function to format date from yyyy-mm-dd to dd/mm/yyyy
export const formatDateToDDMMYYYY = (dateString: string): string => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

// Utility function to format date from yyyy-mm-dd to dd/mm/yy
export const formatDateToDDMMYY = (
  dateString: string | null | undefined
): string => {
  dateString = dateString?.split("T")[0];
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year.slice(2)}`;
};

/**
 * Formats a date to the format YYYY-MM-DD.
 *
 * @param date - The date to be formatted.
 * @returns The formatted date string in the format YYYY-MM-DD.
 */
export function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 2024-09-01T22:23:10.216Z
/**
 * Converts an ISO date string to a Date object. If no date string is provided,
 * it returns the current date without the time component.
 *
 * @param {Object} params - The parameters object.
 * @param {string} [params.dateString] - The ISO date string to convert.
 * @returns {Date} The converted Date object.
 */
export const isoStringToDate = ({
  dateString,
}: {
  dateString?: string;
}): Date => {
  if (!dateString) {
    const todayWithoutTime = new Date().toLocaleDateString().split("T")[0];
    const [month, day, year] = todayWithoutTime.split("/");
    return new Date(
      `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    );
  }
  const modifiedDate = dateString.split("T")[0];
  return new Date(modifiedDate);
};

/**
 * Formats a given date to ISO string format.
 *
 * @param date - The date to be formatted.
 * @returns The formatted date in ISO string format (YYYY-MM-DDTHH:mm:ss.sssZ).
 */
export function formatDateTimeToISOString(date: Date): string {
  const today = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");
  const milliseconds = String(today.getMilliseconds()).padStart(3, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}

/**
 * Converts a date string in the format "YYYY-DD-MM" to an ISO string in the format "YYYY-MM-DDTHH:mm:ss.sssZ".
 * @param date - The date string to be converted.
 * @returns The converted ISO string.
 */
export function formatYYYYDDMMToISOString(date: string): string {
  const datePart = date.split("T")[0];
  const today = new Date();
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");
  const milliseconds = String(today.getMilliseconds()).padStart(3, "0");
  return `${datePart}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}

/**
 * Adds one second to the given date and returns the updated date in ISO string format.
 *
 * @param date - The date to add one second to.
 * @returns The updated date in ISO string format.
 */
export function modifyISOString(
  operation: "add" | "subtract",
  date?: string // iso date string
): string | undefined {
  if (!date) return undefined;

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    // Handle invalid date strings
    return undefined;
  }

  switch (operation) {
    case "add":
      dateObj.setUTCSeconds(dateObj.getUTCMilliseconds() + 50); // Use UTC to avoid local timezone issues
      break;
    case "subtract":
      dateObj.setUTCSeconds(dateObj.getUTCMilliseconds() - 50);
      break;
    default:
      return undefined; // Handle invalid operations
  }

  return dateObj.toISOString();
}

/**
 * Processes a date based on the specified operation.
 * @param operation - The operation to perform on the date. Can be "start" or "end".
 * @param dateString - The optional date string to process. If not provided, the current date will be used.
 * @param date - The optional date object to use. Defaults to the current date.
 * @returns The processed date string.
 * @throws {Error} If the provided date string is invalid.
 */
export function processDate({
  operation,
  dateString,
  date,
}: {
  operation: "start" | "end";
  dateString?: string | null;
  date?: Date;
}): string {
  const today = new Date();
  if (dateString) {
    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date string");
    }
  }

  const defaultDate = dateString
    ? dateString.slice(0, 10)
    : formatDateToYYYYMMDD(date || today);

  const time = operation === "end" ? "23:59:59.800Z" : "00:00:00.100Z";

  return `${defaultDate}T${time}`;
}

/**
 * Calculates the ISO time range based on the provided dates.
 *
 * @param fromDate - The starting date of the range.
 * @param toDate - The ending date of the range (optional).
 * @returns An object containing the ISO string representation of the starting and ending dates.
 */
export function getISOTimeRange({
  fromDate,
  toDate,
}: {
  fromDate: Date;
  toDate?: Date;
}): { fromDateISOString: string; nextDateISOString: string } {
  const fromDatewithZeroTime = new Date(
    fromDate.getFullYear(),
    fromDate.getMonth(),
    fromDate.getDate()
  );
  const fromDateISOString = `${formatDateToYYYYMMDD(
    fromDatewithZeroTime
  )}T00:00:00.000Z`;

  if (!toDate) {
    const nextDateISOString = `${formatDateToYYYYMMDD(
      fromDatewithZeroTime
    )}T23:59:59.900Z`;
    return { fromDateISOString, nextDateISOString };
  } else {
    const toDateWithZeroTime = new Date(
      toDate.getFullYear(),
      toDate.getMonth(),
      toDate.getDate()
    );
    const nextDateISOString = `${formatDateToYYYYMMDD(
      toDateWithZeroTime
    )}T23:59:59.900Z`;
    return { fromDateISOString, nextDateISOString };
  }
}

/**
 * Calculates the ISO time range based on the provided dates.
 * @param fromDate - The starting date of the range.
 * @param toDate - The ending date of the range (optional).
 * @returns An object containing the ISO string representation of the starting and ending dates.
 */
export function convertISOTimeRange({
  fromDate,
  toDate,
}: {
  fromDate: string;
  toDate?: string | null;
}): { fromDateISOString: string; nextDateISOString: string } {
  const processedFromDate = fromDate.split("T")[0];
  const fromDateISOString = `${processedFromDate}T00:00:00.100Z`;

  if (!toDate) {
    const today = new Date(`${fromDate}`);

    const nextDateISOString = `${formatDateToYYYYMMDD(today)}T23:59:59.900Z`;
    return { fromDateISOString, nextDateISOString };
  } else {
    const processedToDate = toDate.split("T")[0];
    const nextDateISOString = `${processedToDate}T23:59:59.900Z`;
    return { fromDateISOString, nextDateISOString };
  }
}

/**
 * Converts an ISO datetime string to a formatted time string.
 * @param isoDateTime - The ISO datetime string to convert.
 * @returns The formatted time string in the format "HH:mm AM/PM".
 */
export const getTimeFromISODateTime = (isoDateTime: string): string => {
  const date = new Date(isoDateTime);
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strHours = hours.toString().padStart(2, "0");
  return `${strHours}:${minutes} ${ampm}`;
};

/**
 * Formats a given date string into a human-readable format.
 *
 * @param dateString - The date string to format, expected in ISO format.
 * @param monthFormatOption - Optional parameter to specify the month format.
 *                            Can be "short" for abbreviated month names or "long" for full month names.
 * @returns The formatted date string.
 *
 * @example
 * ```typescript
 * getFormattedDate("2023-10-05T14:48:00.000Z", "short"); // "Oct 5, 2023"
 * getFormattedDate("2023-10-05T14:48:00.000Z", "long");  // "October 5, 2023"
 * ```
 */
export const getFormattedDate = (
  dateString: string,
  monthFormatOption?: "short" | "long"
): string => {
  const dateOnly = dateString.split("T")[0];
  const date = new Date(dateOnly);
  if (monthFormatOption === "short") {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

/**
 * Formats a phone number by adding dashes for better readability.
 *
 * @param phoneNumber - The phone number to format. It should be in the format +91 XXX-XXX-XXXX.
 * @returns The formatted phone number with dashes.
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  const countryCode = phoneNumber.slice(0, 3);
  const numberPart = phoneNumber.slice(3);
  const formattedNumber = `${numberPart.slice(0, 3)}-${numberPart.slice(
    3,
    6
  )}-${numberPart.slice(6)}`;
  return `${countryCode} ${formattedNumber}`;
};

/**
 * Formats a currency value.
 *
 * @param value - The value to be formatted as currency.
 * @returns The formatted currency value.
 */
export const FormatCurrency = (value: string | number) => {
  // if the value is number convert it to string
  if (typeof value === "number") {
    value = value.toString();
  }
  const numericValue = value.replace(/[^0-9]/g, "");
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(numericValue));
};

/**
 * Converts a formatted currency value back to a number.
 *
 * @param value - The formatted currency value.
 * @returns The unformatted number value.
 */
export const unformatCurrencyToNumber = (value: string): number => {
  if (!value) return 0;
  return parseFloat(value.replace(/[^0-9.-]+/g, ""));
};

export const getInstallmentsType = ({
  day,
}: {
  day: Weekday;
}): InstallmentType => {
  switch (day) {
    case Weekday.DAILY:
      return InstallmentType.DAILY;
    case Weekday.MONTHLY:
      return InstallmentType.MONTHLY;
    default:
      return InstallmentType.WEEKLY;
  }
};

// calculate the loan end date or next due date based on the installment type

/**
 * Calculates the loan end date or next due date based on the installment type.
 *
 * @param installmentType - The installment type of the loan.
 * @param date - The date to calculate the end date from.
 * @param totalInstallments - The total number of installments.
 * @param paidInstallments - The number of paid installments.
 * @returns The calculated date.
 */
type CalculateDateProps = {
  installmentType: InstallmentType;
  date: string;
  totalInstallments: number;
  paidInstallments: number;
};

export const calculateDate = ({
  installmentType,
  date,
  totalInstallments,
  paidInstallments,
}: CalculateDateProps): string => {
  // Validate inputs
  if (isNaN(Date.parse(date))) {
    throw new Error("Invalid date provided.");
  }
  if (totalInstallments < 0 || paidInstallments < 0) {
    throw new Error("Installments cannot be negative.");
  }

  const remainingInstallments = totalInstallments - paidInstallments;

  const newDate = new Date(date);
  switch (installmentType) {
    case InstallmentType.DAILY:
      newDate.setDate(newDate.getDate() + remainingInstallments);
      break;
    case InstallmentType.WEEKLY:
      newDate.setDate(newDate.getDate() + remainingInstallments * 7);
      break;
    case InstallmentType.MONTHLY:
      newDate.setMonth(newDate.getMonth() + remainingInstallments);
      break;
    default:
      throw new Error(`Unsupported installment type: ${installmentType}`);
  }
  return formatDateToYYYYMMDD(newDate); // Ensure this utility function is robust.
};

/**
 * Calculates the difference in days between two dates.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns The difference in days between the two dates.
 */
export const calculateDifferenceInDays = (date1: Date, date2: Date): number => {
  const timeDiff = date1.getTime() - date2.getTime();
  return Math.floor(timeDiff / (1000 * 3600 * 24));
};

export function validateClosingDate(
  lastClosingDateISO: string,
  newDate: Date
): string {
  // Parse the provided ISO date strings into Date objects
  const lastClosingDate = new Date(lastClosingDateISO);
  // Check if the new date is earlier than or equal to the last closing date
  if (newDate <= lastClosingDate) {
    lastClosingDate.setSeconds(lastClosingDate.getSeconds() + 1); // Add 1 second in milliseconds
    // Adjust the new date to a few seconds after the last closing date
    // convert to the new isodate string without altering the adjustedDate's date and time
    return lastClosingDate.toISOString();
  }
  const newDatePart = newDate.toISOString().split("T")[0];
  const lastClosingDatePart = lastClosingDateISO.split("T")[0];
  if (newDatePart !== lastClosingDatePart) {
    // If the new date is not in the same month, return the new date
    return formatDateTimeToISOString(newDate);
  }
  lastClosingDate.setSeconds(lastClosingDate.getSeconds() + 1); // Add 1 second in milliseconds
  const timePart = lastClosingDate.toISOString().split("T")[1];
  return `${newDatePart}T${timePart}`;
}

export function removeFirstOccurrence<T>(array: T[], value: T): T[] {
  const index = array.indexOf(value);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
}

export function expireAtDate(): number {
  const expireDate = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30; // 30 days from now
  return expireDate;
}

export function isIncomeType(type: string, amount?: number): boolean {
  if (type === TransactionType.DELETE) {
    return amount ? amount >= 0 : false;
  }
  return (
    type === TransactionType.REPAYMENT ||
    type === TransactionType.PARTNERINVESTMENT ||
    type === TransactionType.OTHERINCOME ||
    type === TransactionType.INCOME ||
    type === TransactionType.EXCESSPAYMENT ||
    type === TransactionType.EXCESSCOLLECTION
  );
}

/**
 * Converts UTC time to IST (Indian Standard Time) ISO string
 * @param {Date|string} [utcDate=new Date()] - UTC date to convert (optional)
 * @returns {string} ISO string in IST
 */
// Example usage:
// console.log(convertUTCtoIST()); // Current time
// console.log(convertUTCtoIST('2024-01-05T12:00:00Z')); // Specific UTC time
// console.log(convertUTCtoIST(new Date('2024-01-05T12:00:00Z'))); // Date object

export const convertUTCtoIST = (
  utcDate: Date | string = new Date()
): string => {
  // Ensure we have a Date object
  const dateObj = utcDate instanceof Date ? utcDate : new Date(utcDate);

  // Validate the date
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date provided");
  }

  // IST is UTC+5:30
  const offsetHours = 5;
  const offsetMinutes = 30;
  const totalOffsetMillis = (offsetHours * 60 + offsetMinutes) * 60 * 1000;

  // Create new date with offset
  const istDate = new Date(dateObj.getTime() + totalOffsetMillis);

  return istDate.toISOString();
};

interface InstallmentCalculationParams {
  loanStartDate: string | Date;
  nextDueDate: string | Date;
  installmentAmount: number;
  installmentType: "DAILY" | "WEEKLY" | "MONTHLY";
  paidInstallments: number;
  actualPaidAmount: number;
  endDate: string | Date;
  totalOutstandingAmount: number;
  totalInstallments: number;
}

interface InstallmentCalculationResult {
  pendingDays: number;
  pendingAmount: number;
  pendingInstallments: number;
}

export const calculatePendingInstallments = ({
  loanStartDate,
  installmentAmount,
  installmentType,
  actualPaidAmount,
  paidInstallments,
  nextDueDate,
  endDate,
  totalOutstandingAmount,
  totalInstallments,
}: InstallmentCalculationParams): InstallmentCalculationResult => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const startDate = new Date(loanStartDate);
  startDate.setHours(0, 0, 0, 0);
  const dueDate = new Date(nextDueDate);
  dueDate.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  // Check if the current date is after the end date
  if (currentDate > end) {
    return {
      pendingDays: calculateDifferenceInDays(currentDate, dueDate),
      pendingAmount: totalOutstandingAmount - actualPaidAmount,
      pendingInstallments: totalInstallments - paidInstallments,
    };
  }

  // Calculate days between nextDueDate and current date
  const daysDifference = Math.floor(
    (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate expected installments based on type
  let expectedInstallments = 0;
  switch (installmentType) {
    case InstallmentType.DAILY:
      expectedInstallments = daysDifference;
      break;
    case InstallmentType.WEEKLY:
      expectedInstallments = Math.floor(daysDifference / 7);
      break;
    case InstallmentType.MONTHLY:
      expectedInstallments = Math.floor(daysDifference / 30);
      break;
  }

  // Calculate expected amount to be paid by now
  const expectedAmount = Math.ceil(expectedInstallments * installmentAmount);

  // Calculate pending amount
  const pendingAmount = expectedAmount - actualPaidAmount;

  return {
    pendingDays: Math.abs(calculateDifferenceInDays(currentDate, dueDate)),
    pendingAmount: pendingAmount,
    pendingInstallments: expectedInstallments - paidInstallments,
  };
};

export function getValueByKey<T>(
  array: T[],
  matchKey: keyof T,
  matchValue: any,
  returnKey: keyof T
): any | undefined {
  const item = array.find((element) => element[matchKey] === matchValue);
  return item ? item[returnKey] : undefined;
}

interface CalculateTotalProps {
  transactions: Transaction[] | SimplifiedTransaction[];
  type: TransactionType;
}

export function calculateTotal({ transactions, type }: CalculateTotalProps) {
  if (!Array.isArray(transactions)) {
    throw new TypeError("transactions must be an array");
  }
  return transactions
    .filter((transaction) => transaction.transactionType === type)
    .reduce((acc, transaction) => acc + transaction.amount, 0);
}

// Add type guard function because the transaction can be either Transaction or SimplifiedTransaction
function isSimplifiedTransaction(
  transaction: Transaction | SimplifiedTransaction
): transaction is SimplifiedTransaction {
  return (
    "outstandingAmount" in transaction && !("additionalInfo" in transaction)
  );
}

function substractOutstandingAmount({
  transactions,
  type,
}: CalculateTotalProps) {
  const transaction = transactions.find(
    (transaction) => transaction.transactionType === type
  );
  if (!transaction) return 0;

  if (transaction.transactionType !== TransactionType.DELETE) {
    throw new Error("Transaction type is not DELETE");
  }
  const outstandingValue = isSimplifiedTransaction(transaction)
    ? transaction.outstandingAmount
    : transaction.additionalInfo?.totalOutstandingAmount;

  return outstandingValue;
}

export function calculateInterest({ transactions, type }: CalculateTotalProps) {
  return transactions
    .filter((transaction) => transaction.transactionType === type)
    .reduce((acc, transaction) => {
      const outstandingValue = isSimplifiedTransaction(transaction)
        ? transaction.outstandingAmount || transaction.amount
        : transaction.additionalInfo?.totalOutstandingAmount ||
          transaction.amount;

      return acc + (outstandingValue - transaction.amount);
    }, 0);
}

export function calculateTransactionsTotal({
  transactions,
}: {
  transactions: Transaction[] | SimplifiedTransaction[];
}) {
  const collectionAmount =
    calculateTotal({ transactions, type: TransactionType.REPAYMENT }) ?? 0;
  const newLoanPayments =
    calculateTotal({ transactions, type: TransactionType.LOAN }) ?? 0;
  const capital =
    calculateTotal({ transactions, type: TransactionType.DAYCAPTIAL }) ?? 0;
  const membersLoan =
    calculateTotal({ transactions, type: TransactionType.MEMBERLOAN }) ?? 0;
  const memberExpenses =
    calculateTotal({ transactions, type: TransactionType.MEMBEREXPENSE }) ?? 0;
  const vehicleExpenses =
    calculateTotal({ transactions, type: TransactionType.VEHICLEEXPENSE }) ?? 0;
  const newInvestments =
    calculateTotal({ transactions, type: TransactionType.PARTNERINVESTMENT }) ??
    0;
  const withdrawals =
    calculateTotal({ transactions, type: TransactionType.WITHDRAWAL }) ?? 0;
  const expense =
    calculateTotal({ transactions, type: TransactionType.EXPENSE }) ?? 0;
  const oExpenses =
    calculateTotal({ transactions, type: TransactionType.OTHEREXPENSE }) ?? 0;
  const otherExpenses = oExpenses + expense;
  const income =
    calculateTotal({ transactions, type: TransactionType.INCOME }) ?? 0;
  const oIncomes =
    calculateTotal({ transactions, type: TransactionType.OTHERINCOME }) ?? 0;
  const otherIncomes = oIncomes + income;

  const excessPayment =
    calculateTotal({ transactions, type: TransactionType.EXCESSPAYMENT }) ?? 0;
  const writeOff =
    calculateTotal({ transactions, type: TransactionType.WRITEOFF }) ?? 0;
  const businessLoss =
    calculateTotal({ transactions, type: TransactionType.BUSINESSLOSS }) ?? 0;

  const interest =
    calculateInterest({ transactions, type: TransactionType.LOAN }) ?? 0;

  const existingLoanOutstanding =
    calculateTotal({ transactions, type: TransactionType.EXISTSINGLOAN }) ?? 0;

  const chits =
    calculateTotal({ transactions, type: TransactionType.CHITS }) ?? 0;

  const subtractLoan =
    calculateTotal({ transactions, type: TransactionType.DELETE }) ?? 0;

  const substractOutstanding = substractOutstandingAmount({
    transactions,
    type: TransactionType.DELETE,
  });

  const excessCollection = calculateTotal({
    transactions,
    type: TransactionType.EXCESSCOLLECTION,
  });

  const deficit = calculateTotal({
    transactions,
    type: TransactionType.DEFICIT,
  });

  const cashBag =
    capital + collectionAmount + excessPayment > newLoanPayments
      ? capital + collectionAmount + excessPayment - newLoanPayments
      : 0;

  const assumedCapital =
    capital + collectionAmount + excessPayment < newLoanPayments
      ? newLoanPayments - (capital + collectionAmount + excessPayment)
      : 0;

  const cashflowIn =
    otherIncomes + newInvestments + cashBag + assumedCapital + excessCollection;
  const cashflowOut =
    membersLoan +
    memberExpenses +
    vehicleExpenses +
    withdrawals +
    otherExpenses +
    assumedCapital +
    capital +
    deficit +
    chits +
    subtractLoan;

  return {
    cashflowIn,
    cashflowOut,
    assumedCapital,
    cashBag,
    capital,
    collectionAmount,
    existingLoanOutstanding,
    interest,
    newLoanPayments,
    membersLoan,
    memberExpenses,
    vehicleExpenses,
    newInvestments,
    withdrawals,
    excessPayment,
    excessCollection,
    writeOff,
    businessLoss,
    otherExpenses,
    otherIncomes,
    deficit,
    chits,
    subtractLoan,
    substractOutstanding,
  };
}

export function parseDoubleJsonString<T>(input: string | T): T {
  if (typeof input !== "string") {
    return input;
  }

  try {
    const firstParse = JSON.parse(input);
    return typeof firstParse === "string" ? JSON.parse(firstParse) : firstParse;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse double JSON string: ${error.message}`);
    } else {
      throw new Error("Failed to parse double JSON string: Unknown error");
    }
  }
}