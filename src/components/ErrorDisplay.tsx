import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface ErrorDisplayProps {
  message?: string;
}

export function ErrorDisplay({ message = "Something went wrong" }: ErrorDisplayProps) {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardContent className="flex items-center gap-2 p-4 text-red-600">
        <AlertCircle className="h-5 w-5" />
        <span>{message}</span>
      </CardContent>
    </Card>
  );
}
