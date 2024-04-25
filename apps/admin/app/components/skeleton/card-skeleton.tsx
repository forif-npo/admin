import { Skeleton } from "@repo/ui/components/ui/skeleton";

export default function CardSkeleton() {
  return (
    <>
      <Skeleton className="w-[50px] h-7" />
      <div className="h-1"></div>
      <Skeleton className="w-[150px] h-4" />
    </>
  );
}
