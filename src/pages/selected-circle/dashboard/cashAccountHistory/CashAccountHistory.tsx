import { lazy, Suspense } from "react";
import { CalendarDateRangePicker } from "./widgets/CalendarDateRangePicker";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/reduxHooks";
import { formatDateToDDMMYY } from "@/toolkit/helper/helperFunctions";
const ClosingHistory = lazy(() => import("./widgets/ClosingHistory"));

export default function Home() {
  return (
    <main className="px-2 container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Closing History</h1>
        <div className="flex items-center gap-2">
          <CalendarDateRangePicker />
          <ClosingHistoryPrintPage />
        </div>
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            Loading...
          </div>
        }
      >
        <ClosingHistory />
      </Suspense>
    </main>
  );
}

// Format number as currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const ClosingHistoryPrintPage = () => {
  const { entries: data } = useAppSelector((state) => state.closingHistory);
  // Sort entries by closingDate (newest first)
  const sortedItems = [...data].sort(
    (a, b) =>
      new Date(b.closingDate).getTime() - new Date(a.closingDate).getTime()
  );

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
        <title>Cashflow Management Systems</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          body {
            font-family: 'Inter', sans-serif;
            margin: 30px;
            color: #374151;
            line-height: 1.5;
          }
          
          h1, h2, h3 {
            margin-bottom: 12px;
            color: #111827;
          }
          
          .header {
            text-align: center;
          }
          
          .header h1 {
            font-size: 28px;
            margin-bottom: 8px;
            font-weight: 600;
          }
          
          .header p {
            color: #6B7280;
            margin-top: 0;
            font-size: 14px;
          }
          
          table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            margin-bottom: 24px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          th, td {
            padding: 12px 16px;
            border: 1px solid #E5E7EB;
          }
          
          th {
            background-color: #F9FAFB;
            font-weight: 600;
            font-size: 13px;
            color: #4B5563;
            letter-spacing: 0.025em;
            text-transform: uppercase;
          }
          
          tr:nth-child(even) td {
            background-color: #F9FAFB;
          }
          
          .table-header-group {
            background-color: #F3F4F6;
            color: #1F2937;
            font-weight: 600;
          }
          
          .text-right {
            text-align: right;
          }
          
          .text-center {
            text-align: center;
          }
          
          .green {
            color: #059669;
            font-weight: 500;
          }
          
          .red {
            color: #DC2626;
            font-weight: 500;
          }
          
          .blue {
            color: #2563EB;
            font-weight: 500;
          }
          
          .bold {
            font-weight: 600;
          }
          
          .calc-cell {
            background: linear-gradient(to bottom, #EFF6FF, #F9FAFB);
            border-radius: 6px;
            padding: 8px;
            white-space: nowrap;
            font-size: 13px;
            box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
            line-height: 1.6;
          }
          
          .calc-row {
            display: flex;
            justify-content: space-between;
          }
          
          .calc-label {
            color: #6B7280;
            margin-right: 6px;
          }
          
          .calc-value {
            font-weight: 500;
          }
          
          .calc-total {
            border-top: 1px dashed #D1D5DB;
            margin-top: 4px;
            padding-top: 4px;
            font-weight: 600;
            color: #1F2937;
          }
          
          .section-cashflow-in th {
            border-bottom: 2px solid rgba(5, 150, 105, 0.2);
          }
          
          .section-cashflow-out th {
            border-bottom: 2px solid rgba(220, 38, 38, 0.2);
          }
          
          .section-calculation th {
            border-left: 1px dashed #D1D5DB;
            border-right: 1px dashed #D1D5DB;
          }
          
          .footer {
            margin-top: 48px;
            font-size: 13px;
            color: #6B7280;
            text-align: center;
            border-top: 1px solid #E5E7EB;
            padding-top: 16px;
          }
          
          @media print {
            body {
              margin: 15px;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            table {
              page-break-inside: auto;
              box-shadow: none;
            }
            
            tr {
              page-break-inside: avoid;
              page-break-after: auto;
            }
            th, td {
              padding: 8px 12px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Closing History Report</h1>
          <p>This is a system-generated report. • ${new Date().toLocaleString()}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th class="section-cashflow-in" colspan="6">Cashflow In</th>
              <th class="section-calculation" colspan="1" class="text-center">Calculation</th>
              <th class="section-cashflow-out" colspan="5">Cashflow Out</th>
            </tr>
            <tr>
              <th>Date</th>
              <th class="text-right">Investment</th>
              <th class="text-right">Collection</th>
              <th class="text-right">Excess</th>
              <th class="text-right">Interest</th>
              <th class="text-right">Income</th>
              <th class="text-center">Balance Calculation</th>
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
                const calculationHtml = `
                <div class="calc-cell">
                  <div class="calc-row">
                    <span class="calc-label">Previous:</span>
                    <span class="calc-value">${formatCurrency(
                      item.calculation.previousBalance
                    )}</span>
                  </div>
                  <div class="calc-row">
                    <span class="calc-label">In:</span>
                    <span class="calc-value green">+${formatCurrency(
                      item.calculation.positiveTotal
                    )}</span>
                  </div>
                  <div class="calc-row">
                    <span class="calc-label">Out:</span>
                    <span class="calc-value red">-${formatCurrency(
                      item.calculation.negativeTotal
                    )}</span>
                  </div>
                  <div class="calc-row calc-total">
                    <span class="calc-label">Balance:</span>
                    <span class="calc-value">${formatCurrency(
                      item.calculation.balance
                    )}</span>
                  </div>
                </div>
              `;

                return `
                <tr>
                  <td class="blue">${formatDateToDDMMYY(item.closingDate)}</td>
                  <td class="text-right green">${
                    item.investment > 0 ? formatCurrency(item.investment) : "—"
                  }</td>
                  <td class="text-right green">${
                    item.collection > 0 ? formatCurrency(item.collection) : "—"
                  }</td>
                  <td class="text-right green">${
                    item.excess > 0 ? formatCurrency(item.excess) : "—"
                  }</td>
                  <td class="text-right green">${
                    item.interest > 0 ? formatCurrency(item.interest) : "—"
                  }</td>
                  <td class="text-right green">${
                    item.income > 0 ? formatCurrency(item.income) : "—"
                  }</td>
                  <td class="text-center">${calculationHtml}</td>
                  <td class="text-right red">${
                    item.newLoans > 0 ? formatCurrency(item.newLoans) : "—"
                  }</td>
                  <td class="text-right red">${
                    item.withdrawals > 0
                      ? formatCurrency(item.withdrawals)
                      : "—"
                  }</td>
                  <td class="text-right red">${
                    item.expenses > 0 ? formatCurrency(item.expenses) : "—"
                  }</td>
                  <td class="text-right red">${
                    item.deficit > 0 ? formatCurrency(item.deficit) : "—"
                  }</td>
                  <td class="text-right red">${
                    item.chits > 0 ? formatCurrency(item.chits) : "—"
                  }</td>
                </tr>
              `;
              })
              .join("")}
              
            <!-- Summary Section -->
            <tr class="table-header-group">
              <td class="bold">TOTAL</td>
              <td class="text-right green bold">${formatCurrency(
                sortedItems.reduce(
                  (sum, item) => sum + (item.investment || 0),
                  0
                )
              )}</td>
              <td class="text-right green bold">${formatCurrency(
                sortedItems.reduce(
                  (sum, item) => sum + (item.collection || 0),
                  0
                )
              )}</td>
              <td class="text-right green bold">${formatCurrency(
                sortedItems.reduce((sum, item) => sum + (item.excess || 0), 0)
              )}</td>
              <td class="text-right green bold">${formatCurrency(
                sortedItems.reduce((sum, item) => sum + (item.interest || 0), 0)
              )}</td>
              <td class="text-right green bold">${formatCurrency(
                sortedItems.reduce((sum, item) => sum + (item.income || 0), 0)
              )}</td>
              <td class="text-center bold">Summary</td>
              <td class="text-right red bold">${formatCurrency(
                sortedItems.reduce((sum, item) => sum + (item.newLoans || 0), 0)
              )}</td>
              <td class="text-right red bold">${formatCurrency(
                sortedItems.reduce(
                  (sum, item) => sum + (item.withdrawals || 0),
                  0
                )
              )}</td>
              <td class="text-right red bold">${formatCurrency(
                sortedItems.reduce((sum, item) => sum + (item.expenses || 0), 0)
              )}</td>
              <td class="text-right red bold">${formatCurrency(
                sortedItems.reduce((sum, item) => sum + (item.deficit || 0), 0)
              )}</td>
              <td class="text-right red bold">${formatCurrency(
                sortedItems.reduce((sum, item) => sum + (item.chits || 0), 0)
              )}</td>
            </tr>
          </tbody>
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

    // Write the HTML content to the new window
    printWindow.document.write(htmlContent);

    // Close the document to finish writing to it
    printWindow.document.close();
  };

  return (
    <Button variant="outline" onClick={handlePrint} size="icon">
      <Printer className="cursor-pointer" />
    </Button>
  );
};
