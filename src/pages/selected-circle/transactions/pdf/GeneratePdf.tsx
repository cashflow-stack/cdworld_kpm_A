import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Printer } from "lucide-react";
import MyDocument from "./CreateDoc/MyDocument";
import { PDFViewer } from "@react-pdf/renderer";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AppDispatch, RootState } from "@/toolkit/store";
import React, { useEffect, useMemo } from "react";
import { fetchPrintModels } from "./state/generatePdfSlice";

export default function GeneratePdf() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Printer size={20} className="text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col max-w-[100%] h-[100%] p-0 items-center">
        <DialogHeader className="hidden">
          <DialogTitle>Generated PDF Document</DialogTitle>
          <DialogDescription>
            This is a sample PDF document generated using react-pdf.
          </DialogDescription>
        </DialogHeader>
        <MemoizedPDFView />
      </DialogContent>
    </Dialog>
  );
}

const PDFView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCircle = useSelector((state: RootState) => state.dataHelper.selectedCircle);
  const range = useSelector((state: RootState) => state.transactions.range);

  useEffect(() => {
    if (!selectedCircle) return;
    dispatch(
      fetchPrintModels({
        circleID: selectedCircle.id,
        fromDate: range[0],
        toDate: range[1],
      })
    );
  }, [dispatch, selectedCircle, range]);

  const { status, newLoans, newInstallments } = useSelector((state: RootState) => state.generatePdf, shallowEqual);

  const memoizedContent = useMemo(() => {
    if (status === "success") {
      return (
        <PDFViewer
          width="100%"
          height="100%"
          showToolbar
          children={
            <MyDocument
              newLoans={newLoans || []}
              newInstallments={newInstallments || []}
              fromDate={range[0]}
              toDate={range[1]}
              circleName={selectedCircle?.circleName}
            />
          }
        />
      );
    } else if (status === "failed") {
      return <div>Failed to load PDF</div>;
    } else if (status === "empty") {
      return (
        <div className="flex items-center justify-center h-full w-full">
          <h1 className="text-lg text-muted-foreground">No data available</h1>
        </div>
      );
    }
    return <div>Loading...</div>;
  }, [status, newLoans, newInstallments, range, selectedCircle]);

  return memoizedContent;
};

const MemoizedPDFView = React.memo(PDFView);

/* <PDFDownloadLink document={<MyDocument />} fileName="form">
          {({ loading }) => {
            return loading ? (
              "Loading document..."
            ) : (
              <Button>Download now!</Button>
            );
          }}
        </PDFDownloadLink> */
