import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const defaultEventDetails = {
  createdBy: "",
  date: new Date(),
  title: "",
  location: "",
  category: "",
  description: "",
  participants: [],
  capacity: 0,
};

const AddEventModal = ({
  setEvents,
  children,
  eventToBeEdited,
  startOpen,
}: {
  setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>;
  children?: any;
  eventToBeEdited?: IEvent;
  startOpen?: boolean;
}) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = useState<boolean>(false);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );
  const [eventDetails, setEventDetails] =
    useState<IEventRequest>(defaultEventDetails);

  // useEffect to fill in existing information
  React.useEffect(() => {
    if (eventToBeEdited) {
      setEventDetails(eventToBeEdited);
    } else {
      setEventDetails(defaultEventDetails);
    }
  }, [eventToBeEdited]);

  // need useEffect as calling a state setter function directly during component render is not allowed
  React.useEffect(() => {
    if (eventToBeEdited?.date) {
      setDate(new Date(eventToBeEdited.date));
    }
  }, [eventToBeEdited]);

  // useEffect to open modal without trigger
  React.useEffect(() => {
    if (startOpen) {
      setOpen(true);
    }
  }, [startOpen]);

  const handleChange = (field: string, value: any) => {
    setEventDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setErrorMessage("");

    const updatedEventDetails = {
      ...eventDetails,
      createdBy: currentUser?.user.id,
      date: date?.toISOString(),
    };

    try {
      const url = eventToBeEdited
        ? `/event/edit-event/${eventToBeEdited._id}/${currentUser?.user.id}`
        : `/event/create-event/${currentUser?.user.id}`;

      const res = eventToBeEdited
        ? await _patch<IEvent>(url, updatedEventDetails)
        : await _post<IEvent>(url, updatedEventDetails);

      const data = res.data;

      setEvents((prev) => {
        if (eventToBeEdited) {
          // find event in array by id
          return prev.map((event) =>
            event._id === eventToBeEdited._id ? { ...event, ...data } : event
          );
        } else {
          // add the new event
          return [...prev, data];
        }
      });

      setEventDetails(defaultEventDetails);
      setOpen(false);
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
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {eventToBeEdited ? "Edit Event" : "Create Event"}
          </DialogTitle>
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
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Date</Label>
            <DatePicker date={date} setDate={setDate} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea
              id="description"
              value={eventDetails?.description}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Category</Label>
            <Input
              id="category"
              value={eventDetails?.category}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Location</Label>
            <Input
              id="location"
              value={eventDetails?.location}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Capacity</Label>
            <Input
              type="number"
              id="capacity"
              value={eventDetails?.capacity}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
          </div>
        </div>

        {errorMessage && <Alert color="failure">{errorMessage}</Alert>}
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            {eventToBeEdited ? "Save Changes" : "Add Event"}
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IEvent, IEventRequest } from "@/types";
import { _patch, _post } from "@/api/axiosClient";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Alert } from "flowbite-react";
import { Textarea } from "@/components/ui/textarea";

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
