import ProjectCard from "../components/projects/ProjectCard";
import ProjectMap from "../components/projects/ProjectMap";

export default function ProjectsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Projects & Initiatives</h1>
      <p>Explore ongoing and completed planning initiatives across Oyo State.</p>
      <ProjectMap />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
}
