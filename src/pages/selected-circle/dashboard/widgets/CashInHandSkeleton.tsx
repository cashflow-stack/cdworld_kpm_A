import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CashInHandSkeleton() {
  return (
    <Card className="w-full h-full animate-pulse">
      <CardHeader className="space-y-2">
        <div className="h-6 w-1/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-4 w-1/4 bg-gray-200 rounded" />
            <div className="h-4 w-1/4 bg-gray-200 rounded" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
