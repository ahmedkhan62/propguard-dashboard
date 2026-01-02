import { Skeleton } from "@/components/ui/skeleton";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export function DashboardSkeleton() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>

                {/* Status Indicator */}
                <Skeleton className="h-24 w-full rounded-xl" />

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-32 rounded-xl" />
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <Skeleton className="h-[400px] rounded-xl" />
                    </div>
                    <div className="lg:col-span-2">
                        <Skeleton className="h-[400px] rounded-xl" />
                    </div>
                </div>

                {/* Trades Table */}
                <Skeleton className="h-[300px] rounded-xl" />
            </div>
        </DashboardLayout>
    );
}
