import { SimplifiedLoan } from "@/models/customModels/customModels";

export function printSimplifiedLoans(loans: SimplifiedLoan[], date: string) {
  const printWindow = window.open("", "", "width=800,height=600");

  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Posting Installments</title>
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
            }
            .header { 
              text-align: left;
            }
            .header h1 { 
              margin: 0;
              font-size: 1.8rem;
            }
            .header .date { 
              font-size: 1rem;
              color: #64748b;
            }
            .grid-container {
              display: grid;
              grid-template-columns: repeat(6, 1fr);
              gap: 8px;
              max-width: 1600px;
              margin: 12px auto;
            }
            .loan-item {
              border-radius: 6px;
              text-align: center;
              background: white;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
              transition: all 0.3s ease;
              border: 1px solid #e2e8f0;
            }
            .loan-item:hover {
              transform: translateY(-1px);
              border-color: #3b82f6;
            }
            .loan-serial { 
              color: #64748b;
              font-size: 0.85rem;
              margin-bottom: 6px;
            }
            .amount { 
              font-size: 1.2rem;
              font-weight: 700;
              color: #1e40af;
              padding: 3px;
              border-radius: 4px;
              background: #eff6ff;
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
              .loan-item {
                break-inside: avoid;
                box-shadow: none;
                border: 1px solid #e2e8f0;
              }
              .total-section {
                break-inside: avoid;
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="top-section">
            <div class="header">
              <h1>Installment Posting Summary</h1>
              <div class="date">Date: ${date}</div>
            </div>
            <div class="total-amount">Total: ₹${loans
              .reduce((sum, loan) => sum + loan.paidAmount, 0)
              .toLocaleString()}</div>
          </div>
          <div class="grid-container">
            ${loans
              .map(
                (loan) => `
              <div class="loan-item">
                <div class="loan-serial">Loan ID: ${loan.loanSerial}</div>
                <div class="amount">₹${loan.paidAmount.toLocaleString()}</div>
              </div>
            `
              )
              .join("")}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
}
