import { MapPinned } from "lucide-react";
import { Button } from "../ui/button";

const UpcomingEvent = () => {
  return (
    // add loading for hot posts and recent posts? skeleton maybe?
    // finish hot posts selection? or perhaps integrate algo to auto select hot posts - might be too resource intensive for free service

    <div className="mx-auto">
      <div className="flex gap-4 my-4 rounded-md bg-gray-100 dark:bg-gray-700 sm:dark:bg-transparent sm:bg-transparent p-4 mx-auto">
        <div className="p-4 rounded-md bg-gray-100 dark:bg-gray-700 mb-auto hidden sm:block text-center w-20">
          <div className="font-bold text-blue-500">DEC</div>
          <div className="text-2xl font-bold">22</div>
        </div>

        <div className="gap-2 flex flex-col">
          <div className="">
            <span className="text-blue-500 uppercase font-semibold">
              22 December 2024{" "}
            </span>
            <span className="font-semibold"> | </span>
            <span className="uppercase font-semibold"> Bike Meets</span>
          </div>

          <h2 className="font-bold text-xl">Track day</h2>

          <p className="mb-6">
            description of the event goes here lorem ipsum fjasdkhf as hkjasdhf
            khsdkjf hjafklds hfks hdjkfdsa h
          </p>

          <div className="flex sm:flex-row flex-col gap-4">
            <div className="flex gap-1">
              <MapPinned />
              <span>Location melb cbd</span>
            </div>
            <Button>Join</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvent;
