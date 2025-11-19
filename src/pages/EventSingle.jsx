import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

export default function EventSingle() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data?.data || null);
      } catch (err) {
        setError("Failed to load event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading)
    return <div className="py-20 text-center text-gray-600">Loading event...</div>;

  if (error)
    return <div className="py-20 text-center text-red-600">{error}</div>;

  if (!event)
    return <div className="py-20 text-center text-gray-600">Event not found.</div>;

  const options = { month: "short", day: "numeric", year: "numeric" };
  const displayStart = new Date(event.start_date).toLocaleDateString("en-US", options);
  const displayEnd = new Date(event.end_date).toLocaleDateString("en-US", options);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Back Button */}
      <Link
        to="/events"
        className="text-green-700 font-semibold hover:underline mb-6 inline-block"
      >
        ← Back to Events
      </Link>

      {/* Title */}
      <h1 className="text-4xl font-bold text-green-800 mb-3">{event.title}</h1>

      {/* Date & Location */}
      <p className="text-gray-500 mb-6">
        📅 {displayStart} – {displayEnd} • 📍 {event.location}
      </p>

      {/* Banner */}
      {event.banner ? (
        <img
          src={event.banner}
          alt={event.title}
          className="w-full h-80 object-cover rounded-xl shadow mb-8 transition-transform duration-300 hover:scale-105"
        />
      ) : (
        <div className="w-full h-80 bg-gray-200 rounded-xl shadow mb-8 flex items-center justify-center text-gray-400">
          No Image Available
        </div>
      )}

      {/* Description */}
      <article className="text-gray-700 leading-relaxed whitespace-pre-line">
        {event.description}
      </article>
    </div>
  );
}
