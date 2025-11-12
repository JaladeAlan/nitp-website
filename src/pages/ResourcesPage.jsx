import SEOWrapper from "../components/common/SEOWrapper";
import Card from "../components/ui/Card";

const ResourcesPage = () => {
  return (
    <SEOWrapper
      title="Resources | NITP Oyo State Chapter"
      description="Access publications, planning guidelines, and research materials provided by the Nigerian Institute of Town Planners, Oyo State Chapter."
      image="/assets/resources-hero.jpg"
      baseUrl="https://nitp-oyo.org"
    >
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-12">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-700 mb-3">
            Resources
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Access publications, planning guidelines, and research materials provided by NITP.
          </p>
        </div>

        {/* Resource Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            title="Planning Guidelines"
            link="#"
            className="hover:shadow-lg transition-shadow duration-300"
          >
            Explore detailed planning standards and design principles for urban areas.
          </Card>

          <Card
            title="Research Papers"
            link="#"
            className="hover:shadow-lg transition-shadow duration-300"
          >
            Access academic and professional research on town planning and development.
          </Card>

          <Card
            title="Publications"
            link="#"
            className="hover:shadow-lg transition-shadow duration-300"
          >
            Browse NITP newsletters, journals, and conference materials.
          </Card>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default ResourcesPage;
