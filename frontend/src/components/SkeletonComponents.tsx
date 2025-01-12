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
      <div className="h-[250px] border rounded-md flex" key={i}>
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
  const skeletonCount = 8;
  const skeletons = [];

  for (let i = 0; i < skeletonCount; i++) {
    skeletons.push(
      <CarouselItem className="lg:basis-1/4 md:basis-1/3 sm:basis-1/2" key={i}>
        <Card className="min-h-[430px]">
          {/* image */}
          <Skeleton className="h-[160px] w-full object-cover rounded-t-md border-b rounded-b-none" />

          <CardHeader>
            <CardDescription className="flex justify-between">
              {/* author */}
              <div className="flex gap-2 items-center">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>

              {/* date */}
              <div className="flex gap-2 items-center ">
                <Skeleton className="h-4 w-24" />
              </div>
            </CardDescription>
            {/* title */}
            <CardTitle className="flex-col space-y-2 flex pt-3">
              <Skeleton className="flex-grow h-5" />
              <Skeleton className="flex-grow h-5" />
            </CardTitle>
          </CardHeader>

          <div className="absolute bottom-0 ml-5 mb-5 flex flex-col gap-4">
            <Skeleton className="h-4 w-20 rounded-full" />

            <Skeleton className="h-10 px-4 py-2 w-24" />
          </div>
        </Card>
      </CarouselItem>
    );
  }
  return <>{skeletons}</>;
};

export const SkeletonEventCard = () => {
  const skeletonCount = 4;
  const skeletons = [];

  for (let i = 0; i < skeletonCount; i++) {
    skeletons.push(
      <div
        className="flex gap-4 rounded-md border sm:border-none mx-auto sm:p-0 p-4 w-full"
        key={i}
      >
        <Skeleton className="rounded-md hidden sm:block h-[90px] w-[90px]" />
        <div className="gap-2 flex flex-col w-full">
          <Skeleton className="h-4 w-[280px]" />

          <Skeleton className="h-6 w-[250px] my-3" />

          <Skeleton className="h-4 flex-grow" />
          <Skeleton className="h-4 flex-grow " />
          <Skeleton className="h-4 w-1/2 sm:hidden" />

          <div className="flex sm:flex-row flex-col gap-4 sm:items-center mt-6">
            {/* join button */}
            <Skeleton className="h-10 px-4 py-2 sm:w-[65px] sm:flex-grow-0 flex-grow order-1 sm:order-none" />
            {/* location */}
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }
  return <>{skeletons}</>;
};

export const SkeletonSearchItem = () => {
  const skeletonCount = 4;
  const skeletons = [];

  for (let i = 0; i < skeletonCount; i++) {
    skeletons.push(
      <div
        className="flex gap-4 rounded-md border sm:border-none mx-auto sm:p-0 p-4 w-full"
        key={i}
      >
        <Skeleton className="rounded-md hidden sm:block h-[90px] w-[90px]" />
        <div className="gap-2 flex flex-col w-full">
          <Skeleton className="h-4 w-[280px]" />

          <Skeleton className="h-6 w-[250px] my-3" />

          <Skeleton className="h-4 flex-grow" />
          <Skeleton className="h-4 flex-grow " />
          <Skeleton className="h-4 w-1/2 sm:hidden" />

          <div className="flex sm:flex-row flex-col gap-4 sm:items-center mt-6">
            {/* join button */}
            <Skeleton className="h-10 px-4 py-2 sm:w-[65px] sm:flex-grow-0 flex-grow order-1 sm:order-none" />
            {/* location */}
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }
  return <>{skeletons}</>;
};
