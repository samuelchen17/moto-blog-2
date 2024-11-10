import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import DashDP from "./DashProfileDP";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { IUpdateUserPayload } from "@shared/types/user";
import {
  handleDashFormChange,
  handleDashFormSubmit,
} from "../../utils/dashForm.utils";
import { useAppDispatch } from "../../redux/hooks";
import { updateStop } from "../../redux/features/user/userSlice";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../config/firebase.config";

const DashProfile = () => {
  const [formData, setFormData] = useState<IUpdateUserPayload>({});
  const [tempImagePath, setTempImagePath] = useState<string | null>(null);
  const { currentUser, loading, error } = useAppSelector(
    (state: RootState) => state.persisted.user
  );
  const [updateComplete, setUpdateComplete] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateStop());
  }, [dispatch]);

  // delete image if not submitted
  useEffect(() => {
    return () => {
      if (tempImagePath) {
        const imageRef = ref(storage, tempImagePath);
        deleteObject(imageRef)
          .then(() => {
            console.log("Temporary image deleted successfully");
          })
          .catch((error) => {
            console.error("Error deleting temporary image:", error);
          });
      }
    };
  }, [tempImagePath]);

  return (
    <div className="w-full mx-auto px-4">
      <h1 className="text-2xl">Profile</h1>

      <hr></hr>

      <div className="flex flex-col-reverse">
        <form
          className="flex flex-col gap-2"
          onSubmit={handleDashFormSubmit({
            formData,
            setFormData,
            currentUser,
            dispatch,
            setUpdateComplete,
          })}
        >
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

          <div className="flex flex-col">
            <span>Date Joined</span>
            <span>
              {currentUser?.user.dateJoined &&
                format(new Date(currentUser.user.dateJoined), "MMMM dd, yyyy")}
            </span>
          </div>

          <Button type="submit" disabled={loading === true}>
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-2">Loading...</span>{" "}
              </>
            ) : (
              "Save changes"
            )}
          </Button>
          {error && <Alert color="failure">{error}</Alert>}
          {updateComplete && (
            <Alert color="success">Successfully updated</Alert>
          )}
        </form>
        <DashDP
          formData={formData}
          setFormData={setFormData}
          setTempImagePath={setTempImagePath}
        />
      </div>
    </div>
  );
};

export default DashProfile;
