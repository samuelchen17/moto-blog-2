import { Button } from "../ui/button";

const UpcomingEvent = () => {
  return (
    <div className="mx-auto">
      <div className="flex gap-4 my-4 rounded-md bg-slate-100 sm:bg-transparent p-4 mx-auto">
        <div className="p-4 rounded-md bg-slate-100 mb-auto hidden sm:block">
          <div>DEC</div>
          <div>22</div>
        </div>

        <div className="gap-2 flex flex-col">
          <div>
            <span className="text-blue-500">22 December 2024</span>
            <span> Bike Meets</span>
          </div>

          <h2 className="font-bold text-xl">Track day</h2>

          <p>
            description of the event goes here lorem ipsum fjasdkhf as hkjasdhf
            khsdkjf hjafklds hfks hdjkfdsa h
          </p>

          <div className="flex">
            <div>Location melb cbd</div>
            <Button>Join</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvent;
