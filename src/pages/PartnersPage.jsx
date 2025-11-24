import { useEffect, useState } from "react";
import api from "../services/api";
import SEOWrapper from "../components/common/SEOWrapper";

export default function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await api.get("/partners");
        setPartners(res.data?.data || []);
      } catch (err) {
        console.error("Failed to load partners", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return (
    <SEOWrapper
      title="Partners & Collaborations | NITP Oyo State Chapter"
      description="Nigerian Institute of Town Planners (NITP) Oyo State partners with institutions and organizations to advance sustainable development."
      image="/assets/partners-hero.jpg"
      baseUrl="https://nitp-oyo.org"
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
          Partners & Collaborations
        </h1>

        {loading && (
          <p className="text-gray-500 py-10 text-center">Loading partners...</p>
        )}

        {!loading && partners.length === 0 && (
          <p className="text-gray-600 py-10 text-center">
            No partners available at the moment.
          </p>
        )}

        {/* Partners Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-center"
            >
              {partner.logo && (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-32 h-32 object-contain mx-auto mb-4"
                />
              )}

              <h3 className="text-lg font-semibold text-green-800 mb-2">
                {partner.name}
              </h3>

              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline text-sm"
                >
                  Visit Website →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </SEOWrapper>
  );
}
