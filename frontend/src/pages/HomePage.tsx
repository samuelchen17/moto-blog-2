import { Button } from "@/components/ui/button";
import RecentPosts from "../components/recentPosts/RecentPosts";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-6 my-12 px-4 max-w-screen-xl mx-auto ">
      <div className="flex flex-col justify-center py-12 mb-12">
        <h2 className="font-bold text-2xl mb-6">You might also like</h2>
        <RecentPosts limit={9} />
      </div>

      <div className="rounded-md border overflow-hidden relative my-12">
        <img
          className="w-full h-[300px] object-cover opacity-20"
          alt="group ride image"
          src="https://images.unsplash.com/photo-1690540293122-14d3051a5fe5?q=80&w=2698&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        {/* <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white z-10 w-[50%] text-center py-4 rounded-md flex flex-col items-start"> */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-black text-white rounded-md">
          <span>Group Rides</span>
          <p>We have riding sessions every Tuesday and Thursday nights.</p>
          <Button variant="secondary">Join</Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
