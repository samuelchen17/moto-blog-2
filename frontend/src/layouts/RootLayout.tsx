import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <div>
        <header>
          <nav>
            <NavBar />
          </nav>
        </header>

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
