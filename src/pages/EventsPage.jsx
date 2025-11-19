import React from "react";
import SEOWrapper from "../components/common/SEOWrapper";
import EventCard from "../components/events/EventCard";
import EventGallery from "../components/events/EventGallery";
import EventCalendar from "../components/events/EventCalendar";

const EventsPage = () => {
  return (
    <SEOWrapper
      title="NITP Oyo State Chapter | Events"
      description="Stay updated with upcoming and past events organized by the Nigerian Institute of Town Planners, Oyo State Chapter."
      image="/assets/oyo-cityscape.jpg"
      baseUrl="https://nitp-oyo.org"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Upcoming Events */}
        <section className="mt-0 mb-10">
        <h2 className="text-3xl font-semibold text-green-700 mb-6 text-center pt-8">
          Upcoming Events
        </h2>
        <EventCalendar showUpcoming={true} />
      </section>

      <section className="bg-gray-50 shadow-inner rounded-xl p-8 md:p-12 mb-10">
        <h2 className="text-3xl font-semibold text-green-700 mb-6 text-center">
          Past Events
        </h2>
        <EventCalendar showUpcoming={false} />
      </section>

        {/* Event Gallery */}
        <section className="bg-white shadow-md rounded-xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-semibold text-green-700 mb-6 text-center">
            Event Gallery
          </h2>
          <EventGallery />
        </section>
      </div>
    </SEOWrapper>
  );
};

export default EventsPage;
