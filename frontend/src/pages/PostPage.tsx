import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPost } from "@shared/types/post";
import { format } from "date-fns";
import CommentSection from "../components/commentSection/CommentSection";
import RecentPosts from "../components/recentPosts/RecentPosts";

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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-dvh">
        <Spinner size="xl" />
      </div>
    );

  if (error) {
    return <div>Post could not be retrieved</div>;
  }

  if (post && !loading && !error) {
    return (
      <div>
        {/* post banner */}
        <div className="bg-gray-600 w-full rounded-lg px-4 py-6">
          <h1 className="md:text-4xl">{post.title}</h1>

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

          {/* implement loading for image */}
        </div>

        <div className="relative">
          <h1 className="absolute inset-0 text-4xl sm:text-6xl md:text-8xl flex items-center justify-center uppercase font-bold  text-white">
            {post.title}
          </h1>

          <img
            alt="post image"
            src={post.image}
            className="w-full object-cover h-[300px] md:h-full"
          />
        </div>

        {/* blog content */}
        <div className="m-6">
          <div className="flex justify-center">
            <div
              className="post-content max-w-screen-md"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </div>

          {/* add comment and display comments */}
          <div className="flex justify-center">
            <CommentSection postId={post._id} />
          </div>

          <div className="flex flex-col justify-center items-center ">
            <h1 className="text-xl ">You may be interested in</h1>
            <RecentPosts limit={3} />
          </div>
        </div>
      </div>
    );
  }
};

export default PostPage;
