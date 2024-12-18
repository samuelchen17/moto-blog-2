import { formatDistanceToNow } from "date-fns";

const TimeAgo = ({ date }: { date: string | Date }) => {
  return <>{formatDistanceToNow(new Date(date), { addSuffix: true })}</>;
};

export default TimeAgo;
