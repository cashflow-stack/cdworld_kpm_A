import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/toolkit/store";
import { fetchLastClosingEntry } from "@/toolkit/common/last-closing-entry/closingSlice";
// import BulkPosting from "./BulkPostingComponent";
import { selectCombinedData as importedSelectCombinedData } from "./selectors";
import { useEffect } from "react";

const BulkPosting = React.lazy(() => import("./BulkPostingComponent"));

export default function BulkPostingScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCircle, closingEntryStatus: status } = useSelector(
    importedSelectCombinedData
  );
  useEffect(() => {
    if (selectedCircle) {
      dispatch(fetchLastClosingEntry({ selectedCircleID: selectedCircle.id }));
    }
  }, [selectedCircle, dispatch]);
  if (status === "success") {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <BulkPosting />
      </Suspense>
    );
  } else if (status === "failed") {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl font-medium text-gray-600">
          Failed to load last closing entry. Please try again.
        </p>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      <p className="ml-2 text-xl font-medium text-gray-600">
        Loading last closing entry...
      </p>
    </div>
  );
}
