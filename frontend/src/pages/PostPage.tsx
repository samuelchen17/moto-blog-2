import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPost, IPostResponse } from "@shared/types/post";
import { format } from "date-fns";
import CommentSection from "../components/commentSection/CommentSection";
import RecentPosts from "../components/recentPosts/RecentPosts";
import { IGetUser } from "@shared/types/user";
import ImageBanner from "@/components/ImageBanner";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [post, setPost] = useState<IPost | null>(null);
  const [author, setAuthor] = useState<IGetUser | null>(null);
  const [tableOfContents, setTableOfContents] = useState<
    { id: string; text: string }[]
  >([]);

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

        extractHeadersFromContent(postData.posts[0].content);

        setError(false);
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const extractHeadersFromContent = (content: string) => {
      // create temp div to store the html content from db
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = content;

      // get headers from content
      const headers = tempDiv.querySelectorAll("h2, h3, h4, h5, h6");

      // Map to table of contents format
      const toc = Array.from(headers).map((header) => {
        const id =
          header.id || header.textContent?.replace(/\s+/g, "-").toLowerCase();
        if (id) header.id = id; // Set ID if missing
        return { id, text: header.textContent || "" };
      });

      setTableOfContents(toc);
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
        {/* banner */}
        <ImageBanner img={post.image}>
          <div className="flex flex-col justify-center max-w-screen-md mx-auto p-6">
            {/* post title */}
            <h1 className="text-4xl lg:text-6xl uppercase font-bold text-white">
              {post.title} | {post.category} Review
            </h1>

            {/* author */}
            <div className="flex items-center text-center gap-2 text-slate-300 uppercase font-bold text-md w-full my-2">
              <img
                className="h-9 w-9 rounded-full bg-gray-500 mr-1 hidden sm:flex"
                src={author?.profilePicture}
                alt={author?.username}
              />
              {"by "}
              {author?.username}
            </div>

            <div className="text-slate-300 font-semibold uppercase">
              {post.createdAt === post.updatedAt ? (
                <div>
                  Posted: {format(new Date(post.createdAt), "dd MMM yyyy")}
                </div>
              ) : (
                <div>
                  Updated: {format(new Date(post.updatedAt), "dd MMM yyyy")}
                </div>
              )}
            </div>
          </div>
        </ImageBanner>

        {/* blog content */}
        <div className="mx-6">
          <div>
            <div className="flex justify-center py-24 ">
              <div
                className="post-content max-w-screen-md"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            <hr className="max-w-screen-md mx-auto" />

            {/* add comment and display comments */}
            <div className="flex flex-col justify-center py-14 max-w-screen-md w-full mx-auto">
              <CommentSection postId={post._id} />
            </div>

            <div className="flex flex-col justify-center py-24 max-w-screen-md mx-auto">
              <h2 className="font-bold text-2xl mb-6">You might also like</h2>
              <RecentPosts limit={4} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PostPage;
