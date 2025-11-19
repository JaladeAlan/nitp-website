import { Link } from "react-router-dom";

export default function EventCard({ id, title, start_date, end_date, location, description, image }) {
  const displayStart = new Date(start_date).toDateString();
  const displayEnd = new Date(end_date).toDateString();

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden group">
      <img
        src={image || "/assets/event-placeholder.jpg"}
        alt={title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div className="p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-1 group-hover:text-green-700 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mb-2">
          📅 {displayStart} – {displayEnd} • 📍 {location}
        </p>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {description}
        </p>

        <Link
          to={`/events/${id}`}
          className="text-green-700 font-semibold hover:underline"
        >
          Learn More →
        </Link>
      </div>
    </div>
  );
}
