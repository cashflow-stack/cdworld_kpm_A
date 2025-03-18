import { createBrowserRouter } from "react-router";
import Authentication from "@/pages/Authentication";
import App from "@/App.tsx";
import PATH from "@/constants/routePaths";
import ErrorPage from "@/pages/ErrorPage";
import AuthGuard from "@/routes/AuthGuard.tsx";
import SelectedCircle from "@/pages/selected-circle/SelectedCircle";
// import Circles from "@/pages/home/circles/Circles";
// import Members from "@/pages/home/members/Members";
// import Vehicles from "@/pages/home/vehicles/Vehicles";
// import Accounts from "@/pages/home/accounts/Accounts";
// import Others from "@/pages/home/others/Others";
// import Dashboard from "@/pages/selected-circle/dashboard/Dashboard";
// import History from "@/pages/selected-circle/dashboard/history/History";
// import Customers from "@/pages/selected-circle/customers/Customers";
// import CircleMembers from "@/pages/selected-circle/members/CircleMembers";
// import SelectedCustomer from "@/pages/selected-circle/customers/selected-customers/SelectedCustomer";
// import BulkPosting from "@/pages/selected-circle/customers/bulk-posting/BulkPosting";
// import Cities from "@/pages/selected-circle/cities/Cities";
// import Transactions from "@/pages/selected-circle/transactions/Transactions";
// import CircleOthers from "@/pages/selected-circle/others/CircleOthers";

const router = createBrowserRouter(
  [
    {
      path: PATH.HOME,
      element: (
        <AuthGuard>
          <App />
        </AuthGuard>
      ),
      children: [
        {
          index: true,
          // element: <Circles />,
          lazy: async () => {
            let Circles = await import("@/pages/home/circles/Circles");
            return { Component: () => <Circles.default /> };
          },
        },
        {
          path: PATH.MEMBERS,
          // element: <Members />,
          lazy: async () => {
            let Members = await import("@/pages/home/members/Members");
            return { Component: () => <Members.default /> };
          },
        },
        {
          path: PATH.VEHICLES,
          // element: <Vehicles />,
          lazy: async () => {
            let Vehicles = await import("@/pages/home/vehicles/Vehicles");
            return { Component: () => <Vehicles.default /> };
          },
        },
        {
          path: PATH.ACCOUNTS,
          // element: <Accounts />,
          lazy: async () => {
            let Accounts = await import("@/pages/home/accounts/Accounts");
            return { Component: () => <Accounts.default /> };
          },
        },
        {
          path: PATH.OTHERS,
          // element: <Others />,
          lazy: async () => {
            let Others = await import("@/pages/home/others/Others");
            return { Component: () => <Others.default /> };
          },
        },
      ],
    },
    {
      path: PATH.SELECTED_CIRCLE,
      element: (
        <AuthGuard>
          <SelectedCircle />
        </AuthGuard>
      ),
      children: [
        {
          // index: true,
          path: PATH.CIRCLE_DASHBOARD,
          // element: <Dashboard />,
          lazy: async () => {
            let Dashboard = await import(
              "@/pages/selected-circle/dashboard/Dashboard"
            );
            return { Component: () => <Dashboard.default /> };
          },
        },
        {
          path: PATH.HISTORY,
          // element: <History />,
          lazy: async () => {
            let History = await import(
              "@/pages/selected-circle/dashboard/cashAccountHistory/CashAccountHistory"
            );
            return { Component: () => <History.default /> };
          },
        },
        {
          path: PATH.CIRCLE_CUSTOMERS,
          // element: <Customers />,
          lazy: async () => {
            let Customers = await import(
              "@/pages/selected-circle/customers/Customers"
            );
            return { Component: () => <Customers.default /> };
          },
        },
        {
          path: PATH.CIRCLE_MEMBERS,
          // element: <CircleMembers />,
          lazy: async () => {
            let CircleMembers = await import(
              "@/pages/selected-circle/members/CircleMembers"
            );
            return { Component: () => <CircleMembers.default /> };
          },
        },
        {
          path: PATH.SELECTED_CUSTOMER,
          // element: <SelectedCustomer />,
          lazy: async () => {
            let SelectedCustomer = await import(
              "@/pages/selected-circle/customers/selected-customers/SelectedCustomer"
            );
            return { Component: () => <SelectedCustomer.default /> };
          },
        },
        {
          path: PATH.BULK_POSTING,
          // element: <BulkPosting />,
          lazy: async () => {
            let BulkPosting = await import(
              "@/pages/selected-circle/customers/bulk-posting/BulkPosting"
            );
            return { Component: () => <BulkPosting.default /> };
          },
        },
        {
          path: PATH.CIRCLE_CITIES,
          // element: <Cities />,
          lazy: async () => {
            let Cities = await import("@/pages/selected-circle/cities/Cities");
            return { Component: () => <Cities.default /> };
          },
        },
        {
          path: PATH.CIRCLE_TRANSACTIONS,
          // element: <Transactions />,
          lazy: async () => {
            let Transactions = await import(
              "@/pages/selected-circle/transactions/Transactions"
            );
            return { Component: () => <Transactions.default /> };
          },
        },
        {
          path: PATH.CIRCLE_OTHERS,
          // element: <CircleOthers />,
          lazy: async () => {
            let CircleOthers = await import(
              "@/pages/selected-circle/others/CircleOthers"
            );
            return { Component: () => <CircleOthers.default /> };
          },
        },
      ],
    },
    {
      path: PATH.AUTHENTICATION,
      element: <Authentication />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ],
);

export default router;
