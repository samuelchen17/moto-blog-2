import { Link } from "react-router-dom";

const ProfileLinkWrapper = ({ children, userId }: any) => {
  return <Link to={`/profile/${userId}`}>{children}</Link>;
};

export default ProfileLinkWrapper;
