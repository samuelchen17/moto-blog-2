import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPost, IPostResponse } from "@shared/types/post";
import { format } from "date-fns";
import CommentSection from "../components/commentSection/CommentSection";
import RecentPosts from "../components/recentPosts/RecentPosts";
import { IGetUser } from "@shared/types/user";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [post, setPost] = useState<IPost | null>(null);
  const [author, setAuthor] = useState<IGetUser | null>(null);

  // implement fetch author from api

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const postRes = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const postData: IPostResponse = await postRes.json();

        if (!postRes.ok) {
          setError(true);
          throw new Error("Failed response");
        }

        setPost(postData.posts[0]);

        const authorId = postData.posts[0].createdBy;

        // get author information
        if (authorId) {
          const authorRes = await fetch(`/api/${authorId}`);
          const authorData: IGetUser = await authorRes.json();

          if (!authorRes.ok) {
            setError(true);
            throw new Error("Failed to fetch author");
          }

          setAuthor(authorData);
        }

        setError(false);
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
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

  console.log(post);
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

        {/* banner */}
        <div className="relative">
          <div className="absolute inset-0 z-10 flex items-center justify-center flex-col">
            {/* post title */}
            <h1 className="text-4xl sm:text-6xl md:text-8xl uppercase font-bold  text-white z-10">
              {post.title}
            </h1>

            {/* author */}
            <div className="flex items-center gap-2">
              <img
                className="h-10 w-10 rounded-full bg-gray-500"
                src={author?.profilePicture}
                alt={author?.username}
              />
              <div className="text-white uppercase font-semibold text-2xl">
                {author?.username}
              </div>
            </div>
          </div>

          {/* banner image */}
          <img
            alt="post image"
            src={post.image}
            className="w-full object-cover h-[300px] md:h-full filter contrast-125 brightness-75"
          />
          <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
        </div>

        {/* blog content */}
        <div className="m-6">
          {/* author section */}
          <div className="max-w-screen-md mx-auto flex justify-between items-center">
            <div>Date: </div>
          </div>

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
