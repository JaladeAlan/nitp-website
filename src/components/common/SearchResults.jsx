import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Card from "../ui/Card";

export default function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/search?query=${encodeURIComponent(query)}`);
        setResults(res.data.data || []);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const renderCard = (item) => {
    switch (item.type) {
      case "project":
        return (
          <Card key={`project-${item.id}`}>
            <img
              src={item.cover}
              alt={item.title}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h3 className="font-semibold text-green-700">{item.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{item.summary}</p>
            <Link
              to={`/projects/${item.id}`}
              className="text-green-700 font-semibold mt-2 inline-block hover:underline"
            >
              View Project →
            </Link>
          </Card>
        );

      case "event":
        const startDate = new Date(item.start_date).toLocaleDateString();
        const endDate = new Date(item.end_date).toLocaleDateString();
        return (
          <Card key={`event-${item.id}`}>
            <img
              src={item.banner}
              alt={item.title}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h3 className="font-semibold text-green-700">{item.title}</h3>
            <p className="text-gray-600 text-sm mt-1">
              📅 {startDate} – {endDate} • 📍 {item.location}
            </p>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.description}</p>
            <Link
              to={`/events/${item.id}`}
              className="text-green-700 font-semibold mt-2 inline-block hover:underline"
            >
              View Event →
            </Link>
          </Card>
        );

      case "news":
        return (
          <Card key={`news-${item.id}`}>
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h3 className="font-semibold text-green-700">{item.title}</h3>
            <p className="text-gray-600 text-sm mt-1 line-clamp-3">{item.summary}</p>
            <Link
              to={`/news/${item.id}`}
              className="text-green-700 font-semibold mt-2 inline-block hover:underline"
            >
              Read News →
            </Link>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-green-700 mb-6">
        Search Results for "<span className="italic">{query}</span>"
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Searching...</p>
      ) : results.length === 0 ? (
        <p className="text-center text-gray-500">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(renderCard)}
        </div>
      )}
    </div>
  );
}
