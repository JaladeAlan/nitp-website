import SEOWrapper from "../components/common/SEOWrapper";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectMap from "../components/projects/ProjectMap";

export default function ProjectsPage() {
  return (
    <SEOWrapper
      title="Projects & Initiatives | NITP Oyo State Chapter"
      description="Explore ongoing and completed town planning projects and initiatives across Oyo State with the Nigerian Institute of Town Planners."
      image="/assets/projects-hero.jpg"
      baseUrl="https://nitp-oyo.org"
    >
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-green-700">Projects & Initiatives</h1>
        <p className="text-gray-700 mb-6">
          Explore ongoing and completed planning initiatives across Oyo State.
        </p>

        {/* Map of Projects */}
        <ProjectMap />

        {/* Project Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </SEOWrapper>
  );
}
