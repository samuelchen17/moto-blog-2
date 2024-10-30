import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { Button, Label, TextInput } from "flowbite-react";
import DashDP from "./DashDP";
import { format } from "date-fns";
import { useState } from "react";

const DashProfile = () => {
  const [formData, setFormData] = useState({});
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  const handleUserUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(formData);

  return (
    <div className="w-full mx-auto px-4">
      <h1 className="text-2xl">Profile</h1>
      <hr></hr>
      <div className="flex md:flex-row flex-col-reverse">
        <div className="pr-10">
          <form className="flex flex-col">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Username" />
              </div>
              <TextInput
                type="text"
                id="username"
                placeholder="username"
                defaultValue={currentUser?.user.username}
                onChange={handleUserUpdate}
              />
            </div>
            <Button>Update display name</Button>
          </form>

          <div className="mb-2 block">
            <Label htmlFor="joined" value="Date joined" />
          </div>
          <span>
            {currentUser?.user.dateJoined &&
              format(new Date(currentUser.user.dateJoined), "MMMM dd, yyyy")}
          </span>
        </div>
        <DashDP />
      </div>
    </div>
  );
};

export default DashProfile;
