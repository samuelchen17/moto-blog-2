import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPost } from "@shared/types/post";
import { format } from "date-fns";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [post, setPost] = useState<IPost | null>(null);

  // implement fetch author from api

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setLoading(false);
          throw new Error("Failed response");
        }

        setPost(data.posts[0]);
        setError(false);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
        console.error(err);
      }
    };
    fetchPost();
  }, [postSlug]);

  console.log(post);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-dvh">
        <Spinner size="xl" />
      </div>
    );

  if (post) {
    return (
      <main>
        {/* post banner */}
        <div className="bg-gray-600 w-full rounded-lg px-4 py-6">
          <h1 className="text-4xl">{post.title}</h1>

          <div className="bg-gray-500 rounded-lg">
            <div className="flex flex-row">
              <div>dp icon</div>
              <div>By {post._id}</div>
            </div>
            <div>
              Posted:{" "}
              {post.createdAt &&
                format(new Date(post.createdAt), "MMMM dd, yyyy")}
            </div>
            <div>
              {/* {if(post.createdAt !== p){

                }} */}
              Updated:{" "}
              {post.createdAt &&
                format(new Date(post.updatedAt), "MMMM dd, yyyy")}
            </div>
          </div>

          <img
            alt="post image"
            src={post.image}
            className="rounded-lg mx-auto"
          />
        </div>

        <div>
          <div>{post.content}</div>
          <div>other posts</div>
        </div>
      </main>
    );
  }
};

export default PostPage;
