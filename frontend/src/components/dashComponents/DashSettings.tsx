import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { Label, TextInput } from "flowbite-react";
import DashDP from "./DashDP";

const DashSettings = () => {
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

            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                type="text"
                id="email"
                placeholder="email"
                defaultValue={currentUser?.user.email}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput type="text" id="password" placeholder="password" />
            </div>
          </form>
        </div>
        <DashDP />
      </div>
      <div>
        <span>Delete Account</span>
      </div>
    </div>
  );
};

export default DashSettings;
