import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { Alert, Label, Spinner, TextInput } from "flowbite-react";
import { IUpdateUserPayload } from "src/types";
import {
  handleDashFormChange,
  handleDashFormSubmit,
} from "../../utils/dashForm.utils";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { updateStop } from "../../redux/features/user/userSlice";
import DashSettingsDeleteUser from "./DashSettingsDeleteUser";
import { Button } from "../ui/button";

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
      <h1 className="text-2xl">Settings</h1>

      <hr></hr>

      <form
        className="flex flex-col gap-6"
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
            <Label htmlFor="email" value="Change email" />
          </div>
          <TextInput
            type="text"
            id="email"
            placeholder="email"
            defaultValue={currentUser?.user.email}
            onChange={handleDashFormChange({ formData, setFormData })}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Change password" />
          </div>
          <TextInput
            type="password"
            id="password"
            placeholder="password"
            onChange={handleDashFormChange({ formData, setFormData })}
          />
          <div className="mb-2 block">
            <Label htmlFor="password" value="Confirm password" />
          </div>
          <TextInput
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            onChange={handleDashFormChange({ formData, setFormData })}
          />
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
