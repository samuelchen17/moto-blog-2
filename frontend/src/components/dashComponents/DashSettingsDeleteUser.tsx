import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
} from "../../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { _delete } from "@/api/axiosClient";

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
      // const data: any = res.data;

      dispatch(deleteUserSuccess());

      // alert(data.message);
    } catch (err) {
      console.error("Error:", err);
      if (err instanceof Error) {
        dispatch(deleteUserFailure(err.message));
      } else {
        dispatch(deleteUserFailure("An unknown error occurred"));
      }
    }
  };

  return (
    <>
      <div className="my-2 cursor-pointer hover:underline">
        <span onClick={() => setOpenModal(true)} className="text-red-700">
          Delete Account
        </span>
      </div>

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        dismissible
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DashSettingsDeleteUser;

// const res: Response = await fetch(`/api/user/${currentUser.user.id}`, {
//   method: "DELETE",
// });

// const data = await res.json();

// if (!res.ok) {
//   dispatch(deleteUserFailure(data.message));
//   return;
// }
