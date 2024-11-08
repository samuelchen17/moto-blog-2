import { useEffect, useRef, useState } from "react";
import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FaEdit } from "react-icons/fa";
import {
  // deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseApp } from "../../config/firebase.config";
import { Alert, Spinner } from "flowbite-react";
import React from "react";
import { IDashFormProps } from "../../utils/dashForm.utils";
import { updateStart, updateStop } from "../../redux/features/user/userSlice";

// const DashDP: React.FC<IDashDpProps> = ({ setFormData })
const DashDP = ({ setFormData, formData }: IDashFormProps) => {
  const [dp, setDP] = useState<File | null>(null);
  const [dpUrl, setDPUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dpUploadProgress, setDPUploadProgress] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  // const [tempImagePath, setTempImagePath] = useState<string | null>(null);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );
  const dispatch = useAppDispatch();

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
    setLoading(true);
    dispatch(updateStart());

    const storage = getStorage(firebaseApp);
    // const dpName = new Date().getTime() + dp.name;
    const dpName = `profilePicture/${new Date().getTime()}_${dp.name}`;
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
        setLoading(false);
        dispatch(updateStop());
        throw new Error(`Storage error: ${err.message}`);
      },
      async () => {
        getDownloadURL(uploadDP.snapshot.ref).then((downloadURL) => {
          setDPUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          // setTempImagePath(storageRef.fullPath);
          dispatch(updateStop());
          setLoading(false);
        });
      }
    );
  };

  // implement, firebase auth
  // delete image if not submitted
  // useEffect(() => {
  //   return () => {
  //     if (tempImagePath) {
  //       const storage = getStorage(firebaseApp);
  //       const imageRef = ref(storage, tempImagePath);
  //       deleteObject(imageRef)
  //         .then(() => {
  //           console.log("Temporary image deleted successfully");
  //         })
  //         .catch((error) => {
  //           console.error("Error deleting temporary image:", error);
  //         });
  //     }
  //   };
  // }, [tempImagePath]);

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
          // fix for cross origin implement
          // crossOrigin="anonymous" ?
        />
        <button className="absolute bottom-4 text-lg px-2 py-1 rounded-lg bg-black text-white flex justify-center items-center gap-2 bg-opacity-80">
          <FaEdit />
          Edit
        </button>
      </div>
      {loading && (
        <>
          <Alert color="info" className="flex justify-center items-center">
            <Spinner />
            <span className="pl-3">
              File upload progress:{" "}
              {dpUploadProgress !== null ? dpUploadProgress : 0}%
            </span>
          </Alert>
        </>
      )}

      {!loading && errorMessage && (
        <Alert color="failure" className="flex items-center">
          {errorMessage}
        </Alert>
      )}

      {loading === false && !errorMessage && (
        <>
          <Alert color="success" className="flex items-center">
            File uploaded successfully
          </Alert>
        </>
      )}
    </div>
  );
};

// store profile image in firebase and store url in MONGO

export default DashDP;
