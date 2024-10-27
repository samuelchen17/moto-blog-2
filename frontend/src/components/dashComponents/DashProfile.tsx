import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { Avatar, Label, TextInput } from "flowbite-react";

const DashProfile = () => {
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  return (
    <div className="outline-dotted w-full mx-auto px-4">
      <h1 className="text-2xl">Profile</h1>
      <hr></hr>
      <div className="flex flex-row">
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
        <div>
          <span>Profile picture</span>
          <div className="self-center w-32 h-32">
            <Avatar
              alt="user"
              className="rounded-full w-full h-full object-cover"
              // img={currentUser.profilePicture} // implement
            />
          </div>
        </div>
      </div>
      <div>
        <span>Delete Account</span>
      </div>
    </div>
  );
};

export default DashProfile;
