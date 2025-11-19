import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import NewsCard from "./NewsCard";

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get("/news");
        setNews(res.data?.data || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-600">
        Loading news...
      </div>
    );
  }

  return (
  <section className="pt-10 pb-4 bg-gray-50 rounded-xl">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-green-700">
        Latest News & Articles
      </h2>
      <p className="text-gray-600 mt-2">
        Stay informed on updates and publications from NITP Oyo State Chapter
      </p>
    </div>

    {news.length === 0 ? (
      <p className="text-center text-gray-500 py-10">
        No news available at the moment.
      </p>
    ) : (
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-3 px-4 md:px-10">
        {news.map((item) => (
          <NewsCard
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            date={new Date(item.created_at).toDateString()}
            excerpt={item.content?.slice(0, 120) + "..."}
            author="Admin"
          />
        ))}
      </div>
    )}
  </section>
  );
}
