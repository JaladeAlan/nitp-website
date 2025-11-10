export default function NewsCard({ image, title, date, excerpt, author }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden group">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover group-hover:scale-105 transition"
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-2 group-hover:text-green-700 transition">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{date} • {author}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>
        <button className="text-green-700 font-semibold hover:underline">
          Read More →
        </button>
      </div>
    </div>
  );
}
