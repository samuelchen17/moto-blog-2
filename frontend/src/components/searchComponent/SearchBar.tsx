import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InputWithIcon } from "../ui/inputWithIcon";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(searchTerm);

  // submit first
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);

    navigate(`/search?${urlParams.toString()}`);
  };

  // then useEffect to get search term from url
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <form onSubmit={handleSubmit}>
      <InputWithIcon
        startIcon={Search}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
