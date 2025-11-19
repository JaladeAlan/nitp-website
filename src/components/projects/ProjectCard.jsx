import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

export default function ProjectCard({ title, description, location, image, status, link }) {
  const statusColors = {
    Ongoing: "bg-yellow-100 text-yellow-700",
    Completed: "bg-green-100 text-green-700",
    Upcoming: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col h-full">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>

        {/* Description (truncated) */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

        {/* Location & Status */}
        <div className="flex items-center justify-between text-sm mb-4">
          <span className="flex items-center gap-1 text-gray-500">
            <MapPin size={16} /> {location}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {status}
          </span>
        </div>

        {/* View Project Link */}
        {link && (
          <Link
            to={link}
            className="mt-auto text-green-700 text-right font-semibold hover:underline"
          >
            View Project →
          </Link>
        )}
      </div>
    </div>
  );
}
