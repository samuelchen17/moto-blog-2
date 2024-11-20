import { IPost } from "@shared/types/post";

interface IRecentPostCard {
  post: IPost;
}

const RecentPostCard = ({ post }: { post: IPost }) => {
  return <div>RecentPostCard</div>;
};

export default RecentPostCard;
