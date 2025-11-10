import { MapPin } from "lucide-react";

export default function ProjectCard({ title, description, location, image, status }) {
  const statusColors = {
    Ongoing: "bg-yellow-100 text-yellow-700",
    Completed: "bg-green-100 text-green-700",
    Upcoming: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-gray-500">
            <MapPin size={16} /> {location}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
