import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const ContactUs = () => {
  return (
    <div className="flex justify-between overflow-hidden md:border rounded-md relative md:h-[500px] h-[460px]">
      <img
        className="absolute w-full h-full object-cover filter contrast-125 brightness-75 top-0 left-0 md:block hidden"
        alt="group ride image"
        src="https://images.unsplash.com/photo-1690540293122-14d3051a5fe5?q=80&w=2698&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="absolute bottom-0 top-0 flex flex-col md:flex-row w-full justify-end">
        <div className="flex-grow space-y-6 rounded-lg p-6 bg-black md:bg-opacity-75 bg-opacity-90 md:my-auto md:m-8 max-w-[600px]">
          <div>
            <Label className="text-white">Name</Label>
            <Input
              placeholder="name"
              className="bg-white  text-black border-black  dark:text-white  dark:bg-black dark:border-white"
            />
          </div>
          <div>
            <Label className="text-white">Email</Label>
            <Input
              placeholder="email"
              type="email"
              className="bg-white  text-black border-black  dark:text-white  dark:bg-black dark:border-white"
            />
          </div>
          <div>
            <Label className="text-white">Message</Label>
            <Textarea
              placeholder="your message..."
              rows={5}
              className="bg-white  text-black border-black  dark:text-white  dark:bg-black dark:border-white"
            />
          </div>
          <Button className="bg-white text-black">Send message</Button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
