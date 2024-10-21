import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <header>
        <nav></nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer></footer>
    </div>
  );
};

export default RootLayout;
