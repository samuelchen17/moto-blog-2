import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  return (
    <Button className="rounded-full">
      <Link to="/search">
        <Search />
      </Link>
    </Button>
  );
};

export default SearchBar;
