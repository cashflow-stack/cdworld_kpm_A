import { Installment, Loan } from "@/models/API";
import { formatDateToDDMMYY } from "@/toolkit/helper/helperFunctions";

export function printInstallments(loan: Loan, installments: Installment[]) {
  const printWindow = window.open("", "", "width=800,height=600");

  if (printWindow) {
    const totalPaid = installments.reduce(
      (sum, installment) => sum + (installment.paidAmount || 0),
      0
    );

    printWindow.document.write(`
      <html>
        <head>
          <title>Cashflow Management Systems</title>
          <style>
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              margin: 15px;
              background: #f8fafc;
              color: #334155;
            }
            .top-section {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 15px;
              background: white;
              border-bottom: 3px solid #3b82f6;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
              margin-bottom: 20px;
            }
            .header { 
              text-align: left;
            }
            .header h1 { 
              margin: 0;
              font-size: 1.8rem;
            }
            .header .loan-info { 
              font-size: 1rem;
              color: #64748b;
            }
            .table-container {
              background: white;
              border-radius: 8px;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
              overflow: hidden;
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              padding: 12px 15px;
              text-align: left;
              border-bottom: 1px solid #e2e8f0;
            }
            th {
              background-color: #f1f5f9;
              font-weight: 600;
              color: #475569;
            }
            tr:nth-child(even) {
              background-color: #f8fafc;
            }
            .summary-section {
              display: flex;
              justify-content: space-between;
              padding: 15px;
              background: white;
              border-radius: 8px;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            }
            .summary-item {
              text-align: center;
            }
            .summary-label {
              font-size: 0.9rem;
              color: #64748b;
              margin-bottom: 5px;
            }
            .summary-value {
              font-size: 1.2rem;
              font-weight: 700;
              color: #1e40af;
            }
            .total-amount {
              font-size: 1.5rem;
              font-weight: 700;
              color: #1e40af;
              background: #eff6ff;
              padding: 8px 15px;
              border-radius: 8px;
            }
            @media print {
              body { background: white; }
              .table-container,
              .summary-section {
                box-shadow: none;
                border: 1px solid #e2e8f0;
              }
            }
          </style>
        </head>
        <body>
          <div class="top-section">
            <div class="header">
              <h1>Installments for Loan #${loan.loanSerial}</h1>
              <div class="loan-info">
                Total Installments: ${loan.totalInstallments} | 
                Paid Installments: ${loan.paidInstallments}
              </div>
            </div>
            <div class="total-amount">Total Paid: ₹${totalPaid.toLocaleString()}</div>
          </div>
          
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Due Date</th>
                  <th>Paid Date</th>
                  <th>Amount</th>
                  <th>Updated Date</th>
                  <th>Initial Amount</th>
                  <th>Agent Name</th>
                </tr>
              </thead>
              <tbody>
                ${installments
                  .map(
                    (installment, index) => `
                  <tr ${
                    installment.initialAmount
                      ? 'style="background-color: #fee2e2;"'
                      : ""
                  }>
                    <td>${index + 1}</td>
                    <td>${formatDateToDDMMYY(installment.dueDate)}</td>
                    <td>${formatDateToDDMMYY(installment.paidDate) || "-"}</td>
                    <td style="font-weight: bold; color: #15803d;">₹${
                      installment.paidAmount
                        ? installment.paidAmount.toLocaleString()
                        : "-"
                    }</td>
                    <td>${
                      formatDateToDDMMYY(installment.updatedDate) || "-"
                    }</td>
                    <td>${
                      installment.initialAmount
                        ? `₹${installment.initialAmount.toLocaleString()}`
                        : "-"
                    }</td>
                    <td>${installment.collectionAgentDetails?.name || "-"}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
          
          <div class="summary-section">
            <div class="summary-item">
              <div class="summary-label">Given Amount</div>
              <div class="summary-value">₹${loan.givenAmount.toLocaleString()}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Collectible Amount</div>
              <div class="summary-value">₹${loan.collectibleAmount.toLocaleString()}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Paid Amount</div>
              <div class="summary-value">₹${loan.paidAmount.toLocaleString()}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Outstanding</div>
              <div class="summary-value">₹${(
                loan.collectibleAmount - loan.paidAmount
              ).toLocaleString()}</div>
            </div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  }
}
