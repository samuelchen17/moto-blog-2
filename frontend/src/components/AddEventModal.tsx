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

const AddEventModal = () => {
  const [addEvent, setAddEvent] = useState<boolean>(false);

  return (
    <>
      <DatePicker />
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create event</Button>
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
              <Label>Event name</Label>
              <Input id="name"></Input>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Date</Label>
              <DatePicker />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Description</Label>
              <Input id="name"></Input>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Category</Label>
              <Input id="name"></Input>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Location</Label>
              <Input id="name"></Input>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
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

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();

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
