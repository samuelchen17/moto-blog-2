import { Skeleton } from "./ui/skeleton";

export const SkeletonHotPostSide = () => {
  const skeletonCount = 3;
  const skeletons = [];

  for (let i = 0; i < skeletonCount; i++) {
    skeletons.push(
      <div className="h-[250px] border rounded-md flex">
        <div className="object-cover h-full w-1/2">
          <Skeleton className="object-cover h-full w-full object-center" />
        </div>

        {/* card information */}
        <div className="w-1/2 p-4 flex flex-col justify-between">
          <div className="flex-col space-y-2 flex">
            <Skeleton className="flex-grow h-4" />
            <Skeleton className="flex-grow h-4" />
            <Skeleton className="w-3/4 h-4" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <Skeleton className="h-4 w-1/3 rounded-full" />
            <Skeleton className="h-10 px-4 py-2 w-1/2" />
          </div>
        </div>
      </div>
    );
  }
  return <>{skeletons}</>;
};

export const SkeletonHotPostMain = () => {
  return <Skeleton className="lg:h-full w-full h-[400px]" />;
};
