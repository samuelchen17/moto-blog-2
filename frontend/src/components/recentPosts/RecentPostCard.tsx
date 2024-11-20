import { IPost } from "@shared/types/post";
import { Link } from "react-router-dom";

const RecentPostCard = ({ post }: { post: IPost }) => {
  return (
    <div>
      <Link>
        <img src={post.image} alt={post.title} className="w-" />
        <span>{post.title}</span>
      </Link>
    </div>
  );
};

export default RecentPostCard;
