import { useState } from "react";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import defaultDP from "/defaultDP.png";

const DashDP = () => {
  const [dP, setDP] = useState<File | null>(null);
  const [dPUrl, setDPUrl] = useState<string | null>(null);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  const handleDPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file === undefined) {
      throw new Error("File upload failed");
    }
    if (file) {
      setDP(file);
      setDPUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <span>Profile picture</span>
      <div className="self-center w-32 h-32">
        <input type="file" accept="image/*" onChange={handleDPChange} />
        <img
          alt="user"
          className="rounded-full w-full h-full object-cover"
          src={currentUser?.user.profilePicture} // implement
        />
      </div>
    </div>
  );
};

// store profile image in firebase and store url in MONGO

export default DashDP;
