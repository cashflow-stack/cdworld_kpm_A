import { Skeleton } from "@/components/ui/skeleton"

const TransactionsLoader = () => {
    return (
        <div className="p-6 min-h-screen">
            <div className="flex">
                {/* Left Side - Transactions List */}
                <div className="w-2/3">
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center space-x-4">
                                <Skeleton className="h-20 w-[100px]" />
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-20 w-[150px]" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Summary Boxes */}
                <div className="w-1/3 space-y-4 pl-4">
                    <Skeleton className="h-[250px] w-full" />
                    <Skeleton className="h-10 w-full" />

                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-[90px] w-full" />
                        <Skeleton className="h-[90px] w-full" />
                        <Skeleton className="h-[90px] w-full" />
                        <Skeleton className="h-[90px] w-full" />
                        <Skeleton className="h-[90px] w-full" />
                        <Skeleton className="h-[90px] w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionsLoader
