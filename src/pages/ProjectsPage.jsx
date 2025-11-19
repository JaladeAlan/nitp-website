import { useEffect, useState } from "react";
import SEOWrapper from "../components/common/SEOWrapper";
import ProjectCard from "../components/projects/ProjectCard";
import api from "../services/api";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects"); 
        // Only published projects
        const publishedProjects = res.data?.data.filter(p => p.published);
        setProjects(publishedProjects || []);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <SEOWrapper
      title="Projects & Initiatives | NITP Oyo State Chapter"
      description="Explore ongoing and completed town planning projects and initiatives across Oyo State."
      image="/assets/projects-hero.jpg"
      baseUrl="https://nitp-oyo.org"
    >
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-green-700">Projects & Initiatives</h1>
        <p className="text-gray-700 mb-6">
          Explore ongoing and completed planning initiatives across Oyo State.
        </p>

        {loading ? (
          <p className="text-center text-gray-500 mt-8">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">No projects available.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.summary || project.body}
                location={project.location || "Oyo State"}
                image={project.cover || "/assets/projects-hero.jpg"}
                status={project.published ? "Ongoing" : "Upcoming"}
              />
            ))}
          </div>
        )}
      </div>
    </SEOWrapper>
  );
}
