import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CustomersPageLoading = React.memo(function CustomersPageLoading() {
    return (
        <div className="mt-20">
            {[...Array(6)].map((_, idx) => (
                <div key={idx} className="grid gap-5 mb-7 grid-cols-6 px-5 md:px-5">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-6 w-2/4" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-2 w-1/4" />
                    </div>
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            ))}
        </div>
    )
});

export default CustomersPageLoading;
