import { useAppSelector } from "../redux/hooks";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme } = useAppSelector((state) => state.persisted.theme);
  return (
    <div className={theme}>
      <div className="bg-white text-black dark:text-white dark:bg-background  min-h-screen">
        {children}
      </div>
      <ToastContainer position="top-center" theme={theme} />
    </div>
  );
};

export default ThemeProvider;
