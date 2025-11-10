import { useState } from "react";

export default function useSearch(data = [], key = "title") {
  const [query, setQuery] = useState("");
  const filtered = data.filter((item) =>
    item[key]?.toLowerCase().includes(query.toLowerCase())
  );

  return { query, setQuery, results: filtered };
}
