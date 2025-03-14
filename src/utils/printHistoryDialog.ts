import { TransactionType } from "@/models/API";
import { SimplifiedTransaction } from "@/models/customModels/customModels";
import { formatDate } from "@/toolkit/helper/helperFunctions";
import { RootState, store } from "@/toolkit/store";

interface PrintHistoryDialogProps {
  transactions: SimplifiedTransaction[] | null;
  range: [string, string];
}

export function printHistoryDialog({
  transactions,
  range,
}: PrintHistoryDialogProps) {
  if (!transactions) return;
  const state = store.getState() as RootState;
  const { selectedCircle } = state.dataHelper;
  const printWindow = window.open("", "", "width=800,height=600");

  const newLoans = transactions.filter(
    (transaction) => transaction.transactionType === TransactionType.LOAN
  );
  const collections = transactions.filter(
    (transaction) => transaction.transactionType === TransactionType.REPAYMENT
  );

  const others = transactions.filter(
    (transaction) =>
      transaction.transactionType !== TransactionType.REPAYMENT &&
      transaction.transactionType !== TransactionType.LOAN &&
      transaction.transactionType !== TransactionType.BUSINESSLOSS &&
      transaction.transactionType !== TransactionType.EXCESSPAYMENT &&
      transaction.transactionType !== TransactionType.WRITEOFF &&
      transaction.transactionType !== TransactionType.EXISTSINGLOAN &&
      transaction.transactionType !== TransactionType.EXCESSCOLLECTION &&
      transaction.transactionType !== TransactionType.DEFICIT
  );

  // Calculate totals
  const totalLoansAmount = newLoans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalCollections = collections.reduce(
    (sum, col) => sum + col.amount,
    0
  );
  const totalOthers = others.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Daily Summary Report</title>
          <style>
            body { 
              font-family: Arial, sans-serif;
              line-height: 1.4;
              color: #333;
              margin: 15px;
            }
            .section { 
              margin-bottom: 15px;
              padding: 10px;
              background: #fff;
              box-shadow: 0 1px 3px rgba(0,0,0,0.12);
            }
            table { 
              width: 100%;
              border-collapse: collapse;
              margin: 10px 0;
              font-size: 13px;
            }
            th, td { 
              border: 1px solid #e0e0e0;
              padding: 8px;
              text-align: left;
            }
            th { 
              background-color: #f8f9fa;
              font-weight: 600;
            }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .header {
              text-align: center;
              padding: 10px;
              border-bottom: 1px solid #333;
              margin-bottom: 15px;
            }
            .header h1 {
              color: #2c3e50;
              margin: 0;
              font-size: 18px;
              display: inline-block;
            }
            .header p {
              margin: 5px 0 0;
              font-size: 14px;
              color: #666;
            }
            h2 {
              font-size: 16px;
              margin: 5px 0 10px;
              color: #2c3e50;
            }
            .total-row {
              font-weight: bold;
              background-color: #f8f9fa !important;
            }
            .footer {
              text-align: center;
              font-size: 11px;
              color: #666;
              margin-top: 15px;
              border-top: 1px solid #eee;
              padding-top: 10px;
            }
            @media print {
              body { margin: 10mm; }
              .section { box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Cashflow Statement - ${selectedCircle?.circleName}</h1>
            <p>Period: ${formatDate(range[0])} - ${formatDate(range[1])}</p>
          </div>
            ${
              newLoans.length > 0
                ? `<div class="section">
                <h2>New Loans</h2>
                ${renderNewCustomers(newLoans, totalLoansAmount)}
                </div>`
                : ""
            }
          
          ${
            collections.length > 0
              ? `<div class="section">
                <h2>Collections</h2>
                ${renderInstallments(collections, totalCollections)}
               </div>`
              : ""
          }

            ${
              others.length > 0
                ? `<div class="section">
                    <h2>Other Transactions</h2>
                    ${renderOtherSection(others, totalOthers)}
                 </div>`
                : ""
            }

          <div class="footer">
            <p>Generated on ${new Date().toLocaleString()}</p>
          </div>
          
          <script>
            window.onload = () => window.print();
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}

function renderNewCustomers(newLoans: SimplifiedTransaction[], total: number) {
  // Calculate totals
  const totalInterest = newLoans.reduce(
    (sum, loan) =>
      sum + ((loan.outstandingAmount ?? loan.amount) - loan.amount),
    0
  );
  const totalPayable = newLoans.reduce(
    (sum, loan) => sum + (loan.outstandingAmount || loan.amount),
    0
  );

  return `
    <table>
      <thead>
        <tr>
          <th>Serial</th>
          <th>Name</th>
          <th>City</th>
          <th style="text-align: right">Given</th>
          <th style="text-align: right">Interest</th>
          <th style="text-align: right">Payable</th>
        </tr>
      </thead>
      <tbody>
        ${newLoans
          .map(
            (loan) => `
          <tr>
            <td>${loan.loanSerial}</td>
            <td>${loan.customerName}</td>
            <td>${loan.customerAddress}</td>
            <td style="text-align: right">₹${loan.amount.toLocaleString()}</td>
            <td style="text-align: right">₹${(
              (loan.outstandingAmount ?? loan.amount) - loan.amount
            ).toLocaleString()}</td>
            <td style="text-align: right">₹${(
              loan.outstandingAmount || loan.amount
            ).toLocaleString()}</td>
          </tr>
        `
          )
          .join("")}
        <tr class="total-row">
          <td colspan="3">Total</td>
          <td style="text-align: right">₹${total.toLocaleString()}</td>
          <td style="text-align: right">₹${totalInterest.toLocaleString()}</td>
          <td style="text-align: right">₹${totalPayable.toLocaleString()}</td>
        </tr>
      </tbody>
    </table>
  `;
}

function renderInstallments(
  collections: SimplifiedTransaction[],
  total: number
) {
  return `
    <table>
      <thead>
        <tr>
          <th>Serial</th>
          <th>Name</th>
          <th>City</th>
        <th style="text-align: right">Amount</th>
          <th>Payment Type</th>
        </tr>
      </thead>
      <tbody>
        ${collections
          .map(
            (collection) => `
          <tr>
            <td>${collection.loanSerial}</td>
            <td>${collection.customerName}</td>
            <td>${collection.customerAddress}</td>
            <td style="text-align: right">₹${collection.amount.toLocaleString()}</td>
            <td>${collection.paymentMethod}</td>
          </tr>
        `
          )
          .join("")}
        <tr class="total-row">
          <td colspan="3">Total</td>
          <td style="text-align: right">₹${total.toLocaleString()}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  `;
}

function renderOtherSection(others: SimplifiedTransaction[], total: number) {
  // Calculate total for other transactions
  //   const totalOthers = others.reduce((sum, transaction) => sum + transaction.amount, 0);

  return `
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th style="text-align: right">Amount</th>
          <th>Payment Type</th>
        </tr>
      </thead>
      <tbody>
        ${others
          .map(
            (transaction) => `
          <tr>
            <td>${formatDate(transaction.date)}</td>
            <td>${transaction.description}</td>
            <td style="text-align: right">₹${transaction.amount.toLocaleString()}</td>
            <td>${transaction.paymentMethod || "-"}</td>
          </tr>
        `
          )
          .join("")}
        <tr class="total-row">
          <td colspan="2">Total</td>
          <td style="text-align: right">₹${total.toLocaleString()}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  `;
}
