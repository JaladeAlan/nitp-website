import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

export default function ProjectSingle() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data.data);
      } catch (err) {
        console.error("Failed to fetch project", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <p className="text-center py-12">Loading project...</p>;
  if (!project) return <p className="text-center py-12">Project not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* Back Button at Top */}
      <div className="mb-6">
        <Link
          to="/projects"
        className="text-green-700 font-semibold hover:underline mb-6 inline-block"
        >
          ← Back to Projects
        </Link>
      </div>

      {/* Project Banner */}
      {project.cover && (
        <img
          src={project.cover}
          alt={project.title}
          className="w-full h-80 object-cover rounded-lg mb-6 shadow"
        />
      )}

      {/* Title & Summary */}
      <h1 className="text-3xl font-bold text-green-700 mb-4">{project.title}</h1>
      <p className="text-gray-600 text-lg mb-6">{project.summary}</p>

      {/* Body / Full Content */}
      <div
        className="prose max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: project.body }}
      />
    </div>
  );
}
