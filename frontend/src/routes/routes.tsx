import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import BlogsPage from "../pages/BlogsPage";
import AboutPage from "../pages/AboutPage";
import AuthRoute from "../components/AuthRoute";
import AdminRoute from "../components/AdminRoute";
import PostFormPage from "../pages/PostFormPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="home" element={<HomePage />} />
      {/* for logged in  users */}
      <Route element={<AuthRoute />}>
        <Route path="dashboard" element={<DashboardPage />} />
        {/* for admins only */}
        <Route element={<AdminRoute />}>
          {/* key prop will force react to re render component */}
          <Route path="create-post" element={<PostFormPage key="create" />} />
          <Route
            path="update-post/:postId"
            element={<PostFormPage key="update" />}
          />
        </Route>
      </Route>
      <Route path="blogs" element={<BlogsPage />} />
      <Route path="about" element={<AboutPage />} />
    </Route>
  )
);

export default router;
