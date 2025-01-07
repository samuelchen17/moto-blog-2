import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// also display new comment once post successful

const AddEventModal = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = useState<boolean>(false);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );
  const [eventDetails, setEventDetails] = useState<IEventRequest>({
    createdBy: currentUser!.user.id,
    date: new Date(),
    title: "",
    location: "",
    category: "",
    description: "",
    participants: [],
    capacity: 5,
  });

  const handleChange = (field: string, value: any) => {
    setEventDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const updatedEventDetails = {
      ...eventDetails,
      date: date?.toISOString(),
    };

    try {
      console.log(updatedEventDetails);
      const res = await _post(
        `/event/create-event/${currentUser?.user.id}`,
        updatedEventDetails
      );
      const data = res.data;

      setOpen(false);

      // update live feedback after adding event implement
    } catch (err) {
      console.error("Error:", err);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mr-auto">Create event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>
            Please fill out event details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label>Event title</Label>
            <Input
              id="title"
              value={eventDetails?.title}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            ></Input>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Date</Label>
            <DatePicker date={date} setDate={setDate} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Input
              id="description"
              value={eventDetails?.description}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            ></Input>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Category</Label>
            <Input
              id="category"
              value={eventDetails?.category}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            ></Input>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Location</Label>
            <Input
              id="location"
              value={eventDetails?.location}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            ></Input>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Capacity</Label>
            <Input id="name"></Input>
          </div>
        </div>

        {errorMessage && <Alert color="failure">{errorMessage}</Alert>}
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Add Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventModal;

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { IEventRequest } from "@/types";
import { _post } from "@/api/axiosClient";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Alert } from "flowbite-react";

interface IDatePicker {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function DatePicker({ date, setDate }: IDatePicker) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
