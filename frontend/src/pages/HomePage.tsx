import { Button } from "@/components/ui/button";
import RecentPosts from "../components/postComponents/RecentPosts";
import HotPosts from "@/components/postComponents/HotPosts";
import ImageBanner from "@/components/ImageBanner";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import HeadingTwoWrapper from "@/components/wrapperComponents/HeadingTwoWrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
          <div className="flex justify-between overflow-hidden border rounded-md relative h-[600px]">
            <img
              className="absolute w-full h-full object-cover filter contrast-125 brightness-75 top-0 left-0"
              alt="group ride image"
              src="https://images.unsplash.com/photo-1690540293122-14d3051a5fe5?q=80&w=2698&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div className="absolute bottom-0 top-0 outline flex flex-col md:flex-row w-full justify-end">
              <div className="flex-grow space-y-6 rounded-md p-6 bg-black bg-opacity-90 md:my-auto md:m-10 m-4 max-w-[600px]">
                <div>
                  <Label className="text-white">Name</Label>
                  <Input
                    placeholder="name"
                    className="bg-white border-white text-black"
                  />
                </div>
                <div>
                  <Label className="text-white">Email</Label>
                  <Input
                    placeholder="email"
                    type="email"
                    className="bg-white border-white text-black"
                  />
                </div>
                <div>
                  <Label className="text-white">Message</Label>
                  <Textarea
                    placeholder="your message..."
                    className="bg-white border-white text-black"
                  />
                </div>
                <Button className="bg-white text-black">Send message</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
