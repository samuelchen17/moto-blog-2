import { IPost } from "@shared/types/post";
import { IGetUser } from "@shared/types/user";
import { useEffect, useState } from "react";
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

  console.log(author);
  return (
    <div className="">
      <Link to={`/blogs/post/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title}
          className="h-[260px] w-full object-cover"
        />
      </Link>
      {/* implement link to authors page */}
      <div className="flex items-center gap-2">
        <img
          src={author?.profilePicture}
          className="h-5 w-5 object-cover rounded-full bg-blue-500"
        />
        <span className="font-bold">{author?.username}</span>
      </div>

      <div>
        <p>{post.title}</p>
        <span>{post.category}</span>
      </div>
    </div>
  );
};

export default RecentPostCard;
