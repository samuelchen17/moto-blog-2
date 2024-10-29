import { useEffect, useRef, useState } from "react";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { FaEdit } from "react-icons/fa";

const DashDP = () => {
  const [dp, setDP] = useState<File | null>(null);
  const [dpUrl, setDPUrl] = useState<string | null>(null);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  useEffect(() => {
    if (dp) {
      uploadDP();
    }
  }, [dp]);

  const uploadDP = async () => {
    console.log("uploading...");
  };

  return (
    <div>
      <span>Profile picture</span>
      <input
        hidden
        type="file"
        accept="image/*"
        onChange={handleDPChange}
        ref={fileInputRef}
      />
      <div
        className="self-center w-52 h-52 cursor-pointer relative rounded-full"
        onClick={() => fileInputRef.current?.click()}
      >
        <img
          alt="user"
          className="rounded-full w-full h-full object-cover"
          src={dpUrl || currentUser?.user.profilePicture}
        />
        <button className="absolute bottom-4 text-lg px-2 py-1 rounded-lg bg-black text-white flex justify-center items-center gap-2 bg-opacity-80">
          <FaEdit />
          Edit
        </button>
      </div>
    </div>
  );
};

// store profile image in firebase and store url in MONGO

export default DashDP;
