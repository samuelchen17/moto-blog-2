import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";

const OAuth = () => {
  const handleOAuthClick = async () => {};

  return (
    <Button className="w-full" onClick={handleOAuthClick}>
      <div className="flex-row flex items-center gap-2">
        <AiFillGoogleCircle className="w-6 h-6" />
        Sign in with Google
      </div>
    </Button>
  );
};

export default OAuth;
