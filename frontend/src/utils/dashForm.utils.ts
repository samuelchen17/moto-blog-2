import React from "react";
import { IUpdateUserPayload } from "@shared/types/user";
import { ISuccessRes } from "@shared/types/res";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/features/user/userSlice";
import { deleteTempImageSuccess } from "../redux/features/image/imageSlice";
import { AppDispatch } from "../redux/store";
import { storage } from "../config/firebase.config";
import { deleteObject, ref } from "firebase/storage";

export interface IDashFormProps {
  formData: IUpdateUserPayload;
  setFormData: React.Dispatch<React.SetStateAction<IUpdateUserPayload>>;
}

interface IDashSubmitProps extends IDashFormProps {
  currentUser: ISuccessRes | null;
  dispatch: AppDispatch;
  setUpdateComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

// handle update for change
export const handleDashFormChange =
  ({ formData, setFormData }: IDashFormProps) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

// handle update data request
export const handleDashFormSubmit =
  ({
    formData,
    setFormData,
    currentUser,
    dispatch,
    setUpdateComplete,
  }: IDashSubmitProps) =>
  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check if form is empty
    if (Object.keys(formData).length === 0) {
      dispatch(updateFailure("No changes were made"));
      return;
    }

    if (!currentUser) {
      throw new Error("no user");
    }

    try {
      dispatch(updateStart());

      // delete previous dp
      if (formData.profilePicture) {
        const prevDpLink = currentUser.user.profilePicture;

        // skip delete if default dp
        if (
          prevDpLink !==
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/680px-Default_pfp.svg.png"
        ) {
          const imageRef = ref(storage, prevDpLink);
          deleteObject(imageRef)
            .then(() => {
              console.log("Previous dp deleted successfully");
              dispatch(deleteTempImageSuccess());
            })
            .catch((error) => {
              console.error("Error deleting previous dp:", error);
              dispatch(deleteTempImageSuccess());
            });
        }
      }

      const payload: IUpdateUserPayload = { ...formData };

      const res: Response = await fetch(`/api/user/${currentUser.user.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      const data: ISuccessRes = await res.json();

      if (!res.ok) {
        // Display the error message from the backend
        dispatch(updateFailure(data.message));
        return;
      }

      dispatch(deleteTempImageSuccess());
      dispatch(updateSuccess(data));
      setUpdateComplete(true);
      // clear form after submit
      setFormData({});
    } catch (err) {
      console.error("Error:", err);

      if (err instanceof Error) {
        // setErrorMessage(err.message);
        dispatch(updateFailure(err.message));
      } else {
        dispatch(updateFailure("An unknown error occurred"));
      }
    }
  };
