import EventCard from "./EventCard";

export default function EventCalendar() {
  const events = [
    {
      title: "NITP Oyo State Annual General Meeting (AGM)",
      date: "December 12, 2025",
      location: "Ibadan Civic Centre",
      description:
        "The Annual General Meeting brings together members to discuss policy directions, elect new executives, and celebrate achievements.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "Urban Resilience Workshop 2025",
      date: "November 20, 2025",
      location: "University of Ibadan Conference Hall",
      description:
        "A technical workshop focused on sustainable city design, resilience strategies, and SDG-focused planning approaches.",
      image:
        "https://images.unsplash.com/photo-1561489426-1b3b65b4c4c3?auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "Planning Innovation Summit",
      date: "October 15, 2025",
      location: "Oyo State Secretariat, Ibadan",
      description:
        "An interactive summit showcasing innovative planning technologies, GIS tools, and youth participation in urban development.",
      image:
        "https://images.unsplash.com/photo-1486308510493-aa64833634ef?auto=format&fit=crop&w=800&q=60",
    },
  ];

  return (
    <section className="py-14 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-green-700">Upcoming Events</h2>
        <p className="text-gray-600 mt-2">
          Stay informed about NITP Oyo State’s professional gatherings, workshops, and lectures.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 px-6 md:px-16">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3 rounded-lg transition">
          View All Events
        </button>
      </div>
    </section>
  );
}
