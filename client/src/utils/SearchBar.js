import React, { useState, useEffect } from "react";
import { useDebounce, useLazyQuery } from "@apollo/client";
import { gql } from "graphql-tag";

import { SEARCH_QUERY } from "./queries";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const [search, { loading, data }] = useLazyQuery(SEARCH_QUERY);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      search({ varibables: { query: debouncedQuery } });
    }
  }, [debouncedQuery])

  useEffect(() => {
    if (data) {
      setSearchResults(data.search);
    }
  }, [data]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  

}

