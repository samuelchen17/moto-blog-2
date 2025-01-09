import { CarouselItem } from "./ui/carousel";
import { Skeleton } from "./ui/skeleton";
import {
  Card,
  // CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const SkeletonHotPostSide = () => {
  const skeletonCount = 3;
  const skeletons = [];

  for (let i = 0; i < skeletonCount; i++) {
    skeletons.push(
      <div className="h-[250px] border rounded-md flex">
        <div className="object-cover h-full w-1/2 overflow-hidden">
          <Skeleton className="object-cover h-full w-full object-center rounded-none" />
        </div>

        {/* card information */}
        <div className="w-1/2 p-4 flex flex-col justify-between">
          <div className="flex-col space-y-2 flex">
            <Skeleton className="flex-grow h-5" />
            <Skeleton className="flex-grow h-5" />
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

export const SkeletonRecentPostsCard = () => {
  return (
    <CarouselItem className="lg:basis-1/4 md:basis-1/3 sm:basis-1/2">
      <Card className="min-h-[430px]">
        <Skeleton className="h-[160px] w-full object-cover rounded-t-md border-b" />

        <CardHeader>
          <CardDescription className="flex justify-between">
            <div className="flex gap-2 items-center">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-12" />
            </div>

            <div className="flex gap-2 items-center ">
              <Skeleton className="h-4 w-12" />
            </div>
          </CardDescription>
          <div className="flex-col space-y-2 flex">
            <Skeleton className="flex-grow h-5" />
            <Skeleton className="flex-grow h-5" />
          </div>
        </CardHeader>

        <div className="absolute bottom-0 ml-5 mb-5 flex flex-col gap-4">
          <Skeleton className="h-4 w-1/3 rounded-full" />

          <Skeleton className="h-10 px-4 py-2 w-1/2" />
        </div>
      </Card>
    </CarouselItem>
  );
};
