import { PendingCustomer } from "@/models/customModels/customModels";

export function printCustomers(customers: PendingCustomer[]) {
  const printWindow = window.open("", "", "width=800,height=600");
  if (printWindow) {
    printWindow.document.write(`
      <html>
      <head>
        <title>Pending Customers List</title>
        <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        #delay { color: #E4080A; }
        small { color: #666; }
        .customer-count { font-family: Lato, monospace; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>Pending Customers List (<span class="customer-count">${customers.length}</span>)</h1>
        <table>
        <thead>
          <tr>
          <th>Customer Details</th>
          <th>Amount Due</th>
          </tr>
        </thead>
        <tbody>
          ${customers
          .map(
            (customer) => `
          <tr>
            <td>
            <strong>${customer.name}</strong><br>
            <small>ID: ${customer.loanSerial} | ${customer.city}<br>
            ${customer.phoneNumber}</small>
            </td>
            <td>
            <strong>₹${customer.pendingAmount.toFixed(0)}</strong><br>
            <small id="delay" >${customer.daysDelay} ${
            customer.daysDelay === 1 ? "day" : "days"
            } late</small>
            </td>
          </tr>
          `
          )
          .join("")}
        </tbody>
        </table>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
}
