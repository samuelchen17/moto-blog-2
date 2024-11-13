import { useEffect } from "react";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { postSlug } = useParams();

  useEffect(() => {
    console.log(postSlug);
  }, [postSlug]);
  return <div>PostPage</div>;
};

export default PostPage;
