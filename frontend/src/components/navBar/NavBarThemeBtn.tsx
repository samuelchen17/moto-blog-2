// import { Button } from "flowbite-react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleTheme } from "../../redux/features/theme/themeSlice";
import { RootState } from "../../redux/store";

import { Switch } from "@/components/ui/switch";

const NavBarThemeBtn = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state: RootState) => state.persisted.theme);

  return (
    <div className="flex items-center gap-2">
      {theme === "dark" ? <FaSun /> : <FaMoon />}
      <Switch
        className="dark:bg-white bg-black"
        onClick={() => dispatch(toggleTheme())}
      />
    </div>
  );
};

export default NavBarThemeBtn;
{
  /* <Button
className="flex justify-center items-center"
pill
onClick={() => dispatch(toggleTheme())}
>
{theme === "dark" ? <FaSun /> : <FaMoon />}
</Button> */
}
