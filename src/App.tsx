import Home from "@/pages/home/Home";
import { fetchAdmin } from "./pages/home/state/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./toolkit/store";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { LuLink2Off } from "react-icons/lu";
import useAdminDetails from "./hooks/useAdminDetails";
/**
 * The main component of the application.
 * It fetches the admin data using the user ID and email from the authenticator context.
 */
function App() {
  const { userID, email } = useAdminDetails();

  // Get the dispatch function from the react-redux library
  const dispatch = useDispatch<AppDispatch>();

  // Fetch the admin data when the userID changes
  useEffect(() => {
    dispatch(fetchAdmin({ userID, email }));
  }, [dispatch, userID, email]);

  // Render the AppScreen component
  return (
    <div className="min-h-screen bg-muted/10 p-4 backdrop-sm">
      <AppScreen />
    </div>
  );
}

export default App;

/**
 * Renders the main screen of the application.
 * @returns The JSX element representing the main screen.
 */
function AppScreen() {
  // Get the admin and status from the Redux store
  const { admin, status, member } = useSelector(
    (state: RootState) => state.admin
  );

  // Render the loading state
  if (status === "loading") {
    return (
      <div className="flex items-center">
        <Skeleton className=" m-4 h-16 w-full" />
      </div>
    );
  }

  // Render the failed state
  if (status === "failed") {
    return (
      <div className="flex justify-center gap-6 items-center h-screen">
        <LuLink2Off strokeWidth={2} className="w-16 h-16 text-primary" />
        <h1 className="text-3xl font-bold text-center">Failed to load data</h1>
      </div>
    );
  }

  if (member) {
    return <Home name={`${member?.name}`} />;
  }

  return <Home name={`${admin?.name}`} />;
}
