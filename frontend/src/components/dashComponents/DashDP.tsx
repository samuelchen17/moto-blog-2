import { useEffect, useRef, useState } from "react";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { FaEdit } from "react-icons/fa";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseApp } from "../../config/firebaseConfig";
import { Alert, Progress } from "flowbite-react";

const DashDP = () => {
  const [dp, setDP] = useState<File | null>(null);
  const [dpUrl, setDPUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dpUploadProgress, setDPUploadProgress] = useState<number | null>(null);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      throw new Error("File upload failed");
    }

    // check file size
    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage("File must be less than 2MB");
      return;
    }

    setDP(file);
    setDPUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (dp) {
      uploadDP();
    }
  }, [dp]);

  const uploadDP = async () => {
    if (!dp) {
      throw new Error("No file was uploaded");
    }

    // clear error message
    setErrorMessage(null);

    const storage = getStorage(firebaseApp);
    const dpName = new Date().getTime() + dp.name;
    const storageRef = ref(storage, dpName);
    const uploadDP = uploadBytesResumable(storageRef, dp);
    uploadDP.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setDPUploadProgress(Math.round(progress));
      },
      (err) => {
        setErrorMessage("Must be an image file and under 2MB");
        setDPUploadProgress(null);
        setDP(null);
        setDPUrl(null);
        throw new Error(`Storage error: ${err.message}`);
      },
      () => {
        getDownloadURL(uploadDP.snapshot.ref).then((downloadURL) => {
          setDPUrl(downloadURL);
        });
      }
    );
  };

  console.log(dpUploadProgress);

  return (
    <div className="flex flex-col gap-4">
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
      {/* implement loading bar */}
      {/* {dpUploadProgress && (
        <Progress
          progress={dpUploadProgress}
          // progressLabelPosition="inside"
          // textLabel="Flowbite"
          // textLabelPosition="outside"
          // size="lg"
          // labelProgress
          // labelText
        />
      )} */}

      {errorMessage && <Alert color="failure">{errorMessage}</Alert>}
    </div>
  );
};

// store profile image in firebase and store url in MONGO

export default DashDP;
