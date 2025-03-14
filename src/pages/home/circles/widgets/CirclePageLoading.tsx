import { Skeleton } from "@/components/ui/skeleton";

 function CirclesPageLoading() {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 mt-10">
            {[...Array(4)].map((_, idx) => (
                <div key={idx} className="flex flex-col gap-4 px-10 md:gap-6 md:px-10">
                    <div className="flex flex-row items-center justify-between">
                        <Skeleton className=" h-5 w-[100px]" />
                        <Skeleton className="h-12 w-12 rounded-full" />
                    </div>
                    <div>
                        <Skeleton className="h-8 mb-3 w-[200px]" />
                        <Skeleton className="h-3 w-[150px]" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CirclesPageLoading;