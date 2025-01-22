import { RootState } from "../../../redux/store";
import { useAppSelector } from "../../../redux/hooks";
import { Alert } from "flowbite-react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import DashDP from "./DashProfileDP";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { IUpdateUserPayload } from "src/types";
import {
  handleDashFormChange,
  handleDashFormSubmit,
} from "../../../utils/dashForm.utils";
import { useAppDispatch } from "../../../redux/hooks";
import { updateStop } from "../../../redux/features/user/userSlice";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../../config/firebase.config";
import { deleteTempImageSuccess } from "../../../redux/features/image/imageSlice";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { Loader2 } from "lucide-react";

const DashProfile = () => {
  const [formData, setFormData] = useState<IUpdateUserPayload>({});
  const { currentUser, loading, error } = useAppSelector(
    (state: RootState) => state.persisted.user
  );
  const { tempImagePath } = useAppSelector(
    (state: RootState) => state.persisted.image
  );
  const [updateComplete, setUpdateComplete] = useState<boolean>(false);

  const hasSubmittedRef = useRef(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateStop());
  }, [dispatch]);

  // delete image if not submitted
  useEffect(() => {
    return () => {
      if (tempImagePath && !hasSubmittedRef.current) {
        const imageRef = ref(storage, tempImagePath);
        deleteObject(imageRef)
          .then(() => {
            console.log("Temporary image deleted successfully");
            dispatch(deleteTempImageSuccess());
          })
          .catch((error) => {
            console.error("Error deleting temporary image:", error);
            dispatch(deleteTempImageSuccess());
          });
      }
      hasSubmittedRef.current = false;
    };
  }, [tempImagePath]);

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col-reverse lg:flex-row gap-10">
        <form
          className="flex flex-col gap-5 w-full"
          onSubmit={handleDashFormSubmit({
            formData,
            setFormData,
            currentUser,
            dispatch,
            setUpdateComplete,
          })}
        >
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="username"
              defaultValue={currentUser?.user.username}
              onChange={handleDashFormChange({ formData, setFormData })}
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us a little about yourself"
              defaultValue={currentUser?.user.bio}
              onChange={handleDashFormChange({ formData, setFormData })}
            />
          </div>

          <div className="flex flex-col">
            <Label>
              Date Joined:{" "}
              {currentUser?.user.dateJoined &&
                format(new Date(currentUser.user.dateJoined), "MMMM dd, yyyy")}
            </Label>
          </div>

          <Button
            className="mr-auto"
            type="submit"
            disabled={loading === true}
            onClick={() => (hasSubmittedRef.current = true)}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
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
        <DashDP formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
};

export default DashProfile;
