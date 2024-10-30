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
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  return (
    <div className="w-full mx-auto px-4">
      <h1 className="text-2xl">Profile</h1>

      <hr></hr>

      <form
        className="flex md:flex-row flex-col-reverse"
        onSubmit={handleDashFormSubmit({
          formData,
          setFormData,
          currentUser,
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
        </div>
        {/* <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-2">Loading...</span>{" "}
            </>
          ) : (
            "Save changes"
          )}
        </Button> */}
      </form>
      <DashDP formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default DashProfile;
