import { useEffect, useState } from "react";
import api from "../../services/api";
import EventCard from "./EventCard";

export default function EventCalendar({ showUpcoming = true }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data?.data || []);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-gray-500">Loading events...</div>;
  }

  // Filter events
  const today = new Date();
  const filteredEvents = events.filter((event) => {
    const endDate = new Date(event.end_date);
    return showUpcoming ? endDate >= today : endDate < today;
  });

  if (filteredEvents.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">
        {showUpcoming ? "No upcoming events." : "No past events."}
      </p>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-3 px-6 md:px-16">
      {filteredEvents.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          start_date={event.start_date}
          end_date={event.end_date}
          location={event.location}
          description={event.description}
          image={event.banner}
        />
      ))}
    </div>
  );
}
