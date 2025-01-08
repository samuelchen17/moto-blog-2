import { Skeleton } from "./ui/skeleton";

export const SkeletonHotPostSide = () => {
  const skeletonCount = 3;
  const skeletons = [];

  for (let i = 0; i < skeletonCount; i++) {
    skeletons.push(<Skeleton key={i} className="w-full lg:h-full h-[250px]" />);
  }
  return <>{skeletons}</>;
};

export const SkeletonHotPostMain = () => {
  return <Skeleton className="lg:h-full w-full h-[400px]" />;
};
