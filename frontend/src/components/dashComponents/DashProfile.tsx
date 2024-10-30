import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import DashDP from "./DashDP";
import { format } from "date-fns";
import { useState } from "react";
import { IUpdateUserPayload } from "@shared/types/user";
import {
  handleDashFormChange,
  handleDashFormSubmit,
} from "../../utils/dashForm.utils";

const DashProfile = () => {
  const [formData, setFormData] = useState<IUpdateUserPayload>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  // testing
  // const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, [e.target.id]: e.target.value });
  // };

  // const isFormFilled = () => {
  //   return Object.values(formData).some((value) => value.trim() !== "");
  // };

  // const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (Object.keys(formData).length === 0) {
  //     return;
  //   }
  //   // implement loading, and prevent user from constantly updating
  //   try {
  //   } catch (err) {}
  // };

  console.log(formData);

  return (
    <div className="w-full mx-auto px-4">
      <h1 className="text-2xl">Profile</h1>

      <hr></hr>

      <form
        className="flex md:flex-row flex-col-reverse"
        onSubmit={handleDashFormSubmit({
          formData,
          setFormData,
          isLoading,
          setIsLoading,
        })}
      >
        <div className="pr-10">
          <div>
            <div className="flex flex-col">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="username" value="Username" />
                </div>
                <TextInput
                  type="text"
                  id="username"
                  placeholder="username"
                  defaultValue={currentUser?.user.username}
                  onChange={handleDashFormChange({ formData, setFormData })}
                />
              </div>
            </div>

            <div className="mb-2 block">
              <Label htmlFor="joined" value="Date joined" />
            </div>
            <span>
              {currentUser?.user.dateJoined &&
                format(new Date(currentUser.user.dateJoined), "MMMM dd, yyyy")}
            </span>
          </div>
          <DashDP formData={formData} setFormData={setFormData} />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-2">Loading...</span>{" "}
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </form>
    </div>
  );
};

export default DashProfile;
