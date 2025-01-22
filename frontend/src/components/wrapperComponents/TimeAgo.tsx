import { format, formatDistanceToNow } from "date-fns";

// display date differently based on how recent post was made
const TimeAgo = ({ date }: { date: string | Date }) => {
  if (!date) return null;

  const dateObj = new Date(date);
  const threshHoldDays = 30;
  const now = new Date();

  const differenceInDays = Math.floor(
    (now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays > threshHoldDays) {
    return <>{format(new Date(date), "dd/MM/yyyy")}</>;
  }

  return <>{formatDistanceToNow(new Date(date), { addSuffix: true })}</>;
};

export default TimeAgo;
