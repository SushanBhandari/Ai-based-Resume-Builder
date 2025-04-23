import { Skeleton } from "../ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-4 p-4 rounded-xl shadow-md bg-white dark:bg-background">
      {/* Header Skeleton */}
      <Skeleton className="h-[155px] w-full rounded-lg" />

      {/* Text Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-[70%]" />
        <Skeleton className="h-4 w-[50%]" />
      </div>
    </div>
  );
}
