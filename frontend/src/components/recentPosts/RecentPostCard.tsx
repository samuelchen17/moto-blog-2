import { IPost } from "@shared/types/post";
import { Link } from "react-router-dom";

const RecentPostCard = ({ post }: { post: IPost }) => {
  return (
    <div className="">
      <Link to={`/blogs/post/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title}
          className="h-[260px] w-full object-cover"
        />
        <span>{post.title}</span>
      </Link>
      <div>
        <p>{post.title}</p>
        <span>{post.category}</span>
      </div>
    </div>
  );
};

export default RecentPostCard;
