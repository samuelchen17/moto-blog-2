import { RootState } from "../../../redux/store";
import { useAppSelector } from "../../../redux/hooks";
import { Alert } from "flowbite-react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { IUpdateUserPayload } from "src/types";
import {
  handleDashFormChange,
  handleDashFormSubmit,
} from "../../../utils/dashForm.utils";
import { useAppDispatch } from "../../../redux/hooks";
import { useEffect, useState } from "react";
import { updateStop } from "../../../redux/features/user/userSlice";
import DashSettingsDeleteUser from "./DashSettingsDeleteUser";
import { Button } from "../../ui/button";
import { Loader2 } from "lucide-react";

const DashSettings = () => {
  const [formData, setFormData] = useState<IUpdateUserPayload>({});
  const [updateComplete, setUpdateComplete] = useState<boolean>(false);
  const { currentUser, loading, error } = useAppSelector(
    (state: RootState) => state.persisted.user
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateStop());
  }, [dispatch]);

  return (
    <div className="w-full mx-auto">
      <form
        className="flex flex-col gap-5"
        onSubmit={handleDashFormSubmit({
          formData,
          setFormData,
          currentUser,
          dispatch,
          setUpdateComplete,
        })}
      >
        <div>
          <Label htmlFor="email">Change email</Label>
          <Input
            type="text"
            id="email"
            placeholder="email"
            defaultValue={currentUser?.user.email}
            onChange={handleDashFormChange({ formData, setFormData })}
          />
        </div>
        <div>
          <Label htmlFor="password">Change password</Label>
          <Input
            type="password"
            id="password"
            placeholder="password"
            onChange={handleDashFormChange({ formData, setFormData })}
          />
        </div>

        <div>
          <Label htmlFor="password">Confirm password</Label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            onChange={handleDashFormChange({ formData, setFormData })}
          />
        </div>
        <Button className="mr-auto" type="submit" disabled={loading === true}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              <span className="pl-2">Loading...</span>{" "}
            </>
          ) : (
            "Save changes"
          )}
        </Button>
        {error && !loading && <Alert color="failure">{error}</Alert>}
        {updateComplete && !loading && (
          <Alert color="success">Successfully updated</Alert>
        )}
      </form>

      <DashSettingsDeleteUser />
    </div>
  );
};

export default DashSettings;
