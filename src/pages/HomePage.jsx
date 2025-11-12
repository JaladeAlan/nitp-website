import Hero from "../components/common/Hero";
import AnnouncementTicker from "../components/common/AnnouncementTicker";
import FeaturedProjects from "../components/home/FeaturedProjects";
import Spotlight from "../components/home/Spotlight";
import QuickLinks from "../components/home/QuickLinks";
import EventCard from "../components/events/EventCard";
import Card from "../components/ui/Card";
import SEOWrapper from "../components/common/SEOWrapper";

export default function HomePage() {
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
        <section className="py-12 px-6">
          <QuickLinks />
        </section>

        {/* Featured Projects */}
        <section className="bg-white py-4 px-6">
          <FeaturedProjects />
        </section>

        {/* Spotlight Section */}
        <section className="py-16 bg-green-50 px-6">
          <Spotlight />
        </section>

        {/* Upcoming Events */}
        <section className="py-16 px-6">
          <h2 className="text-2xl font-bold text-green-700 text-center mb-8">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((event) => (
              <EventCard
                key={event}
                title={`NITP Workshop ${event}`}
                date="Dec 10, 2025"
                location="Ibadan, Oyo State"
              />
            ))}
          </div>
        </section>

        {/* News Highlights */}
        <section className="py-16 px-6 bg-gray-100">
          <h2 className="text-2xl font-bold text-green-700 text-center mb-8">
            Latest News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <h3 className="font-semibold text-lg text-green-700">
                  Urban Renewal in Ibadan
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  NITP Oyo discusses new sustainable development initiatives with
                  the State Ministry of Lands and Urban Planning.
                </p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </SEOWrapper>
  );
}
