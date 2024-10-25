import { Button } from "flowbite-react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleTheme } from "../../redux/features/theme/themeSlice";
import { RootState } from "../../redux/store";

const NavBarThemeBtn = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state: RootState) => state.persisted.theme);

  return (
    <Button
      className="flex justify-center items-center"
      pill
      onClick={() => dispatch(toggleTheme())}
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </Button>
  );
};

export default NavBarThemeBtn;
