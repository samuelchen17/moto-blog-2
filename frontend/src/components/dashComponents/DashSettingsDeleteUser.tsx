import { useState } from "react";
import {
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
} from "../../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { _delete } from "@/api/axiosClient";
import DeleteModal from "../DeleteModal";
import { toast } from "react-toastify";

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
      <div className="my-2 cursor-pointer hover:underline">
        <span onClick={() => setOpenModal(true)} className="text-red-700">
          Delete Account
        </span>
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
