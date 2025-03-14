import { CashAccount } from "@/models/API";
import * as z from "zod";

export const formSchema = z.object({
  customerType: z.enum(["new", "existing"]),
  customerName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  mobileNumber: z.string().regex(/^\d{10}$/, {
    message: "Mobile number must be 10 digits.",
  }),
  aadharCardNumber: z
    .string()
    .regex(/^\d{12}$/, { message: "Aadhar number must be 12 digits." })
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." })
    .optional()
    .or(z.literal("")),
  city: z.string().min(1, {
    message: "Please select a city.",
  }),
  guarantorDetails: z.string().optional(),
  type: z.enum(["DAILY", "WEEKLY", "MONTHLY"], {
    message: "Please select a installment type.",
  }),
  emptyCheque: z.boolean().default(false).optional(),
  promissoryNote: z.boolean().default(false).optional(),
  loanBookId: z
    .number({ invalid_type_error: "Loan Book is a Number" })
    .positive("Loan Book must be a positive number")
    .min(1, {
      message: "Loan Book is required",
    }),
  givenDate: z.date({ message: "Given Date is required" }),
  givenAmount: z.union([
    z.string().min(1, "Given Amount is required"),
    z.number().positive(),
  ]),
  amountPerInstallment: z.union([
    z.string().min(1, "Amount per Installment is required"),
    z.number().positive(),
  ]),
  totalInstallments: z.union([
    z.string().min(1, "Total Installments is required"),
    z.number().int().positive(),
  ]),
  paidInstallments: z.union([z.string(), z.number().int().min(0)]).optional(),
  totalPaidAmount: z.union([z.string(), z.number().min(0)]).optional(),
});

export type FormData = z.infer<typeof formSchema>;

export const checkOutstandingAmount = (data: FormData) => {
  const givenAmount = parseFloat(data.givenAmount as string);
  const amountPerInstallment = parseFloat(data.amountPerInstallment as string);
  const totalInstallments = parseInt(data.totalInstallments as string);
  const totalPaidAmount = parseFloat(data.totalPaidAmount as string) || 0;

  const remainingAmount =
    totalInstallments * amountPerInstallment - totalPaidAmount;
  const isRemaingIsZero = remainingAmount >= 0;

  return (
    totalInstallments * amountPerInstallment >= givenAmount && isRemaingIsZero
  );
};

export const checkDate = (data: FormData, cashAccount: CashAccount) => {
  // If the customer is new the date must be less than or equal to the last closing date
  if (data.customerType === "new") {
    return (
      new Date(cashAccount?.closingEntryDate.slice(0, -1)) <=
      new Date(data.givenDate)
    );
  }
  return true;
};
