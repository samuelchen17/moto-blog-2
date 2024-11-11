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
import CreatePostPage from "../pages/CreatePostPage";
import UpdatePostPage from "../pages/UpdatePostPage";
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
          {/* <Route path="create-post" element={<CreatePostPage />} />
          <Route path="update-post/:postId" element={<UpdatePostPage />} /> */}
          <Route path="create-post" element={<PostFormPage />} />
          <Route path="update-post/:postId" element={<PostFormPage />} />
        </Route>
      </Route>
      <Route path="blogs" element={<BlogsPage />} />
      <Route path="about" element={<AboutPage />} />
    </Route>
  )
);

export default router;
