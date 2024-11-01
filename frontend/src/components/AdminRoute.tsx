import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { useEffect } from "react";
import { RootState } from "../redux/store";
import { Outlet, useNavigate } from "react-router-dom";
import { toggleAuthModal } from "../redux/features/modal/authModalSlice";

const AuthRoute = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  useEffect(() => {
    if (!currentUser) {
      dispatch(toggleAuthModal()); // Dispatch your action here
      navigate("/"); // Navigate after dispatching
    }
  }, [currentUser, dispatch, navigate]);

  return currentUser ? <Outlet /> : null;
};

export default AuthRoute;
