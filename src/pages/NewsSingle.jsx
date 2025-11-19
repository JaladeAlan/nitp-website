import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import SEOWrapper from "../components/common/SEOWrapper";

export default function NewsSingle() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get(`/news/${id}`);
        setNews(res.data?.data || null);
      } catch (err) {
        setError("Failed to load news article.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading)
    return (
      <div className="py-20 text-center text-gray-600">
        Loading article...
      </div>
    );

  if (error)
    return (
      <div className="py-20 text-center text-red-600">{error}</div>
    );

  if (!news)
    return (
      <div className="py-20 text-center text-gray-600">
        Article not found.
      </div>
    );

  const displayDate = news.published_at
    ? new Date(news.published_at).toDateString()
    : new Date(news.created_at).toDateString();

  return (
    <SEOWrapper
      title={`${news.title} | NITP Oyo`}
      description={news.content?.slice(0, 160)}
      image={news.image || "/assets/news-hero.jpg"}
      baseUrl="https://nitp-oyo.org"
    >
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Back Button */}
        <Link
          to="/news"
          className="text-green-700 font-semibold hover:underline mb-6 inline-block"
        >
          ← Back to News
        </Link>

        {/* Title */}
        <h1 className="text-4xl font-bold text-green-800 mb-3">
          {news.title}
        </h1>

        {/* Date */}
        <p className="text-gray-500 mb-6">{displayDate}</p>

        {/* Image */}
        {news.image ? (
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-80 object-cover rounded-xl shadow mb-8 transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-80 bg-gray-200 rounded-xl shadow mb-8 flex items-center justify-center text-gray-400">
            No Image Available
          </div>
        )}

        {/* Content */}
        <article
          className="text-gray-700 leading-relaxed prose max-w-full"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
      </div>
    </SEOWrapper>
  );
}
