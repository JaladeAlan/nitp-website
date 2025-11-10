// src/components/home/EventsTraining.jsx
import { Calendar, MapPin } from "lucide-react";

export default function EventsTraining() {
  const events = [
    {
      title: "Urban Planning Seminar 2025",
      date: "December 5, 2025",
      location: "Ibadan Civic Centre, Oyo State",
      description:
        "A one-day seminar exploring sustainable planning strategies and infrastructure resilience.",
      image:
        "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "GIS & Smart City Workshop",
      date: "January 12, 2026",
      location: "NITP Hall, Ibadan",
      description:
        "Hands-on training on GIS tools for city planning and spatial data visualization.",
      image:
        "https://images.unsplash.com/photo-1581092160624-1e7e4968d7b9?auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "Town Planners Annual Conference",
      date: "February 22, 2026",
      location: "Premier Hotel, Ibadan",
      description:
        "Annual gathering of planning professionals to share innovations, policies, and development insights.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-green-700">Events & Training</h2>
        <p className="text-gray-600 mt-2">
          Stay updated with the latest seminars, workshops, and conferences
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 px-6 md:px-16">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-2xl overflow-hidden shadow hover:shadow-lg transition group"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                {event.title}
              </h3>
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <Calendar size={16} className="mr-2 text-yellow-600" />
                {event.date}
              </div>
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <MapPin size={16} className="mr-2 text-yellow-600" />
                {event.location}
              </div>
              <p className="text-gray-600 text-sm mb-4">{event.description}</p>
              <button className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded-lg">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-8 py-3 rounded-lg transition">
          View All Events
        </button>
      </div>
    </section>
  );
}
