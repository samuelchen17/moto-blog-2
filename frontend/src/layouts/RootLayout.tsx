import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { useLocation } from "react-router-dom";

const RootLayout = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <div>
        <header>
          <nav>
            <NavBar />
          </nav>
        </header>

        {location.pathname === "/home" && (
          <div className="relative">
            <img
              className="max-h-[60dvh] min-h-[300px] w-full object-cover"
              src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="banner"
            />
            <h1 className="absolute inset-0 flex items-center justify-center uppercase font-bold text-8xl text-white">
              buy that bike
            </h1>
          </div>
        )}

        <main className="max-w-screen-xl mx-auto p-4">
          <Outlet />
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default RootLayout;
