import React from "react";
import { IUpdateUserPayload } from "@shared/types/user";
import { ISuccessRes } from "@shared/types/res";

export interface IDashFormProps {
  formData: IUpdateUserPayload;
  setFormData: React.Dispatch<React.SetStateAction<IUpdateUserPayload>>;
  isLoading?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IDashSubmitProps extends IDashFormProps {
  currentUser: ISuccessRes | null;
}

export const handleDashFormChange =
  ({ formData, setFormData }: IDashFormProps) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

export const handleDashFormSubmit =
  ({ formData, setFormData, currentUser }: IDashSubmitProps) =>
  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // setErrorMessage(null);

    // check if form is empty
    if (Object.keys(formData).length === 0) {
      return console.log("empty");
    }

    if (!currentUser) {
      throw new Error("no user");
    }

    console.log(formData);
    // implement loading, and prevent user from constantly updating
    try {
      // setIsLoading(true);
      const payload: IUpdateUserPayload = { ...formData };

      const res: Response = await fetch(`/api/user/${currentUser.user.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      const data: ISuccessRes = await res.json();

      if (!res.ok) {
        // Display the error message from the backend
        throw new Error(data.message || "An unexpected error occurred");
      }

      // clear form after submit
      setFormData({});
    } catch (err) {
      console.error("Error:", err);

      // if (err instanceof Error) {
      //   setErrorMessage(err.message);
      // } else {
      //   setErrorMessage("An unknown error occurred");
      // }
    }
  };
