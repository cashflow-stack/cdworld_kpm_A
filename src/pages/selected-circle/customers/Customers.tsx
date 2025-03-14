import { AppDispatch, RootState } from "@/toolkit/store";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchCustomers, getFinancialItems } from "./state/customerSlice";
import CustomerPageEmpty from "./widgets/CustomerPageEmpty";
import CustomersPageLoading from "./widgets/CustomerPageLoading";
import { customerDataColumns } from "./customer-table/columns";
import { DataTable } from "./customer-table/data-table";
import { fetchCities } from "@/toolkit/common/city/citiesSlice";
import FinanceBookView from "./finance-book-view/FinanceBookView";
// import CreateTestCustomer, {
//   GenerateTestCities,
// } from "@/pages/temp/createTestCustomer";

const Customers = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { selectedCircle, isBookViewOpen } = useSelector(
    (state: RootState) => state.dataHelper,
    shallowEqual
  );

  useEffect(() => {
    setIsInitialLoad(true); // Set loading state to true when component mounts
    if (!selectedCircle) {
      navigate("/");
    } else {
      // Set loading state immediately
      const fetchData = async () => {
        await Promise.all([
          dispatch(
            fetchCities({
              circleID: selectedCircle.id,
              circleDateOfCreation: selectedCircle.dateOfCreation,
            })
          ),
          // Fetch financial items only if the book view is open
          ...(isBookViewOpen
            ? [
                dispatch(
                  getFinancialItems({
                    circleID: selectedCircle.id,
                    circleDateOfCreation: selectedCircle.dateOfCreation,
                  })
                ),
              ]
            : [
                dispatch(
                  fetchCustomers({
                    circleID: selectedCircle.id,
                    circleDateOfCreation: selectedCircle.dateOfCreation,
                  })
                ),
              ]),
        ]);
        setIsInitialLoad(false);
      };
      fetchData();
    }
  }, [dispatch, selectedCircle, navigate, isBookViewOpen]);

  // Show loading screen immediately during initial load
  if (isInitialLoad) {
    return <CustomersPageLoading />;
  }
  if (isBookViewOpen) {
    return <FinanceBookView />;
  }
  return <CustomerScreen />;
});

export default Customers;

const CustomerScreen = React.memo(() => {
  const { customers, status } = useSelector(
    (state: RootState) => state.customers,
    shallowEqual
  );

  if (status === "success") {
    return (
      <div className="sm:px-5">
        {/* <div>
          <GenerateTestCities />
          <CreateTestCustomer />
        </div> */}
        <DataTable columns={customerDataColumns} data={customers} />
      </div>
    );
  } else if (status === "empty") {
    return <CustomerPageEmpty />;
    // return (
    //   <div>
    //     <GenerateTestCities />
    //     <CreateTestCustomer />
    //   </div>
    // );
  } else if (status === "failed") {
    return (
      <div className="flex flex-col items-center rounded-lg justify-center h-96 bg-card m-10">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Failed to Load Customers
        </h2>
        <p className="text-lg text-muted mb-2">
          There was an error retrieving customer data.
        </p>
        <p className="text-lg text-muted mb-6">
          Please try again later or contact support.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }
  return <CustomersPageLoading />;
});
