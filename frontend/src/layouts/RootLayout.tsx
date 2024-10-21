import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

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

      <footer></footer>
    </div>
  );
};

export default RootLayout;
