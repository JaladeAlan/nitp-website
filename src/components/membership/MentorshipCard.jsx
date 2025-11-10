export default function MentorshipCard({ name, title, organization, image, expertise }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden text-center p-6">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-green-600"
      />
      <h3 className="text-lg font-semibold text-green-800">{name}</h3>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-sm text-gray-500 mb-3">{organization}</p>
      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
        {expertise}
      </span>
    </div>
  );
}
