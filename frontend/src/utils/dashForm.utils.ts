import React from "react";
import { IUpdateUserPayload } from "@shared/types/user";

export interface IDashFormProps {
  formData: IUpdateUserPayload;
  setFormData: React.Dispatch<React.SetStateAction<IUpdateUserPayload>>;
  isLoading?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleDashFormChange =
  ({ formData, setFormData }: IDashFormProps) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

export const handleDashFormSubmit =
  ({ formData, setFormData }: IDashFormProps) =>
  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }
    // implement loading, and prevent user from constantly updating
    try {
      // clear form after submit
      setFormData({});
    } catch (err) {}
  };
