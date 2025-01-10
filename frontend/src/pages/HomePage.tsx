import { Button } from "@/components/ui/button";
import RecentPosts from "../components/recentPosts/RecentPosts";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import HotPosts from "@/components/hotPosts/HotPosts";
import ImageBanner from "@/components/ImageBanner";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import HeadingTwoWrapper from "@/components/HeadingTwoWrapper";

const HomePage = () => {
  return (
    <>
      <ImageBanner img="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
        <div className="text-center">
          <h1 className="font-bold text-4xl md:text-6xl lg:text-8xl text-white m-4">
            Welcome to MOTOCE
          </h1>
          <h2 className="text-2xl md:text-3xl  lg:text-4xl font-bold  text-white">
            Where Aussie Bikers get together
          </h2>
        </div>
      </ImageBanner>
      {/* gap-6 my-12 */}
      <div className="flex flex-col px-4 max-w-screen-xl mx-auto">
        {/* hot posts */}
        <div>
          <HeadingTwoWrapper>Hot posts</HeadingTwoWrapper>
          <HotPosts />
        </div>

        {/* recent posts */}
        <div className="flex flex-col justify-center pb-14">
          <HeadingTwoWrapper>Recent posts</HeadingTwoWrapper>
          <RecentPosts limit={9} />
        </div>

        {/* upcoming events */}
        {/* <div className="max-w-screen-lg mx-auto"> */}
        <div>
          <HeadingTwoWrapper>Upcoming events</HeadingTwoWrapper>
          <UpcomingEvents />
        </div>

        <div className="rounded-md border overflow-hidden relative my-12 h-[300px]">
          <img
            className="w-full h-full object-cover filter contrast-125 brightness-75"
            alt="group ride image"
            src="https://images.unsplash.com/photo-1690540293122-14d3051a5fe5?q=80&w=2698&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          {/* <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white z-10 w-[50%] text-center py-4 rounded-md flex flex-col items-start"> */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-black text-white rounded-md p-6">
            <span>Group Rides</span>
            <p>We have riding sessions every Tuesday and Thursday nights.</p>
            <Button variant="secondary">Join</Button>

            <Dialog>
              <DialogTrigger>Open</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
