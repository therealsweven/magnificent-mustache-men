import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { debounce } from "lodash";
import { SEARCH_QUERY } from "./queries";

export default function SearchBar () {
  const [query, setQuery] = useState("");
  const [search, { data }] = useLazyQuery(SEARCH_QUERY);

  const handleSearch = debounce(() => {
    search({ variables: { query } });
  }, 500);

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    handleSearch();
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <input
        type="text"
        placeholder="Search..."
        className="border-2 rounded-md py-2 px-4 w-64 mr-4"
        value={query}
        onChange={handleChange}
      />
      <div>
        {data && (
          <p className="text-gray-500">
            Found {data.jobs.length} job(s)
          </p>
        )}
      </div>
    </div>
  );
};



