import SEOWrapper from "../components/common/SEOWrapper";

export default function PartnersPage() {
  return (
    <SEOWrapper
      title="Partners & Collaborations | NITP Oyo State Chapter"
      description="NITP Oyo State collaborates with institutions, agencies, and corporate partners to advance sustainable urban planning and development."
      image="/assets/partners-hero.jpg"
      baseUrl="https://nitp-oyo.org"
    >
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-green-700">Partners & Collaborations</h1>
        <p className="text-gray-700">
          NITP Oyo State collaborates with institutions, agencies, and corporate partners to advance sustainable development.
        </p>
        <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
          <li>Oyo State Government – Ministry of Lands & Housing</li>
          <li>Universities & Academic Institutions</li>
          <li>Development Partners & NGOs</li>
        </ul>
      </div>
    </SEOWrapper>
  );
}
