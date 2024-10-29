import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { Button, Label, TextInput } from "flowbite-react";
import DashDP from "./DashDP";
import { format } from "date-fns";

const DashProfile = () => {
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

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
              />
            </div>
            <Button>Update display name</Button>
          </form>
          <div className="mb-2 block">
            <Label htmlFor="joined" value="Joined" />
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
