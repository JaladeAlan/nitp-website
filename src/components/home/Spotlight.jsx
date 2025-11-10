export default function Spotlight() {
  const spotlight = {
    name: "Town Planner Olufemi Adewale",
    role: "Planner of the Month - November 2025",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=60",
    quote:
      "Planning for people means designing cities that grow sustainably — where communities thrive together.",
  };

  return (
    <section className="py-20 bg-green-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-green-700">Planner Spotlight</h2>
        <p className="text-gray-600 mt-2">
          Recognizing excellence and innovation among town planners in Oyo State
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md flex flex-col md:flex-row items-center overflow-hidden">
        <img
          src={spotlight.image}
          alt={spotlight.name}
          className="w-full md:w-1/3 h-64 object-cover"
        />
        <div className="p-8 flex-1 text-center md:text-left">
          <h3 className="text-2xl font-semibold text-green-800 mb-2">
            {spotlight.name}
          </h3>
          <p className="text-yellow-600 font-medium mb-4">{spotlight.role}</p>
          <p className="text-gray-600 italic mb-6">“{spotlight.quote}”</p>
          <button className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded-lg">
            Read Full Story
          </button>
        </div>
      </div>
    </section>
  );
}
