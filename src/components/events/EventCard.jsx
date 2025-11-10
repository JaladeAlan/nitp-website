export default function EventCard({ title, date, location, description, image }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden group">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover group-hover:scale-105 transition"
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-1 group-hover:text-green-700 transition">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          📅 {date} • 📍 {location}
        </p>
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
        <button className="mt-4 text-green-700 font-semibold hover:underline">
          Learn More →
        </button>
      </div>
    </div>
  );
}
