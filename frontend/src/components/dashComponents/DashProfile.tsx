import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { Avatar, TextInput } from "flowbite-react";

const DashProfile = () => {
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  return (
    <div className="max-w-lg mx-auto">
      <h1>Profile</h1>
      <form className="flex flex-col">
        <div className="self-center w-32 h-32">
          <Avatar
            alt="user"
            className="rounded-full w-full h-full object-cover"
            // img={currentUser.profilePicture} // implement
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser?.user.username}
        />
        <TextInput
          type=""
          id="username"
          placeholder="username"
          defaultValue={currentUser?.user.username}
        />
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser?.user.username}
        />
      </form>
    </div>
  );
};

export default DashProfile;
