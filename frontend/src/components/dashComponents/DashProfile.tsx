import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import DashDP from "./DashDP";
import { format } from "date-fns";
import { useState } from "react";
import { IUpdateUserPayload } from "@shared/types/user";
import {
  handleDashFormChange,
  handleDashFormSubmit,
} from "../../utils/dashForm.utils";
import { useAppDispatch } from "../../redux/hooks";

const DashProfile = () => {
  const [formData, setFormData] = useState<IUpdateUserPayload>({});
  const { currentUser, loading, error } = useAppSelector(
    (state: RootState) => state.persisted.user
  );
  const dispatch = useAppDispatch();

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
          dispatch,
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
              <span>Date Joined</span>
            </div>
            <span>
              {currentUser?.user.dateJoined &&
                format(new Date(currentUser.user.dateJoined), "MMMM dd, yyyy")}
            </span>
          </div>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-2">Loading...</span>{" "}
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </form>
      {error ? (
        <Alert color="failure">{error}</Alert>
      ) : (
        <Alert color="success">"Successfully updated"</Alert>
      )}
      <DashDP formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default DashProfile;
