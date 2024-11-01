import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { IUpdateUserPayload } from "@shared/types/user";
import {
  handleDashFormChange,
  handleDashFormSubmit,
} from "../../utils/dashForm.utils";
import { useAppDispatch } from "../../redux/hooks";
import { useState } from "react";

const DashSettings = () => {
  const [formData, setFormData] = useState<IUpdateUserPayload>({});
  const [updateComplete, setUpdateComplete] = useState<boolean>(false);
  const { currentUser, loading, error } = useAppSelector(
    (state: RootState) => state.persisted.user
  );
  const dispatch = useAppDispatch();

  return (
    <div className="w-full mx-auto px-4">
      <h1 className="text-2xl">Settings</h1>

      <hr></hr>

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
            type="text"
            id="password"
            placeholder="password"
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
        {error && <Alert color="failure">{error}</Alert>}
        {updateComplete && <Alert color="success">Successfully updated</Alert>}
      </form>

      <div className="my-2">
        <span className="text-red-700">Delete Account</span>
      </div>
    </div>
  );
};

export default DashSettings;
