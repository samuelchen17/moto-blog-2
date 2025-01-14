import { useAppSelector } from "../redux/hooks";
import { ReactNode } from "react";
import { Slide, ToastContainer } from "react-toastify";

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
      <ToastContainer
        position="top-center"
        theme={theme}
        autoClose={3000}
        transition={Slide}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        closeOnClick
        newestOnTop={true}
      />
    </div>
  );
};

export default ThemeProvider;
