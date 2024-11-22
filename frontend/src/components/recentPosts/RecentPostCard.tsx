import { IPost } from "@shared/types/post";
import { IGetUser } from "@shared/types/user";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaComment, FaSave, FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const RecentPostCard = ({ post }: { post: IPost }) => {
  const [author, setAuthor] = useState<IGetUser | null>(null);

  useEffect(() => {
    try {
      const fetchAuthor = async () => {
        const res = await fetch(`/api/${post.createdBy}`);

        const data: IGetUser = await res.json();

        if (res.ok) {
          setAuthor(data);
        }
      };

      fetchAuthor();
    } catch (err) {
      console.error(err);
    }
  }, [post]);

  return (
    <div className="outline p-4 rounded-md m-2">
      <Link to={`/blogs/post/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title}
          className="h-[260px] w-full object-cover"
        />
      </Link>
      {/* implement link to authors page */}
      <div className="flex mt-4 justify-between">
        <div className="flex items-center gap-2">
          <img
            src={author?.profilePicture}
            className="h-5 w-5 object-cover rounded-full bg-blue-500"
          />
          <span className="font-semibold">{author?.username}</span>
        </div>
        <div className="flex gap-2 items-center ">
          {/* implement */}
          <FaThumbsUp />
          <FaComment />
          <FaSave />
        </div>
      </div>

      <div>
        <p className="font-bold text-2xl">{post.title}</p>
        <span className="rounded-full bg-slate-600 px-3 text-white">
          {post.category}
        </span>
      </div>
      <Button as={Link} to={`/blogs/post/${post.slug}`}>
        Read more
      </Button>
    </div>
  );
};

export default RecentPostCard;
