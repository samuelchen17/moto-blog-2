import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setLoading(false);
          setError(true);
          throw new Error("Failed response");
        }

        setPost(data.posts[0]);
        setLoading(false);
        setError(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [postSlug]);

  console.log(post);
  return <div>PostPage</div>;
};

export default PostPage;
