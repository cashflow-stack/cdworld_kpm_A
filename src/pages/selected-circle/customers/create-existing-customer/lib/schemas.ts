import * as z from "zod";

const paidInstallmentSchema = z.object({
  date: z.date({
    required_error: "Installment date is required.",
  }),
  amount: z
    .number()
    .lte(1000000, { message: "The value crossed max limit" })
    .positive({ message: "Amount must be positive." }),
});

export const customerSchema = z.object({
  customerName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  mobileNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Mobile number must be 10 digits." }),
  aadharNumber: z
    .string()
    .regex(/^\d{12}$/, { message: "Aadhar number must be 12 digits." })
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." })
    .optional()
    .or(z.literal("")),
  city: z.string().min(1, { message: "Please select a city." }),
  emptyCheque: z.boolean().default(false).optional(),
  promissoryNote: z.boolean().default(false).optional(),
});

export const loanSchema = z.object({
  type: z.enum(["DAILY", "WEEKLY", "MONTHLY"], {
    message: "Please select installment type",
  }),
  loanBookId: z
    .number({ invalid_type_error: "Loan Book is a Number" })
    .positive("Loan Book must be a positive number")
    .min(1, {
      message: "Loan Book is required",
    }),
  givenDate: z.date({
    required_error: "Given date is required.",
  }),
  givenAmount: z
    .number()
    .lte(10000000, { message: "The value crossed max limit" })
    .positive({ message: "Amount must be positive." }),
  amountPerInstallment: z
    .number()
    .lte(1000000, { message: "The value crossed max limit" })
    .positive({ message: "Amount per installment must be positive." }),
  totalInstallments: z
    .number()
    .lte(300, { message: "The value crossed max limit" })
    .int()
    .positive({ message: "Total installments must be a positive integer." })
    .min(0, { message: "Total installments must be a non-negative integer." }),
  paidInstallments: z
    .number()
    .lte(300, { message: "The value crossed max limit" })
    .int()
    .positive({ message: "Paid installments must be a positive integer." })
    .min(0, { message: "Paid installments must be a non-negative integer." }),
  totalPaidAmount: z
    .number()
    .lte(10000000, { message: "The value crossed max limit" })
    .min(0, { message: "Total paid amount must be a non-negative number." }),
  paidInstallmentDetails: z.array(paidInstallmentSchema),
});

export const formSchema = customerSchema.merge(loanSchema);

export type FormSchema = z.infer<typeof formSchema>;
