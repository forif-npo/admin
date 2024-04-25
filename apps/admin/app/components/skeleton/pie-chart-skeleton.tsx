import { Skeleton } from "@repo/ui/components/ui/skeleton";

export default function PieChartSkeleton() {
  return (
    <div className="pl-6">
      <div className="relative">
        <div className="absolute w-auto h-auto left-[5px] top-[5px]">
          <ul className="text-left flex flex-col gap-2">
            <li className="flex flex-row gap-[2px] items-center">
              <Skeleton className="w-[18px] h-4 mr-1 bg-[#BCBCBD] rounded-sm" />
              <Skeleton className="w-20 h-4 mr-1 bg-[#BCBCBD]" />
            </li>
            <li className="flex flex-row gap-[2px] items-center">
              <Skeleton className="w-[18px] h-4 mr-1 bg-[#BCBCBD] rounded-sm" />
              <Skeleton className="w-20 h-4 mr-1 bg-[#BCBCBD]" />
            </li>
          </ul>
        </div>
        <div className="pl-6 w-full h-full flex items-center justify-center">
          <Skeleton className="w-[320px] h-[320px] rounded-full" />
        </div>
      </div>
    </div>
  );
}
