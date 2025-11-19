import { useEffect, useState } from "react";
import Hero from "../components/common/Hero";
import AnnouncementTicker from "../components/common/AnnouncementTicker";
import Spotlight from "../components/home/Spotlight";
import QuickLinks from "../components/home/QuickLinks";
import EventCard from "../components/events/EventCard";
import Card from "../components/ui/Card";
import SEOWrapper from "../components/common/SEOWrapper";
import api from "../services/api";

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchEvents();
    fetchNews();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects?per_page=3");
      setProjects(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events?per_page=3");
      setEvents(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch events", err);
    }
  };

  const fetchNews = async () => {
    try {
      const res = await api.get("/news?per_page=3");
      setNews(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch news", err);
    }
  };

  // Helper to parse backend date strings
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr.replace(/\.\d+Z$/, "Z"));
  };

  return (
    <SEOWrapper
      title="Advancing Sustainable Planning and Development in Oyo State | NITP Oyo"
      description="Welcome to the Nigerian Institute of Town Planners (NITP), Oyo State Chapter. Advancing sustainable planning and development in Oyo State."
      image="/assets/oyo-cityscape.jpg"
      baseUrl="https://nitp-oyo.org"
    >
      <div className="bg-gray-50">
        {/* Hero Section */}
        <Hero
          title="Advancing Sustainable Planning and Development in Oyo State"
          subtitle="Welcome to the Nigerian Institute of Town Planners (NITP), Oyo State Chapter"
          buttonText="Join NITP"
          buttonLink="/membership"
          image="/assets/oyo-cityscape.jpg"
        />

        {/* Announcements */}
        <AnnouncementTicker />

        {/* Quick Links */}
        <section className="py-6 px-6">
          <QuickLinks />
        </section>

        {/* Featured Projects */}
        <section className="bg-white py-4 px-6">
          <h2 className="text-2xl font-bold text-center text-green-700 mb-4">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.length > 0 ? (
              projects.map((project) => (
                <Card key={project.id}>
                  {project.cover && (
                    <img
                      src={project.cover}
                      alt={project.title}
                      className="w-full h-40 object-cover rounded-md mb-2"
                    />
                  )}
                  <h3 className="font-semibold text-green-700">{project.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{project.summary}</p>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">No projects found</p>
            )}
          </div>
        </section>

        {/* Spotlight Section */}
        <section className="py-6 bg-green-50 px-6">
          <Spotlight />
        </section>

        {/* Upcoming Events */}
        <section className="py-6 px-6">
          <h2 className="text-2xl font-bold text-green-700 text-center mb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.length > 0 ? (
              events.map((event) => {
                const startDate = parseDate(event.start_date);
                const endDate = parseDate(event.end_date);

                const dateString =
                  startDate && endDate
                    ? `${startDate.toLocaleDateString()} – ${endDate.toLocaleDateString()}`
                    : "Date unavailable";

                return (
                  <EventCard
                    key={event.id}
                    title={event.title}
                    start_date={event.start_date}
                    end_date={event.end_date}
                    location={event.location}
                    image={event.banner} 
                  />
                );
              })
            ) : (
              <p className="text-center text-gray-500 col-span-full">No upcoming events</p>
            )}
          </div>
        </section>

        {/* Latest News */}
        <section className="py-6 px-6 bg-gray-100">
          <h2 className="text-2xl font-bold text-green-700 text-center mb-4">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {news.length > 0 ? (
              news.map((item) => (
                <Card key={item.id}>
                  {item.image && (
                    <img
                      src={item.image} // full URL
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-md mb-2"
                    />
                  )}
                  <h3 className="font-semibold text-green-700">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item.content}</p>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">No news available</p>
            )}
          </div>
        </section>
      </div>
    </SEOWrapper>
  );
}
