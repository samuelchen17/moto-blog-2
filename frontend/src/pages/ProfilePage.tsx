import { Link } from "react-router-dom";

const ProfilePage = ({ children }: any) => {
  return <Link to={`/blogs/post/${post.slug}`}>{children}</Link>;
};

export default ProfilePage;
