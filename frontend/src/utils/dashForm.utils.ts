import React from "react";
import { IUpdateUserPayload } from "@shared/types/user";

export interface IDashFormProps {
  formData: IUpdateUserPayload;
  setFormData: React.Dispatch<React.SetStateAction<IUpdateUserPayload>>;
  isLoading?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IDashSubmitProps extends IDashFormProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export const handleDashFormChange =
  ({ formData, setFormData }: IDashFormProps) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

export const handleDashFormSubmit =
  ({
    formData,
    setFormData,
    isLoading,
    setIsLoading,
    errorMessage,
    setErrorMessage,
  }: IDashSubmitProps) =>
  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return console.log("empty");
    }
    console.log(formData);
    // implement loading, and prevent user from constantly updating
    try {
      // clear form after submit
      setFormData({});
    } catch (err) {}
  };
