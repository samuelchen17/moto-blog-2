import { Button } from "@/components/ui/button";
import RecentPosts from "../components/recentPosts/RecentPosts";
import HotPosts from "@/components/hotPosts/HotPosts";
import ImageBanner from "@/components/ImageBanner";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import HeadingTwoWrapper from "@/components/HeadingTwoWrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
      <div className="flex flex-col px-4 max-w-screen-xl mx-auto mb-24">
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

        {/* contact us */}
        <div>
          <HeadingTwoWrapper>Contact us</HeadingTwoWrapper>
          <div className="flex justify-between p-4 border rounded-md relative h-[400px]">
            <img
              className="w-full h-full object-cover filter contrast-125 brightness-75"
              alt="group ride image"
              src="https://images.unsplash.com/photo-1690540293122-14d3051a5fe5?q=80&w=2698&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div className="absolute flex w-full">
              <div className="flex-grow text-white">
                <span>We are here to help</span>
                <p>
                  Please leave us a message and we will get back to you within
                </p>
              </div>
              <div className="flex-grow space-y-4 rounded-md p-4 bg-black">
                <Input placeholder="name" />
                <Input placeholder="email" type="email" />
                <Textarea />
                <Button variant="secondary">Send message</Button>
              </div>
            </div>
          </div>

          <div
            className="relative bg-cover bg-center h-[400px] rounded-md border filter contrast-125 brightness-75"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1690540293122-14d3051a5fe5?q=80&w=2698&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
          >
            <div className="absolute inset-0 flex justify-between p-8">
              <div className="flex-grow space-y-4 rounded-md p-6 bg-black my-auto">
                <Input placeholder="name" />
                <Input placeholder="email" type="email" />
                <Textarea />
                <Button variant="secondary">Send message</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
