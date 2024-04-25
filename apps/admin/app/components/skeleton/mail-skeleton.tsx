import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

export default function MailSkeleton() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="flex flex-col gap-2 py-4 pr-4 pt-0">
        <Skeleton className="w-full h-28 flex flex-col rounded-lg border">
          <div className="w-full h-full flex flex-col justify-between p-3">
            <div className="flex flex-col gap-1">
              <Skeleton className="w-[200px] h-2 bg-[#BCBCBD]" />
              <Skeleton className="w-[100px] h-2 bg-[#BCBCBD]" />
            </div>
            <Skeleton className="h-4 w-full p-3 bg-[#BCBCBD]" />
          </div>
        </Skeleton>
        <Skeleton className="w-full h-28 flex flex-col rounded-lg border">
          <div className="w-full h-full flex flex-col justify-between p-3">
            <div className="flex flex-col gap-1">
              <Skeleton className="w-[200px] h-2 bg-[#BCBCBD]" />
              <Skeleton className="w-[100px] h-2 bg-[#BCBCBD]" />
            </div>
            <Skeleton className="h-4 w-full p-3 bg-[#BCBCBD]" />
          </div>
        </Skeleton>
        <Skeleton className="w-full h-28 flex flex-col rounded-lg border">
          <div className="w-full h-full flex flex-col justify-between p-3">
            <div className="flex flex-col gap-1">
              <Skeleton className="w-[200px] h-2 bg-[#BCBCBD]" />
              <Skeleton className="w-[100px] h-2 bg-[#BCBCBD]" />
            </div>
            <Skeleton className="h-4 w-full p-3 bg-[#BCBCBD]" />
          </div>
        </Skeleton>
      </div>
    </ScrollArea>
  );
}
