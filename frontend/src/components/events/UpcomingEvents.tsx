import { useEffect, useState } from "react";
import UpcomingEvent from "./UpcomingEvent";
import { _get } from "@/api/axiosClient";
import { IEventResponse } from "@/types";

const UpcomingEvents = () => {
  const [events, setEvents] = useState<IEventResponse>();

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await _get<IEventResponse>("/event/get-events");
        const data = res.data;

        setEvents(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    getEvents();
  });

  return (
    <div>
      {events?.currentEvents.map((event) => (
        <UpcomingEvent key={event._id} event={event} />
      ))}

      <div>Past events</div>
      {events?.pastEvents.map((event) => (
        <UpcomingEvent key={event._id} event={event} />
      ))}

      <div className="text-red-500">More Events implement or past events</div>
    </div>
  );
};

export default UpcomingEvents;
