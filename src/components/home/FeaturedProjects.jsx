import { Link } from "react-router-dom";

export default function FeaturedProjects() {
  const projects = [
    {
      title: "Ibadan Urban Renewal Project",
      description:
        "A major initiative improving infrastructure, housing, and transport systems across Ibadan.",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=60",
      link: "/projects/ibadan-urban-renewal",
    },
    {
      title: "Oyo City Resilience Initiative",
      description:
        "Promoting disaster risk management and sustainability in Oyo’s fast-growing communities.",
      image:
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=60",
      link: "/projects/oyo-city-resilience",
    },
    {
      title: "Smart Planning & GIS Integration",
      description:
        "Using GIS tools to enhance physical planning decisions and land management in Oyo State.",
      image:
        "https://images.unsplash.com/photo-1486308510493-aa64833634ef?auto=format&fit=crop&w=800&q=60",
      link: "/projects/smart-planning",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-green-700">Featured Projects</h2>
        <p className="text-gray-600 mt-2">
          Highlighting impactful urban and regional planning initiatives in Oyo State
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 px-6 md:px-16">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-2xl overflow-hidden shadow hover:shadow-lg transition group"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{project.description}</p>
              <Link
                to={project.link}
                className="text-yellow-600 font-semibold hover:underline"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/projects"
          className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          View All Projects
        </Link>
      </div>
    </section>
  );
}
