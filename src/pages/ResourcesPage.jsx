import { useEffect, useState } from "react";
import SEOWrapper from "../components/common/SEOWrapper";
import Card from "../components/ui/Card";
import api from "../services/api";

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await api.get("/resources");
        setResources(res.data?.data || []);
      } catch (err) {
        console.error("Failed to load resources:", err);
        setError("Failed to load resources.");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  return (
    <SEOWrapper
      title="Resources | NITP Oyo State Chapter"
      description="Access publications, planning guidelines, and research materials provided by the Nigerian Institute of Town Planners, Oyo State Chapter."
      image="/assets/resources-hero.jpg"
      baseUrl="https://nitp-oyo.org"
    >
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-12">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-700 mb-3">
            Resources
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Access publications, planning guidelines, and research materials.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading resources...</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* Resource Grid */}
        {!loading && !error && (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.length === 0 ? (
              <p className="text-gray-600 text-center col-span-full">
                No resources available yet.
              </p>
            ) : (
              resources.map((item) => (
                <Card
                  key={item.id}
                  title={item.title}
                  link={item.file}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold text-green-800 mb-1 group-hover:text-green-700 transition-colors duration-300">
                  {item.title}
                </h3>
                  <p className="text-gray-700">{item.description}</p>

                  <a
                    href={item.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-green-700 font-medium hover:underline"
                  >
                    View / Download
                  </a>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </SEOWrapper>
  );
}
