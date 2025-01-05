import { useState } from "react";
import { Button } from "./ui/button";

const AddEventModal = () => {
  const [addEvent, setAddEvent] = useState<boolean>(false);
  const [openModel, setOpenModal] = useState<boolean>(false);
  return <Button onClick={() => setOpenModal(true)}>Add event</Button>;
};

export default AddEventModal;
