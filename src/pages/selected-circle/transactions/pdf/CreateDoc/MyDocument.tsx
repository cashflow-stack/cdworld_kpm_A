import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  Svg,
  Path,
} from "@react-pdf/renderer";
import cashflowLogo from "@/assets/cashflowLogo.png";
import Tenali from "@/assets/TenaliRamakrishna-Regular.ttf";
import PoppinsRegular from "@/assets/Poppins-Regular.ttf";
import PoppinsBold from "@/assets/Poppins-Bold.ttf";
import LatoRegular from "@/assets/Lato-Regular.ttf";
import LatoBold from "@/assets/Lato-Bold.ttf";
import { getFormattedDate } from "@/toolkit/helper/helperFunctions";
import {
  InstallmentPrintModel,
  LoanPrintModel,
} from "@/models/customModels/customModels";

// Register fonts outside the component
Font.register({
  family: "Lato",
  fonts: [
    { src: LatoRegular, fontStyle: "normal", fontWeight: "normal" },
    { src: LatoBold, fontStyle: "normal", fontWeight: "bold" },
  ],
});

Font.register({
  family: "Tenali",
  src: Tenali,
});

Font.register({
  family: "Poppins",
  fonts: [
    { src: PoppinsRegular, fontStyle: "normal", fontWeight: "normal" },
    { src: PoppinsBold, fontStyle: "normal", fontWeight: "bold" },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: 10,
    padding: 10,
    // flexGrow: 1,
  },
  section: {
    flexDirection: "row",
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    marginTop: 3,
    marginRight: 10,
    width: 45.93,
    height: 37.79,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#2B2B2B",
  },
  headingNormal: {
    fontSize: 18,
    fontWeight: "normal",
    fontFamily: "Poppins",
    color: "#2B2B2B",
  },
  description: {
    fontSize: 12,
    fontFamily: "Poppins",
  },
  tableHead: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Poppins",
    backgroundColor: "#006981",
    color: "#FFFFFF",
  },
  table: {
    width: "auto",
  },
  tableRow: {
    flexDirection: "row",
  },
  colSerial: {
    width: "5%", // Adjusted width for S.No column
  },
  colName: {
    width: "18%", // Increased width for Name column
  },
  colPhone: {
    width: "10%", // Adjusted width for Phone column
  },
  colAddress: {
    width: "15%", // Increased width for Address column
  },
  colOldId: {
    width: "7%", // Decreased width for Old ID column
  },
  colOldAmount: {
    width: "10%", // Adjusted width for Old Amount column
  },
  colTenure: {
    width: "10%", // Adjusted width for Tenure column
  },
  colGiven: {
    width: "10%", // Adjusted width for Given column
  },
  colInterest: {
    width: "10%", // Adjusted width for Interest column
  },
  colPayable: {
    width: "10%", // Adjusted width for Payable column
  },
  tableCell: {
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 3,
    marginRight: 3,
    fontSize: 10,
  },
});

type MyDocumentProps = {
  newLoans: LoanPrintModel[];
  newInstallments: InstallmentPrintModel[];
  circleName?: string;
  toDate?: string;
  fromDate?: string;
};

const MyDocument = React.memo(({ newLoans, newInstallments, circleName, fromDate, toDate }: MyDocumentProps) => {
  return (
    <Document
      title="Cashflow Statement"
      author="Surya Bhaskar Reddy"
      subject="Cashflow Statement for Different Circles"
    >
      {newLoans.length > 0 && (
        <Page size="A4" style={styles.page} orientation="landscape">
          <View style={styles.header}>
            <Image style={styles.image} src={cashflowLogo} />
            <View>
              <Text style={styles.heading}>
                Cashflow statement for{" "}
                {`${circleName?.[0]?.toUpperCase() || ""}${
                  circleName?.slice(1, 20)?.toLowerCase() || ""
                }`}{" "}
                Circle
              </Text>
              <Text style={styles.description}>
                {getFormattedDate(fromDate || "")} -{" "}
                {getFormattedDate(toDate || "")}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Svg width="15" height="40" style={{ marginLeft: 20 }}>
                <Path
                  // make a stringht line
                  d="M 1 1 L 1 40"
                  stroke="#006981"
                  strokeWidth={2}
                />
              </Svg>
              <Text style={[styles.headingNormal, { marginTop: 8 }]}>
                New Loans
              </Text>
            </View>
          </View>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHead]}>
              <View style={styles.colSerial}>
                <Text style={styles.tableCell}>S.No</Text>
              </View>
              <View style={styles.colName}>
                <Text style={styles.tableCell}>Name</Text>
              </View>
              <View style={styles.colPhone}>
                <Text style={styles.tableCell}>Phone</Text>
              </View>
              <View style={styles.colAddress}>
                <Text style={styles.tableCell}>Address</Text>
              </View>
              <View style={styles.colTenure}>
                <Text style={styles.tableCell}>Tenure</Text>
              </View>
              <View style={styles.colGiven}>
                <Text style={styles.tableCell}>Given</Text>
              </View>
              <View style={styles.colInterest}>
                <Text style={styles.tableCell}>Interest</Text>
              </View>
              <View style={styles.colPayable}>
                <Text style={styles.tableCell}>Payable</Text>
              </View>
              <View style={styles.colOldId}>
                <Text style={styles.tableCell}>Old S.No</Text>
              </View>
              <View style={styles.colOldAmount}>
                <Text style={styles.tableCell}>Old Amount</Text>
              </View>
            </View>
            <LoanView loanData={newLoans} />
          </View>
        </Page>
      )}
      {newInstallments.length > 0 && (
        <Page size="A4" style={styles.page} orientation="portrait">
          <View style={styles.header}>
            <Image style={styles.image} src={cashflowLogo} />
            <View>
              <Text style={styles.heading}>
                Cashflow statement for{" "}
                {`${circleName?.[0]?.toUpperCase() || ""}${
                  circleName?.slice(1, 20)?.toLowerCase() || ""
                }`}{" "}
                Circle
              </Text>
              <Text style={styles.description}>
                {getFormattedDate(fromDate || "")} -{" "}
                {getFormattedDate(toDate || "")}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Svg width="15" height="40" style={{ marginLeft: 20 }}>
                <Path
                  // make a stringht line
                  d="M 1 1 L 1 40"
                  stroke="#006981"
                  strokeWidth={2}
                />
              </Svg>
              <Text style={[styles.headingNormal, { marginTop: 8 }]}>
                Collection
              </Text>
            </View>
          </View>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHead]}>
              <View style={styles.colSerial}>
                <Text style={styles.tableCell}>S.No</Text>
              </View>
              <View style={styles.colName}>
                <Text style={styles.tableCell}>Name</Text>
              </View>
              <View style={styles.colAddress}>
                <Text style={styles.tableCell}>Address</Text>
              </View>
              <View style={styles.colGiven}>
                <Text style={styles.tableCell}>Amount</Text>
              </View>
              <View style={styles.colAddress}>
                <Text style={styles.tableCell}>Payment Type</Text>
              </View>
            </View>
            <InstallmentView installmentData={newInstallments} />
          </View>
        </Page>
      )}
    </Document>
  );
});

export default MyDocument;

const LoanView = ({ loanData }: { loanData: LoanPrintModel[] }) => {
  const totalgivenAmount = loanData.reduce(
    (acc, loan) => acc + loan.givenAmount,
    0
  );
  const totalInterest = loanData.reduce(
    (acc, loan) => acc + (loan.collectibleAmount - loan.givenAmount),
    0
  );
  const totalCollectibleAmount = loanData.reduce(
    (acc, loan) => acc + loan.collectibleAmount,
    0
  );
  return (
    <>
      {loanData.map((loan, index) => (
        <View style={styles.tableRow} key={index}>
          <View style={styles.colSerial}>
            <Text style={styles.tableCell}>{loan.loanSerial}</Text>
          </View>
          <View style={styles.colName}>
            <Text
              style={[
                styles.tableCell,
                { fontFamily: "Tenali", fontSize: "12" },
              ]}
            >
              {loan.customerName}
            </Text>
          </View>
          <View style={styles.colPhone}>
            <Text style={styles.tableCell}>{loan.customerPhone}</Text>
          </View>
          <View style={styles.colAddress}>
            <Text
              style={[
                styles.tableCell,
                { fontFamily: "Tenali", fontSize: "12" },
              ]}
            >
              {loan.customerAddress}
            </Text>
          </View>
          <View style={styles.colTenure}>
            <Text style={styles.tableCell}>
              {loan.totalInstallments}
              {loan.installmentType}
            </Text>
          </View>
          <View style={styles.colGiven}>
            <Text
              style={[styles.tableCell, { fontFamily: "Lato", fontSize: "10" }]}
            >
              {loan.givenAmount}
            </Text>
          </View>
          <View style={styles.colInterest}>
            <Text
              style={[styles.tableCell, { fontFamily: "Lato", fontSize: "10" }]}
            >
              {loan.collectibleAmount - loan.givenAmount}
            </Text>
          </View>
          <View style={styles.colPayable}>
            <Text
              style={[styles.tableCell, { fontFamily: "Lato", fontSize: "10" }]}
            >
              {loan.collectibleAmount}
            </Text>
          </View>
          <View style={styles.colOldId}>
            <Text
              style={[styles.tableCell, { fontFamily: "Lato", fontSize: "10" }]}
            >
              {loan.oldId || ""}
            </Text>
          </View>
          <View style={styles.colOldAmount}>
            <Text
              style={[styles.tableCell, { fontFamily: "Lato", fontSize: "10" }]}
            >
              {loan.oldAmount || ""}
            </Text>
          </View>
        </View>
      ))}
      <View style={styles.tableRow}>
        <View style={styles.colSerial}>
          <Text style={styles.tableCell}></Text>
        </View>
        <View style={styles.colName}>
          <Text style={styles.tableCell}></Text>
        </View>
        <View style={styles.colPhone}>
          <Text style={styles.tableCell}></Text>
        </View>
        <View style={styles.colAddress}>
          <Text style={styles.tableCell}></Text>
        </View>
        <View style={styles.colTenure}>
          <Text style={styles.tableCell}></Text>
        </View>
        <View style={styles.colGiven}>
          <Text
            style={[
              styles.tableCell,
              { fontFamily: "Lato", fontWeight: "bold", fontSize: "12" },
            ]}
          >
            {totalgivenAmount}
          </Text>
        </View>
        <View style={styles.colInterest}>
          <Text
            style={[
              styles.tableCell,
              { fontFamily: "Lato", fontWeight: "bold", fontSize: "12" },
            ]}
          >
            {totalInterest}
          </Text>
        </View>
        <View style={styles.colPayable}>
          <Text
            style={[
              styles.tableCell,
              { fontFamily: "Lato", fontWeight: "bold", fontSize: "12" },
            ]}
          >
            {totalCollectibleAmount}
          </Text>
        </View>
        <View style={styles.colOldId}>
          <Text style={styles.tableCell}></Text>
        </View>
        <View style={styles.colOldAmount}>
          <Text style={[styles.tableCell]}></Text>
        </View>
      </View>
    </>
  );
};

const InstallmentView = ({
  installmentData,
}: {
  installmentData: InstallmentPrintModel[];
}) => {
  const totalPaidAmount = installmentData.reduce(
    (acc, installment) => acc + installment.paidAmount,
    0
  );
  return (
    <>
      {installmentData.map((installment, index) => (
        <View style={styles.tableRow} key={index}>
          <View style={styles.colSerial}>
            <Text style={styles.tableCell}>{installment.loanSerial}</Text>
          </View>
          <View style={styles.colName}>
            <Text
              style={[
                styles.tableCell,
                { fontFamily: "Tenali", fontSize: "12", fontWeight: "bold" },
              ]}
            >
              {installment.customerName}
            </Text>
          </View>
          <View style={styles.colAddress}>
            <Text
              style={[
                styles.tableCell,
                {
                  fontFamily: "Tenali",
                  fontSize: "12",
                  fontWeight: "bold",
                },
              ]}
            >
              {installment.city}
            </Text>
          </View>
          <View style={styles.colGiven}>
            <Text style={styles.tableCell}>{installment.paidAmount}</Text>
          </View>
          <View style={styles.colAddress}>
            <Text style={styles.tableCell}>{installment.paymentMethod}</Text>
          </View>
        </View>
      ))}
      <View style={styles.tableRow}>
        <View style={styles.colSerial}>
          <Text style={styles.tableCell}></Text>
        </View>
        <View style={styles.colName}>
          <Text style={styles.tableCell}></Text>
        </View>
        <View style={styles.colAddress}>
          <Text style={styles.tableCell}></Text>
        </View>
        <View style={styles.colGiven}>
          <Text
            style={[
              styles.tableCell,
              { fontFamily: "Lato", fontWeight: "bold", fontSize: "12" },
            ]}
          >
            {totalPaidAmount}
          </Text>
        </View>
        <View style={styles.colAddress}>
          <Text style={styles.tableCell}></Text>
        </View>
      </View>
    </>
  );
};
