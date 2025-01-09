import { IPostResponse, IPostWithAuthor } from "src/types";
import { useEffect, useState } from "react";
import RecentPostCard from "./RecentPostCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { _get } from "@/api/axiosClient";
import { SkeletonRecentPostsCard } from "../SkeletonComponents";

const RecentPosts = ({ limit }: { limit: number }) => {
  const [recentPosts, setRecentPosts] = useState<IPostWithAuthor[] | null>(
    null
  );

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        // remove production
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const res = await _get<IPostResponse>(`/post/getposts?limit=${limit}`);
        const data = res.data;

        setRecentPosts(data.posts);
      };

      fetchRecentPosts();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
    //   {recentPosts &&
    //     recentPosts.map((post) => (
    //       <RecentPostCard key={post._id} post={post} />
    //     ))}
    // </div>

    <Carousel
      opts={{
        // align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {recentPosts ? (
          recentPosts.map((post) => (
            <CarouselItem
              className="lg:basis-1/4 md:basis-1/3 sm:basis-1/2"
              key={post._id}
            >
              <RecentPostCard post={post} />
            </CarouselItem>
          ))
        ) : (
          <>
            <SkeletonRecentPostsCard />
            <SkeletonRecentPostsCard />
            <SkeletonRecentPostsCard />
            <SkeletonRecentPostsCard />
            <SkeletonRecentPostsCard />
            <SkeletonRecentPostsCard />
          </>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default RecentPosts;
