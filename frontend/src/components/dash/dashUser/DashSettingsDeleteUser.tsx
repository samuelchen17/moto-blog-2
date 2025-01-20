import { useState } from "react";
import {
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
} from "../../../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { _delete } from "@/api/axiosClient";
import DeleteModal from "../../DeleteModal";
import { toast } from "react-toastify";
import { Button } from "../../ui/button";

const DashSettingsDeleteUser = () => {
  const [openModal, setOpenModal] = useState(false);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  const dispatch = useAppDispatch();

  const handleDeleteUser = async () => {
    setOpenModal(false);
    try {
      dispatch(deleteUserStart());

      if (!currentUser) {
        dispatch(deleteUserFailure("User is not authorized"));
        return;
      }

      const res = await _delete(`/user/${currentUser.user.id}`);
      const data: any = res.data;

      dispatch(deleteUserSuccess());

      toast.info(data.message);
    } catch (err) {
      console.error("Error:", err);
      if (err instanceof Error) {
        dispatch(deleteUserFailure(err.message));
      } else {
        dispatch(deleteUserFailure("An unknown error occurred"));
      }
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="pt-10 space-y-3">
        <div className="text-xl mb-3 capitalize space-y-2 text-red-600">
          <span>Delete Account</span>
          <hr />
        </div>
        <div>
          Once you delete your account, there is no going back. Please be
          certain.
        </div>
        <Button onClick={() => setOpenModal(true)} variant="destructive">
          Delete Account
        </Button>
      </div>

      <DeleteModal
        open={openModal}
        close={closeModal}
        handleDelete={handleDeleteUser}
        message="your account and remove your data from our servers"
      />
    </>
  );
};

export default DashSettingsDeleteUser;
