type ClosingSnapshot = {
  __typename: "ClosingSnapshot";
  chits: number;
  deficit: number;
  excessCollection: number;
  expenses: number;
  incomes: number;
  interest: number;
  investments: number;
  loansGiven: number;
  repayments: number;
  withdrawals: number;
};

type CashAccountItem = {
  closingEntryDate: string;
  closingSnapshot: ClosingSnapshot;
  id: string;
  openingEntryDate: string;
  __typename: "CashAccount";
};

type ByModifiedCircleCashQuery = {
  byCircleCash?: {
    __typename: "ModelCashAccountConnection";
    items: Array<CashAccountItem | null>;
    nextToken?: string | null;
  } | null;
};

interface PrintPageProps {
  data: ByModifiedCircleCashQuery;
}

// Format number as currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear().toString().substring(2)}`;
  } catch (error) {
    return dateString;
  }
};

// Calculate balance for each row
const calculateBalance = (item: CashAccountItem): number => {
  const { closingSnapshot } = item;
  const inflows =
    closingSnapshot.investments +
    closingSnapshot.repayments +
    closingSnapshot.excessCollection +
    closingSnapshot.interest +
    closingSnapshot.incomes;

  const outflows =
    closingSnapshot.loansGiven +
    closingSnapshot.withdrawals +
    closingSnapshot.expenses +
    closingSnapshot.deficit +
    closingSnapshot.chits;

  return inflows - outflows;
};

export function ClosingHistoryPrintPage({ data }: PrintPageProps) {
  // Filter out null items and sort by closingEntryDate (newest first)
  const sortedItems =
    data.byCircleCash?.items
      .filter((item): item is CashAccountItem => item !== null)
      .sort(
        (a, b) =>
          new Date(b.closingEntryDate).getTime() -
          new Date(a.closingEntryDate).getTime()
      ) || [];

  const handlePrint = () => {
    // Open a new window
    const printWindow = window.open("", "_blank", "width=800,height=600");

    if (!printWindow) {
      alert("Please allow popups for this website to print");
      return;
    }

    // Create the HTML content for the print window
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Closing History Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #333;
          }
          h1, h2, h3 {
            margin-bottom: 10px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .header h1 {
            font-size: 24px;
            margin-bottom: 5px;
          }
          .header p {
            color: #666;
            margin-top: 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          .text-right {
            text-align: right;
          }
          .text-center {
            text-align: center;
          }
          .green {
            color: #22c55e;
          }
          .red {
            color: #ef4444;
          }
          .blue {
            color: #3b82f6;
          }
          .bold {
            font-weight: bold;
          }
          .summary {
            margin-top: 30px;
          }
          .summary-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .footer {
            margin-top: 40px;
            font-size: 12px;
            color: #666;
          }
          @media print {
            body {
              margin: 0;
              padding: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Closing History Report</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th colspan="6">Cashflow In</th>
              <th colspan="1" class="text-center">Calculation</th>
              <th colspan="5">Cashflow Out</th>
            </tr>
            <tr>
              <th>Date</th>
              <th class="text-right">Investment</th>
              <th class="text-right">Collection</th>
              <th class="text-right">Excess</th>
              <th class="text-right">Interest</th>
              <th class="text-right">Income</th>
              <th class="text-center">Balance</th>
              <th class="text-right">New Loans</th>
              <th class="text-right">Withdrawals</th>
              <th class="text-right">Expenses</th>
              <th class="text-right">Deficit</th>
              <th class="text-right">Chits</th>
            </tr>
          </thead>
          <tbody>
            ${sortedItems
              .map((item) => {
                const {
                  investments,
                  repayments,
                  excessCollection,
                  interest,
                  incomes,
                  loansGiven,
                  withdrawals,
                  expenses,
                  deficit,
                  chits,
                } = item.closingSnapshot;

                const balance = calculateBalance(item);

                return `
                <tr>
                  <td class="blue">${formatDate(item.closingEntryDate)}</td>
                  <td class="text-right green">${
                    investments > 0 ? formatCurrency(investments) : "-"
                  }</td>
                  <td class="text-right green">${
                    repayments > 0 ? formatCurrency(repayments) : "-"
                  }</td>
                  <td class="text-right green">${
                    excessCollection > 0
                      ? formatCurrency(excessCollection)
                      : "-"
                  }</td>
                  <td class="text-right green">${
                    interest > 0 ? formatCurrency(interest) : "-"
                  }</td>
                  <td class="text-right green">${
                    incomes > 0 ? formatCurrency(incomes) : "-"
                  }</td>
                  <td class="text-right bold">${formatCurrency(balance)}</td>
                  <td class="text-right red">${
                    loansGiven > 0 ? formatCurrency(loansGiven) : "-"
                  }</td>
                  <td class="text-right red">${
                    withdrawals > 0 ? formatCurrency(withdrawals) : "-"
                  }</td>
                  <td class="text-right red">${
                    expenses > 0 ? formatCurrency(expenses) : "-"
                  }</td>
                  <td class="text-right red">${
                    deficit > 0 ? formatCurrency(deficit) : "-"
                  }</td>
                  <td class="text-right red">${
                    chits > 0 ? formatCurrency(chits) : "-"
                  }</td>
                </tr>
              `;
              })
              .join("")}
          </tbody>
        </table>

        <div class="summary">
          <h2>Summary</h2>
          <div class="summary-grid">
            <div>
              <h3>Total Inflows</h3>
              <p>
                ${formatCurrency(
                  sortedItems.reduce((sum, item) => {
                    const {
                      investments,
                      repayments,
                      excessCollection,
                      interest,
                      incomes,
                    } = item.closingSnapshot;
                    return (
                      sum +
                      investments +
                      repayments +
                      excessCollection +
                      interest +
                      incomes
                    );
                  }, 0)
                )}
              </p>
            </div>
            <div>
              <h3>Total Outflows</h3>
              <p>
                ${formatCurrency(
                  sortedItems.reduce((sum, item) => {
                    const {
                      loansGiven,
                      withdrawals,
                      expenses,
                      deficit,
                      chits,
                    } = item.closingSnapshot;
                    return (
                      sum +
                      loansGiven +
                      withdrawals +
                      expenses +
                      deficit +
                      chits
                    );
                  }, 0)
                )}
              </p>
            </div>
          </div>
        </div>

        <div class="footer">
          <p>This is a system-generated report.</p>
        </div>

        <script>
          // Automatically trigger print when the page loads
          window.onload = function() {
            setTimeout(() => {
              window.print();
            }, 500);
          };
        </script>
      </body>
      </html>
    `;

    handlePrint();

    // Write the HTML content to the new window
    printWindow.document.write(htmlContent);

    // Close the document to finish writing to it
      printWindow.document.close();
  };
}

export default ClosingHistoryPrintPage;
