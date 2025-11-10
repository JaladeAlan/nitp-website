import React from "react";
import EventCard from "../components/events/EventCard";
import EventGallery from "../components/events/EventGallery";
import EventCalendar from "../components/events/EventCalendar";

const EventsPage = () => {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-blue-900">Events</h1>
      <p className="text-gray-700 mb-6">
        Stay updated on NITP’s upcoming conferences, seminars, and planning events.
      </p>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <EventCalendar />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Past Events</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </section>

      <EventGallery />
    </div>
  );
};

export default EventsPage;
