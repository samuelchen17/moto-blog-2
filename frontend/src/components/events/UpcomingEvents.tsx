import { useEffect, useState } from "react";
import UpcomingEvent from "./UpcomingEvent";
import { _get } from "@/api/axiosClient";
import { IEventResponse } from "@/types";
import HeadingTwoWrapper from "../HeadingTwoWrapper";
import { SkeletonEventCard } from "../SkeletonComponents";

const UpcomingEvents = () => {
  const [events, setEvents] = useState<IEventResponse>();

  useEffect(() => {
    const getEvents = async () => {
      try {
        // remove production
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        const res = await _get<IEventResponse>("/event/get-events");
        const data = res.data;

        setEvents(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    getEvents();
  }, []);

  return (
    <div>
      <div className="grid sm:gap-12 gap-4">
        {events ? (
          events.currentEvents?.length > 0 ? (
            <>
              {events.currentEvents.map((event) => (
                <UpcomingEvent key={event._id} event={event} />
              ))}
            </>
          ) : (
            <div>More events coming soon!</div>
          )
        ) : (
          <SkeletonEventCard />
        )}
      </div>

      <HeadingTwoWrapper>Past events</HeadingTwoWrapper>

      <div className="grid sm:gap-12 gap-4">
        {events ? (
          events.pastEvents?.length > 0 ? (
            <>
              {events.pastEvents.map((event) => (
                <UpcomingEvent key={event._id} event={event} />
              ))}
            </>
          ) : (
            <div>More events coming soon!</div>
          )
        ) : (
          <SkeletonEventCard />
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
