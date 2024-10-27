import { Avatar } from "flowbite-react";

const DashHeader = () => {
  return (
    <div className="flex flex-row gap-2 mx-4 my-4">
      <Avatar rounded />
      <div className="flex flex-col gap">
        <span className="text-lg font-semibold">Username</span>
        <span className="text-sm">User Account</span>
      </div>
    </div>
  );
};

export default DashHeader;
