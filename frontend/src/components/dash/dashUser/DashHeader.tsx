import { Avatar } from "flowbite-react";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

const DashHeader = () => {
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  return (
    <div className="flex flex-row gap-2 px-4 py-4">
      <Avatar rounded img={currentUser?.user.profilePicture} />
      <div className="flex flex-col gap">
        <span className="text-lg font-semibold">
          {currentUser?.user.username} ({currentUser?.user.email})
        </span>
        <span className="text-sm">Your personal Account</span>
      </div>
    </div>
  );
};

export default DashHeader;
