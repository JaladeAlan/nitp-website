import React from "react";
import EventCard from "../components/events/EventCard";
import EventGallery from "../components/events/EventGallery";
import EventCalendar from "../components/events/EventCalendar";

const EventsPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Upcoming Events */}
      <section className="mt-0 mb-10"> 
        <EventCalendar className="mt-0" /> 
      </section>
      
      {/* Past Events */}
      <section className="bg-gray-50 shadow-inner rounded-xl p-8 md:p-12 mb-10">
        <h2 className="text-3xl font-semibold text-green-700 mb-6 text-center">
          Past Events
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </section>

      {/* Event Gallery */}
      <section className="bg-white shadow-md rounded-xl p-8 md:p-12 mb-16">
        <h2 className="text-3xl font-semibold text-green-700 mb-6 text-center">
          Event Gallery
        </h2>
        <EventGallery />
      </section>
    </div>
  );
};

export default EventsPage;
