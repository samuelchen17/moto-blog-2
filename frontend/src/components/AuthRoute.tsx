import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { Outlet } from "react-router-dom";

const AuthRoute = () => {
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );
  return currentUser ? <Outlet /> : <div>Implement redirect to sign in</div>;
};

export default AuthRoute;
