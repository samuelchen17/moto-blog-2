import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col px-4 max-w-screen-xl mx-auto min-h-screen">
      <div className="flex flex-col mt-24 md:mt-36">
        <h1 className="text-9xl font-extrabold text-gray-600">404</h1>
        <p className="text-2xl font-semibold mt-4">Oops! Page not found.</p>
        <p className="mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link className="mt-4" to={"/home"}>
          <Button>Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
