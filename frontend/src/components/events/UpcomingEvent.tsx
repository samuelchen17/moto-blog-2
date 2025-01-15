import { MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { IEvent } from "@/types";
import { format } from "date-fns";

const UpcomingEvent = ({ event }: { event: IEvent }) => {
  return (
    // finish hot posts selection? or perhaps integrate algo to auto select hot posts - might be too resource intensive for free service

    <div className="flex gap-4 rounded-md border sm:dark:bg-transparent sm:bg-transparent mx-auto sm:p-0 p-4 w-full">
      <div className="py-4 px-6 rounded-md border mb-auto hidden sm:block text-center mr-2">
        <div className="font-bold text-blue-500 uppercase">
          {format(event.date, "MMM")}
        </div>
        <div className="text-2xl font-bold">{format(event.date, "dd")}</div>
      </div>

      <div className="gap-2 flex flex-col">
        <div className="">
          <span className="text-blue-500 uppercase font-semibold">
            {format(event.date, "dd MMMM yyyy")}{" "}
          </span>
          <span className="font-semibold"> | </span>
          <span className="uppercase font-semibold"> {event.category}</span>
        </div>

        <h2 className="font-bold text-xl">{event.title}</h2>

        <p className="mb-6 sm:mb-0 line-clamp-3">{event.description}</p>

        <div className="flex sm:flex-row flex-col gap-4 sm:items-center">
          <Button className="order-1 sm:order-none">Join</Button>
          <div className="flex gap-1">
            <MapPin />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvent;
