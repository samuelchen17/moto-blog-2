import { useState } from "react";
import { Button } from "./ui/button";
import { Modal } from "flowbite-react";

const AddEventModal = () => {
  const [addEvent, setAddEvent] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Add event</Button>{" "}
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        dismissible
      >
        <Modal.Header />
        <Modal.Body>
          <form>
            information for new event
            <div>
              <label>Title</label>
              <Input />
            </div>
            <div>
              <label>Description</label>
              <Input />
            </div>
            <DatePicker />
          </form>
        </Modal.Body>
      </Modal>
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
