import RecentPosts from "../components/postComponents/RecentPosts";
import HotPosts from "@/components/postComponents/HotPosts";
import ImageBanner from "@/components/wrapperComponents/ImageBanner";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import HeadingTwoWrapper from "@/components/wrapperComponents/HeadingTwoWrapper";
import ContactUs from "@/components/ContactUs";

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
          <ContactUs />
        </div>
      </div>
    </>
  );
};

export default HomePage;
