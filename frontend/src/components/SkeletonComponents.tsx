import { CarouselItem } from "./ui/carousel";
import { Separator } from "./ui/separator";
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
  const skeletonCount = 9;
  const skeletons = [];

  for (let i = 0; i < skeletonCount; i++) {
    skeletons.push(
      <div key={i}>
        <div className="flex flex-col w-full mt-12">
          {/* author information */}
          <div className=" flex gap-2 items-center mb-2">
            <Skeleton className="h-5 w-5 rounded-full " />
            <Skeleton className="h-3 w-[100px]" />
          </div>

          {/* title and content */}
          <div className="flex flex-row justify-between">
            <div className="mb-2 mr-6 w-full">
              <Skeleton className="h-5 lg:h-6 mt-2 mb-3" />
              <div className="grid gap-2 mb-5">
                <Skeleton className="h-4" />
                <Skeleton className="h-4 w-4/5" />
              </div>

              <Skeleton className="h-3 w-[170px]" />
            </div>

            {/* search item image */}
            <Skeleton className="md:w-[400px] md:h-[200px] sm:w-[200px] w-[150px] h-[100px] rounded-md" />
          </div>
        </div>
        <Separator className="my-12" />
      </div>
    );
  }
  return <>{skeletons}</>;
};

export const SkeletonPostPage = () => {
  return (
    <div>
      {/* banner */}
      <div className="relative w-full h-[400px] lg:h-[500px] 2xl:h-[600px]">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      {/* content */}
      <div className="flex flex-col justify-center max-w-[1280px] mx-auto p-6 my-12">
        {/* blog content */}
        <div className="flex lg:flex-row flex-col max-w-screen-xl justify-between mt-8 gap-6">
          <aside className="hidden lg:block min-w-[350px] max-w-[350px] overflow-y-auto sticky top-16 self-start border rounded-md mr-8">
            <Skeleton className="w-full h-[400px]" />
          </aside>

          <Skeleton className="w-full h-[60px] lg:hidden" />

          <main className="w-full">
            <Skeleton className="h-[5000px] w-full" />

            {/* <Summarizer text={post.content} />

          <div className="flex flex-col justify-center py-14">
            <CommentSection postId={post._id} />
          </div> */}
          </main>
        </div>
      </div>
    </div>
  );
};
