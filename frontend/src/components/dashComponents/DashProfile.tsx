import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { Button, Label, TextInput } from "flowbite-react";
import DashDP from "./DashDP";
import { format } from "date-fns";
import { useState } from "react";
import { IUpdateUserPayload } from "@shared/types/user";

const DashProfile = () => {
  const [formData, setFormData] = useState<IUpdateUserPayload>({});
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  const handleUserUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // const isFormFilled = () => {
  //   return Object.values(formData).some((value) => value.trim() !== "");
  // };

  const handleUserUpdateSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }
    // implement loading, and prevent user from constantly updating
    try {
    } catch (err) {}
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
                onChange={handleUserUpdateChange}
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
