import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPostResponse, IPostWithAuthor } from "src/types";
import { format } from "date-fns";
import CommentSection from "../components/commentSection/CommentSection";
import RecentPosts from "../components/recentPosts/RecentPosts";
import ImageBanner from "@/components/ImageBanner";
import TableOfContents from "@/components/TableOfContents";
import { _get } from "@/api/axiosClient";
import Summarizer from "@/components/Summarizer";
import { SkeletonPostPage } from "@/components/SkeletonComponents";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [post, setPost] = useState<IPostWithAuthor | null>(null);
  const [tableOfContents, setTableOfContents] = useState<
    { id: string; text: string }[]
  >([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const postRes = await _get<IPostResponse>(
          `/post/getposts?slug=${postSlug}`
        );

        const postData = postRes.data;

        const { updatedContent, toc } = processContentAndExtractHeaders(
          postData.posts[0].content
        );

        setPost({ ...postData.posts[0], content: updatedContent });
        setTableOfContents(toc);

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

  const processContentAndExtractHeaders = (content: string) => {
    // Create a temp dom to manipulate HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Extract headers for the table of contents
    const headers = tempDiv.querySelectorAll(
      "h2[data-id], h3[data-id], h4[data-id], h5[data-id], h6[data-id]"
    );

    const toc = Array.from(headers).map((header) => {
      const dataId = header.getAttribute("data-id");
      if (dataId) {
        header.setAttribute("id", dataId); // Set id = data-id
      }
      return {
        id: dataId || "",
        text: header.textContent || "",
      };
    });

    return {
      updatedContent: tempDiv.innerHTML,
      toc,
    };
  };

  // console.log(tableOfContents);

  if (loading) return <SkeletonPostPage />;

  if (error) {
    return <div>Post could not be retrieved</div>;
  }

  // console.log(post);

  if (post && !loading && !error) {
    return (
      <div>
        {/* banner */}
        <ImageBanner img={post.image}>
          <div className="flex flex-col justify-center max-w-screen-md mx-auto p-6">
            {/* post title */}
            <h1 className="text-2xl sm:text-4xl lg:text-6xl uppercase font-bold text-white">
              {post.title} | {post.category} Review
            </h1>

            {/* author */}
            <div className="flex items-center text-center gap-2 text-slate-300 uppercase font-bold text-md w-full my-2">
              <img
                className="h-9 w-9 rounded-full bg-gray-500 mr-1 hidden sm:flex"
                src={post?.createdBy.profilePicture}
                alt={post?.createdBy.username}
              />
              {"by "}
              {post?.createdBy.username}
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

        {/* content of page */}
        <div className="max-w-screen-xl mx-auto my-24 px-4">
          {/* blog content */}
          <div className="flex lg:flex-row flex-col max-w-screen-xl justify-between mt-8 gap-6 ">
            <TableOfContents toc={tableOfContents} />

            <main className="w-full">
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              {/* <hr className="mx-auto" /> */}

              <Summarizer text={post.content} />

              {/* add comment and display comments */}
              <div className="flex flex-col justify-center py-14">
                <CommentSection postId={post._id} />
              </div>
            </main>
          </div>

          <div className="flex flex-col justify-center py-24">
            <h2 className="font-bold text-2xl mb-6">You might also like</h2>
            <RecentPosts limit={6} />
          </div>
        </div>
      </div>
    );
  }
};

export default PostPage;
