/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ModelStringKeyConditionInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
};

export type ModelCashAccountFilterInput = {
  adminEmailId?: ModelStringInput | null,
  adminID?: ModelStringInput | null,
  and?: Array< ModelCashAccountFilterInput | null > | null,
  cashflowIn?: ModelIntInput | null,
  cashflowOut?: ModelIntInput | null,
  circleID?: ModelIDInput | null,
  closingBalance?: ModelIntInput | null,
  closingEntryDate?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  id?: ModelIDInput | null,
  not?: ModelCashAccountFilterInput | null,
  openingBalance?: ModelIntInput | null,
  openingEntryDate?: ModelStringInput | null,
  or?: Array< ModelCashAccountFilterInput | null > | null,
  outstandingAmount?: ModelIntInput | null,
  simplifiedTransactions?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelCashAccountConnection = {
  __typename: "ModelCashAccountConnection",
  items:  Array<CashAccount | null >,
  nextToken?: string | null,
};

export type CashAccount = {
  __typename: "CashAccount",
  admin?: Admin | null,
  adminEmailId: string,
  adminID: string,
  cashflowIn: number,
  cashflowOut: number,
  circleID: string,
  closingBalance: number,
  closingEntryDate: string,
  closingSnapshot: ClosingSnapshot,
  createdAt: string,
  description?: string | null,
  expireAt?: number | null,
  id: string,
  openingBalance: number,
  openingEntryDate: string,
  outstandingAmount: number,
  simplifiedTransactions: string,
  updatedAt: string,
};

export type Admin = {
  __typename: "Admin",
  businessInformation?: BusinessInformation | null,
  cashAccount?: ModelCashAccountConnection | null,
  circles?: ModelCircleConnection | null,
  createdAt: string,
  emailId: string,
  expireAt?: number | null,
  id: string,
  incomeAndExpense?: ModelIncomeAndExpenseConnection | null,
  members?: ModelMemberConnection | null,
  name: string,
  owner: string,
  phoneNumber: string,
  updatedAt: string,
  vehicles?: ModelVehicleConnection | null,
};

export type BusinessInformation = {
  __typename: "BusinessInformation",
  businessAddress: string,
  businessEmail?: string | null,
  businessName: string,
  businessPhoneNumber: string,
  licenseNumber?: string | null,
  profilepPicUrl?: string | null,
  regulatoryBody?: string | null,
};

export type ModelCircleConnection = {
  __typename: "ModelCircleConnection",
  items:  Array<Circle | null >,
  nextToken?: string | null,
};

export type Circle = {
  __typename: "Circle",
  admin?: Admin | null,
  adminEmailId: string,
  adminID: string,
  circleName: string,
  circlePicUrl?: string | null,
  cities?: ModelCityConnection | null,
  createdAt: string,
  customers?: ModelCustomerConnection | null,
  dateOfCreation: string,
  day: Weekday,
  expireAt?: number | null,
  id: string,
  incomeAndExpenses?: ModelIncomeAndExpenseConnection | null,
  isLocked?: boolean | null,
  loanSerialNumber?: LoanSerialNumber | null,
  members?: ModelCircleMembersConnection | null,
  subscription?: CMSSubscription | null,
  transactions?: ModelTransactionConnection | null,
  updatedAt: string,
  vehicles?: ModelCircleVehiclesConnection | null,
};

export type ModelCityConnection = {
  __typename: "ModelCityConnection",
  items:  Array<City | null >,
  nextToken?: string | null,
};

export type City = {
  __typename: "City",
  adminID: string,
  circle?: Circle | null,
  circleDateOfCreation: string,
  circleID: string,
  createdAt: string,
  customers?: ModelCustomerConnection | null,
  expireAt?: number | null,
  id: string,
  name: string,
  updatedAt: string,
};

export type ModelCustomerConnection = {
  __typename: "ModelCustomerConnection",
  items:  Array<Customer | null >,
  nextToken?: string | null,
};

export type Customer = {
  __typename: "Customer",
  adminID: string,
  circle?: Circle | null,
  circleDateOfCreation: string,
  circleID: string,
  city?: City | null,
  cityAdminID: string,
  cityID: string,
  createdAt: string,
  customerStatus?: CustomerStatus | null,
  customers:  Array<CustomerPersonalDetails >,
  dateOfCreation: string,
  documents?: CustomerDocuments | null,
  expireAt?: number | null,
  groupName?: string | null,
  guarantorDetails?: string | null,
  id: string,
  installmentPaymentInfo?: InstallmentPaymentDetails | null,
  isGroupLoan: boolean,
  loanSerial: Array< string | null >,
  loans?: ModelLoanConnection | null,
  location?: Location | null,
  newLoanInfo?: NewLoanInformation | null,
  oldLoanInfo?: OldLoanDetails | null,
  updatedAt: string,
  visitedOn?: string | null,
};

export enum CustomerStatus {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
}


export type CustomerPersonalDetails = {
  __typename: "CustomerPersonalDetails",
  address: string,
  customerName: string,
  customerPicUrl?: string | null,
  phone: string,
  uId: string,
};

export type CustomerDocuments = {
  __typename: "CustomerDocuments",
  addressProof?: boolean | null,
  addressProofType?: CustomerDocumentsAddressProofType | null,
  documentsVerifiedAt?: string | null,
  documentsVerifiedBy?: string | null,
  emptyCheque?: boolean | null,
  emptyChequeNumber?: string | null,
  idProof?: boolean | null,
  idProofType?: CustomerDocumentsIdProofType | null,
  otherDocuments?: Array< string | null > | null,
  photographSubmitted?: boolean | null,
  promissoryNote?: boolean | null,
  promissoryNoteNumber?: string | null,
  remarks?: string | null,
};

export enum CustomerDocumentsAddressProofType {
  AADHAR = "AADHAR",
  DRIVING_LICENSE = "DRIVING_LICENSE",
  OTHER = "OTHER",
  PASSPORT = "PASSPORT",
  VOTER_ID = "VOTER_ID",
}


export enum CustomerDocumentsIdProofType {
  AADHAR = "AADHAR",
  DRIVING_LICENSE = "DRIVING_LICENSE",
  OTHER = "OTHER",
  PAN = "PAN",
  PASSPORT = "PASSPORT",
  VOTER_ID = "VOTER_ID",
}


export type InstallmentPaymentDetails = {
  __typename: "InstallmentPaymentDetails",
  installmentAmount: number,
  installmentID: string,
  loanSerial: string,
  paidAmount: number,
  paidDate: string,
};

export type ModelLoanConnection = {
  __typename: "ModelLoanConnection",
  items:  Array<Loan | null >,
  nextToken?: string | null,
};

export type Loan = {
  __typename: "Loan",
  adminID: string,
  circleID: string,
  collectibleAmount: number,
  createdAt: string,
  customer?: Customer | null,
  customerAdminID?: string | null,
  customerID?: string | null,
  dateOfCreation: string,
  endDate: string,
  expireAt?: number | null,
  givenAmount: number,
  id: string,
  initialCollectibleAmount?: number | null,
  initialGivenAmount?: number | null,
  installmentAmount: number,
  installmentType: InstallmentType,
  installments?: ModelInstallmentConnection | null,
  loanSerial: string,
  nextDueDate: string,
  paidAmount: number,
  paidInstallments: number,
  reasonForLoanTermination?: string | null,
  status: LoanStatus,
  totalInstallments: number,
  updatedAt: string,
  updatedDate?: string | null,
};

export enum InstallmentType {
  DAILY = "DAILY",
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
}


export type ModelInstallmentConnection = {
  __typename: "ModelInstallmentConnection",
  items:  Array<Installment | null >,
  nextToken?: string | null,
};

export type Installment = {
  __typename: "Installment",
  adminID: string,
  circleID: string,
  city: string,
  collectionAgentDetails?: CollectionAgentDetails | null,
  createdAt: string,
  customerName: string,
  description?: string | null,
  dueDate: string,
  expireAt?: number | null,
  id: string,
  initialAmount?: number | null,
  installmentAmount: number,
  installmentNumber: number,
  isExtraInstallment?: boolean | null,
  loan?: Loan | null,
  loanAdminID: string,
  loanID: string,
  loanSerial: string,
  paidAmount?: number | null,
  paidDate?: string | null,
  paymentMethod?: PaymentMethod | null,
  status: InstallmentStatus,
  updatedAt: string,
  updatedDate?: string | null,
};

export type CollectionAgentDetails = {
  __typename: "CollectionAgentDetails",
  agentID: string,
  name: string,
  phoneNumber: string,
};

export enum PaymentMethod {
  BANKTRANSFER = "BANKTRANSFER",
  CASH = "CASH",
  GOOGLEPAY = "GOOGLEPAY",
  OTHERS = "OTHERS",
  PAYTM = "PAYTM",
  PHONEPE = "PHONEPE",
}


export enum InstallmentStatus {
  BUSINESSLOSS = "BUSINESSLOSS",
  EXCESSPAYMENT = "EXCESSPAYMENT",
  NOTPAID = "NOTPAID",
  OVERDUE = "OVERDUE",
  PAID = "PAID",
  WRITEOFF = "WRITEOFF",
}


export enum LoanStatus {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
  OVERDUE = "OVERDUE",
  UNDERREVIEW = "UNDERREVIEW",
}


export type Location = {
  __typename: "Location",
  latitude?: number | null,
  longitude?: number | null,
};

export type NewLoanInformation = {
  __typename: "NewLoanInformation",
  givenDate: string,
  loanID: string,
  loanSerial: string,
  totalGivenAmount: number,
};

export type OldLoanDetails = {
  __typename: "OldLoanDetails",
  closedDate: string,
  loanID: string,
  loanSerial: string,
  totalCollectedAmount: number,
};

export enum Weekday {
  DAILY = "DAILY",
  FRIDAY = "FRIDAY",
  MONDAY = "MONDAY",
  MONTHLY = "MONTHLY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
  THURSDAY = "THURSDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
}


export type ModelIncomeAndExpenseConnection = {
  __typename: "ModelIncomeAndExpenseConnection",
  items:  Array<IncomeAndExpense | null >,
  nextToken?: string | null,
};

export type IncomeAndExpense = {
  __typename: "IncomeAndExpense",
  admin?: Admin | null,
  adminEmailId: string,
  adminID: string,
  amount: number,
  belongsTo: string,
  circle?: Circle | null,
  circleDateOfCreation: string,
  circleID: string,
  createdAt: string,
  date: string,
  description: string,
  expireAt?: number | null,
  id: string,
  incomeOrExpenseType: IncomeOrExpenseType,
  initialAmount?: number | null,
  interestRate?: number | null,
  name: string,
  updatedAt: string,
  updatedDate?: string | null,
};

export enum IncomeOrExpenseType {
  AGENTEXPENSE = "AGENTEXPENSE",
  AGENTLOAN = "AGENTLOAN",
  AGENTSALARY = "AGENTSALARY",
  BUSINESSEXPENSE = "BUSINESSEXPENSE",
  CHITS = "CHITS",
  DEFICIT = "DEFICIT",
  EXCESSCOLLECTION = "EXCESSCOLLECTION",
  INTERESTINCOME = "INTERESTINCOME",
  INVESTMENT = "INVESTMENT",
  OTHEREXPENSE = "OTHEREXPENSE",
  OTHERINCOME = "OTHERINCOME",
  PARTNEREXPENSE = "PARTNEREXPENSE",
  PARTNERLOAN = "PARTNERLOAN",
  PARTNERSALARY = "PARTNERSALARY",
  STATIONARYEXPENSE = "STATIONARYEXPENSE",
  SUPERVISOREXPENSE = "SUPERVISOREXPENSE",
  SUPERVISORLOAN = "SUPERVISORLOAN",
  SUPERVISORSALARY = "SUPERVISORSALARY",
  TRAVELINGEXPENSE = "TRAVELINGEXPENSE",
  VEHICLEEXPENSE = "VEHICLEEXPENSE",
  VEHICLEPETROL = "VEHICLEPETROL",
  WITHDRAWAL = "WITHDRAWAL",
}


export type LoanSerialNumber = {
  __typename: "LoanSerialNumber",
  adminID: string,
  circle?: Circle | null,
  circleDateOfCreation: string,
  circleID: string,
  createdAt: string,
  expireAt?: number | null,
  id: string,
  serialNumber: string,
  updatedAt: string,
};

export type ModelCircleMembersConnection = {
  __typename: "ModelCircleMembersConnection",
  items:  Array<CircleMembers | null >,
  nextToken?: string | null,
};

export type CircleMembers = {
  __typename: "CircleMembers",
  circle?: Circle | null,
  circleDateOfCreation: string,
  circleID: string,
  circleId: string,
  createdAt: string,
  expireAt?: number | null,
  member?: Member | null,
  memberID: string,
  memberId: string,
  memberName: string,
  updatedAt: string,
};

export type Member = {
  __typename: "Member",
  admin?: Admin | null,
  adminEmailId: string,
  adminID: string,
  circle?: ModelCircleMembersConnection | null,
  createdAt: string,
  emailId: string,
  expireAt?: number | null,
  id: string,
  lastSeen?: string | null,
  location?: Location | null,
  memberRole: MemberRole,
  name: string,
  phoneNumber: string,
  profilePicUrl?: string | null,
  share?: number | null,
  status: MemberStatus,
  updatedAt: string,
};

export enum MemberRole {
  AGENT = "AGENT",
  PARTNER = "PARTNER",
  SUPERVISOR = "SUPERVISOR",
}


export enum MemberStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}


export type CMSSubscription = {
  __typename: "CMSSubscription",
  adminID: string,
  amount: number,
  circle?: Circle | null,
  circleDateOfCreation: string,
  circleID: string,
  createdAt: string,
  endDate: string,
  expireAt?: number | null,
  id: string,
  isActive: boolean,
  paymentMethod?: PaymentMethod | null,
  startDate: string,
  transactionID?: string | null,
  updatedAt: string,
};

export type ModelTransactionConnection = {
  __typename: "ModelTransactionConnection",
  items:  Array<Transaction | null >,
  nextToken?: string | null,
};

export type Transaction = {
  __typename: "Transaction",
  additionalInfo: AdditionalTransactionInfo,
  adminID: string,
  amount: number,
  circle?: Circle | null,
  circleDateOfCreation: string,
  circleID: string,
  createdAt: string,
  dateTime: string,
  expireAt?: number | null,
  id: string,
  initialAmount?: number | null,
  transactionType: TransactionType,
  updatedAt: string,
  updatedDate?: string | null,
};

export type AdditionalTransactionInfo = {
  __typename: "AdditionalTransactionInfo",
  city?: string | null,
  collectionAgentDetails?: CollectionAgentDetails | null,
  customerName?: string | null,
  description: string,
  loanId?: string | null,
  loanSerial?: string | null,
  memberID?: string | null,
  memberName?: string | null,
  oldLoanAmount?: number | null,
  oldLoanSerial?: string | null,
  paymentMethod: PaymentMethod,
  totalOutstandingAmount?: number | null,
  transactionEvent: TransactionEventType,
};

export enum TransactionEventType {
  ADDITIONAL_LOAN = "ADDITIONAL_LOAN",
  ADJUSTMENT_COLLECTION = "ADJUSTMENT_COLLECTION",
  ADJUSTMENT_TRANSACTION = "ADJUSTMENT_TRANSACTION",
  CAPTIAL = "CAPTIAL",
  CHITS = "CHITS",
  CLOSING_TRANSACTION = "CLOSING_TRANSACTION",
  DELETE_TRANSACTION = "DELETE_TRANSACTION",
  EXISTSING_LOAN = "EXISTSING_LOAN",
  INSTALLMENT_PAYMENT = "INSTALLMENT_PAYMENT",
  LOAN_CLOSURE = "LOAN_CLOSURE",
  NEW_LOAN = "NEW_LOAN",
  NEW_TRANSACTION = "NEW_TRANSACTION",
  REFINANCE_LOAN = "REFINANCE_LOAN",
  UPDATE_INSTALLMENT = "UPDATE_INSTALLMENT",
  UPDATE_LOAN = "UPDATE_LOAN",
  UPDATE_TRANSACTION = "UPDATE_TRANSACTION",
}


export enum TransactionType {
  BUSINESSLOSS = "BUSINESSLOSS",
  CHITS = "CHITS",
  DAYCAPTIAL = "DAYCAPTIAL",
  DEFICIT = "DEFICIT",
  DELETE = "DELETE",
  EXCESSCOLLECTION = "EXCESSCOLLECTION",
  EXCESSPAYMENT = "EXCESSPAYMENT",
  EXISTSINGLOAN = "EXISTSINGLOAN",
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
  LOAN = "LOAN",
  MEMBEREXPENSE = "MEMBEREXPENSE",
  MEMBERLOAN = "MEMBERLOAN",
  OTHEREXPENSE = "OTHEREXPENSE",
  OTHERINCOME = "OTHERINCOME",
  PARTNERINVESTMENT = "PARTNERINVESTMENT",
  REPAYMENT = "REPAYMENT",
  TRANSFER = "TRANSFER",
  VEHICLEEXPENSE = "VEHICLEEXPENSE",
  WITHDRAWAL = "WITHDRAWAL",
  WRITEOFF = "WRITEOFF",
}


export type ModelCircleVehiclesConnection = {
  __typename: "ModelCircleVehiclesConnection",
  items:  Array<CircleVehicles | null >,
  nextToken?: string | null,
};

export type CircleVehicles = {
  __typename: "CircleVehicles",
  circle?: Circle | null,
  circleDateOfCreation: string,
  circleID: string,
  circleId: string,
  createdAt: string,
  expireAt?: number | null,
  updatedAt: string,
  vehicle?: Vehicle | null,
  vehicleID: string,
  vehicleId: string,
  vehicleNumber: string,
};

export type Vehicle = {
  __typename: "Vehicle",
  admin?: Admin | null,
  adminEmailId: string,
  adminID: string,
  circles?: ModelCircleVehiclesConnection | null,
  createdAt: string,
  expireAt?: number | null,
  id: string,
  updatedAt: string,
  vehicleCapacity?: number | null,
  vehicleColor: string,
  vehicleModel?: string | null,
  vehicleName: string,
  vehicleNumber: string,
  vehiclePicUrl?: string | null,
  vehicleStatus: VehicleStatus,
  vehicleType: VehicleType,
};

export enum VehicleStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  REPAIR = "REPAIR",
  SCRAP = "SCRAP",
  SOLD = "SOLD",
}


export enum VehicleType {
  FOUR_WHEELER = "FOUR_WHEELER",
  THREE_WHEELER = "THREE_WHEELER",
  TWO_WHEELER = "TWO_WHEELER",
}


export type ModelMemberConnection = {
  __typename: "ModelMemberConnection",
  items:  Array<Member | null >,
  nextToken?: string | null,
};

export type ModelVehicleConnection = {
  __typename: "ModelVehicleConnection",
  items:  Array<Vehicle | null >,
  nextToken?: string | null,
};

export type ClosingSnapshot = {
  __typename: "ClosingSnapshot",
  chits: number,
  deficit: number,
  excessCollection: number,
  expenses: number,
  incomes: number,
  interest: number,
  investments: number,
  loansGiven: number,
  repayments: number,
  withdrawals: number,
};

export type ModelCircleFilterInput = {
  adminEmailId?: ModelStringInput | null,
  adminID?: ModelIDInput | null,
  and?: Array< ModelCircleFilterInput | null > | null,
  circleName?: ModelStringInput | null,
  circlePicUrl?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  dateOfCreation?: ModelStringInput | null,
  day?: ModelWeekdayInput | null,
  expireAt?: ModelIntInput | null,
  id?: ModelIDInput | null,
  isLocked?: ModelBooleanInput | null,
  not?: ModelCircleFilterInput | null,
  or?: Array< ModelCircleFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelWeekdayInput = {
  eq?: Weekday | null,
  ne?: Weekday | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelIncomeAndExpenseFilterInput = {
  adminEmailId?: ModelStringInput | null,
  adminID?: ModelStringInput | null,
  amount?: ModelIntInput | null,
  and?: Array< ModelIncomeAndExpenseFilterInput | null > | null,
  belongsTo?: ModelIDInput | null,
  circleDateOfCreation?: ModelStringInput | null,
  circleID?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  date?: ModelStringInput | null,
  description?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  id?: ModelIDInput | null,
  incomeOrExpenseType?: ModelIncomeOrExpenseTypeInput | null,
  initialAmount?: ModelIntInput | null,
  interestRate?: ModelFloatInput | null,
  name?: ModelStringInput | null,
  not?: ModelIncomeAndExpenseFilterInput | null,
  or?: Array< ModelIncomeAndExpenseFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
  updatedDate?: ModelStringInput | null,
};

export type ModelIncomeOrExpenseTypeInput = {
  eq?: IncomeOrExpenseType | null,
  ne?: IncomeOrExpenseType | null,
};

export type ModelFloatInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelMemberFilterInput = {
  adminEmailId?: ModelStringInput | null,
  adminID?: ModelStringInput | null,
  and?: Array< ModelMemberFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  emailId?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  id?: ModelIDInput | null,
  lastSeen?: ModelStringInput | null,
  memberRole?: ModelMemberRoleInput | null,
  name?: ModelStringInput | null,
  not?: ModelMemberFilterInput | null,
  or?: Array< ModelMemberFilterInput | null > | null,
  phoneNumber?: ModelStringInput | null,
  profilePicUrl?: ModelStringInput | null,
  share?: ModelIntInput | null,
  status?: ModelMemberStatusInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelMemberRoleInput = {
  eq?: MemberRole | null,
  ne?: MemberRole | null,
};

export type ModelMemberStatusInput = {
  eq?: MemberStatus | null,
  ne?: MemberStatus | null,
};

export type ModelTransactionFilterInput = {
  adminID?: ModelStringInput | null,
  amount?: ModelIntInput | null,
  and?: Array< ModelTransactionFilterInput | null > | null,
  circleDateOfCreation?: ModelStringInput | null,
  circleID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  dateTime?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  id?: ModelIDInput | null,
  initialAmount?: ModelIntInput | null,
  not?: ModelTransactionFilterInput | null,
  or?: Array< ModelTransactionFilterInput | null > | null,
  transactionType?: ModelTransactionTypeInput | null,
  updatedAt?: ModelStringInput | null,
  updatedDate?: ModelStringInput | null,
};

export type ModelTransactionTypeInput = {
  eq?: TransactionType | null,
  ne?: TransactionType | null,
};

export type ModelVehicleFilterInput = {
  adminEmailId?: ModelStringInput | null,
  adminID?: ModelStringInput | null,
  and?: Array< ModelVehicleFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  id?: ModelIDInput | null,
  not?: ModelVehicleFilterInput | null,
  or?: Array< ModelVehicleFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
  vehicleCapacity?: ModelIntInput | null,
  vehicleColor?: ModelStringInput | null,
  vehicleModel?: ModelStringInput | null,
  vehicleName?: ModelStringInput | null,
  vehicleNumber?: ModelStringInput | null,
  vehiclePicUrl?: ModelStringInput | null,
  vehicleStatus?: ModelVehicleStatusInput | null,
  vehicleType?: ModelVehicleTypeInput | null,
};

export type ModelVehicleStatusInput = {
  eq?: VehicleStatus | null,
  ne?: VehicleStatus | null,
};

export type ModelVehicleTypeInput = {
  eq?: VehicleType | null,
  ne?: VehicleType | null,
};

export type ModelCityFilterInput = {
  adminID?: ModelStringInput | null,
  and?: Array< ModelCityFilterInput | null > | null,
  circleDateOfCreation?: ModelStringInput | null,
  circleID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelCityFilterInput | null,
  or?: Array< ModelCityFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelCustomerFilterInput = {
  adminID?: ModelStringInput | null,
  and?: Array< ModelCustomerFilterInput | null > | null,
  circleDateOfCreation?: ModelStringInput | null,
  circleID?: ModelIDInput | null,
  cityAdminID?: ModelStringInput | null,
  cityID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  customerStatus?: ModelCustomerStatusInput | null,
  dateOfCreation?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  groupName?: ModelStringInput | null,
  guarantorDetails?: ModelStringInput | null,
  id?: ModelIDInput | null,
  isGroupLoan?: ModelBooleanInput | null,
  loanSerial?: ModelStringInput | null,
  not?: ModelCustomerFilterInput | null,
  or?: Array< ModelCustomerFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
  visitedOn?: ModelStringInput | null,
};

export type ModelCustomerStatusInput = {
  eq?: CustomerStatus | null,
  ne?: CustomerStatus | null,
};

export type ModelLoanSerialNumberFilterInput = {
  adminID?: ModelStringInput | null,
  and?: Array< ModelLoanSerialNumberFilterInput | null > | null,
  circleDateOfCreation?: ModelStringInput | null,
  circleID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  id?: ModelIDInput | null,
  not?: ModelLoanSerialNumberFilterInput | null,
  or?: Array< ModelLoanSerialNumberFilterInput | null > | null,
  serialNumber?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelLoanSerialNumberConnection = {
  __typename: "ModelLoanSerialNumberConnection",
  items:  Array<LoanSerialNumber | null >,
  nextToken?: string | null,
};

export type ModelCircleMembersFilterInput = {
  and?: Array< ModelCircleMembersFilterInput | null > | null,
  circleDateOfCreation?: ModelStringInput | null,
  circleID?: ModelIDInput | null,
  circleId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  id?: ModelIDInput | null,
  memberID?: ModelIDInput | null,
  memberId?: ModelIDInput | null,
  memberName?: ModelStringInput | null,
  not?: ModelCircleMembersFilterInput | null,
  or?: Array< ModelCircleMembersFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelCMSSubscriptionFilterInput = {
  adminID?: ModelStringInput | null,
  amount?: ModelIntInput | null,
  and?: Array< ModelCMSSubscriptionFilterInput | null > | null,
  circleDateOfCreation?: ModelStringInput | null,
  circleID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  id?: ModelIDInput | null,
  isActive?: ModelBooleanInput | null,
  not?: ModelCMSSubscriptionFilterInput | null,
  or?: Array< ModelCMSSubscriptionFilterInput | null > | null,
  paymentMethod?: ModelPaymentMethodInput | null,
  startDate?: ModelStringInput | null,
  transactionID?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelPaymentMethodInput = {
  eq?: PaymentMethod | null,
  ne?: PaymentMethod | null,
};

export type ModelCMSSubscriptionConnection = {
  __typename: "ModelCMSSubscriptionConnection",
  items:  Array<CMSSubscription | null >,
  nextToken?: string | null,
};

export type ModelCircleVehiclesFilterInput = {
  and?: Array< ModelCircleVehiclesFilterInput | null > | null,
  circleDateOfCreation?: ModelStringInput | null,
  circleID?: ModelIDInput | null,
  circleId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  id?: ModelIDInput | null,
  not?: ModelCircleVehiclesFilterInput | null,
  or?: Array< ModelCircleVehiclesFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
  vehicleID?: ModelIDInput | null,
  vehicleId?: ModelIDInput | null,
  vehicleNumber?: ModelStringInput | null,
};

export type ModelLoanFilterInput = {
  adminID?: ModelStringInput | null,
  and?: Array< ModelLoanFilterInput | null > | null,
  circleID?: ModelIDInput | null,
  collectibleAmount?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  customerAdminID?: ModelStringInput | null,
  customerID?: ModelIDInput | null,
  dateOfCreation?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  givenAmount?: ModelIntInput | null,
  id?: ModelIDInput | null,
  initialCollectibleAmount?: ModelIntInput | null,
  initialGivenAmount?: ModelIntInput | null,
  installmentAmount?: ModelIntInput | null,
  installmentType?: ModelInstallmentTypeInput | null,
  loanSerial?: ModelStringInput | null,
  nextDueDate?: ModelStringInput | null,
  not?: ModelLoanFilterInput | null,
  or?: Array< ModelLoanFilterInput | null > | null,
  paidAmount?: ModelIntInput | null,
  paidInstallments?: ModelIntInput | null,
  reasonForLoanTermination?: ModelStringInput | null,
  status?: ModelLoanStatusInput | null,
  totalInstallments?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
  updatedDate?: ModelStringInput | null,
};

export type ModelInstallmentTypeInput = {
  eq?: InstallmentType | null,
  ne?: InstallmentType | null,
};

export type ModelLoanStatusInput = {
  eq?: LoanStatus | null,
  ne?: LoanStatus | null,
};

export type ModelInstallmentFilterInput = {
  adminID?: ModelStringInput | null,
  and?: Array< ModelInstallmentFilterInput | null > | null,
  circleID?: ModelIDInput | null,
  city?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  customerName?: ModelStringInput | null,
  description?: ModelStringInput | null,
  dueDate?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  id?: ModelIDInput | null,
  initialAmount?: ModelIntInput | null,
  installmentAmount?: ModelIntInput | null,
  installmentNumber?: ModelIntInput | null,
  isExtraInstallment?: ModelBooleanInput | null,
  loanAdminID?: ModelStringInput | null,
  loanID?: ModelIDInput | null,
  loanSerial?: ModelStringInput | null,
  not?: ModelInstallmentFilterInput | null,
  or?: Array< ModelInstallmentFilterInput | null > | null,
  paidAmount?: ModelIntInput | null,
  paidDate?: ModelStringInput | null,
  paymentMethod?: ModelPaymentMethodInput | null,
  status?: ModelInstallmentStatusInput | null,
  updatedAt?: ModelStringInput | null,
  updatedDate?: ModelStringInput | null,
};

export type ModelInstallmentStatusInput = {
  eq?: InstallmentStatus | null,
  ne?: InstallmentStatus | null,
};

export type ModelAdminFilterInput = {
  and?: Array< ModelAdminFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  emailId?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelAdminFilterInput | null,
  or?: Array< ModelAdminFilterInput | null > | null,
  owner?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelAdminConnection = {
  __typename: "ModelAdminConnection",
  items:  Array<Admin | null >,
  nextToken?: string | null,
};

export type ModelIDKeyConditionInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
};

export type ModelAdminConditionInput = {
  and?: Array< ModelAdminConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  name?: ModelStringInput | null,
  not?: ModelAdminConditionInput | null,
  or?: Array< ModelAdminConditionInput | null > | null,
  owner?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateAdminInput = {
  businessInformation?: BusinessInformationInput | null,
  emailId: string,
  expireAt?: number | null,
  id?: string | null,
  name: string,
  owner: string,
  phoneNumber: string,
};

export type BusinessInformationInput = {
  businessAddress: string,
  businessEmail?: string | null,
  businessName: string,
  businessPhoneNumber: string,
  licenseNumber?: string | null,
  profilepPicUrl?: string | null,
  regulatoryBody?: string | null,
};

export type ModelCMSSubscriptionConditionInput = {
  amount?: ModelIntInput | null,
  and?: Array< ModelCMSSubscriptionConditionInput | null > | null,
  circleDateOfCreation?: ModelStringInput | null,
  circleID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  isActive?: ModelBooleanInput | null,
  not?: ModelCMSSubscriptionConditionInput | null,
  or?: Array< ModelCMSSubscriptionConditionInput | null > | null,
  paymentMethod?: ModelPaymentMethodInput | null,
  startDate?: ModelStringInput | null,
  transactionID?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateCMSSubscriptionInput = {
  adminID: string,
  amount: number,
  circleDateOfCreation: string,
  circleID: string,
  endDate: string,
  expireAt?: number | null,
  id?: string | null,
  isActive: boolean,
  paymentMethod?: PaymentMethod | null,
  startDate: string,
  transactionID?: string | null,
};

export type ModelCashAccountConditionInput = {
  adminEmailId?: ModelStringInput | null,
  adminID?: ModelStringInput | null,
  and?: Array< ModelCashAccountConditionInput | null > | null,
  cashflowIn?: ModelIntInput | null,
  cashflowOut?: ModelIntInput | null,
  circleID?: ModelIDInput | null,
  closingBalance?: ModelIntInput | null,
  closingEntryDate?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  not?: ModelCashAccountConditionInput | null,
  openingBalance?: ModelIntInput | null,
  openingEntryDate?: ModelStringInput | null,
  or?: Array< ModelCashAccountConditionInput | null > | null,
  outstandingAmount?: ModelIntInput | null,
  simplifiedTransactions?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateCashAccountInput = {
  adminEmailId: string,
  adminID: string,
  cashflowIn: number,
  cashflowOut: number,
  circleID: string,
  closingBalance: number,
  closingEntryDate: string,
  closingSnapshot: ClosingSnapshotInput,
  description?: string | null,
  expireAt?: number | null,
  id?: string | null,
  openingBalance: number,
  openingEntryDate: string,
  outstandingAmount: number,
  simplifiedTransactions: string,
};

export type ClosingSnapshotInput = {
  chits: number,
  deficit: number,
  excessCollection: number,
  expenses: number,
  incomes: number,
  interest: number,
  investments: number,
  loansGiven: number,
  repayments: number,
  withdrawals: number,
};

export type ModelCircleConditionInput = {
  adminEmailId?: ModelStringInput | null,
  adminID?: ModelIDInput | null,
  and?: Array< ModelCircleConditionInput | null > | null,
  circleName?: ModelStringInput | null,
  circlePicUrl?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  day?: ModelWeekdayInput | null,
  expireAt?: ModelIntInput | null,
  isLocked?: ModelBooleanInput | null,
  not?: ModelCircleConditionInput | null,
  or?: Array< ModelCircleConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateCircleInput = {
  adminEmailId: string,
  adminID: string,
  circleName: string,
  circlePicUrl?: string | null,
  dateOfCreation: string,
  day: Weekday,
  expireAt?: number | null,
  id?: string | null,
  isLocked?: boolean | null,
};

export type ModelCircleMembersConditionInput = {
  and?: Array< ModelCircleMembersConditionInput | null > | null,
  circleDateOfCreation?: ModelStringInput | null,
  circleID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  memberID?: ModelIDInput | null,
  memberName?: ModelStringInput | null,
  not?: ModelCircleMembersConditionInput | null,
  or?: Array< ModelCircleMembersConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateCircleMembersInput = {
  circleDateOfCreation: string,
  circleID: string,
  circleId: string,
  expireAt?: number | null,
  memberID: string,
  memberId: string,
  memberName: string,
};

export type ModelCircleVehiclesConditionInput = {
  and?: Array< ModelCircleVehiclesConditionInput | null > | null,
  circleDateOfCreation?: ModelStringInput | null,
  circleID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  not?: ModelCircleVehiclesConditionInput | null,
  or?: Array< ModelCircleVehiclesConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
  vehicleID?: ModelIDInput | null,
  vehicleNumber?: ModelStringInput | null,
};

export type CreateCircleVehiclesInput = {
  circleDateOfCreation: string,
  circleID: string,
  circleId: string,
  expireAt?: number | null,
  vehicleID: string,
  vehicleId: string,
  vehicleNumber: string,
};

export type ModelCityConditionInput = {
  and?: Array< ModelCityConditionInput | null > | null,
  circleDateOfCreation?: ModelStringInput | null,
  circleID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  name?: ModelStringInput | null,
  not?: ModelCityConditionInput | null,
  or?: Array< ModelCityConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateCityInput = {
  adminID: string,
  circleDateOfCreation: string,
  circleID: string,
  expireAt?: number | null,
  id?: string | null,
  name: string,
};

export type ModelCustomerConditionInput = {
  and?: Array< ModelCustomerConditionInput | null > | null,
  circleDateOfCreation?: ModelStringInput | null,
  circleID?: ModelIDInput | null,
  cityAdminID?: ModelStringInput | null,
  cityID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  customerStatus?: ModelCustomerStatusInput | null,
  dateOfCreation?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  groupName?: ModelStringInput | null,
  guarantorDetails?: ModelStringInput | null,
  isGroupLoan?: ModelBooleanInput | null,
  loanSerial?: ModelStringInput | null,
  not?: ModelCustomerConditionInput | null,
  or?: Array< ModelCustomerConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
  visitedOn?: ModelStringInput | null,
};

export type CreateCustomerInput = {
  adminID: string,
  circleDateOfCreation: string,
  circleID: string,
  cityAdminID: string,
  cityID: string,
  customerStatus?: CustomerStatus | null,
  customers: Array< CustomerPersonalDetailsInput >,
  dateOfCreation: string,
  documents?: CustomerDocumentsInput | null,
  expireAt?: number | null,
  groupName?: string | null,
  guarantorDetails?: string | null,
  id?: string | null,
  installmentPaymentInfo?: InstallmentPaymentDetailsInput | null,
  isGroupLoan: boolean,
  loanSerial: Array< string | null >,
  location?: LocationInput | null,
  newLoanInfo?: NewLoanInformationInput | null,
  oldLoanInfo?: OldLoanDetailsInput | null,
  visitedOn?: string | null,
};

export type CustomerPersonalDetailsInput = {
  address: string,
  customerName: string,
  customerPicUrl?: string | null,
  phone: string,
  uId: string,
};

export type CustomerDocumentsInput = {
  addressProof?: boolean | null,
  addressProofType?: CustomerDocumentsAddressProofType | null,
  documentsVerifiedAt?: string | null,
  documentsVerifiedBy?: string | null,
  emptyCheque?: boolean | null,
  emptyChequeNumber?: string | null,
  idProof?: boolean | null,
  idProofType?: CustomerDocumentsIdProofType | null,
  otherDocuments?: Array< string | null > | null,
  photographSubmitted?: boolean | null,
  promissoryNote?: boolean | null,
  promissoryNoteNumber?: string | null,
  remarks?: string | null,
};

export type InstallmentPaymentDetailsInput = {
  installmentAmount: number,
  installmentID: string,
  loanSerial: string,
  paidAmount: number,
  paidDate: string,
};

export type LocationInput = {
  latitude?: number | null,
  longitude?: number | null,
};

export type NewLoanInformationInput = {
  givenDate: string,
  loanID: string,
  loanSerial: string,
  totalGivenAmount: number,
};

export type OldLoanDetailsInput = {
  closedDate: string,
  loanID: string,
  loanSerial: string,
  totalCollectedAmount: number,
};

export type ModelIncomeAndExpenseConditionInput = {
  adminEmailId?: ModelStringInput | null,
  amount?: ModelIntInput | null,
  and?: Array< ModelIncomeAndExpenseConditionInput | null > | null,
  belongsTo?: ModelIDInput | null,
  circleDateOfCreation?: ModelStringInput | null,
  circleID?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  date?: ModelStringInput | null,
  description?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  incomeOrExpenseType?: ModelIncomeOrExpenseTypeInput | null,
  initialAmount?: ModelIntInput | null,
  interestRate?: ModelFloatInput | null,
  name?: ModelStringInput | null,
  not?: ModelIncomeAndExpenseConditionInput | null,
  or?: Array< ModelIncomeAndExpenseConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
  updatedDate?: ModelStringInput | null,
};

export type CreateIncomeAndExpenseInput = {
  adminEmailId: string,
  adminID: string,
  amount: number,
  belongsTo: string,
  circleDateOfCreation: string,
  circleID: string,
  date: string,
  description: string,
  expireAt?: number | null,
  id?: string | null,
  incomeOrExpenseType: IncomeOrExpenseType,
  initialAmount?: number | null,
  interestRate?: number | null,
  name: string,
  updatedDate?: string | null,
};

export type ModelInstallmentConditionInput = {
  and?: Array< ModelInstallmentConditionInput | null > | null,
  circleID?: ModelIDInput | null,
  city?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  customerName?: ModelStringInput | null,
  description?: ModelStringInput | null,
  dueDate?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  initialAmount?: ModelIntInput | null,
  installmentAmount?: ModelIntInput | null,
  installmentNumber?: ModelIntInput | null,
  isExtraInstallment?: ModelBooleanInput | null,
  loanAdminID?: ModelStringInput | null,
  loanID?: ModelIDInput | null,
  loanSerial?: ModelStringInput | null,
  not?: ModelInstallmentConditionInput | null,
  or?: Array< ModelInstallmentConditionInput | null > | null,
  paidAmount?: ModelIntInput | null,
  paidDate?: ModelStringInput | null,
  paymentMethod?: ModelPaymentMethodInput | null,
  status?: ModelInstallmentStatusInput | null,
  updatedAt?: ModelStringInput | null,
  updatedDate?: ModelStringInput | null,
};

export type CreateInstallmentInput = {
  adminID: string,
  circleID: string,
  city: string,
  collectionAgentDetails?: CollectionAgentDetailsInput | null,
  customerName: string,
  description?: string | null,
  dueDate: string,
  expireAt?: number | null,
  id?: string | null,
  initialAmount?: number | null,
  installmentAmount: number,
  installmentNumber: number,
  isExtraInstallment?: boolean | null,
  loanAdminID: string,
  loanID: string,
  loanSerial: string,
  paidAmount?: number | null,
  paidDate?: string | null,
  paymentMethod?: PaymentMethod | null,
  status: InstallmentStatus,
  updatedDate?: string | null,
};

export type CollectionAgentDetailsInput = {
  agentID: string,
  name: string,
  phoneNumber: string,
};

export type ModelLoanConditionInput = {
  and?: Array< ModelLoanConditionInput | null > | null,
  circleID?: ModelIDInput | null,
  collectibleAmount?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  customerAdminID?: ModelStringInput | null,
  customerID?: ModelIDInput | null,
  dateOfCreation?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  givenAmount?: ModelIntInput | null,
  initialCollectibleAmount?: ModelIntInput | null,
  initialGivenAmount?: ModelIntInput | null,
  installmentAmount?: ModelIntInput | null,
  installmentType?: ModelInstallmentTypeInput | null,
  loanSerial?: ModelStringInput | null,
  nextDueDate?: ModelStringInput | null,
  not?: ModelLoanConditionInput | null,
  or?: Array< ModelLoanConditionInput | null > | null,
  paidAmount?: ModelIntInput | null,
  paidInstallments?: ModelIntInput | null,
  reasonForLoanTermination?: ModelStringInput | null,
  status?: ModelLoanStatusInput | null,
  totalInstallments?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
  updatedDate?: ModelStringInput | null,
};

export type CreateLoanInput = {
  adminID: string,
  circleID: string,
  collectibleAmount: number,
  customerAdminID?: string | null,
  customerID?: string | null,
  dateOfCreation: string,
  endDate: string,
  expireAt?: number | null,
  givenAmount: number,
  id?: string | null,
  initialCollectibleAmount?: number | null,
  initialGivenAmount?: number | null,
  installmentAmount: number,
  installmentType: InstallmentType,
  loanSerial: string,
  nextDueDate: string,
  paidAmount: number,
  paidInstallments: number,
  reasonForLoanTermination?: string | null,
  status: LoanStatus,
  totalInstallments: number,
  updatedDate?: string | null,
};

export type ModelLoanSerialNumberConditionInput = {
  and?: Array< ModelLoanSerialNumberConditionInput | null > | null,
  circleDateOfCreation?: ModelStringInput | null,
  circleID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  not?: ModelLoanSerialNumberConditionInput | null,
  or?: Array< ModelLoanSerialNumberConditionInput | null > | null,
  serialNumber?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateLoanSerialNumberInput = {
  adminID: string,
  circleDateOfCreation: string,
  circleID: string,
  expireAt?: number | null,
  id?: string | null,
  serialNumber: string,
};

export type ModelMemberConditionInput = {
  adminEmailId?: ModelStringInput | null,
  adminID?: ModelStringInput | null,
  and?: Array< ModelMemberConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  emailId?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  lastSeen?: ModelStringInput | null,
  memberRole?: ModelMemberRoleInput | null,
  not?: ModelMemberConditionInput | null,
  or?: Array< ModelMemberConditionInput | null > | null,
  phoneNumber?: ModelStringInput | null,
  profilePicUrl?: ModelStringInput | null,
  share?: ModelIntInput | null,
  status?: ModelMemberStatusInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateMemberInput = {
  adminEmailId: string,
  adminID: string,
  emailId: string,
  expireAt?: number | null,
  id?: string | null,
  lastSeen?: string | null,
  location?: LocationInput | null,
  memberRole: MemberRole,
  name: string,
  phoneNumber: string,
  profilePicUrl?: string | null,
  share?: number | null,
  status: MemberStatus,
};

export type ModelTransactionConditionInput = {
  amount?: ModelIntInput | null,
  and?: Array< ModelTransactionConditionInput | null > | null,
  circleDateOfCreation?: ModelStringInput | null,
  circleID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  dateTime?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  initialAmount?: ModelIntInput | null,
  not?: ModelTransactionConditionInput | null,
  or?: Array< ModelTransactionConditionInput | null > | null,
  transactionType?: ModelTransactionTypeInput | null,
  updatedAt?: ModelStringInput | null,
  updatedDate?: ModelStringInput | null,
};

export type CreateTransactionInput = {
  additionalInfo: AdditionalTransactionInfoInput,
  adminID: string,
  amount: number,
  circleDateOfCreation: string,
  circleID: string,
  dateTime: string,
  expireAt?: number | null,
  id?: string | null,
  initialAmount?: number | null,
  transactionType: TransactionType,
  updatedDate?: string | null,
};

export type AdditionalTransactionInfoInput = {
  city?: string | null,
  collectionAgentDetails?: CollectionAgentDetailsInput | null,
  customerName?: string | null,
  description: string,
  loanId?: string | null,
  loanSerial?: string | null,
  memberID?: string | null,
  memberName?: string | null,
  oldLoanAmount?: number | null,
  oldLoanSerial?: string | null,
  paymentMethod: PaymentMethod,
  totalOutstandingAmount?: number | null,
  transactionEvent: TransactionEventType,
};

export type ModelVehicleConditionInput = {
  adminEmailId?: ModelStringInput | null,
  adminID?: ModelStringInput | null,
  and?: Array< ModelVehicleConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  expireAt?: ModelIntInput | null,
  not?: ModelVehicleConditionInput | null,
  or?: Array< ModelVehicleConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
  vehicleCapacity?: ModelIntInput | null,
  vehicleColor?: ModelStringInput | null,
  vehicleModel?: ModelStringInput | null,
  vehicleName?: ModelStringInput | null,
  vehiclePicUrl?: ModelStringInput | null,
  vehicleStatus?: ModelVehicleStatusInput | null,
  vehicleType?: ModelVehicleTypeInput | null,
};

export type CreateVehicleInput = {
  adminEmailId: string,
  adminID: string,
  expireAt?: number | null,
  id?: string | null,
  vehicleCapacity?: number | null,
  vehicleColor: string,
  vehicleModel?: string | null,
  vehicleName: string,
  vehicleNumber: string,
  vehiclePicUrl?: string | null,
  vehicleStatus: VehicleStatus,
  vehicleType: VehicleType,
};

export type DeleteAdminInput = {
  emailId: string,
  id: string,
};

export type DeleteCMSSubscriptionInput = {
  adminID: string,
  id: string,
};

export type DeleteCashAccountInput = {
  id: string,
};

export type DeleteCircleInput = {
  dateOfCreation: string,
  id: string,
};

export type DeleteCircleMembersInput = {
  circleId: string,
  memberId: string,
};

export type DeleteCircleVehiclesInput = {
  circleId: string,
  vehicleId: string,
};

export type DeleteCityInput = {
  adminID: string,
  id: string,
};

export type DeleteCustomerInput = {
  adminID: string,
  id: string,
};

export type DeleteIncomeAndExpenseInput = {
  adminID: string,
  id: string,
};

export type DeleteInstallmentInput = {
  adminID: string,
  id: string,
};

export type DeleteLoanInput = {
  adminID: string,
  id: string,
};

export type DeleteLoanSerialNumberInput = {
  adminID: string,
  id: string,
};

export type DeleteMemberInput = {
  id: string,
  name: string,
};

export type DeleteTransactionInput = {
  adminID: string,
  id: string,
};

export type DeleteVehicleInput = {
  id: string,
  vehicleNumber: string,
};

export type UpdateAdminInput = {
  businessInformation?: BusinessInformationInput | null,
  emailId: string,
  expireAt?: number | null,
  id: string,
  name?: string | null,
  owner?: string | null,
  phoneNumber?: string | null,
};

export type UpdateCMSSubscriptionInput = {
  adminID: string,
  amount?: number | null,
  circleDateOfCreation?: string | null,
  circleID?: string | null,
  endDate?: string | null,
  expireAt?: number | null,
  id: string,
  isActive?: boolean | null,
  paymentMethod?: PaymentMethod | null,
  startDate?: string | null,
  transactionID?: string | null,
};

export type UpdateCashAccountInput = {
  adminEmailId?: string | null,
  adminID?: string | null,
  cashflowIn?: number | null,
  cashflowOut?: number | null,
  circleID?: string | null,
  closingBalance?: number | null,
  closingEntryDate?: string | null,
  closingSnapshot?: ClosingSnapshotInput | null,
  description?: string | null,
  expireAt?: number | null,
  id: string,
  openingBalance?: number | null,
  openingEntryDate?: string | null,
  outstandingAmount?: number | null,
  simplifiedTransactions?: string | null,
};

export type UpdateCircleInput = {
  adminEmailId?: string | null,
  adminID?: string | null,
  circleName?: string | null,
  circlePicUrl?: string | null,
  dateOfCreation: string,
  day?: Weekday | null,
  expireAt?: number | null,
  id: string,
  isLocked?: boolean | null,
};

export type UpdateCircleMembersInput = {
  circleDateOfCreation?: string | null,
  circleID?: string | null,
  circleId: string,
  expireAt?: number | null,
  memberID?: string | null,
  memberId: string,
  memberName?: string | null,
};

export type UpdateCircleVehiclesInput = {
  circleDateOfCreation?: string | null,
  circleID?: string | null,
  circleId: string,
  expireAt?: number | null,
  vehicleID?: string | null,
  vehicleId: string,
  vehicleNumber?: string | null,
};

export type UpdateCityInput = {
  adminID: string,
  circleDateOfCreation?: string | null,
  circleID?: string | null,
  expireAt?: number | null,
  id: string,
  name?: string | null,
};

export type UpdateCustomerInput = {
  adminID: string,
  circleDateOfCreation?: string | null,
  circleID?: string | null,
  cityAdminID?: string | null,
  cityID?: string | null,
  customerStatus?: CustomerStatus | null,
  customers?: Array< CustomerPersonalDetailsInput > | null,
  dateOfCreation?: string | null,
  documents?: CustomerDocumentsInput | null,
  expireAt?: number | null,
  groupName?: string | null,
  guarantorDetails?: string | null,
  id: string,
  installmentPaymentInfo?: InstallmentPaymentDetailsInput | null,
  isGroupLoan?: boolean | null,
  loanSerial?: Array< string | null > | null,
  location?: LocationInput | null,
  newLoanInfo?: NewLoanInformationInput | null,
  oldLoanInfo?: OldLoanDetailsInput | null,
  visitedOn?: string | null,
};

export type UpdateIncomeAndExpenseInput = {
  adminEmailId?: string | null,
  adminID: string,
  amount?: number | null,
  belongsTo?: string | null,
  circleDateOfCreation?: string | null,
  circleID?: string | null,
  date?: string | null,
  description?: string | null,
  expireAt?: number | null,
  id: string,
  incomeOrExpenseType?: IncomeOrExpenseType | null,
  initialAmount?: number | null,
  interestRate?: number | null,
  name?: string | null,
  updatedDate?: string | null,
};

export type UpdateInstallmentInput = {
  adminID: string,
  circleID?: string | null,
  city?: string | null,
  collectionAgentDetails?: CollectionAgentDetailsInput | null,
  customerName?: string | null,
  description?: string | null,
  dueDate?: string | null,
  expireAt?: number | null,
  id: string,
  initialAmount?: number | null,
  installmentAmount?: number | null,
  installmentNumber?: number | null,
  isExtraInstallment?: boolean | null,
  loanAdminID?: string | null,
  loanID?: string | null,
  loanSerial?: string | null,
  paidAmount?: number | null,
  paidDate?: string | null,
  paymentMethod?: PaymentMethod | null,
  status?: InstallmentStatus | null,
  updatedDate?: string | null,
};

export type UpdateLoanInput = {
  adminID: string,
  circleID?: string | null,
  collectibleAmount?: number | null,
  customerAdminID?: string | null,
  customerID?: string | null,
  dateOfCreation?: string | null,
  endDate?: string | null,
  expireAt?: number | null,
  givenAmount?: number | null,
  id: string,
  initialCollectibleAmount?: number | null,
  initialGivenAmount?: number | null,
  installmentAmount?: number | null,
  installmentType?: InstallmentType | null,
  loanSerial?: string | null,
  nextDueDate?: string | null,
  paidAmount?: number | null,
  paidInstallments?: number | null,
  reasonForLoanTermination?: string | null,
  status?: LoanStatus | null,
  totalInstallments?: number | null,
  updatedDate?: string | null,
};

export type UpdateLoanSerialNumberInput = {
  adminID: string,
  circleDateOfCreation?: string | null,
  circleID?: string | null,
  expireAt?: number | null,
  id: string,
  serialNumber?: string | null,
};

export type UpdateMemberInput = {
  adminEmailId?: string | null,
  adminID?: string | null,
  emailId?: string | null,
  expireAt?: number | null,
  id: string,
  lastSeen?: string | null,
  location?: LocationInput | null,
  memberRole?: MemberRole | null,
  name: string,
  phoneNumber?: string | null,
  profilePicUrl?: string | null,
  share?: number | null,
  status?: MemberStatus | null,
};

export type UpdateTransactionInput = {
  additionalInfo?: AdditionalTransactionInfoInput | null,
  adminID: string,
  amount?: number | null,
  circleDateOfCreation?: string | null,
  circleID?: string | null,
  dateTime?: string | null,
  expireAt?: number | null,
  id: string,
  initialAmount?: number | null,
  transactionType?: TransactionType | null,
  updatedDate?: string | null,
};

export type UpdateVehicleInput = {
  adminEmailId?: string | null,
  adminID?: string | null,
  expireAt?: number | null,
  id: string,
  vehicleCapacity?: number | null,
  vehicleColor?: string | null,
  vehicleModel?: string | null,
  vehicleName?: string | null,
  vehicleNumber: string,
  vehiclePicUrl?: string | null,
  vehicleStatus?: VehicleStatus | null,
  vehicleType?: VehicleType | null,
};

export type ModelSubscriptionAdminFilterInput = {
  and?: Array< ModelSubscriptionAdminFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  emailId?: ModelSubscriptionStringInput | null,
  expireAt?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionAdminFilterInput | null > | null,
  owner?: ModelStringInput | null,
  phoneNumber?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionCMSSubscriptionFilterInput = {
  adminID?: ModelSubscriptionStringInput | null,
  amount?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionCMSSubscriptionFilterInput | null > | null,
  circleDateOfCreation?: ModelSubscriptionStringInput | null,
  circleID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  endDate?: ModelSubscriptionStringInput | null,
  expireAt?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  or?: Array< ModelSubscriptionCMSSubscriptionFilterInput | null > | null,
  paymentMethod?: ModelSubscriptionStringInput | null,
  startDate?: ModelSubscriptionStringInput | null,
  transactionID?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionCashAccountFilterInput = {
  adminEmailId?: ModelSubscriptionStringInput | null,
  adminID?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCashAccountFilterInput | null > | null,
  cashflowIn?: ModelSubscriptionIntInput | null,
  cashflowOut?: ModelSubscriptionIntInput | null,
  circleID?: ModelSubscriptionIDInput | null,
  closingBalance?: ModelSubscriptionIntInput | null,
  closingEntryDate?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  expireAt?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  openingBalance?: ModelSubscriptionIntInput | null,
  openingEntryDate?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionCashAccountFilterInput | null > | null,
  outstandingAmount?: ModelSubscriptionIntInput | null,
  simplifiedTransactions?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionCircleFilterInput = {
  adminEmailId?: ModelSubscriptionStringInput | null,
  adminID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionCircleFilterInput | null > | null,
  circleName?: ModelSubscriptionStringInput | null,
  circlePicUrl?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  dateOfCreation?: ModelSubscriptionStringInput | null,
  day?: ModelSubscriptionStringInput | null,
  expireAt?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  isLocked?: ModelSubscriptionBooleanInput | null,
  or?: Array< ModelSubscriptionCircleFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionCircleMembersFilterInput = {
  and?: Array< ModelSubscriptionCircleMembersFilterInput | null > | null,
  circleDateOfCreation?: ModelSubscriptionStringInput | null,
  circleID?: ModelSubscriptionIDInput | null,
  circleId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  expireAt?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  memberID?: ModelSubscriptionIDInput | null,
  memberId?: ModelSubscriptionIDInput | null,
  memberName?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionCircleMembersFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionCircleVehiclesFilterInput = {
  and?: Array< ModelSubscriptionCircleVehiclesFilterInput | null > | null,
  circleDateOfCreation?: ModelSubscriptionStringInput | null,
  circleID?: ModelSubscriptionIDInput | null,
  circleId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  expireAt?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionCircleVehiclesFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  vehicleID?: ModelSubscriptionIDInput | null,
  vehicleId?: ModelSubscriptionIDInput | null,
  vehicleNumber?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionCityFilterInput = {
  adminID?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCityFilterInput | null > | null,
  circleDateOfCreation?: ModelSubscriptionStringInput | null,
  circleID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  expireAt?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionCityFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionCustomerFilterInput = {
  adminID?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCustomerFilterInput | null > | null,
  circleDateOfCreation?: ModelSubscriptionStringInput | null,
  circleID?: ModelSubscriptionIDInput | null,
  cityAdminID?: ModelSubscriptionStringInput | null,
  cityID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  customerStatus?: ModelSubscriptionStringInput | null,
  dateOfCreation?: ModelSubscriptionStringInput | null,
  expireAt?: ModelSubscriptionIntInput | null,
  groupName?: ModelSubscriptionStringInput | null,
  guarantorDetails?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  isGroupLoan?: ModelSubscriptionBooleanInput | null,
  loanSerial?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionCustomerFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  visitedOn?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionIncomeAndExpenseFilterInput = {
  adminEmailId?: ModelSubscriptionStringInput | null,
  adminID?: ModelSubscriptionStringInput | null,
  amount?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionIncomeAndExpenseFilterInput | null > | null,
  belongsTo?: ModelSubscriptionIDInput | null,
  circleDateOfCreation?: ModelSubscriptionStringInput | null,
  circleID?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  expireAt?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  incomeOrExpenseType?: ModelSubscriptionStringInput | null,
  initialAmount?: ModelSubscriptionIntInput | null,
  interestRate?: ModelSubscriptionFloatInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionIncomeAndExpenseFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  updatedDate?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionFloatInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionInstallmentFilterInput = {
  adminID?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionInstallmentFilterInput | null > | null,
  circleID?: ModelSubscriptionIDInput | null,
  city?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  customerName?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  dueDate?: ModelSubscriptionStringInput | null,
  expireAt?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  initialAmount?: ModelSubscriptionIntInput | null,
  installmentAmount?: ModelSubscriptionIntInput | null,
  installmentNumber?: ModelSubscriptionIntInput | null,
  isExtraInstallment?: ModelSubscriptionBooleanInput | null,
  loanAdminID?: ModelSubscriptionStringInput | null,
  loanID?: ModelSubscriptionIDInput | null,
  loanSerial?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionInstallmentFilterInput | null > | null,
  paidAmount?: ModelSubscriptionIntInput | null,
  paidDate?: ModelSubscriptionStringInput | null,
  paymentMethod?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  updatedDate?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionLoanFilterInput = {
  adminID?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionLoanFilterInput | null > | null,
  circleID?: ModelSubscriptionIDInput | null,
  collectibleAmount?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  customerAdminID?: ModelSubscriptionStringInput | null,
  customerID?: ModelSubscriptionIDInput | null,
  dateOfCreation?: ModelSubscriptionStringInput | null,
  endDate?: ModelSubscriptionStringInput | null,
  expireAt?: ModelSubscriptionIntInput | null,
  givenAmount?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  initialCollectibleAmount?: ModelSubscriptionIntInput | null,
  initialGivenAmount?: ModelSubscriptionIntInput | null,
  installmentAmount?: ModelSubscriptionIntInput | null,
  installmentType?: ModelSubscriptionStringInput | null,
  loanSerial?: ModelSubscriptionStringInput | null,
  nextDueDate?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionLoanFilterInput | null > | null,
  paidAmount?: ModelSubscriptionIntInput | null,
  paidInstallments?: ModelSubscriptionIntInput | null,
  reasonForLoanTermination?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  totalInstallments?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  updatedDate?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionLoanSerialNumberFilterInput = {
  adminID?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionLoanSerialNumberFilterInput | null > | null,
  circleDateOfCreation?: ModelSubscriptionStringInput | null,
  circleID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  expireAt?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionLoanSerialNumberFilterInput | null > | null,
  serialNumber?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionMemberFilterInput = {
  adminEmailId?: ModelSubscriptionStringInput | null,
  adminID?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMemberFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  emailId?: ModelSubscriptionStringInput | null,
  expireAt?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  lastSeen?: ModelSubscriptionStringInput | null,
  memberRole?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionMemberFilterInput | null > | null,
  phoneNumber?: ModelSubscriptionStringInput | null,
  profilePicUrl?: ModelSubscriptionStringInput | null,
  share?: ModelSubscriptionIntInput | null,
  status?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionTransactionFilterInput = {
  adminID?: ModelSubscriptionStringInput | null,
  amount?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionTransactionFilterInput | null > | null,
  circleDateOfCreation?: ModelSubscriptionStringInput | null,
  circleID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  dateTime?: ModelSubscriptionStringInput | null,
  expireAt?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  initialAmount?: ModelSubscriptionIntInput | null,
  or?: Array< ModelSubscriptionTransactionFilterInput | null > | null,
  transactionType?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  updatedDate?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionVehicleFilterInput = {
  adminEmailId?: ModelSubscriptionStringInput | null,
  adminID?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionVehicleFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  expireAt?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionVehicleFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  vehicleCapacity?: ModelSubscriptionIntInput | null,
  vehicleColor?: ModelSubscriptionStringInput | null,
  vehicleModel?: ModelSubscriptionStringInput | null,
  vehicleName?: ModelSubscriptionStringInput | null,
  vehicleNumber?: ModelSubscriptionStringInput | null,
  vehiclePicUrl?: ModelSubscriptionStringInput | null,
  vehicleStatus?: ModelSubscriptionStringInput | null,
  vehicleType?: ModelSubscriptionStringInput | null,
};

export type BulkInstallmentPostingQueryVariables = {
  adminId: string,
  agentId: string,
  agentName: string,
  agentPhoneNumber: string,
  bulkLoanDetails: string,
  circleDateofCreation: string,
  circleId: string,
  currentDateTime: string,
  installmentType: string,
};

export type BulkInstallmentPostingQuery = {
  bulkInstallmentPosting?: string | null,
};

export type ByAdminCashQueryVariables = {
  adminEmailId?: ModelStringKeyConditionInput | null,
  adminID: string,
  filter?: ModelCashAccountFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByAdminCashQuery = {
  byAdminCash?:  {
    __typename: "ModelCashAccountConnection",
    items:  Array< {
      __typename: "CashAccount",
      adminEmailId: string,
      adminID: string,
      cashflowIn: number,
      cashflowOut: number,
      circleID: string,
      closingBalance: number,
      closingEntryDate: string,
      createdAt: string,
      description?: string | null,
      expireAt?: number | null,
      id: string,
      openingBalance: number,
      openingEntryDate: string,
      outstandingAmount: number,
      simplifiedTransactions: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByAdminCirclesQueryVariables = {
  adminEmailId?: ModelStringKeyConditionInput | null,
  adminID: string,
  filter?: ModelCircleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByAdminCirclesQuery = {
  byAdminCircles?:  {
    __typename: "ModelCircleConnection",
    items:  Array< {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByAdminIDQueryVariables = {
  adminEmailId?: ModelStringKeyConditionInput | null,
  adminID: string,
  filter?: ModelIncomeAndExpenseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByAdminIDQuery = {
  byAdminID?:  {
    __typename: "ModelIncomeAndExpenseConnection",
    items:  Array< {
      __typename: "IncomeAndExpense",
      adminEmailId: string,
      adminID: string,
      amount: number,
      belongsTo: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      date: string,
      description: string,
      expireAt?: number | null,
      id: string,
      incomeOrExpenseType: IncomeOrExpenseType,
      initialAmount?: number | null,
      interestRate?: number | null,
      name: string,
      updatedAt: string,
      updatedDate?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByAdminMembersQueryVariables = {
  adminEmailId?: ModelStringKeyConditionInput | null,
  adminID: string,
  filter?: ModelMemberFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByAdminMembersQuery = {
  byAdminMembers?:  {
    __typename: "ModelMemberConnection",
    items:  Array< {
      __typename: "Member",
      adminEmailId: string,
      adminID: string,
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      lastSeen?: string | null,
      memberRole: MemberRole,
      name: string,
      phoneNumber: string,
      profilePicUrl?: string | null,
      share?: number | null,
      status: MemberStatus,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByAdminTransactionQueryVariables = {
  adminID: string,
  dateTime?: ModelStringKeyConditionInput | null,
  filter?: ModelTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByAdminTransactionQuery = {
  byAdminTransaction?:  {
    __typename: "ModelTransactionConnection",
    items:  Array< {
      __typename: "Transaction",
      adminID: string,
      amount: number,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      dateTime: string,
      expireAt?: number | null,
      id: string,
      initialAmount?: number | null,
      transactionType: TransactionType,
      updatedAt: string,
      updatedDate?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByAdminVehiclesQueryVariables = {
  adminEmailId?: ModelStringKeyConditionInput | null,
  adminID: string,
  filter?: ModelVehicleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByAdminVehiclesQuery = {
  byAdminVehicles?:  {
    __typename: "ModelVehicleConnection",
    items:  Array< {
      __typename: "Vehicle",
      adminEmailId: string,
      adminID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      updatedAt: string,
      vehicleCapacity?: number | null,
      vehicleColor: string,
      vehicleModel?: string | null,
      vehicleName: string,
      vehicleNumber: string,
      vehiclePicUrl?: string | null,
      vehicleStatus: VehicleStatus,
      vehicleType: VehicleType,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByCircleCashQueryVariables = {
  circleID: string,
  closingEntryDate?: ModelStringKeyConditionInput | null,
  filter?: ModelCashAccountFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByCircleCashQuery = {
  byCircleCash?:  {
    __typename: "ModelCashAccountConnection",
    items:  Array< {
      __typename: "CashAccount",
      adminEmailId: string,
      adminID: string,
      cashflowIn: number,
      cashflowOut: number,
      circleID: string,
      closingBalance: number,
      closingEntryDate: string,
      createdAt: string,
      description?: string | null,
      expireAt?: number | null,
      id: string,
      openingBalance: number,
      openingEntryDate: string,
      outstandingAmount: number,
      simplifiedTransactions: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByCircleCityQueryVariables = {
  circleDateOfCreation?: ModelStringKeyConditionInput | null,
  circleID: string,
  filter?: ModelCityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByCircleCityQuery = {
  byCircleCity?:  {
    __typename: "ModelCityConnection",
    items:  Array< {
      __typename: "City",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      name: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByCircleCustomerQueryVariables = {
  circleDateOfCreation?: ModelStringKeyConditionInput | null,
  circleID: string,
  filter?: ModelCustomerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByCircleCustomerQuery = {
  byCircleCustomer?:  {
    __typename: "ModelCustomerConnection",
    items:  Array< {
      __typename: "Customer",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      cityAdminID: string,
      cityID: string,
      createdAt: string,
      customerStatus?: CustomerStatus | null,
      dateOfCreation: string,
      expireAt?: number | null,
      groupName?: string | null,
      guarantorDetails?: string | null,
      id: string,
      isGroupLoan: boolean,
      loanSerial: Array< string | null >,
      updatedAt: string,
      visitedOn?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByCircleIDQueryVariables = {
  circleDateOfCreation?: ModelStringKeyConditionInput | null,
  circleID: string,
  filter?: ModelIncomeAndExpenseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByCircleIDQuery = {
  byCircleID?:  {
    __typename: "ModelIncomeAndExpenseConnection",
    items:  Array< {
      __typename: "IncomeAndExpense",
      adminEmailId: string,
      adminID: string,
      amount: number,
      belongsTo: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      date: string,
      description: string,
      expireAt?: number | null,
      id: string,
      incomeOrExpenseType: IncomeOrExpenseType,
      initialAmount?: number | null,
      interestRate?: number | null,
      name: string,
      updatedAt: string,
      updatedDate?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByCircleLoanSerialNumberQueryVariables = {
  circleDateOfCreation?: ModelStringKeyConditionInput | null,
  circleID: string,
  filter?: ModelLoanSerialNumberFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByCircleLoanSerialNumberQuery = {
  byCircleLoanSerialNumber?:  {
    __typename: "ModelLoanSerialNumberConnection",
    items:  Array< {
      __typename: "LoanSerialNumber",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      serialNumber: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByCircleMemberQueryVariables = {
  circleDateOfCreation?: ModelStringKeyConditionInput | null,
  circleID: string,
  filter?: ModelCircleMembersFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByCircleMemberQuery = {
  byCircleMember?:  {
    __typename: "ModelCircleMembersConnection",
    items:  Array< {
      __typename: "CircleMembers",
      circleDateOfCreation: string,
      circleID: string,
      circleId: string,
      createdAt: string,
      expireAt?: number | null,
      memberID: string,
      memberId: string,
      memberName: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByCircleSubscriptionQueryVariables = {
  circleDateOfCreation?: ModelStringKeyConditionInput | null,
  circleID: string,
  filter?: ModelCMSSubscriptionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByCircleSubscriptionQuery = {
  byCircleSubscription?:  {
    __typename: "ModelCMSSubscriptionConnection",
    items:  Array< {
      __typename: "CMSSubscription",
      adminID: string,
      amount: number,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      endDate: string,
      expireAt?: number | null,
      id: string,
      isActive: boolean,
      paymentMethod?: PaymentMethod | null,
      startDate: string,
      transactionID?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByCircleTransactionQueryVariables = {
  circleDateOfCreation?: ModelStringKeyConditionInput | null,
  circleID: string,
  filter?: ModelTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByCircleTransactionQuery = {
  byCircleTransaction?:  {
    __typename: "ModelTransactionConnection",
    items:  Array< {
      __typename: "Transaction",
      adminID: string,
      amount: number,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      dateTime: string,
      expireAt?: number | null,
      id: string,
      initialAmount?: number | null,
      transactionType: TransactionType,
      updatedAt: string,
      updatedDate?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByCircleVehicleQueryVariables = {
  circleDateOfCreation?: ModelStringKeyConditionInput | null,
  circleID: string,
  filter?: ModelCircleVehiclesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByCircleVehicleQuery = {
  byCircleVehicle?:  {
    __typename: "ModelCircleVehiclesConnection",
    items:  Array< {
      __typename: "CircleVehicles",
      circleDateOfCreation: string,
      circleID: string,
      circleId: string,
      createdAt: string,
      expireAt?: number | null,
      updatedAt: string,
      vehicleID: string,
      vehicleId: string,
      vehicleNumber: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByCityCustomerQueryVariables = {
  cityAdminID?: ModelStringKeyConditionInput | null,
  cityID: string,
  filter?: ModelCustomerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByCityCustomerQuery = {
  byCityCustomer?:  {
    __typename: "ModelCustomerConnection",
    items:  Array< {
      __typename: "Customer",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      cityAdminID: string,
      cityID: string,
      createdAt: string,
      customerStatus?: CustomerStatus | null,
      dateOfCreation: string,
      expireAt?: number | null,
      groupName?: string | null,
      guarantorDetails?: string | null,
      id: string,
      isGroupLoan: boolean,
      loanSerial: Array< string | null >,
      updatedAt: string,
      visitedOn?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByCustomerLoanQueryVariables = {
  customerAdminID?: ModelStringKeyConditionInput | null,
  customerID: string,
  filter?: ModelLoanFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByCustomerLoanQuery = {
  byCustomerLoan?:  {
    __typename: "ModelLoanConnection",
    items:  Array< {
      __typename: "Loan",
      adminID: string,
      circleID: string,
      collectibleAmount: number,
      createdAt: string,
      customerAdminID?: string | null,
      customerID?: string | null,
      dateOfCreation: string,
      endDate: string,
      expireAt?: number | null,
      givenAmount: number,
      id: string,
      initialCollectibleAmount?: number | null,
      initialGivenAmount?: number | null,
      installmentAmount: number,
      installmentType: InstallmentType,
      loanSerial: string,
      nextDueDate: string,
      paidAmount: number,
      paidInstallments: number,
      reasonForLoanTermination?: string | null,
      status: LoanStatus,
      totalInstallments: number,
      updatedAt: string,
      updatedDate?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByLoanInstallmentQueryVariables = {
  filter?: ModelInstallmentFilterInput | null,
  limit?: number | null,
  loanAdminID?: ModelStringKeyConditionInput | null,
  loanID: string,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByLoanInstallmentQuery = {
  byLoanInstallment?:  {
    __typename: "ModelInstallmentConnection",
    items:  Array< {
      __typename: "Installment",
      adminID: string,
      circleID: string,
      city: string,
      createdAt: string,
      customerName: string,
      description?: string | null,
      dueDate: string,
      expireAt?: number | null,
      id: string,
      initialAmount?: number | null,
      installmentAmount: number,
      installmentNumber: number,
      isExtraInstallment?: boolean | null,
      loanAdminID: string,
      loanID: string,
      loanSerial: string,
      paidAmount?: number | null,
      paidDate?: string | null,
      paymentMethod?: PaymentMethod | null,
      status: InstallmentStatus,
      updatedAt: string,
      updatedDate?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByMemberCircleQueryVariables = {
  filter?: ModelCircleMembersFilterInput | null,
  limit?: number | null,
  memberID: string,
  memberName?: ModelStringKeyConditionInput | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByMemberCircleQuery = {
  byMemberCircle?:  {
    __typename: "ModelCircleMembersConnection",
    items:  Array< {
      __typename: "CircleMembers",
      circleDateOfCreation: string,
      circleID: string,
      circleId: string,
      createdAt: string,
      expireAt?: number | null,
      memberID: string,
      memberId: string,
      memberName: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByMembersIDQueryVariables = {
  belongsTo: string,
  date?: ModelStringKeyConditionInput | null,
  filter?: ModelIncomeAndExpenseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ByMembersIDQuery = {
  byMembersID?:  {
    __typename: "ModelIncomeAndExpenseConnection",
    items:  Array< {
      __typename: "IncomeAndExpense",
      adminEmailId: string,
      adminID: string,
      amount: number,
      belongsTo: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      date: string,
      description: string,
      expireAt?: number | null,
      id: string,
      incomeOrExpenseType: IncomeOrExpenseType,
      initialAmount?: number | null,
      interestRate?: number | null,
      name: string,
      updatedAt: string,
      updatedDate?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ByVehicleCircleQueryVariables = {
  filter?: ModelCircleVehiclesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  vehicleID: string,
  vehicleNumber?: ModelStringKeyConditionInput | null,
};

export type ByVehicleCircleQuery = {
  byVehicleCircle?:  {
    __typename: "ModelCircleVehiclesConnection",
    items:  Array< {
      __typename: "CircleVehicles",
      circleDateOfCreation: string,
      circleID: string,
      circleId: string,
      createdAt: string,
      expireAt?: number | null,
      updatedAt: string,
      vehicleID: string,
      vehicleId: string,
      vehicleNumber: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAdminQueryVariables = {
  emailId: string,
  id: string,
};

export type GetAdminQuery = {
  getAdmin?:  {
    __typename: "Admin",
    businessInformation?:  {
      __typename: "BusinessInformation",
      businessAddress: string,
      businessEmail?: string | null,
      businessName: string,
      businessPhoneNumber: string,
      licenseNumber?: string | null,
      profilepPicUrl?: string | null,
      regulatoryBody?: string | null,
    } | null,
    cashAccount?:  {
      __typename: "ModelCashAccountConnection",
      nextToken?: string | null,
    } | null,
    circles?:  {
      __typename: "ModelCircleConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    emailId: string,
    expireAt?: number | null,
    id: string,
    incomeAndExpense?:  {
      __typename: "ModelIncomeAndExpenseConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelMemberConnection",
      nextToken?: string | null,
    } | null,
    name: string,
    owner: string,
    phoneNumber: string,
    updatedAt: string,
    vehicles?:  {
      __typename: "ModelVehicleConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type GetCMSSubscriptionQueryVariables = {
  adminID: string,
  id: string,
};

export type GetCMSSubscriptionQuery = {
  getCMSSubscription?:  {
    __typename: "CMSSubscription",
    adminID: string,
    amount: number,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    endDate: string,
    expireAt?: number | null,
    id: string,
    isActive: boolean,
    paymentMethod?: PaymentMethod | null,
    startDate: string,
    transactionID?: string | null,
    updatedAt: string,
  } | null,
};

export type GetCashAccountQueryVariables = {
  id: string,
};

export type GetCashAccountQuery = {
  getCashAccount?:  {
    __typename: "CashAccount",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    cashflowIn: number,
    cashflowOut: number,
    circleID: string,
    closingBalance: number,
    closingEntryDate: string,
    closingSnapshot:  {
      __typename: "ClosingSnapshot",
      chits: number,
      deficit: number,
      excessCollection: number,
      expenses: number,
      incomes: number,
      interest: number,
      investments: number,
      loansGiven: number,
      repayments: number,
      withdrawals: number,
    },
    createdAt: string,
    description?: string | null,
    expireAt?: number | null,
    id: string,
    openingBalance: number,
    openingEntryDate: string,
    outstandingAmount: number,
    simplifiedTransactions: string,
    updatedAt: string,
  } | null,
};

export type GetCircleQueryVariables = {
  dateOfCreation: string,
  id: string,
};

export type GetCircleQuery = {
  getCircle?:  {
    __typename: "Circle",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circleName: string,
    circlePicUrl?: string | null,
    cities?:  {
      __typename: "ModelCityConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    customers?:  {
      __typename: "ModelCustomerConnection",
      nextToken?: string | null,
    } | null,
    dateOfCreation: string,
    day: Weekday,
    expireAt?: number | null,
    id: string,
    incomeAndExpenses?:  {
      __typename: "ModelIncomeAndExpenseConnection",
      nextToken?: string | null,
    } | null,
    isLocked?: boolean | null,
    loanSerialNumber?:  {
      __typename: "LoanSerialNumber",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      serialNumber: string,
      updatedAt: string,
    } | null,
    members?:  {
      __typename: "ModelCircleMembersConnection",
      nextToken?: string | null,
    } | null,
    subscription?:  {
      __typename: "CMSSubscription",
      adminID: string,
      amount: number,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      endDate: string,
      expireAt?: number | null,
      id: string,
      isActive: boolean,
      paymentMethod?: PaymentMethod | null,
      startDate: string,
      transactionID?: string | null,
      updatedAt: string,
    } | null,
    transactions?:  {
      __typename: "ModelTransactionConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    vehicles?:  {
      __typename: "ModelCircleVehiclesConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type GetCircleMembersQueryVariables = {
  circleId: string,
  memberId: string,
};

export type GetCircleMembersQuery = {
  getCircleMembers?:  {
    __typename: "CircleMembers",
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    circleId: string,
    createdAt: string,
    expireAt?: number | null,
    member?:  {
      __typename: "Member",
      adminEmailId: string,
      adminID: string,
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      lastSeen?: string | null,
      memberRole: MemberRole,
      name: string,
      phoneNumber: string,
      profilePicUrl?: string | null,
      share?: number | null,
      status: MemberStatus,
      updatedAt: string,
    } | null,
    memberID: string,
    memberId: string,
    memberName: string,
    updatedAt: string,
  } | null,
};

export type GetCircleVehiclesQueryVariables = {
  circleId: string,
  vehicleId: string,
};

export type GetCircleVehiclesQuery = {
  getCircleVehicles?:  {
    __typename: "CircleVehicles",
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    circleId: string,
    createdAt: string,
    expireAt?: number | null,
    updatedAt: string,
    vehicle?:  {
      __typename: "Vehicle",
      adminEmailId: string,
      adminID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      updatedAt: string,
      vehicleCapacity?: number | null,
      vehicleColor: string,
      vehicleModel?: string | null,
      vehicleName: string,
      vehicleNumber: string,
      vehiclePicUrl?: string | null,
      vehicleStatus: VehicleStatus,
      vehicleType: VehicleType,
    } | null,
    vehicleID: string,
    vehicleId: string,
    vehicleNumber: string,
  } | null,
};

export type GetCityQueryVariables = {
  adminID: string,
  id: string,
};

export type GetCityQuery = {
  getCity?:  {
    __typename: "City",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    customers?:  {
      __typename: "ModelCustomerConnection",
      nextToken?: string | null,
    } | null,
    expireAt?: number | null,
    id: string,
    name: string,
    updatedAt: string,
  } | null,
};

export type GetCustomerQueryVariables = {
  adminID: string,
  id: string,
};

export type GetCustomerQuery = {
  getCustomer?:  {
    __typename: "Customer",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    city?:  {
      __typename: "City",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    cityAdminID: string,
    cityID: string,
    createdAt: string,
    customerStatus?: CustomerStatus | null,
    customers:  Array< {
      __typename: "CustomerPersonalDetails",
      address: string,
      customerName: string,
      customerPicUrl?: string | null,
      phone: string,
      uId: string,
    } >,
    dateOfCreation: string,
    documents?:  {
      __typename: "CustomerDocuments",
      addressProof?: boolean | null,
      addressProofType?: CustomerDocumentsAddressProofType | null,
      documentsVerifiedAt?: string | null,
      documentsVerifiedBy?: string | null,
      emptyCheque?: boolean | null,
      emptyChequeNumber?: string | null,
      idProof?: boolean | null,
      idProofType?: CustomerDocumentsIdProofType | null,
      otherDocuments?: Array< string | null > | null,
      photographSubmitted?: boolean | null,
      promissoryNote?: boolean | null,
      promissoryNoteNumber?: string | null,
      remarks?: string | null,
    } | null,
    expireAt?: number | null,
    groupName?: string | null,
    guarantorDetails?: string | null,
    id: string,
    installmentPaymentInfo?:  {
      __typename: "InstallmentPaymentDetails",
      installmentAmount: number,
      installmentID: string,
      loanSerial: string,
      paidAmount: number,
      paidDate: string,
    } | null,
    isGroupLoan: boolean,
    loanSerial: Array< string | null >,
    loans?:  {
      __typename: "ModelLoanConnection",
      nextToken?: string | null,
    } | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    newLoanInfo?:  {
      __typename: "NewLoanInformation",
      givenDate: string,
      loanID: string,
      loanSerial: string,
      totalGivenAmount: number,
    } | null,
    oldLoanInfo?:  {
      __typename: "OldLoanDetails",
      closedDate: string,
      loanID: string,
      loanSerial: string,
      totalCollectedAmount: number,
    } | null,
    updatedAt: string,
    visitedOn?: string | null,
  } | null,
};

export type GetIncomeAndExpenseQueryVariables = {
  adminID: string,
  id: string,
};

export type GetIncomeAndExpenseQuery = {
  getIncomeAndExpense?:  {
    __typename: "IncomeAndExpense",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    amount: number,
    belongsTo: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    date: string,
    description: string,
    expireAt?: number | null,
    id: string,
    incomeOrExpenseType: IncomeOrExpenseType,
    initialAmount?: number | null,
    interestRate?: number | null,
    name: string,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type GetInstallmentQueryVariables = {
  adminID: string,
  id: string,
};

export type GetInstallmentQuery = {
  getInstallment?:  {
    __typename: "Installment",
    adminID: string,
    circleID: string,
    city: string,
    collectionAgentDetails?:  {
      __typename: "CollectionAgentDetails",
      agentID: string,
      name: string,
      phoneNumber: string,
    } | null,
    createdAt: string,
    customerName: string,
    description?: string | null,
    dueDate: string,
    expireAt?: number | null,
    id: string,
    initialAmount?: number | null,
    installmentAmount: number,
    installmentNumber: number,
    isExtraInstallment?: boolean | null,
    loan?:  {
      __typename: "Loan",
      adminID: string,
      circleID: string,
      collectibleAmount: number,
      createdAt: string,
      customerAdminID?: string | null,
      customerID?: string | null,
      dateOfCreation: string,
      endDate: string,
      expireAt?: number | null,
      givenAmount: number,
      id: string,
      initialCollectibleAmount?: number | null,
      initialGivenAmount?: number | null,
      installmentAmount: number,
      installmentType: InstallmentType,
      loanSerial: string,
      nextDueDate: string,
      paidAmount: number,
      paidInstallments: number,
      reasonForLoanTermination?: string | null,
      status: LoanStatus,
      totalInstallments: number,
      updatedAt: string,
      updatedDate?: string | null,
    } | null,
    loanAdminID: string,
    loanID: string,
    loanSerial: string,
    paidAmount?: number | null,
    paidDate?: string | null,
    paymentMethod?: PaymentMethod | null,
    status: InstallmentStatus,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type GetLoanQueryVariables = {
  adminID: string,
  id: string,
};

export type GetLoanQuery = {
  getLoan?:  {
    __typename: "Loan",
    adminID: string,
    circleID: string,
    collectibleAmount: number,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      cityAdminID: string,
      cityID: string,
      createdAt: string,
      customerStatus?: CustomerStatus | null,
      dateOfCreation: string,
      expireAt?: number | null,
      groupName?: string | null,
      guarantorDetails?: string | null,
      id: string,
      isGroupLoan: boolean,
      loanSerial: Array< string | null >,
      updatedAt: string,
      visitedOn?: string | null,
    } | null,
    customerAdminID?: string | null,
    customerID?: string | null,
    dateOfCreation: string,
    endDate: string,
    expireAt?: number | null,
    givenAmount: number,
    id: string,
    initialCollectibleAmount?: number | null,
    initialGivenAmount?: number | null,
    installmentAmount: number,
    installmentType: InstallmentType,
    installments?:  {
      __typename: "ModelInstallmentConnection",
      nextToken?: string | null,
    } | null,
    loanSerial: string,
    nextDueDate: string,
    paidAmount: number,
    paidInstallments: number,
    reasonForLoanTermination?: string | null,
    status: LoanStatus,
    totalInstallments: number,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type GetLoanSerialNumberQueryVariables = {
  adminID: string,
  id: string,
};

export type GetLoanSerialNumberQuery = {
  getLoanSerialNumber?:  {
    __typename: "LoanSerialNumber",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    expireAt?: number | null,
    id: string,
    serialNumber: string,
    updatedAt: string,
  } | null,
};

export type GetMemberQueryVariables = {
  id: string,
  name: string,
};

export type GetMemberQuery = {
  getMember?:  {
    __typename: "Member",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circle?:  {
      __typename: "ModelCircleMembersConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    emailId: string,
    expireAt?: number | null,
    id: string,
    lastSeen?: string | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    memberRole: MemberRole,
    name: string,
    phoneNumber: string,
    profilePicUrl?: string | null,
    share?: number | null,
    status: MemberStatus,
    updatedAt: string,
  } | null,
};

export type GetTransactionQueryVariables = {
  adminID: string,
  id: string,
};

export type GetTransactionQuery = {
  getTransaction?:  {
    __typename: "Transaction",
    additionalInfo:  {
      __typename: "AdditionalTransactionInfo",
      city?: string | null,
      customerName?: string | null,
      description: string,
      loanId?: string | null,
      loanSerial?: string | null,
      memberID?: string | null,
      memberName?: string | null,
      oldLoanAmount?: number | null,
      oldLoanSerial?: string | null,
      paymentMethod: PaymentMethod,
      totalOutstandingAmount?: number | null,
      transactionEvent: TransactionEventType,
    },
    adminID: string,
    amount: number,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    dateTime: string,
    expireAt?: number | null,
    id: string,
    initialAmount?: number | null,
    transactionType: TransactionType,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type GetVehicleQueryVariables = {
  id: string,
  vehicleNumber: string,
};

export type GetVehicleQuery = {
  getVehicle?:  {
    __typename: "Vehicle",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circles?:  {
      __typename: "ModelCircleVehiclesConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    expireAt?: number | null,
    id: string,
    updatedAt: string,
    vehicleCapacity?: number | null,
    vehicleColor: string,
    vehicleModel?: string | null,
    vehicleName: string,
    vehicleNumber: string,
    vehiclePicUrl?: string | null,
    vehicleStatus: VehicleStatus,
    vehicleType: VehicleType,
  } | null,
};

export type InstallmentByCircleAndPaidDateQueryVariables = {
  circleID: string,
  filter?: ModelInstallmentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  paidDate?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
};

export type InstallmentByCircleAndPaidDateQuery = {
  installmentByCircleAndPaidDate?:  {
    __typename: "ModelInstallmentConnection",
    items:  Array< {
      __typename: "Installment",
      adminID: string,
      circleID: string,
      city: string,
      createdAt: string,
      customerName: string,
      description?: string | null,
      dueDate: string,
      expireAt?: number | null,
      id: string,
      initialAmount?: number | null,
      installmentAmount: number,
      installmentNumber: number,
      isExtraInstallment?: boolean | null,
      loanAdminID: string,
      loanID: string,
      loanSerial: string,
      paidAmount?: number | null,
      paidDate?: string | null,
      paymentMethod?: PaymentMethod | null,
      status: InstallmentStatus,
      updatedAt: string,
      updatedDate?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListAdminsQueryVariables = {
  emailId?: ModelStringKeyConditionInput | null,
  filter?: ModelAdminFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListAdminsQuery = {
  listAdmins?:  {
    __typename: "ModelAdminConnection",
    items:  Array< {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCMSSubscriptionsQueryVariables = {
  adminID?: ModelStringKeyConditionInput | null,
  filter?: ModelCMSSubscriptionFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCMSSubscriptionsQuery = {
  listCMSSubscriptions?:  {
    __typename: "ModelCMSSubscriptionConnection",
    items:  Array< {
      __typename: "CMSSubscription",
      adminID: string,
      amount: number,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      endDate: string,
      expireAt?: number | null,
      id: string,
      isActive: boolean,
      paymentMethod?: PaymentMethod | null,
      startDate: string,
      transactionID?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCashAccountsQueryVariables = {
  filter?: ModelCashAccountFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCashAccountsQuery = {
  listCashAccounts?:  {
    __typename: "ModelCashAccountConnection",
    items:  Array< {
      __typename: "CashAccount",
      adminEmailId: string,
      adminID: string,
      cashflowIn: number,
      cashflowOut: number,
      circleID: string,
      closingBalance: number,
      closingEntryDate: string,
      createdAt: string,
      description?: string | null,
      expireAt?: number | null,
      id: string,
      openingBalance: number,
      openingEntryDate: string,
      outstandingAmount: number,
      simplifiedTransactions: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCircleMembersQueryVariables = {
  circleId?: string | null,
  filter?: ModelCircleMembersFilterInput | null,
  limit?: number | null,
  memberId?: ModelIDKeyConditionInput | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCircleMembersQuery = {
  listCircleMembers?:  {
    __typename: "ModelCircleMembersConnection",
    items:  Array< {
      __typename: "CircleMembers",
      circleDateOfCreation: string,
      circleID: string,
      circleId: string,
      createdAt: string,
      expireAt?: number | null,
      memberID: string,
      memberId: string,
      memberName: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCircleVehiclesQueryVariables = {
  circleId?: string | null,
  filter?: ModelCircleVehiclesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  vehicleId?: ModelIDKeyConditionInput | null,
};

export type ListCircleVehiclesQuery = {
  listCircleVehicles?:  {
    __typename: "ModelCircleVehiclesConnection",
    items:  Array< {
      __typename: "CircleVehicles",
      circleDateOfCreation: string,
      circleID: string,
      circleId: string,
      createdAt: string,
      expireAt?: number | null,
      updatedAt: string,
      vehicleID: string,
      vehicleId: string,
      vehicleNumber: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCirclesQueryVariables = {
  dateOfCreation?: ModelStringKeyConditionInput | null,
  filter?: ModelCircleFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCirclesQuery = {
  listCircles?:  {
    __typename: "ModelCircleConnection",
    items:  Array< {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCitiesQueryVariables = {
  adminID?: ModelStringKeyConditionInput | null,
  filter?: ModelCityFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCitiesQuery = {
  listCities?:  {
    __typename: "ModelCityConnection",
    items:  Array< {
      __typename: "City",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      name: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCustomersQueryVariables = {
  adminID?: ModelStringKeyConditionInput | null,
  filter?: ModelCustomerFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCustomersQuery = {
  listCustomers?:  {
    __typename: "ModelCustomerConnection",
    items:  Array< {
      __typename: "Customer",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      cityAdminID: string,
      cityID: string,
      createdAt: string,
      customerStatus?: CustomerStatus | null,
      dateOfCreation: string,
      expireAt?: number | null,
      groupName?: string | null,
      guarantorDetails?: string | null,
      id: string,
      isGroupLoan: boolean,
      loanSerial: Array< string | null >,
      updatedAt: string,
      visitedOn?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListIncomeAndExpensesQueryVariables = {
  adminID?: ModelStringKeyConditionInput | null,
  filter?: ModelIncomeAndExpenseFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListIncomeAndExpensesQuery = {
  listIncomeAndExpenses?:  {
    __typename: "ModelIncomeAndExpenseConnection",
    items:  Array< {
      __typename: "IncomeAndExpense",
      adminEmailId: string,
      adminID: string,
      amount: number,
      belongsTo: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      date: string,
      description: string,
      expireAt?: number | null,
      id: string,
      incomeOrExpenseType: IncomeOrExpenseType,
      initialAmount?: number | null,
      interestRate?: number | null,
      name: string,
      updatedAt: string,
      updatedDate?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListInstallmentsQueryVariables = {
  adminID?: ModelStringKeyConditionInput | null,
  filter?: ModelInstallmentFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListInstallmentsQuery = {
  listInstallments?:  {
    __typename: "ModelInstallmentConnection",
    items:  Array< {
      __typename: "Installment",
      adminID: string,
      circleID: string,
      city: string,
      createdAt: string,
      customerName: string,
      description?: string | null,
      dueDate: string,
      expireAt?: number | null,
      id: string,
      initialAmount?: number | null,
      installmentAmount: number,
      installmentNumber: number,
      isExtraInstallment?: boolean | null,
      loanAdminID: string,
      loanID: string,
      loanSerial: string,
      paidAmount?: number | null,
      paidDate?: string | null,
      paymentMethod?: PaymentMethod | null,
      status: InstallmentStatus,
      updatedAt: string,
      updatedDate?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListLoanSerialNumbersQueryVariables = {
  adminID?: ModelStringKeyConditionInput | null,
  filter?: ModelLoanSerialNumberFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListLoanSerialNumbersQuery = {
  listLoanSerialNumbers?:  {
    __typename: "ModelLoanSerialNumberConnection",
    items:  Array< {
      __typename: "LoanSerialNumber",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      serialNumber: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListLoansQueryVariables = {
  adminID?: ModelStringKeyConditionInput | null,
  filter?: ModelLoanFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListLoansQuery = {
  listLoans?:  {
    __typename: "ModelLoanConnection",
    items:  Array< {
      __typename: "Loan",
      adminID: string,
      circleID: string,
      collectibleAmount: number,
      createdAt: string,
      customerAdminID?: string | null,
      customerID?: string | null,
      dateOfCreation: string,
      endDate: string,
      expireAt?: number | null,
      givenAmount: number,
      id: string,
      initialCollectibleAmount?: number | null,
      initialGivenAmount?: number | null,
      installmentAmount: number,
      installmentType: InstallmentType,
      loanSerial: string,
      nextDueDate: string,
      paidAmount: number,
      paidInstallments: number,
      reasonForLoanTermination?: string | null,
      status: LoanStatus,
      totalInstallments: number,
      updatedAt: string,
      updatedDate?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMembersQueryVariables = {
  filter?: ModelMemberFilterInput | null,
  id?: string | null,
  limit?: number | null,
  name?: ModelStringKeyConditionInput | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListMembersQuery = {
  listMembers?:  {
    __typename: "ModelMemberConnection",
    items:  Array< {
      __typename: "Member",
      adminEmailId: string,
      adminID: string,
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      lastSeen?: string | null,
      memberRole: MemberRole,
      name: string,
      phoneNumber: string,
      profilePicUrl?: string | null,
      share?: number | null,
      status: MemberStatus,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListTransactionsQueryVariables = {
  adminID?: ModelStringKeyConditionInput | null,
  filter?: ModelTransactionFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListTransactionsQuery = {
  listTransactions?:  {
    __typename: "ModelTransactionConnection",
    items:  Array< {
      __typename: "Transaction",
      adminID: string,
      amount: number,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      dateTime: string,
      expireAt?: number | null,
      id: string,
      initialAmount?: number | null,
      transactionType: TransactionType,
      updatedAt: string,
      updatedDate?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListVehiclesQueryVariables = {
  filter?: ModelVehicleFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  vehicleNumber?: ModelStringKeyConditionInput | null,
};

export type ListVehiclesQuery = {
  listVehicles?:  {
    __typename: "ModelVehicleConnection",
    items:  Array< {
      __typename: "Vehicle",
      adminEmailId: string,
      adminID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      updatedAt: string,
      vehicleCapacity?: number | null,
      vehicleColor: string,
      vehicleModel?: string | null,
      vehicleName: string,
      vehicleNumber: string,
      vehiclePicUrl?: string | null,
      vehicleStatus: VehicleStatus,
      vehicleType: VehicleType,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type LoanByCircleAndDateQueryVariables = {
  circleID: string,
  dateOfCreation?: ModelStringKeyConditionInput | null,
  filter?: ModelLoanFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type LoanByCircleAndDateQuery = {
  loanByCircleAndDate?:  {
    __typename: "ModelLoanConnection",
    items:  Array< {
      __typename: "Loan",
      adminID: string,
      circleID: string,
      collectibleAmount: number,
      createdAt: string,
      customerAdminID?: string | null,
      customerID?: string | null,
      dateOfCreation: string,
      endDate: string,
      expireAt?: number | null,
      givenAmount: number,
      id: string,
      initialCollectibleAmount?: number | null,
      initialGivenAmount?: number | null,
      installmentAmount: number,
      installmentType: InstallmentType,
      loanSerial: string,
      nextDueDate: string,
      paidAmount: number,
      paidInstallments: number,
      reasonForLoanTermination?: string | null,
      status: LoanStatus,
      totalInstallments: number,
      updatedAt: string,
      updatedDate?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ManageLoanExpiryQueryVariables = {
  adminId: string,
  closingLoanSerial: string,
  closingReason: string,
  customerId: string,
  endDate: string,
  expireAt: number,
  loanId: string,
  totalCollectedAmount: number,
  updatedSerialNumbers: Array< string | null >,
};

export type ManageLoanExpiryQuery = {
  manageLoanExpiry?: string | null,
};

export type ManageSubscriptionQueryVariables = {
  adminId: string,
  amount: number,
  circleDateofCreation: string,
  circleId: string,
  endDate: string,
  isActive: boolean,
  paymentMethod: string,
  startDate: string,
  transactionID?: string | null,
};

export type ManageSubscriptionQuery = {
  manageSubscription?: string | null,
};

export type AddUserToGroupMutationVariables = {
  groupName: string,
  userId: string,
};

export type AddUserToGroupMutation = {
  addUserToGroup?: string | null,
};

export type AdditionalLoanCreationMutationVariables = {
  adminId: string,
  agentDetails: string,
  circleDateofCreation: string,
  circleId: string,
  dateTime: string,
  installmentJson?: string | null,
  isNewLoan: boolean,
  loanSerialNumberJson: string,
  loanTransactionJson: string,
  newLoanJson: string,
  updatedCustomerJson: string,
};

export type AdditionalLoanCreationMutation = {
  additionalLoanCreation?: string | null,
};

export type CreateAdminMutationVariables = {
  condition?: ModelAdminConditionInput | null,
  input: CreateAdminInput,
};

export type CreateAdminMutation = {
  createAdmin?:  {
    __typename: "Admin",
    businessInformation?:  {
      __typename: "BusinessInformation",
      businessAddress: string,
      businessEmail?: string | null,
      businessName: string,
      businessPhoneNumber: string,
      licenseNumber?: string | null,
      profilepPicUrl?: string | null,
      regulatoryBody?: string | null,
    } | null,
    cashAccount?:  {
      __typename: "ModelCashAccountConnection",
      nextToken?: string | null,
    } | null,
    circles?:  {
      __typename: "ModelCircleConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    emailId: string,
    expireAt?: number | null,
    id: string,
    incomeAndExpense?:  {
      __typename: "ModelIncomeAndExpenseConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelMemberConnection",
      nextToken?: string | null,
    } | null,
    name: string,
    owner: string,
    phoneNumber: string,
    updatedAt: string,
    vehicles?:  {
      __typename: "ModelVehicleConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateCMSSubscriptionMutationVariables = {
  condition?: ModelCMSSubscriptionConditionInput | null,
  input: CreateCMSSubscriptionInput,
};

export type CreateCMSSubscriptionMutation = {
  createCMSSubscription?:  {
    __typename: "CMSSubscription",
    adminID: string,
    amount: number,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    endDate: string,
    expireAt?: number | null,
    id: string,
    isActive: boolean,
    paymentMethod?: PaymentMethod | null,
    startDate: string,
    transactionID?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateCashAccountMutationVariables = {
  condition?: ModelCashAccountConditionInput | null,
  input: CreateCashAccountInput,
};

export type CreateCashAccountMutation = {
  createCashAccount?:  {
    __typename: "CashAccount",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    cashflowIn: number,
    cashflowOut: number,
    circleID: string,
    closingBalance: number,
    closingEntryDate: string,
    closingSnapshot:  {
      __typename: "ClosingSnapshot",
      chits: number,
      deficit: number,
      excessCollection: number,
      expenses: number,
      incomes: number,
      interest: number,
      investments: number,
      loansGiven: number,
      repayments: number,
      withdrawals: number,
    },
    createdAt: string,
    description?: string | null,
    expireAt?: number | null,
    id: string,
    openingBalance: number,
    openingEntryDate: string,
    outstandingAmount: number,
    simplifiedTransactions: string,
    updatedAt: string,
  } | null,
};

export type CreateCircleMutationVariables = {
  condition?: ModelCircleConditionInput | null,
  input: CreateCircleInput,
};

export type CreateCircleMutation = {
  createCircle?:  {
    __typename: "Circle",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circleName: string,
    circlePicUrl?: string | null,
    cities?:  {
      __typename: "ModelCityConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    customers?:  {
      __typename: "ModelCustomerConnection",
      nextToken?: string | null,
    } | null,
    dateOfCreation: string,
    day: Weekday,
    expireAt?: number | null,
    id: string,
    incomeAndExpenses?:  {
      __typename: "ModelIncomeAndExpenseConnection",
      nextToken?: string | null,
    } | null,
    isLocked?: boolean | null,
    loanSerialNumber?:  {
      __typename: "LoanSerialNumber",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      serialNumber: string,
      updatedAt: string,
    } | null,
    members?:  {
      __typename: "ModelCircleMembersConnection",
      nextToken?: string | null,
    } | null,
    subscription?:  {
      __typename: "CMSSubscription",
      adminID: string,
      amount: number,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      endDate: string,
      expireAt?: number | null,
      id: string,
      isActive: boolean,
      paymentMethod?: PaymentMethod | null,
      startDate: string,
      transactionID?: string | null,
      updatedAt: string,
    } | null,
    transactions?:  {
      __typename: "ModelTransactionConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    vehicles?:  {
      __typename: "ModelCircleVehiclesConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateCircleMembersMutationVariables = {
  condition?: ModelCircleMembersConditionInput | null,
  input: CreateCircleMembersInput,
};

export type CreateCircleMembersMutation = {
  createCircleMembers?:  {
    __typename: "CircleMembers",
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    circleId: string,
    createdAt: string,
    expireAt?: number | null,
    member?:  {
      __typename: "Member",
      adminEmailId: string,
      adminID: string,
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      lastSeen?: string | null,
      memberRole: MemberRole,
      name: string,
      phoneNumber: string,
      profilePicUrl?: string | null,
      share?: number | null,
      status: MemberStatus,
      updatedAt: string,
    } | null,
    memberID: string,
    memberId: string,
    memberName: string,
    updatedAt: string,
  } | null,
};

export type CreateCircleVehiclesMutationVariables = {
  condition?: ModelCircleVehiclesConditionInput | null,
  input: CreateCircleVehiclesInput,
};

export type CreateCircleVehiclesMutation = {
  createCircleVehicles?:  {
    __typename: "CircleVehicles",
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    circleId: string,
    createdAt: string,
    expireAt?: number | null,
    updatedAt: string,
    vehicle?:  {
      __typename: "Vehicle",
      adminEmailId: string,
      adminID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      updatedAt: string,
      vehicleCapacity?: number | null,
      vehicleColor: string,
      vehicleModel?: string | null,
      vehicleName: string,
      vehicleNumber: string,
      vehiclePicUrl?: string | null,
      vehicleStatus: VehicleStatus,
      vehicleType: VehicleType,
    } | null,
    vehicleID: string,
    vehicleId: string,
    vehicleNumber: string,
  } | null,
};

export type CreateCityMutationVariables = {
  condition?: ModelCityConditionInput | null,
  input: CreateCityInput,
};

export type CreateCityMutation = {
  createCity?:  {
    __typename: "City",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    customers?:  {
      __typename: "ModelCustomerConnection",
      nextToken?: string | null,
    } | null,
    expireAt?: number | null,
    id: string,
    name: string,
    updatedAt: string,
  } | null,
};

export type CreateCustomerMutationVariables = {
  condition?: ModelCustomerConditionInput | null,
  input: CreateCustomerInput,
};

export type CreateCustomerMutation = {
  createCustomer?:  {
    __typename: "Customer",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    city?:  {
      __typename: "City",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    cityAdminID: string,
    cityID: string,
    createdAt: string,
    customerStatus?: CustomerStatus | null,
    customers:  Array< {
      __typename: "CustomerPersonalDetails",
      address: string,
      customerName: string,
      customerPicUrl?: string | null,
      phone: string,
      uId: string,
    } >,
    dateOfCreation: string,
    documents?:  {
      __typename: "CustomerDocuments",
      addressProof?: boolean | null,
      addressProofType?: CustomerDocumentsAddressProofType | null,
      documentsVerifiedAt?: string | null,
      documentsVerifiedBy?: string | null,
      emptyCheque?: boolean | null,
      emptyChequeNumber?: string | null,
      idProof?: boolean | null,
      idProofType?: CustomerDocumentsIdProofType | null,
      otherDocuments?: Array< string | null > | null,
      photographSubmitted?: boolean | null,
      promissoryNote?: boolean | null,
      promissoryNoteNumber?: string | null,
      remarks?: string | null,
    } | null,
    expireAt?: number | null,
    groupName?: string | null,
    guarantorDetails?: string | null,
    id: string,
    installmentPaymentInfo?:  {
      __typename: "InstallmentPaymentDetails",
      installmentAmount: number,
      installmentID: string,
      loanSerial: string,
      paidAmount: number,
      paidDate: string,
    } | null,
    isGroupLoan: boolean,
    loanSerial: Array< string | null >,
    loans?:  {
      __typename: "ModelLoanConnection",
      nextToken?: string | null,
    } | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    newLoanInfo?:  {
      __typename: "NewLoanInformation",
      givenDate: string,
      loanID: string,
      loanSerial: string,
      totalGivenAmount: number,
    } | null,
    oldLoanInfo?:  {
      __typename: "OldLoanDetails",
      closedDate: string,
      loanID: string,
      loanSerial: string,
      totalCollectedAmount: number,
    } | null,
    updatedAt: string,
    visitedOn?: string | null,
  } | null,
};

export type CreateCustomerLoanWithInstallmentsMutationVariables = {
  adminId: string,
  agentDetails: string,
  circleDateofCreation: string,
  circleId: string,
  circleName: string,
  customerJson: string,
  dateTime: string,
  installmentsJson: string,
  loanJson: string,
};

export type CreateCustomerLoanWithInstallmentsMutation = {
  createCustomerLoanWithInstallments?: string | null,
};

export type CreateIncomeAndExpenseMutationVariables = {
  condition?: ModelIncomeAndExpenseConditionInput | null,
  input: CreateIncomeAndExpenseInput,
};

export type CreateIncomeAndExpenseMutation = {
  createIncomeAndExpense?:  {
    __typename: "IncomeAndExpense",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    amount: number,
    belongsTo: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    date: string,
    description: string,
    expireAt?: number | null,
    id: string,
    incomeOrExpenseType: IncomeOrExpenseType,
    initialAmount?: number | null,
    interestRate?: number | null,
    name: string,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type CreateInstallmentMutationVariables = {
  condition?: ModelInstallmentConditionInput | null,
  input: CreateInstallmentInput,
};

export type CreateInstallmentMutation = {
  createInstallment?:  {
    __typename: "Installment",
    adminID: string,
    circleID: string,
    city: string,
    collectionAgentDetails?:  {
      __typename: "CollectionAgentDetails",
      agentID: string,
      name: string,
      phoneNumber: string,
    } | null,
    createdAt: string,
    customerName: string,
    description?: string | null,
    dueDate: string,
    expireAt?: number | null,
    id: string,
    initialAmount?: number | null,
    installmentAmount: number,
    installmentNumber: number,
    isExtraInstallment?: boolean | null,
    loan?:  {
      __typename: "Loan",
      adminID: string,
      circleID: string,
      collectibleAmount: number,
      createdAt: string,
      customerAdminID?: string | null,
      customerID?: string | null,
      dateOfCreation: string,
      endDate: string,
      expireAt?: number | null,
      givenAmount: number,
      id: string,
      initialCollectibleAmount?: number | null,
      initialGivenAmount?: number | null,
      installmentAmount: number,
      installmentType: InstallmentType,
      loanSerial: string,
      nextDueDate: string,
      paidAmount: number,
      paidInstallments: number,
      reasonForLoanTermination?: string | null,
      status: LoanStatus,
      totalInstallments: number,
      updatedAt: string,
      updatedDate?: string | null,
    } | null,
    loanAdminID: string,
    loanID: string,
    loanSerial: string,
    paidAmount?: number | null,
    paidDate?: string | null,
    paymentMethod?: PaymentMethod | null,
    status: InstallmentStatus,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type CreateLoanMutationVariables = {
  condition?: ModelLoanConditionInput | null,
  input: CreateLoanInput,
};

export type CreateLoanMutation = {
  createLoan?:  {
    __typename: "Loan",
    adminID: string,
    circleID: string,
    collectibleAmount: number,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      cityAdminID: string,
      cityID: string,
      createdAt: string,
      customerStatus?: CustomerStatus | null,
      dateOfCreation: string,
      expireAt?: number | null,
      groupName?: string | null,
      guarantorDetails?: string | null,
      id: string,
      isGroupLoan: boolean,
      loanSerial: Array< string | null >,
      updatedAt: string,
      visitedOn?: string | null,
    } | null,
    customerAdminID?: string | null,
    customerID?: string | null,
    dateOfCreation: string,
    endDate: string,
    expireAt?: number | null,
    givenAmount: number,
    id: string,
    initialCollectibleAmount?: number | null,
    initialGivenAmount?: number | null,
    installmentAmount: number,
    installmentType: InstallmentType,
    installments?:  {
      __typename: "ModelInstallmentConnection",
      nextToken?: string | null,
    } | null,
    loanSerial: string,
    nextDueDate: string,
    paidAmount: number,
    paidInstallments: number,
    reasonForLoanTermination?: string | null,
    status: LoanStatus,
    totalInstallments: number,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type CreateLoanSerialNumberMutationVariables = {
  condition?: ModelLoanSerialNumberConditionInput | null,
  input: CreateLoanSerialNumberInput,
};

export type CreateLoanSerialNumberMutation = {
  createLoanSerialNumber?:  {
    __typename: "LoanSerialNumber",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    expireAt?: number | null,
    id: string,
    serialNumber: string,
    updatedAt: string,
  } | null,
};

export type CreateMemberMutationVariables = {
  condition?: ModelMemberConditionInput | null,
  input: CreateMemberInput,
};

export type CreateMemberMutation = {
  createMember?:  {
    __typename: "Member",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circle?:  {
      __typename: "ModelCircleMembersConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    emailId: string,
    expireAt?: number | null,
    id: string,
    lastSeen?: string | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    memberRole: MemberRole,
    name: string,
    phoneNumber: string,
    profilePicUrl?: string | null,
    share?: number | null,
    status: MemberStatus,
    updatedAt: string,
  } | null,
};

export type CreateTransactionMutationVariables = {
  condition?: ModelTransactionConditionInput | null,
  input: CreateTransactionInput,
};

export type CreateTransactionMutation = {
  createTransaction?:  {
    __typename: "Transaction",
    additionalInfo:  {
      __typename: "AdditionalTransactionInfo",
      city?: string | null,
      customerName?: string | null,
      description: string,
      loanId?: string | null,
      loanSerial?: string | null,
      memberID?: string | null,
      memberName?: string | null,
      oldLoanAmount?: number | null,
      oldLoanSerial?: string | null,
      paymentMethod: PaymentMethod,
      totalOutstandingAmount?: number | null,
      transactionEvent: TransactionEventType,
    },
    adminID: string,
    amount: number,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    dateTime: string,
    expireAt?: number | null,
    id: string,
    initialAmount?: number | null,
    transactionType: TransactionType,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  email: string,
  memberRole: string,
  name: string,
  phoneNumber: string,
};

export type CreateUserMutation = {
  createUser?: string | null,
};

export type CreateVehicleMutationVariables = {
  condition?: ModelVehicleConditionInput | null,
  input: CreateVehicleInput,
};

export type CreateVehicleMutation = {
  createVehicle?:  {
    __typename: "Vehicle",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circles?:  {
      __typename: "ModelCircleVehiclesConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    expireAt?: number | null,
    id: string,
    updatedAt: string,
    vehicleCapacity?: number | null,
    vehicleColor: string,
    vehicleModel?: string | null,
    vehicleName: string,
    vehicleNumber: string,
    vehiclePicUrl?: string | null,
    vehicleStatus: VehicleStatus,
    vehicleType: VehicleType,
  } | null,
};

export type CustomerLoanCreationMutationVariables = {
  adminId: string,
  agentDetails: string,
  circleDateofCreation: string,
  circleId: string,
  customerJson: string,
  dateTime: string,
  installmentJson?: string | null,
  isNewCustomer: boolean,
  loanJson: string,
  loanSerialNumberJson: string,
  loanTransactionJson: string,
};

export type CustomerLoanCreationMutation = {
  customerLoanCreation?: string | null,
};

export type DeleteAdminMutationVariables = {
  condition?: ModelAdminConditionInput | null,
  input: DeleteAdminInput,
};

export type DeleteAdminMutation = {
  deleteAdmin?:  {
    __typename: "Admin",
    businessInformation?:  {
      __typename: "BusinessInformation",
      businessAddress: string,
      businessEmail?: string | null,
      businessName: string,
      businessPhoneNumber: string,
      licenseNumber?: string | null,
      profilepPicUrl?: string | null,
      regulatoryBody?: string | null,
    } | null,
    cashAccount?:  {
      __typename: "ModelCashAccountConnection",
      nextToken?: string | null,
    } | null,
    circles?:  {
      __typename: "ModelCircleConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    emailId: string,
    expireAt?: number | null,
    id: string,
    incomeAndExpense?:  {
      __typename: "ModelIncomeAndExpenseConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelMemberConnection",
      nextToken?: string | null,
    } | null,
    name: string,
    owner: string,
    phoneNumber: string,
    updatedAt: string,
    vehicles?:  {
      __typename: "ModelVehicleConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteCMSSubscriptionMutationVariables = {
  condition?: ModelCMSSubscriptionConditionInput | null,
  input: DeleteCMSSubscriptionInput,
};

export type DeleteCMSSubscriptionMutation = {
  deleteCMSSubscription?:  {
    __typename: "CMSSubscription",
    adminID: string,
    amount: number,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    endDate: string,
    expireAt?: number | null,
    id: string,
    isActive: boolean,
    paymentMethod?: PaymentMethod | null,
    startDate: string,
    transactionID?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteCashAccountMutationVariables = {
  condition?: ModelCashAccountConditionInput | null,
  input: DeleteCashAccountInput,
};

export type DeleteCashAccountMutation = {
  deleteCashAccount?:  {
    __typename: "CashAccount",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    cashflowIn: number,
    cashflowOut: number,
    circleID: string,
    closingBalance: number,
    closingEntryDate: string,
    closingSnapshot:  {
      __typename: "ClosingSnapshot",
      chits: number,
      deficit: number,
      excessCollection: number,
      expenses: number,
      incomes: number,
      interest: number,
      investments: number,
      loansGiven: number,
      repayments: number,
      withdrawals: number,
    },
    createdAt: string,
    description?: string | null,
    expireAt?: number | null,
    id: string,
    openingBalance: number,
    openingEntryDate: string,
    outstandingAmount: number,
    simplifiedTransactions: string,
    updatedAt: string,
  } | null,
};

export type DeleteCircleMutationVariables = {
  condition?: ModelCircleConditionInput | null,
  input: DeleteCircleInput,
};

export type DeleteCircleMutation = {
  deleteCircle?:  {
    __typename: "Circle",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circleName: string,
    circlePicUrl?: string | null,
    cities?:  {
      __typename: "ModelCityConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    customers?:  {
      __typename: "ModelCustomerConnection",
      nextToken?: string | null,
    } | null,
    dateOfCreation: string,
    day: Weekday,
    expireAt?: number | null,
    id: string,
    incomeAndExpenses?:  {
      __typename: "ModelIncomeAndExpenseConnection",
      nextToken?: string | null,
    } | null,
    isLocked?: boolean | null,
    loanSerialNumber?:  {
      __typename: "LoanSerialNumber",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      serialNumber: string,
      updatedAt: string,
    } | null,
    members?:  {
      __typename: "ModelCircleMembersConnection",
      nextToken?: string | null,
    } | null,
    subscription?:  {
      __typename: "CMSSubscription",
      adminID: string,
      amount: number,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      endDate: string,
      expireAt?: number | null,
      id: string,
      isActive: boolean,
      paymentMethod?: PaymentMethod | null,
      startDate: string,
      transactionID?: string | null,
      updatedAt: string,
    } | null,
    transactions?:  {
      __typename: "ModelTransactionConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    vehicles?:  {
      __typename: "ModelCircleVehiclesConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteCircleMembersMutationVariables = {
  condition?: ModelCircleMembersConditionInput | null,
  input: DeleteCircleMembersInput,
};

export type DeleteCircleMembersMutation = {
  deleteCircleMembers?:  {
    __typename: "CircleMembers",
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    circleId: string,
    createdAt: string,
    expireAt?: number | null,
    member?:  {
      __typename: "Member",
      adminEmailId: string,
      adminID: string,
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      lastSeen?: string | null,
      memberRole: MemberRole,
      name: string,
      phoneNumber: string,
      profilePicUrl?: string | null,
      share?: number | null,
      status: MemberStatus,
      updatedAt: string,
    } | null,
    memberID: string,
    memberId: string,
    memberName: string,
    updatedAt: string,
  } | null,
};

export type DeleteCircleVehiclesMutationVariables = {
  condition?: ModelCircleVehiclesConditionInput | null,
  input: DeleteCircleVehiclesInput,
};

export type DeleteCircleVehiclesMutation = {
  deleteCircleVehicles?:  {
    __typename: "CircleVehicles",
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    circleId: string,
    createdAt: string,
    expireAt?: number | null,
    updatedAt: string,
    vehicle?:  {
      __typename: "Vehicle",
      adminEmailId: string,
      adminID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      updatedAt: string,
      vehicleCapacity?: number | null,
      vehicleColor: string,
      vehicleModel?: string | null,
      vehicleName: string,
      vehicleNumber: string,
      vehiclePicUrl?: string | null,
      vehicleStatus: VehicleStatus,
      vehicleType: VehicleType,
    } | null,
    vehicleID: string,
    vehicleId: string,
    vehicleNumber: string,
  } | null,
};

export type DeleteCityMutationVariables = {
  condition?: ModelCityConditionInput | null,
  input: DeleteCityInput,
};

export type DeleteCityMutation = {
  deleteCity?:  {
    __typename: "City",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    customers?:  {
      __typename: "ModelCustomerConnection",
      nextToken?: string | null,
    } | null,
    expireAt?: number | null,
    id: string,
    name: string,
    updatedAt: string,
  } | null,
};

export type DeleteCustomerMutationVariables = {
  condition?: ModelCustomerConditionInput | null,
  input: DeleteCustomerInput,
};

export type DeleteCustomerMutation = {
  deleteCustomer?:  {
    __typename: "Customer",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    city?:  {
      __typename: "City",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    cityAdminID: string,
    cityID: string,
    createdAt: string,
    customerStatus?: CustomerStatus | null,
    customers:  Array< {
      __typename: "CustomerPersonalDetails",
      address: string,
      customerName: string,
      customerPicUrl?: string | null,
      phone: string,
      uId: string,
    } >,
    dateOfCreation: string,
    documents?:  {
      __typename: "CustomerDocuments",
      addressProof?: boolean | null,
      addressProofType?: CustomerDocumentsAddressProofType | null,
      documentsVerifiedAt?: string | null,
      documentsVerifiedBy?: string | null,
      emptyCheque?: boolean | null,
      emptyChequeNumber?: string | null,
      idProof?: boolean | null,
      idProofType?: CustomerDocumentsIdProofType | null,
      otherDocuments?: Array< string | null > | null,
      photographSubmitted?: boolean | null,
      promissoryNote?: boolean | null,
      promissoryNoteNumber?: string | null,
      remarks?: string | null,
    } | null,
    expireAt?: number | null,
    groupName?: string | null,
    guarantorDetails?: string | null,
    id: string,
    installmentPaymentInfo?:  {
      __typename: "InstallmentPaymentDetails",
      installmentAmount: number,
      installmentID: string,
      loanSerial: string,
      paidAmount: number,
      paidDate: string,
    } | null,
    isGroupLoan: boolean,
    loanSerial: Array< string | null >,
    loans?:  {
      __typename: "ModelLoanConnection",
      nextToken?: string | null,
    } | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    newLoanInfo?:  {
      __typename: "NewLoanInformation",
      givenDate: string,
      loanID: string,
      loanSerial: string,
      totalGivenAmount: number,
    } | null,
    oldLoanInfo?:  {
      __typename: "OldLoanDetails",
      closedDate: string,
      loanID: string,
      loanSerial: string,
      totalCollectedAmount: number,
    } | null,
    updatedAt: string,
    visitedOn?: string | null,
  } | null,
};

export type DeleteIncomeAndExpenseMutationVariables = {
  condition?: ModelIncomeAndExpenseConditionInput | null,
  input: DeleteIncomeAndExpenseInput,
};

export type DeleteIncomeAndExpenseMutation = {
  deleteIncomeAndExpense?:  {
    __typename: "IncomeAndExpense",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    amount: number,
    belongsTo: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    date: string,
    description: string,
    expireAt?: number | null,
    id: string,
    incomeOrExpenseType: IncomeOrExpenseType,
    initialAmount?: number | null,
    interestRate?: number | null,
    name: string,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type DeleteInstallmentMutationVariables = {
  condition?: ModelInstallmentConditionInput | null,
  input: DeleteInstallmentInput,
};

export type DeleteInstallmentMutation = {
  deleteInstallment?:  {
    __typename: "Installment",
    adminID: string,
    circleID: string,
    city: string,
    collectionAgentDetails?:  {
      __typename: "CollectionAgentDetails",
      agentID: string,
      name: string,
      phoneNumber: string,
    } | null,
    createdAt: string,
    customerName: string,
    description?: string | null,
    dueDate: string,
    expireAt?: number | null,
    id: string,
    initialAmount?: number | null,
    installmentAmount: number,
    installmentNumber: number,
    isExtraInstallment?: boolean | null,
    loan?:  {
      __typename: "Loan",
      adminID: string,
      circleID: string,
      collectibleAmount: number,
      createdAt: string,
      customerAdminID?: string | null,
      customerID?: string | null,
      dateOfCreation: string,
      endDate: string,
      expireAt?: number | null,
      givenAmount: number,
      id: string,
      initialCollectibleAmount?: number | null,
      initialGivenAmount?: number | null,
      installmentAmount: number,
      installmentType: InstallmentType,
      loanSerial: string,
      nextDueDate: string,
      paidAmount: number,
      paidInstallments: number,
      reasonForLoanTermination?: string | null,
      status: LoanStatus,
      totalInstallments: number,
      updatedAt: string,
      updatedDate?: string | null,
    } | null,
    loanAdminID: string,
    loanID: string,
    loanSerial: string,
    paidAmount?: number | null,
    paidDate?: string | null,
    paymentMethod?: PaymentMethod | null,
    status: InstallmentStatus,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type DeleteLoanMutationVariables = {
  condition?: ModelLoanConditionInput | null,
  input: DeleteLoanInput,
};

export type DeleteLoanMutation = {
  deleteLoan?:  {
    __typename: "Loan",
    adminID: string,
    circleID: string,
    collectibleAmount: number,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      cityAdminID: string,
      cityID: string,
      createdAt: string,
      customerStatus?: CustomerStatus | null,
      dateOfCreation: string,
      expireAt?: number | null,
      groupName?: string | null,
      guarantorDetails?: string | null,
      id: string,
      isGroupLoan: boolean,
      loanSerial: Array< string | null >,
      updatedAt: string,
      visitedOn?: string | null,
    } | null,
    customerAdminID?: string | null,
    customerID?: string | null,
    dateOfCreation: string,
    endDate: string,
    expireAt?: number | null,
    givenAmount: number,
    id: string,
    initialCollectibleAmount?: number | null,
    initialGivenAmount?: number | null,
    installmentAmount: number,
    installmentType: InstallmentType,
    installments?:  {
      __typename: "ModelInstallmentConnection",
      nextToken?: string | null,
    } | null,
    loanSerial: string,
    nextDueDate: string,
    paidAmount: number,
    paidInstallments: number,
    reasonForLoanTermination?: string | null,
    status: LoanStatus,
    totalInstallments: number,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type DeleteLoanSerialNumberMutationVariables = {
  condition?: ModelLoanSerialNumberConditionInput | null,
  input: DeleteLoanSerialNumberInput,
};

export type DeleteLoanSerialNumberMutation = {
  deleteLoanSerialNumber?:  {
    __typename: "LoanSerialNumber",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    expireAt?: number | null,
    id: string,
    serialNumber: string,
    updatedAt: string,
  } | null,
};

export type DeleteMemberMutationVariables = {
  condition?: ModelMemberConditionInput | null,
  input: DeleteMemberInput,
};

export type DeleteMemberMutation = {
  deleteMember?:  {
    __typename: "Member",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circle?:  {
      __typename: "ModelCircleMembersConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    emailId: string,
    expireAt?: number | null,
    id: string,
    lastSeen?: string | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    memberRole: MemberRole,
    name: string,
    phoneNumber: string,
    profilePicUrl?: string | null,
    share?: number | null,
    status: MemberStatus,
    updatedAt: string,
  } | null,
};

export type DeleteTransactionMutationVariables = {
  condition?: ModelTransactionConditionInput | null,
  input: DeleteTransactionInput,
};

export type DeleteTransactionMutation = {
  deleteTransaction?:  {
    __typename: "Transaction",
    additionalInfo:  {
      __typename: "AdditionalTransactionInfo",
      city?: string | null,
      customerName?: string | null,
      description: string,
      loanId?: string | null,
      loanSerial?: string | null,
      memberID?: string | null,
      memberName?: string | null,
      oldLoanAmount?: number | null,
      oldLoanSerial?: string | null,
      paymentMethod: PaymentMethod,
      totalOutstandingAmount?: number | null,
      transactionEvent: TransactionEventType,
    },
    adminID: string,
    amount: number,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    dateTime: string,
    expireAt?: number | null,
    id: string,
    initialAmount?: number | null,
    transactionType: TransactionType,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  userId: string,
};

export type DeleteUserMutation = {
  deleteUser?: string | null,
};

export type DeleteVehicleMutationVariables = {
  condition?: ModelVehicleConditionInput | null,
  input: DeleteVehicleInput,
};

export type DeleteVehicleMutation = {
  deleteVehicle?:  {
    __typename: "Vehicle",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circles?:  {
      __typename: "ModelCircleVehiclesConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    expireAt?: number | null,
    id: string,
    updatedAt: string,
    vehicleCapacity?: number | null,
    vehicleColor: string,
    vehicleModel?: string | null,
    vehicleName: string,
    vehicleNumber: string,
    vehiclePicUrl?: string | null,
    vehicleStatus: VehicleStatus,
    vehicleType: VehicleType,
  } | null,
};

export type InstallmentProcessorMutationVariables = {
  adminId: string,
  agentDetails: string,
  circleDateofCreation: string,
  circleId: string,
  dateTime: string,
  extraInstallmentJson?: string | null,
  extraTransactionJson?: string | null,
  installmentJson: string,
  transactionJson: string,
  updatedCustomerJson: string,
  updatedLoanJson: string,
};

export type InstallmentProcessorMutation = {
  installmentProcessor?: string | null,
};

export type LoanRefinanceMutationVariables = {
  adminId: string,
  agentDetails: string,
  circleDateofCreation: string,
  circleId: string,
  customerJson: string,
  dateTime: string,
  installmentJson: string,
  installmentTransactionJson: string,
  loanSerialNumberJson: string,
  loanTransactionJson: string,
  newLoanJson: string,
  oldLoanJson: string,
};

export type LoanRefinanceMutation = {
  loanRefinance?: string | null,
};

export type ManageLoanTerminationMutationVariables = {
  adminId: string,
  agentId: string,
  agentName: string,
  agentPhoneNumber: string,
  circleDateofCreation: string,
  circleId: string,
  closingLoanSerial: string,
  closingReason: string,
  customerId: string,
  customerName: string,
  dateTime: string,
  endDate: string,
  expireAt: number,
  givenAmount: number,
  installmentAmount: number,
  lTPassword: string,
  loanId: string,
  loanSerial: string,
  paidInstallments: number,
  totalCollectedAmount: number,
  totalOutstandingAmount: number,
  updatedSerialNumbers: Array< string | null >,
};

export type ManageLoanTerminationMutation = {
  manageLoanTermination?: string | null,
};

export type RemoveInstallmentMutationVariables = {
  adminId: string,
  customerId: string,
  installmentDeletionPassword: string,
  installmentId: string,
  loanId: string,
  nextDueDate: string,
  paidAmount: number,
  paidInstallments: number,
  shouldUpdateCustomer: boolean,
  status: string,
};

export type RemoveInstallmentMutation = {
  removeInstallment?: string | null,
};

export type RemoveLoanMutationVariables = {
  adminId: string,
  circleId: string,
  customerId: string,
  dateTime: string,
  givenAmount: number,
  loanDeletionPassword: string,
  loanId: string,
  loanSerial: string,
  memberId: string,
  memberName: string,
  outstandingAmount: number,
  paidAmount: number,
};

export type RemoveLoanMutation = {
  removeLoan?: string | null,
};

export type RemoveUserFromGroupMutationVariables = {
  groupName: string,
  userId: string,
};

export type RemoveUserFromGroupMutation = {
  removeUserFromGroup?: string | null,
};

export type SetUserPasswordMutationVariables = {
  password: string,
  userId: string,
};

export type SetUserPasswordMutation = {
  setUserPassword?: string | null,
};

export type UpdateAdminMutationVariables = {
  condition?: ModelAdminConditionInput | null,
  input: UpdateAdminInput,
};

export type UpdateAdminMutation = {
  updateAdmin?:  {
    __typename: "Admin",
    businessInformation?:  {
      __typename: "BusinessInformation",
      businessAddress: string,
      businessEmail?: string | null,
      businessName: string,
      businessPhoneNumber: string,
      licenseNumber?: string | null,
      profilepPicUrl?: string | null,
      regulatoryBody?: string | null,
    } | null,
    cashAccount?:  {
      __typename: "ModelCashAccountConnection",
      nextToken?: string | null,
    } | null,
    circles?:  {
      __typename: "ModelCircleConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    emailId: string,
    expireAt?: number | null,
    id: string,
    incomeAndExpense?:  {
      __typename: "ModelIncomeAndExpenseConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelMemberConnection",
      nextToken?: string | null,
    } | null,
    name: string,
    owner: string,
    phoneNumber: string,
    updatedAt: string,
    vehicles?:  {
      __typename: "ModelVehicleConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateCMSSubscriptionMutationVariables = {
  condition?: ModelCMSSubscriptionConditionInput | null,
  input: UpdateCMSSubscriptionInput,
};

export type UpdateCMSSubscriptionMutation = {
  updateCMSSubscription?:  {
    __typename: "CMSSubscription",
    adminID: string,
    amount: number,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    endDate: string,
    expireAt?: number | null,
    id: string,
    isActive: boolean,
    paymentMethod?: PaymentMethod | null,
    startDate: string,
    transactionID?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateCashAccountMutationVariables = {
  condition?: ModelCashAccountConditionInput | null,
  input: UpdateCashAccountInput,
};

export type UpdateCashAccountMutation = {
  updateCashAccount?:  {
    __typename: "CashAccount",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    cashflowIn: number,
    cashflowOut: number,
    circleID: string,
    closingBalance: number,
    closingEntryDate: string,
    closingSnapshot:  {
      __typename: "ClosingSnapshot",
      chits: number,
      deficit: number,
      excessCollection: number,
      expenses: number,
      incomes: number,
      interest: number,
      investments: number,
      loansGiven: number,
      repayments: number,
      withdrawals: number,
    },
    createdAt: string,
    description?: string | null,
    expireAt?: number | null,
    id: string,
    openingBalance: number,
    openingEntryDate: string,
    outstandingAmount: number,
    simplifiedTransactions: string,
    updatedAt: string,
  } | null,
};

export type UpdateCircleMutationVariables = {
  condition?: ModelCircleConditionInput | null,
  input: UpdateCircleInput,
};

export type UpdateCircleMutation = {
  updateCircle?:  {
    __typename: "Circle",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circleName: string,
    circlePicUrl?: string | null,
    cities?:  {
      __typename: "ModelCityConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    customers?:  {
      __typename: "ModelCustomerConnection",
      nextToken?: string | null,
    } | null,
    dateOfCreation: string,
    day: Weekday,
    expireAt?: number | null,
    id: string,
    incomeAndExpenses?:  {
      __typename: "ModelIncomeAndExpenseConnection",
      nextToken?: string | null,
    } | null,
    isLocked?: boolean | null,
    loanSerialNumber?:  {
      __typename: "LoanSerialNumber",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      serialNumber: string,
      updatedAt: string,
    } | null,
    members?:  {
      __typename: "ModelCircleMembersConnection",
      nextToken?: string | null,
    } | null,
    subscription?:  {
      __typename: "CMSSubscription",
      adminID: string,
      amount: number,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      endDate: string,
      expireAt?: number | null,
      id: string,
      isActive: boolean,
      paymentMethod?: PaymentMethod | null,
      startDate: string,
      transactionID?: string | null,
      updatedAt: string,
    } | null,
    transactions?:  {
      __typename: "ModelTransactionConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    vehicles?:  {
      __typename: "ModelCircleVehiclesConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateCircleMembersMutationVariables = {
  condition?: ModelCircleMembersConditionInput | null,
  input: UpdateCircleMembersInput,
};

export type UpdateCircleMembersMutation = {
  updateCircleMembers?:  {
    __typename: "CircleMembers",
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    circleId: string,
    createdAt: string,
    expireAt?: number | null,
    member?:  {
      __typename: "Member",
      adminEmailId: string,
      adminID: string,
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      lastSeen?: string | null,
      memberRole: MemberRole,
      name: string,
      phoneNumber: string,
      profilePicUrl?: string | null,
      share?: number | null,
      status: MemberStatus,
      updatedAt: string,
    } | null,
    memberID: string,
    memberId: string,
    memberName: string,
    updatedAt: string,
  } | null,
};

export type UpdateCircleVehiclesMutationVariables = {
  condition?: ModelCircleVehiclesConditionInput | null,
  input: UpdateCircleVehiclesInput,
};

export type UpdateCircleVehiclesMutation = {
  updateCircleVehicles?:  {
    __typename: "CircleVehicles",
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    circleId: string,
    createdAt: string,
    expireAt?: number | null,
    updatedAt: string,
    vehicle?:  {
      __typename: "Vehicle",
      adminEmailId: string,
      adminID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      updatedAt: string,
      vehicleCapacity?: number | null,
      vehicleColor: string,
      vehicleModel?: string | null,
      vehicleName: string,
      vehicleNumber: string,
      vehiclePicUrl?: string | null,
      vehicleStatus: VehicleStatus,
      vehicleType: VehicleType,
    } | null,
    vehicleID: string,
    vehicleId: string,
    vehicleNumber: string,
  } | null,
};

export type UpdateCityMutationVariables = {
  condition?: ModelCityConditionInput | null,
  input: UpdateCityInput,
};

export type UpdateCityMutation = {
  updateCity?:  {
    __typename: "City",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    customers?:  {
      __typename: "ModelCustomerConnection",
      nextToken?: string | null,
    } | null,
    expireAt?: number | null,
    id: string,
    name: string,
    updatedAt: string,
  } | null,
};

export type UpdateCustomerMutationVariables = {
  condition?: ModelCustomerConditionInput | null,
  input: UpdateCustomerInput,
};

export type UpdateCustomerMutation = {
  updateCustomer?:  {
    __typename: "Customer",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    city?:  {
      __typename: "City",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    cityAdminID: string,
    cityID: string,
    createdAt: string,
    customerStatus?: CustomerStatus | null,
    customers:  Array< {
      __typename: "CustomerPersonalDetails",
      address: string,
      customerName: string,
      customerPicUrl?: string | null,
      phone: string,
      uId: string,
    } >,
    dateOfCreation: string,
    documents?:  {
      __typename: "CustomerDocuments",
      addressProof?: boolean | null,
      addressProofType?: CustomerDocumentsAddressProofType | null,
      documentsVerifiedAt?: string | null,
      documentsVerifiedBy?: string | null,
      emptyCheque?: boolean | null,
      emptyChequeNumber?: string | null,
      idProof?: boolean | null,
      idProofType?: CustomerDocumentsIdProofType | null,
      otherDocuments?: Array< string | null > | null,
      photographSubmitted?: boolean | null,
      promissoryNote?: boolean | null,
      promissoryNoteNumber?: string | null,
      remarks?: string | null,
    } | null,
    expireAt?: number | null,
    groupName?: string | null,
    guarantorDetails?: string | null,
    id: string,
    installmentPaymentInfo?:  {
      __typename: "InstallmentPaymentDetails",
      installmentAmount: number,
      installmentID: string,
      loanSerial: string,
      paidAmount: number,
      paidDate: string,
    } | null,
    isGroupLoan: boolean,
    loanSerial: Array< string | null >,
    loans?:  {
      __typename: "ModelLoanConnection",
      nextToken?: string | null,
    } | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    newLoanInfo?:  {
      __typename: "NewLoanInformation",
      givenDate: string,
      loanID: string,
      loanSerial: string,
      totalGivenAmount: number,
    } | null,
    oldLoanInfo?:  {
      __typename: "OldLoanDetails",
      closedDate: string,
      loanID: string,
      loanSerial: string,
      totalCollectedAmount: number,
    } | null,
    updatedAt: string,
    visitedOn?: string | null,
  } | null,
};

export type UpdateIncomeAndExpenseMutationVariables = {
  condition?: ModelIncomeAndExpenseConditionInput | null,
  input: UpdateIncomeAndExpenseInput,
};

export type UpdateIncomeAndExpenseMutation = {
  updateIncomeAndExpense?:  {
    __typename: "IncomeAndExpense",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    amount: number,
    belongsTo: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    date: string,
    description: string,
    expireAt?: number | null,
    id: string,
    incomeOrExpenseType: IncomeOrExpenseType,
    initialAmount?: number | null,
    interestRate?: number | null,
    name: string,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type UpdateInstallmentMutationVariables = {
  condition?: ModelInstallmentConditionInput | null,
  input: UpdateInstallmentInput,
};

export type UpdateInstallmentMutation = {
  updateInstallment?:  {
    __typename: "Installment",
    adminID: string,
    circleID: string,
    city: string,
    collectionAgentDetails?:  {
      __typename: "CollectionAgentDetails",
      agentID: string,
      name: string,
      phoneNumber: string,
    } | null,
    createdAt: string,
    customerName: string,
    description?: string | null,
    dueDate: string,
    expireAt?: number | null,
    id: string,
    initialAmount?: number | null,
    installmentAmount: number,
    installmentNumber: number,
    isExtraInstallment?: boolean | null,
    loan?:  {
      __typename: "Loan",
      adminID: string,
      circleID: string,
      collectibleAmount: number,
      createdAt: string,
      customerAdminID?: string | null,
      customerID?: string | null,
      dateOfCreation: string,
      endDate: string,
      expireAt?: number | null,
      givenAmount: number,
      id: string,
      initialCollectibleAmount?: number | null,
      initialGivenAmount?: number | null,
      installmentAmount: number,
      installmentType: InstallmentType,
      loanSerial: string,
      nextDueDate: string,
      paidAmount: number,
      paidInstallments: number,
      reasonForLoanTermination?: string | null,
      status: LoanStatus,
      totalInstallments: number,
      updatedAt: string,
      updatedDate?: string | null,
    } | null,
    loanAdminID: string,
    loanID: string,
    loanSerial: string,
    paidAmount?: number | null,
    paidDate?: string | null,
    paymentMethod?: PaymentMethod | null,
    status: InstallmentStatus,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type UpdateLoanMutationVariables = {
  condition?: ModelLoanConditionInput | null,
  input: UpdateLoanInput,
};

export type UpdateLoanMutation = {
  updateLoan?:  {
    __typename: "Loan",
    adminID: string,
    circleID: string,
    collectibleAmount: number,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      cityAdminID: string,
      cityID: string,
      createdAt: string,
      customerStatus?: CustomerStatus | null,
      dateOfCreation: string,
      expireAt?: number | null,
      groupName?: string | null,
      guarantorDetails?: string | null,
      id: string,
      isGroupLoan: boolean,
      loanSerial: Array< string | null >,
      updatedAt: string,
      visitedOn?: string | null,
    } | null,
    customerAdminID?: string | null,
    customerID?: string | null,
    dateOfCreation: string,
    endDate: string,
    expireAt?: number | null,
    givenAmount: number,
    id: string,
    initialCollectibleAmount?: number | null,
    initialGivenAmount?: number | null,
    installmentAmount: number,
    installmentType: InstallmentType,
    installments?:  {
      __typename: "ModelInstallmentConnection",
      nextToken?: string | null,
    } | null,
    loanSerial: string,
    nextDueDate: string,
    paidAmount: number,
    paidInstallments: number,
    reasonForLoanTermination?: string | null,
    status: LoanStatus,
    totalInstallments: number,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type UpdateLoanSerialNumberMutationVariables = {
  condition?: ModelLoanSerialNumberConditionInput | null,
  input: UpdateLoanSerialNumberInput,
};

export type UpdateLoanSerialNumberMutation = {
  updateLoanSerialNumber?:  {
    __typename: "LoanSerialNumber",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    expireAt?: number | null,
    id: string,
    serialNumber: string,
    updatedAt: string,
  } | null,
};

export type UpdateMemberMutationVariables = {
  condition?: ModelMemberConditionInput | null,
  input: UpdateMemberInput,
};

export type UpdateMemberMutation = {
  updateMember?:  {
    __typename: "Member",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circle?:  {
      __typename: "ModelCircleMembersConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    emailId: string,
    expireAt?: number | null,
    id: string,
    lastSeen?: string | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    memberRole: MemberRole,
    name: string,
    phoneNumber: string,
    profilePicUrl?: string | null,
    share?: number | null,
    status: MemberStatus,
    updatedAt: string,
  } | null,
};

export type UpdateTransactionMutationVariables = {
  condition?: ModelTransactionConditionInput | null,
  input: UpdateTransactionInput,
};

export type UpdateTransactionMutation = {
  updateTransaction?:  {
    __typename: "Transaction",
    additionalInfo:  {
      __typename: "AdditionalTransactionInfo",
      city?: string | null,
      customerName?: string | null,
      description: string,
      loanId?: string | null,
      loanSerial?: string | null,
      memberID?: string | null,
      memberName?: string | null,
      oldLoanAmount?: number | null,
      oldLoanSerial?: string | null,
      paymentMethod: PaymentMethod,
      totalOutstandingAmount?: number | null,
      transactionEvent: TransactionEventType,
    },
    adminID: string,
    amount: number,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    dateTime: string,
    expireAt?: number | null,
    id: string,
    initialAmount?: number | null,
    transactionType: TransactionType,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type UpdateVehicleMutationVariables = {
  condition?: ModelVehicleConditionInput | null,
  input: UpdateVehicleInput,
};

export type UpdateVehicleMutation = {
  updateVehicle?:  {
    __typename: "Vehicle",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circles?:  {
      __typename: "ModelCircleVehiclesConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    expireAt?: number | null,
    id: string,
    updatedAt: string,
    vehicleCapacity?: number | null,
    vehicleColor: string,
    vehicleModel?: string | null,
    vehicleName: string,
    vehicleNumber: string,
    vehiclePicUrl?: string | null,
    vehicleStatus: VehicleStatus,
    vehicleType: VehicleType,
  } | null,
};

export type VerifyClosingTransactionMutationVariables = {
  adminEmailId: string,
  adminId: string,
  businessLoss?: number | null,
  cashflowIn: number,
  cashflowOut: number,
  circleId: string,
  closingBalance: number,
  closingEntryDate: string,
  description?: string | null,
  existingLoanOutstanding?: number | null,
  interest: number,
  loansGiven: number,
  openingBalance: number,
  openingEntryDate: string,
  outstandingAmount: number,
  repayments: number,
  writeOff?: number | null,
};

export type VerifyClosingTransactionMutation = {
  verifyClosingTransaction?: string | null,
};

export type OnCreateAdminSubscriptionVariables = {
  filter?: ModelSubscriptionAdminFilterInput | null,
  owner?: string | null,
};

export type OnCreateAdminSubscription = {
  onCreateAdmin?:  {
    __typename: "Admin",
    businessInformation?:  {
      __typename: "BusinessInformation",
      businessAddress: string,
      businessEmail?: string | null,
      businessName: string,
      businessPhoneNumber: string,
      licenseNumber?: string | null,
      profilepPicUrl?: string | null,
      regulatoryBody?: string | null,
    } | null,
    cashAccount?:  {
      __typename: "ModelCashAccountConnection",
      nextToken?: string | null,
    } | null,
    circles?:  {
      __typename: "ModelCircleConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    emailId: string,
    expireAt?: number | null,
    id: string,
    incomeAndExpense?:  {
      __typename: "ModelIncomeAndExpenseConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelMemberConnection",
      nextToken?: string | null,
    } | null,
    name: string,
    owner: string,
    phoneNumber: string,
    updatedAt: string,
    vehicles?:  {
      __typename: "ModelVehicleConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateCMSSubscriptionSubscriptionVariables = {
  filter?: ModelSubscriptionCMSSubscriptionFilterInput | null,
};

export type OnCreateCMSSubscriptionSubscription = {
  onCreateCMSSubscription?:  {
    __typename: "CMSSubscription",
    adminID: string,
    amount: number,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    endDate: string,
    expireAt?: number | null,
    id: string,
    isActive: boolean,
    paymentMethod?: PaymentMethod | null,
    startDate: string,
    transactionID?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateCashAccountSubscriptionVariables = {
  filter?: ModelSubscriptionCashAccountFilterInput | null,
};

export type OnCreateCashAccountSubscription = {
  onCreateCashAccount?:  {
    __typename: "CashAccount",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    cashflowIn: number,
    cashflowOut: number,
    circleID: string,
    closingBalance: number,
    closingEntryDate: string,
    closingSnapshot:  {
      __typename: "ClosingSnapshot",
      chits: number,
      deficit: number,
      excessCollection: number,
      expenses: number,
      incomes: number,
      interest: number,
      investments: number,
      loansGiven: number,
      repayments: number,
      withdrawals: number,
    },
    createdAt: string,
    description?: string | null,
    expireAt?: number | null,
    id: string,
    openingBalance: number,
    openingEntryDate: string,
    outstandingAmount: number,
    simplifiedTransactions: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCircleSubscriptionVariables = {
  filter?: ModelSubscriptionCircleFilterInput | null,
};

export type OnCreateCircleSubscription = {
  onCreateCircle?:  {
    __typename: "Circle",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circleName: string,
    circlePicUrl?: string | null,
    cities?:  {
      __typename: "ModelCityConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    customers?:  {
      __typename: "ModelCustomerConnection",
      nextToken?: string | null,
    } | null,
    dateOfCreation: string,
    day: Weekday,
    expireAt?: number | null,
    id: string,
    incomeAndExpenses?:  {
      __typename: "ModelIncomeAndExpenseConnection",
      nextToken?: string | null,
    } | null,
    isLocked?: boolean | null,
    loanSerialNumber?:  {
      __typename: "LoanSerialNumber",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      serialNumber: string,
      updatedAt: string,
    } | null,
    members?:  {
      __typename: "ModelCircleMembersConnection",
      nextToken?: string | null,
    } | null,
    subscription?:  {
      __typename: "CMSSubscription",
      adminID: string,
      amount: number,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      endDate: string,
      expireAt?: number | null,
      id: string,
      isActive: boolean,
      paymentMethod?: PaymentMethod | null,
      startDate: string,
      transactionID?: string | null,
      updatedAt: string,
    } | null,
    transactions?:  {
      __typename: "ModelTransactionConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    vehicles?:  {
      __typename: "ModelCircleVehiclesConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateCircleMembersSubscriptionVariables = {
  filter?: ModelSubscriptionCircleMembersFilterInput | null,
};

export type OnCreateCircleMembersSubscription = {
  onCreateCircleMembers?:  {
    __typename: "CircleMembers",
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    circleId: string,
    createdAt: string,
    expireAt?: number | null,
    member?:  {
      __typename: "Member",
      adminEmailId: string,
      adminID: string,
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      lastSeen?: string | null,
      memberRole: MemberRole,
      name: string,
      phoneNumber: string,
      profilePicUrl?: string | null,
      share?: number | null,
      status: MemberStatus,
      updatedAt: string,
    } | null,
    memberID: string,
    memberId: string,
    memberName: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCircleVehiclesSubscriptionVariables = {
  filter?: ModelSubscriptionCircleVehiclesFilterInput | null,
};

export type OnCreateCircleVehiclesSubscription = {
  onCreateCircleVehicles?:  {
    __typename: "CircleVehicles",
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    circleId: string,
    createdAt: string,
    expireAt?: number | null,
    updatedAt: string,
    vehicle?:  {
      __typename: "Vehicle",
      adminEmailId: string,
      adminID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      updatedAt: string,
      vehicleCapacity?: number | null,
      vehicleColor: string,
      vehicleModel?: string | null,
      vehicleName: string,
      vehicleNumber: string,
      vehiclePicUrl?: string | null,
      vehicleStatus: VehicleStatus,
      vehicleType: VehicleType,
    } | null,
    vehicleID: string,
    vehicleId: string,
    vehicleNumber: string,
  } | null,
};

export type OnCreateCitySubscriptionVariables = {
  filter?: ModelSubscriptionCityFilterInput | null,
};

export type OnCreateCitySubscription = {
  onCreateCity?:  {
    __typename: "City",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    customers?:  {
      __typename: "ModelCustomerConnection",
      nextToken?: string | null,
    } | null,
    expireAt?: number | null,
    id: string,
    name: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCustomerSubscriptionVariables = {
  filter?: ModelSubscriptionCustomerFilterInput | null,
};

export type OnCreateCustomerSubscription = {
  onCreateCustomer?:  {
    __typename: "Customer",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    city?:  {
      __typename: "City",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    cityAdminID: string,
    cityID: string,
    createdAt: string,
    customerStatus?: CustomerStatus | null,
    customers:  Array< {
      __typename: "CustomerPersonalDetails",
      address: string,
      customerName: string,
      customerPicUrl?: string | null,
      phone: string,
      uId: string,
    } >,
    dateOfCreation: string,
    documents?:  {
      __typename: "CustomerDocuments",
      addressProof?: boolean | null,
      addressProofType?: CustomerDocumentsAddressProofType | null,
      documentsVerifiedAt?: string | null,
      documentsVerifiedBy?: string | null,
      emptyCheque?: boolean | null,
      emptyChequeNumber?: string | null,
      idProof?: boolean | null,
      idProofType?: CustomerDocumentsIdProofType | null,
      otherDocuments?: Array< string | null > | null,
      photographSubmitted?: boolean | null,
      promissoryNote?: boolean | null,
      promissoryNoteNumber?: string | null,
      remarks?: string | null,
    } | null,
    expireAt?: number | null,
    groupName?: string | null,
    guarantorDetails?: string | null,
    id: string,
    installmentPaymentInfo?:  {
      __typename: "InstallmentPaymentDetails",
      installmentAmount: number,
      installmentID: string,
      loanSerial: string,
      paidAmount: number,
      paidDate: string,
    } | null,
    isGroupLoan: boolean,
    loanSerial: Array< string | null >,
    loans?:  {
      __typename: "ModelLoanConnection",
      nextToken?: string | null,
    } | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    newLoanInfo?:  {
      __typename: "NewLoanInformation",
      givenDate: string,
      loanID: string,
      loanSerial: string,
      totalGivenAmount: number,
    } | null,
    oldLoanInfo?:  {
      __typename: "OldLoanDetails",
      closedDate: string,
      loanID: string,
      loanSerial: string,
      totalCollectedAmount: number,
    } | null,
    updatedAt: string,
    visitedOn?: string | null,
  } | null,
};

export type OnCreateIncomeAndExpenseSubscriptionVariables = {
  filter?: ModelSubscriptionIncomeAndExpenseFilterInput | null,
};

export type OnCreateIncomeAndExpenseSubscription = {
  onCreateIncomeAndExpense?:  {
    __typename: "IncomeAndExpense",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    amount: number,
    belongsTo: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    date: string,
    description: string,
    expireAt?: number | null,
    id: string,
    incomeOrExpenseType: IncomeOrExpenseType,
    initialAmount?: number | null,
    interestRate?: number | null,
    name: string,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type OnCreateInstallmentSubscriptionVariables = {
  filter?: ModelSubscriptionInstallmentFilterInput | null,
};

export type OnCreateInstallmentSubscription = {
  onCreateInstallment?:  {
    __typename: "Installment",
    adminID: string,
    circleID: string,
    city: string,
    collectionAgentDetails?:  {
      __typename: "CollectionAgentDetails",
      agentID: string,
      name: string,
      phoneNumber: string,
    } | null,
    createdAt: string,
    customerName: string,
    description?: string | null,
    dueDate: string,
    expireAt?: number | null,
    id: string,
    initialAmount?: number | null,
    installmentAmount: number,
    installmentNumber: number,
    isExtraInstallment?: boolean | null,
    loan?:  {
      __typename: "Loan",
      adminID: string,
      circleID: string,
      collectibleAmount: number,
      createdAt: string,
      customerAdminID?: string | null,
      customerID?: string | null,
      dateOfCreation: string,
      endDate: string,
      expireAt?: number | null,
      givenAmount: number,
      id: string,
      initialCollectibleAmount?: number | null,
      initialGivenAmount?: number | null,
      installmentAmount: number,
      installmentType: InstallmentType,
      loanSerial: string,
      nextDueDate: string,
      paidAmount: number,
      paidInstallments: number,
      reasonForLoanTermination?: string | null,
      status: LoanStatus,
      totalInstallments: number,
      updatedAt: string,
      updatedDate?: string | null,
    } | null,
    loanAdminID: string,
    loanID: string,
    loanSerial: string,
    paidAmount?: number | null,
    paidDate?: string | null,
    paymentMethod?: PaymentMethod | null,
    status: InstallmentStatus,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type OnCreateLoanSubscriptionVariables = {
  filter?: ModelSubscriptionLoanFilterInput | null,
};

export type OnCreateLoanSubscription = {
  onCreateLoan?:  {
    __typename: "Loan",
    adminID: string,
    circleID: string,
    collectibleAmount: number,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      cityAdminID: string,
      cityID: string,
      createdAt: string,
      customerStatus?: CustomerStatus | null,
      dateOfCreation: string,
      expireAt?: number | null,
      groupName?: string | null,
      guarantorDetails?: string | null,
      id: string,
      isGroupLoan: boolean,
      loanSerial: Array< string | null >,
      updatedAt: string,
      visitedOn?: string | null,
    } | null,
    customerAdminID?: string | null,
    customerID?: string | null,
    dateOfCreation: string,
    endDate: string,
    expireAt?: number | null,
    givenAmount: number,
    id: string,
    initialCollectibleAmount?: number | null,
    initialGivenAmount?: number | null,
    installmentAmount: number,
    installmentType: InstallmentType,
    installments?:  {
      __typename: "ModelInstallmentConnection",
      nextToken?: string | null,
    } | null,
    loanSerial: string,
    nextDueDate: string,
    paidAmount: number,
    paidInstallments: number,
    reasonForLoanTermination?: string | null,
    status: LoanStatus,
    totalInstallments: number,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type OnCreateLoanSerialNumberSubscriptionVariables = {
  filter?: ModelSubscriptionLoanSerialNumberFilterInput | null,
};

export type OnCreateLoanSerialNumberSubscription = {
  onCreateLoanSerialNumber?:  {
    __typename: "LoanSerialNumber",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    expireAt?: number | null,
    id: string,
    serialNumber: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMemberSubscriptionVariables = {
  filter?: ModelSubscriptionMemberFilterInput | null,
};

export type OnCreateMemberSubscription = {
  onCreateMember?:  {
    __typename: "Member",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circle?:  {
      __typename: "ModelCircleMembersConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    emailId: string,
    expireAt?: number | null,
    id: string,
    lastSeen?: string | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    memberRole: MemberRole,
    name: string,
    phoneNumber: string,
    profilePicUrl?: string | null,
    share?: number | null,
    status: MemberStatus,
    updatedAt: string,
  } | null,
};

export type OnCreateTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionTransactionFilterInput | null,
};

export type OnCreateTransactionSubscription = {
  onCreateTransaction?:  {
    __typename: "Transaction",
    additionalInfo:  {
      __typename: "AdditionalTransactionInfo",
      city?: string | null,
      customerName?: string | null,
      description: string,
      loanId?: string | null,
      loanSerial?: string | null,
      memberID?: string | null,
      memberName?: string | null,
      oldLoanAmount?: number | null,
      oldLoanSerial?: string | null,
      paymentMethod: PaymentMethod,
      totalOutstandingAmount?: number | null,
      transactionEvent: TransactionEventType,
    },
    adminID: string,
    amount: number,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    dateTime: string,
    expireAt?: number | null,
    id: string,
    initialAmount?: number | null,
    transactionType: TransactionType,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type OnCreateVehicleSubscriptionVariables = {
  filter?: ModelSubscriptionVehicleFilterInput | null,
};

export type OnCreateVehicleSubscription = {
  onCreateVehicle?:  {
    __typename: "Vehicle",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circles?:  {
      __typename: "ModelCircleVehiclesConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    expireAt?: number | null,
    id: string,
    updatedAt: string,
    vehicleCapacity?: number | null,
    vehicleColor: string,
    vehicleModel?: string | null,
    vehicleName: string,
    vehicleNumber: string,
    vehiclePicUrl?: string | null,
    vehicleStatus: VehicleStatus,
    vehicleType: VehicleType,
  } | null,
};

export type OnDeleteAdminSubscriptionVariables = {
  filter?: ModelSubscriptionAdminFilterInput | null,
  owner?: string | null,
};

export type OnDeleteAdminSubscription = {
  onDeleteAdmin?:  {
    __typename: "Admin",
    businessInformation?:  {
      __typename: "BusinessInformation",
      businessAddress: string,
      businessEmail?: string | null,
      businessName: string,
      businessPhoneNumber: string,
      licenseNumber?: string | null,
      profilepPicUrl?: string | null,
      regulatoryBody?: string | null,
    } | null,
    cashAccount?:  {
      __typename: "ModelCashAccountConnection",
      nextToken?: string | null,
    } | null,
    circles?:  {
      __typename: "ModelCircleConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    emailId: string,
    expireAt?: number | null,
    id: string,
    incomeAndExpense?:  {
      __typename: "ModelIncomeAndExpenseConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelMemberConnection",
      nextToken?: string | null,
    } | null,
    name: string,
    owner: string,
    phoneNumber: string,
    updatedAt: string,
    vehicles?:  {
      __typename: "ModelVehicleConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteCMSSubscriptionSubscriptionVariables = {
  filter?: ModelSubscriptionCMSSubscriptionFilterInput | null,
};

export type OnDeleteCMSSubscriptionSubscription = {
  onDeleteCMSSubscription?:  {
    __typename: "CMSSubscription",
    adminID: string,
    amount: number,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    endDate: string,
    expireAt?: number | null,
    id: string,
    isActive: boolean,
    paymentMethod?: PaymentMethod | null,
    startDate: string,
    transactionID?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteCashAccountSubscriptionVariables = {
  filter?: ModelSubscriptionCashAccountFilterInput | null,
};

export type OnDeleteCashAccountSubscription = {
  onDeleteCashAccount?:  {
    __typename: "CashAccount",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    cashflowIn: number,
    cashflowOut: number,
    circleID: string,
    closingBalance: number,
    closingEntryDate: string,
    closingSnapshot:  {
      __typename: "ClosingSnapshot",
      chits: number,
      deficit: number,
      excessCollection: number,
      expenses: number,
      incomes: number,
      interest: number,
      investments: number,
      loansGiven: number,
      repayments: number,
      withdrawals: number,
    },
    createdAt: string,
    description?: string | null,
    expireAt?: number | null,
    id: string,
    openingBalance: number,
    openingEntryDate: string,
    outstandingAmount: number,
    simplifiedTransactions: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCircleSubscriptionVariables = {
  filter?: ModelSubscriptionCircleFilterInput | null,
};

export type OnDeleteCircleSubscription = {
  onDeleteCircle?:  {
    __typename: "Circle",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circleName: string,
    circlePicUrl?: string | null,
    cities?:  {
      __typename: "ModelCityConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    customers?:  {
      __typename: "ModelCustomerConnection",
      nextToken?: string | null,
    } | null,
    dateOfCreation: string,
    day: Weekday,
    expireAt?: number | null,
    id: string,
    incomeAndExpenses?:  {
      __typename: "ModelIncomeAndExpenseConnection",
      nextToken?: string | null,
    } | null,
    isLocked?: boolean | null,
    loanSerialNumber?:  {
      __typename: "LoanSerialNumber",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      serialNumber: string,
      updatedAt: string,
    } | null,
    members?:  {
      __typename: "ModelCircleMembersConnection",
      nextToken?: string | null,
    } | null,
    subscription?:  {
      __typename: "CMSSubscription",
      adminID: string,
      amount: number,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      endDate: string,
      expireAt?: number | null,
      id: string,
      isActive: boolean,
      paymentMethod?: PaymentMethod | null,
      startDate: string,
      transactionID?: string | null,
      updatedAt: string,
    } | null,
    transactions?:  {
      __typename: "ModelTransactionConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    vehicles?:  {
      __typename: "ModelCircleVehiclesConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteCircleMembersSubscriptionVariables = {
  filter?: ModelSubscriptionCircleMembersFilterInput | null,
};

export type OnDeleteCircleMembersSubscription = {
  onDeleteCircleMembers?:  {
    __typename: "CircleMembers",
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    circleId: string,
    createdAt: string,
    expireAt?: number | null,
    member?:  {
      __typename: "Member",
      adminEmailId: string,
      adminID: string,
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      lastSeen?: string | null,
      memberRole: MemberRole,
      name: string,
      phoneNumber: string,
      profilePicUrl?: string | null,
      share?: number | null,
      status: MemberStatus,
      updatedAt: string,
    } | null,
    memberID: string,
    memberId: string,
    memberName: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCircleVehiclesSubscriptionVariables = {
  filter?: ModelSubscriptionCircleVehiclesFilterInput | null,
};

export type OnDeleteCircleVehiclesSubscription = {
  onDeleteCircleVehicles?:  {
    __typename: "CircleVehicles",
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    circleId: string,
    createdAt: string,
    expireAt?: number | null,
    updatedAt: string,
    vehicle?:  {
      __typename: "Vehicle",
      adminEmailId: string,
      adminID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      updatedAt: string,
      vehicleCapacity?: number | null,
      vehicleColor: string,
      vehicleModel?: string | null,
      vehicleName: string,
      vehicleNumber: string,
      vehiclePicUrl?: string | null,
      vehicleStatus: VehicleStatus,
      vehicleType: VehicleType,
    } | null,
    vehicleID: string,
    vehicleId: string,
    vehicleNumber: string,
  } | null,
};

export type OnDeleteCitySubscriptionVariables = {
  filter?: ModelSubscriptionCityFilterInput | null,
};

export type OnDeleteCitySubscription = {
  onDeleteCity?:  {
    __typename: "City",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    customers?:  {
      __typename: "ModelCustomerConnection",
      nextToken?: string | null,
    } | null,
    expireAt?: number | null,
    id: string,
    name: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCustomerSubscriptionVariables = {
  filter?: ModelSubscriptionCustomerFilterInput | null,
};

export type OnDeleteCustomerSubscription = {
  onDeleteCustomer?:  {
    __typename: "Customer",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    city?:  {
      __typename: "City",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    cityAdminID: string,
    cityID: string,
    createdAt: string,
    customerStatus?: CustomerStatus | null,
    customers:  Array< {
      __typename: "CustomerPersonalDetails",
      address: string,
      customerName: string,
      customerPicUrl?: string | null,
      phone: string,
      uId: string,
    } >,
    dateOfCreation: string,
    documents?:  {
      __typename: "CustomerDocuments",
      addressProof?: boolean | null,
      addressProofType?: CustomerDocumentsAddressProofType | null,
      documentsVerifiedAt?: string | null,
      documentsVerifiedBy?: string | null,
      emptyCheque?: boolean | null,
      emptyChequeNumber?: string | null,
      idProof?: boolean | null,
      idProofType?: CustomerDocumentsIdProofType | null,
      otherDocuments?: Array< string | null > | null,
      photographSubmitted?: boolean | null,
      promissoryNote?: boolean | null,
      promissoryNoteNumber?: string | null,
      remarks?: string | null,
    } | null,
    expireAt?: number | null,
    groupName?: string | null,
    guarantorDetails?: string | null,
    id: string,
    installmentPaymentInfo?:  {
      __typename: "InstallmentPaymentDetails",
      installmentAmount: number,
      installmentID: string,
      loanSerial: string,
      paidAmount: number,
      paidDate: string,
    } | null,
    isGroupLoan: boolean,
    loanSerial: Array< string | null >,
    loans?:  {
      __typename: "ModelLoanConnection",
      nextToken?: string | null,
    } | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    newLoanInfo?:  {
      __typename: "NewLoanInformation",
      givenDate: string,
      loanID: string,
      loanSerial: string,
      totalGivenAmount: number,
    } | null,
    oldLoanInfo?:  {
      __typename: "OldLoanDetails",
      closedDate: string,
      loanID: string,
      loanSerial: string,
      totalCollectedAmount: number,
    } | null,
    updatedAt: string,
    visitedOn?: string | null,
  } | null,
};

export type OnDeleteIncomeAndExpenseSubscriptionVariables = {
  filter?: ModelSubscriptionIncomeAndExpenseFilterInput | null,
};

export type OnDeleteIncomeAndExpenseSubscription = {
  onDeleteIncomeAndExpense?:  {
    __typename: "IncomeAndExpense",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    amount: number,
    belongsTo: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    date: string,
    description: string,
    expireAt?: number | null,
    id: string,
    incomeOrExpenseType: IncomeOrExpenseType,
    initialAmount?: number | null,
    interestRate?: number | null,
    name: string,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type OnDeleteInstallmentSubscriptionVariables = {
  filter?: ModelSubscriptionInstallmentFilterInput | null,
};

export type OnDeleteInstallmentSubscription = {
  onDeleteInstallment?:  {
    __typename: "Installment",
    adminID: string,
    circleID: string,
    city: string,
    collectionAgentDetails?:  {
      __typename: "CollectionAgentDetails",
      agentID: string,
      name: string,
      phoneNumber: string,
    } | null,
    createdAt: string,
    customerName: string,
    description?: string | null,
    dueDate: string,
    expireAt?: number | null,
    id: string,
    initialAmount?: number | null,
    installmentAmount: number,
    installmentNumber: number,
    isExtraInstallment?: boolean | null,
    loan?:  {
      __typename: "Loan",
      adminID: string,
      circleID: string,
      collectibleAmount: number,
      createdAt: string,
      customerAdminID?: string | null,
      customerID?: string | null,
      dateOfCreation: string,
      endDate: string,
      expireAt?: number | null,
      givenAmount: number,
      id: string,
      initialCollectibleAmount?: number | null,
      initialGivenAmount?: number | null,
      installmentAmount: number,
      installmentType: InstallmentType,
      loanSerial: string,
      nextDueDate: string,
      paidAmount: number,
      paidInstallments: number,
      reasonForLoanTermination?: string | null,
      status: LoanStatus,
      totalInstallments: number,
      updatedAt: string,
      updatedDate?: string | null,
    } | null,
    loanAdminID: string,
    loanID: string,
    loanSerial: string,
    paidAmount?: number | null,
    paidDate?: string | null,
    paymentMethod?: PaymentMethod | null,
    status: InstallmentStatus,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type OnDeleteLoanSubscriptionVariables = {
  filter?: ModelSubscriptionLoanFilterInput | null,
};

export type OnDeleteLoanSubscription = {
  onDeleteLoan?:  {
    __typename: "Loan",
    adminID: string,
    circleID: string,
    collectibleAmount: number,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      cityAdminID: string,
      cityID: string,
      createdAt: string,
      customerStatus?: CustomerStatus | null,
      dateOfCreation: string,
      expireAt?: number | null,
      groupName?: string | null,
      guarantorDetails?: string | null,
      id: string,
      isGroupLoan: boolean,
      loanSerial: Array< string | null >,
      updatedAt: string,
      visitedOn?: string | null,
    } | null,
    customerAdminID?: string | null,
    customerID?: string | null,
    dateOfCreation: string,
    endDate: string,
    expireAt?: number | null,
    givenAmount: number,
    id: string,
    initialCollectibleAmount?: number | null,
    initialGivenAmount?: number | null,
    installmentAmount: number,
    installmentType: InstallmentType,
    installments?:  {
      __typename: "ModelInstallmentConnection",
      nextToken?: string | null,
    } | null,
    loanSerial: string,
    nextDueDate: string,
    paidAmount: number,
    paidInstallments: number,
    reasonForLoanTermination?: string | null,
    status: LoanStatus,
    totalInstallments: number,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type OnDeleteLoanSerialNumberSubscriptionVariables = {
  filter?: ModelSubscriptionLoanSerialNumberFilterInput | null,
};

export type OnDeleteLoanSerialNumberSubscription = {
  onDeleteLoanSerialNumber?:  {
    __typename: "LoanSerialNumber",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    expireAt?: number | null,
    id: string,
    serialNumber: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMemberSubscriptionVariables = {
  filter?: ModelSubscriptionMemberFilterInput | null,
};

export type OnDeleteMemberSubscription = {
  onDeleteMember?:  {
    __typename: "Member",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circle?:  {
      __typename: "ModelCircleMembersConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    emailId: string,
    expireAt?: number | null,
    id: string,
    lastSeen?: string | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    memberRole: MemberRole,
    name: string,
    phoneNumber: string,
    profilePicUrl?: string | null,
    share?: number | null,
    status: MemberStatus,
    updatedAt: string,
  } | null,
};

export type OnDeleteTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionTransactionFilterInput | null,
};

export type OnDeleteTransactionSubscription = {
  onDeleteTransaction?:  {
    __typename: "Transaction",
    additionalInfo:  {
      __typename: "AdditionalTransactionInfo",
      city?: string | null,
      customerName?: string | null,
      description: string,
      loanId?: string | null,
      loanSerial?: string | null,
      memberID?: string | null,
      memberName?: string | null,
      oldLoanAmount?: number | null,
      oldLoanSerial?: string | null,
      paymentMethod: PaymentMethod,
      totalOutstandingAmount?: number | null,
      transactionEvent: TransactionEventType,
    },
    adminID: string,
    amount: number,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    dateTime: string,
    expireAt?: number | null,
    id: string,
    initialAmount?: number | null,
    transactionType: TransactionType,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type OnDeleteVehicleSubscriptionVariables = {
  filter?: ModelSubscriptionVehicleFilterInput | null,
};

export type OnDeleteVehicleSubscription = {
  onDeleteVehicle?:  {
    __typename: "Vehicle",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circles?:  {
      __typename: "ModelCircleVehiclesConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    expireAt?: number | null,
    id: string,
    updatedAt: string,
    vehicleCapacity?: number | null,
    vehicleColor: string,
    vehicleModel?: string | null,
    vehicleName: string,
    vehicleNumber: string,
    vehiclePicUrl?: string | null,
    vehicleStatus: VehicleStatus,
    vehicleType: VehicleType,
  } | null,
};

export type OnUpdateAdminSubscriptionVariables = {
  filter?: ModelSubscriptionAdminFilterInput | null,
  owner?: string | null,
};

export type OnUpdateAdminSubscription = {
  onUpdateAdmin?:  {
    __typename: "Admin",
    businessInformation?:  {
      __typename: "BusinessInformation",
      businessAddress: string,
      businessEmail?: string | null,
      businessName: string,
      businessPhoneNumber: string,
      licenseNumber?: string | null,
      profilepPicUrl?: string | null,
      regulatoryBody?: string | null,
    } | null,
    cashAccount?:  {
      __typename: "ModelCashAccountConnection",
      nextToken?: string | null,
    } | null,
    circles?:  {
      __typename: "ModelCircleConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    emailId: string,
    expireAt?: number | null,
    id: string,
    incomeAndExpense?:  {
      __typename: "ModelIncomeAndExpenseConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelMemberConnection",
      nextToken?: string | null,
    } | null,
    name: string,
    owner: string,
    phoneNumber: string,
    updatedAt: string,
    vehicles?:  {
      __typename: "ModelVehicleConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateCMSSubscriptionSubscriptionVariables = {
  filter?: ModelSubscriptionCMSSubscriptionFilterInput | null,
};

export type OnUpdateCMSSubscriptionSubscription = {
  onUpdateCMSSubscription?:  {
    __typename: "CMSSubscription",
    adminID: string,
    amount: number,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    endDate: string,
    expireAt?: number | null,
    id: string,
    isActive: boolean,
    paymentMethod?: PaymentMethod | null,
    startDate: string,
    transactionID?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateCashAccountSubscriptionVariables = {
  filter?: ModelSubscriptionCashAccountFilterInput | null,
};

export type OnUpdateCashAccountSubscription = {
  onUpdateCashAccount?:  {
    __typename: "CashAccount",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    cashflowIn: number,
    cashflowOut: number,
    circleID: string,
    closingBalance: number,
    closingEntryDate: string,
    closingSnapshot:  {
      __typename: "ClosingSnapshot",
      chits: number,
      deficit: number,
      excessCollection: number,
      expenses: number,
      incomes: number,
      interest: number,
      investments: number,
      loansGiven: number,
      repayments: number,
      withdrawals: number,
    },
    createdAt: string,
    description?: string | null,
    expireAt?: number | null,
    id: string,
    openingBalance: number,
    openingEntryDate: string,
    outstandingAmount: number,
    simplifiedTransactions: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCircleSubscriptionVariables = {
  filter?: ModelSubscriptionCircleFilterInput | null,
};

export type OnUpdateCircleSubscription = {
  onUpdateCircle?:  {
    __typename: "Circle",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circleName: string,
    circlePicUrl?: string | null,
    cities?:  {
      __typename: "ModelCityConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    customers?:  {
      __typename: "ModelCustomerConnection",
      nextToken?: string | null,
    } | null,
    dateOfCreation: string,
    day: Weekday,
    expireAt?: number | null,
    id: string,
    incomeAndExpenses?:  {
      __typename: "ModelIncomeAndExpenseConnection",
      nextToken?: string | null,
    } | null,
    isLocked?: boolean | null,
    loanSerialNumber?:  {
      __typename: "LoanSerialNumber",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      serialNumber: string,
      updatedAt: string,
    } | null,
    members?:  {
      __typename: "ModelCircleMembersConnection",
      nextToken?: string | null,
    } | null,
    subscription?:  {
      __typename: "CMSSubscription",
      adminID: string,
      amount: number,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      endDate: string,
      expireAt?: number | null,
      id: string,
      isActive: boolean,
      paymentMethod?: PaymentMethod | null,
      startDate: string,
      transactionID?: string | null,
      updatedAt: string,
    } | null,
    transactions?:  {
      __typename: "ModelTransactionConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    vehicles?:  {
      __typename: "ModelCircleVehiclesConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateCircleMembersSubscriptionVariables = {
  filter?: ModelSubscriptionCircleMembersFilterInput | null,
};

export type OnUpdateCircleMembersSubscription = {
  onUpdateCircleMembers?:  {
    __typename: "CircleMembers",
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    circleId: string,
    createdAt: string,
    expireAt?: number | null,
    member?:  {
      __typename: "Member",
      adminEmailId: string,
      adminID: string,
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      lastSeen?: string | null,
      memberRole: MemberRole,
      name: string,
      phoneNumber: string,
      profilePicUrl?: string | null,
      share?: number | null,
      status: MemberStatus,
      updatedAt: string,
    } | null,
    memberID: string,
    memberId: string,
    memberName: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCircleVehiclesSubscriptionVariables = {
  filter?: ModelSubscriptionCircleVehiclesFilterInput | null,
};

export type OnUpdateCircleVehiclesSubscription = {
  onUpdateCircleVehicles?:  {
    __typename: "CircleVehicles",
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    circleId: string,
    createdAt: string,
    expireAt?: number | null,
    updatedAt: string,
    vehicle?:  {
      __typename: "Vehicle",
      adminEmailId: string,
      adminID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      updatedAt: string,
      vehicleCapacity?: number | null,
      vehicleColor: string,
      vehicleModel?: string | null,
      vehicleName: string,
      vehicleNumber: string,
      vehiclePicUrl?: string | null,
      vehicleStatus: VehicleStatus,
      vehicleType: VehicleType,
    } | null,
    vehicleID: string,
    vehicleId: string,
    vehicleNumber: string,
  } | null,
};

export type OnUpdateCitySubscriptionVariables = {
  filter?: ModelSubscriptionCityFilterInput | null,
};

export type OnUpdateCitySubscription = {
  onUpdateCity?:  {
    __typename: "City",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    customers?:  {
      __typename: "ModelCustomerConnection",
      nextToken?: string | null,
    } | null,
    expireAt?: number | null,
    id: string,
    name: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCustomerSubscriptionVariables = {
  filter?: ModelSubscriptionCustomerFilterInput | null,
};

export type OnUpdateCustomerSubscription = {
  onUpdateCustomer?:  {
    __typename: "Customer",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    city?:  {
      __typename: "City",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      createdAt: string,
      expireAt?: number | null,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    cityAdminID: string,
    cityID: string,
    createdAt: string,
    customerStatus?: CustomerStatus | null,
    customers:  Array< {
      __typename: "CustomerPersonalDetails",
      address: string,
      customerName: string,
      customerPicUrl?: string | null,
      phone: string,
      uId: string,
    } >,
    dateOfCreation: string,
    documents?:  {
      __typename: "CustomerDocuments",
      addressProof?: boolean | null,
      addressProofType?: CustomerDocumentsAddressProofType | null,
      documentsVerifiedAt?: string | null,
      documentsVerifiedBy?: string | null,
      emptyCheque?: boolean | null,
      emptyChequeNumber?: string | null,
      idProof?: boolean | null,
      idProofType?: CustomerDocumentsIdProofType | null,
      otherDocuments?: Array< string | null > | null,
      photographSubmitted?: boolean | null,
      promissoryNote?: boolean | null,
      promissoryNoteNumber?: string | null,
      remarks?: string | null,
    } | null,
    expireAt?: number | null,
    groupName?: string | null,
    guarantorDetails?: string | null,
    id: string,
    installmentPaymentInfo?:  {
      __typename: "InstallmentPaymentDetails",
      installmentAmount: number,
      installmentID: string,
      loanSerial: string,
      paidAmount: number,
      paidDate: string,
    } | null,
    isGroupLoan: boolean,
    loanSerial: Array< string | null >,
    loans?:  {
      __typename: "ModelLoanConnection",
      nextToken?: string | null,
    } | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    newLoanInfo?:  {
      __typename: "NewLoanInformation",
      givenDate: string,
      loanID: string,
      loanSerial: string,
      totalGivenAmount: number,
    } | null,
    oldLoanInfo?:  {
      __typename: "OldLoanDetails",
      closedDate: string,
      loanID: string,
      loanSerial: string,
      totalCollectedAmount: number,
    } | null,
    updatedAt: string,
    visitedOn?: string | null,
  } | null,
};

export type OnUpdateIncomeAndExpenseSubscriptionVariables = {
  filter?: ModelSubscriptionIncomeAndExpenseFilterInput | null,
};

export type OnUpdateIncomeAndExpenseSubscription = {
  onUpdateIncomeAndExpense?:  {
    __typename: "IncomeAndExpense",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    amount: number,
    belongsTo: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    date: string,
    description: string,
    expireAt?: number | null,
    id: string,
    incomeOrExpenseType: IncomeOrExpenseType,
    initialAmount?: number | null,
    interestRate?: number | null,
    name: string,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type OnUpdateInstallmentSubscriptionVariables = {
  filter?: ModelSubscriptionInstallmentFilterInput | null,
};

export type OnUpdateInstallmentSubscription = {
  onUpdateInstallment?:  {
    __typename: "Installment",
    adminID: string,
    circleID: string,
    city: string,
    collectionAgentDetails?:  {
      __typename: "CollectionAgentDetails",
      agentID: string,
      name: string,
      phoneNumber: string,
    } | null,
    createdAt: string,
    customerName: string,
    description?: string | null,
    dueDate: string,
    expireAt?: number | null,
    id: string,
    initialAmount?: number | null,
    installmentAmount: number,
    installmentNumber: number,
    isExtraInstallment?: boolean | null,
    loan?:  {
      __typename: "Loan",
      adminID: string,
      circleID: string,
      collectibleAmount: number,
      createdAt: string,
      customerAdminID?: string | null,
      customerID?: string | null,
      dateOfCreation: string,
      endDate: string,
      expireAt?: number | null,
      givenAmount: number,
      id: string,
      initialCollectibleAmount?: number | null,
      initialGivenAmount?: number | null,
      installmentAmount: number,
      installmentType: InstallmentType,
      loanSerial: string,
      nextDueDate: string,
      paidAmount: number,
      paidInstallments: number,
      reasonForLoanTermination?: string | null,
      status: LoanStatus,
      totalInstallments: number,
      updatedAt: string,
      updatedDate?: string | null,
    } | null,
    loanAdminID: string,
    loanID: string,
    loanSerial: string,
    paidAmount?: number | null,
    paidDate?: string | null,
    paymentMethod?: PaymentMethod | null,
    status: InstallmentStatus,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type OnUpdateLoanSubscriptionVariables = {
  filter?: ModelSubscriptionLoanFilterInput | null,
};

export type OnUpdateLoanSubscription = {
  onUpdateLoan?:  {
    __typename: "Loan",
    adminID: string,
    circleID: string,
    collectibleAmount: number,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      adminID: string,
      circleDateOfCreation: string,
      circleID: string,
      cityAdminID: string,
      cityID: string,
      createdAt: string,
      customerStatus?: CustomerStatus | null,
      dateOfCreation: string,
      expireAt?: number | null,
      groupName?: string | null,
      guarantorDetails?: string | null,
      id: string,
      isGroupLoan: boolean,
      loanSerial: Array< string | null >,
      updatedAt: string,
      visitedOn?: string | null,
    } | null,
    customerAdminID?: string | null,
    customerID?: string | null,
    dateOfCreation: string,
    endDate: string,
    expireAt?: number | null,
    givenAmount: number,
    id: string,
    initialCollectibleAmount?: number | null,
    initialGivenAmount?: number | null,
    installmentAmount: number,
    installmentType: InstallmentType,
    installments?:  {
      __typename: "ModelInstallmentConnection",
      nextToken?: string | null,
    } | null,
    loanSerial: string,
    nextDueDate: string,
    paidAmount: number,
    paidInstallments: number,
    reasonForLoanTermination?: string | null,
    status: LoanStatus,
    totalInstallments: number,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type OnUpdateLoanSerialNumberSubscriptionVariables = {
  filter?: ModelSubscriptionLoanSerialNumberFilterInput | null,
};

export type OnUpdateLoanSerialNumberSubscription = {
  onUpdateLoanSerialNumber?:  {
    __typename: "LoanSerialNumber",
    adminID: string,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    expireAt?: number | null,
    id: string,
    serialNumber: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMemberSubscriptionVariables = {
  filter?: ModelSubscriptionMemberFilterInput | null,
};

export type OnUpdateMemberSubscription = {
  onUpdateMember?:  {
    __typename: "Member",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circle?:  {
      __typename: "ModelCircleMembersConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    emailId: string,
    expireAt?: number | null,
    id: string,
    lastSeen?: string | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    memberRole: MemberRole,
    name: string,
    phoneNumber: string,
    profilePicUrl?: string | null,
    share?: number | null,
    status: MemberStatus,
    updatedAt: string,
  } | null,
};

export type OnUpdateTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionTransactionFilterInput | null,
};

export type OnUpdateTransactionSubscription = {
  onUpdateTransaction?:  {
    __typename: "Transaction",
    additionalInfo:  {
      __typename: "AdditionalTransactionInfo",
      city?: string | null,
      customerName?: string | null,
      description: string,
      loanId?: string | null,
      loanSerial?: string | null,
      memberID?: string | null,
      memberName?: string | null,
      oldLoanAmount?: number | null,
      oldLoanSerial?: string | null,
      paymentMethod: PaymentMethod,
      totalOutstandingAmount?: number | null,
      transactionEvent: TransactionEventType,
    },
    adminID: string,
    amount: number,
    circle?:  {
      __typename: "Circle",
      adminEmailId: string,
      adminID: string,
      circleName: string,
      circlePicUrl?: string | null,
      createdAt: string,
      dateOfCreation: string,
      day: Weekday,
      expireAt?: number | null,
      id: string,
      isLocked?: boolean | null,
      updatedAt: string,
    } | null,
    circleDateOfCreation: string,
    circleID: string,
    createdAt: string,
    dateTime: string,
    expireAt?: number | null,
    id: string,
    initialAmount?: number | null,
    transactionType: TransactionType,
    updatedAt: string,
    updatedDate?: string | null,
  } | null,
};

export type OnUpdateVehicleSubscriptionVariables = {
  filter?: ModelSubscriptionVehicleFilterInput | null,
};

export type OnUpdateVehicleSubscription = {
  onUpdateVehicle?:  {
    __typename: "Vehicle",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      emailId: string,
      expireAt?: number | null,
      id: string,
      name: string,
      owner: string,
      phoneNumber: string,
      updatedAt: string,
    } | null,
    adminEmailId: string,
    adminID: string,
    circles?:  {
      __typename: "ModelCircleVehiclesConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    expireAt?: number | null,
    id: string,
    updatedAt: string,
    vehicleCapacity?: number | null,
    vehicleColor: string,
    vehicleModel?: string | null,
    vehicleName: string,
    vehicleNumber: string,
    vehiclePicUrl?: string | null,
    vehicleStatus: VehicleStatus,
    vehicleType: VehicleType,
  } | null,
};
