import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const ContactUs = () => {
  return (
    <div className="flex justify-between overflow-hidden border rounded-md relative h-[450px]">
      <img
        className="absolute w-full h-full object-cover filter contrast-125 brightness-75 top-0 left-0"
        alt="group ride image"
        src="https://images.unsplash.com/photo-1690540293122-14d3051a5fe5?q=80&w=2698&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="absolute bottom-0 top-0 outline flex flex-col md:flex-row w-full justify-end">
        <div className="flex-grow space-y-6 rounded-lg p-6 bg-black bg-opacity-75 md:my-auto md:m-10 m-4 max-w-[600px]">
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
