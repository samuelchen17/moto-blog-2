import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div>
      <header>
        <nav>
          <NavBar />
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
