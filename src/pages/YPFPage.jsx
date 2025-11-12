import SEOWrapper from "../components/common/SEOWrapper";

export default function YPFPage() {
  return (
    <SEOWrapper
      title="Young Planners Forum (YPF) | NITP Oyo State Chapter"
      description="The Young Planners Forum (YPF) provides a platform for students and emerging professionals to engage, learn, and lead within the planning community."
      image="/assets/ypf-hero.jpg"
      baseUrl="https://nitp-oyo.org"
    >
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-green-700">Young Planners Forum (YPF)</h1>
        
        {/* Description */}
        <p className="text-gray-700 text-lg">
          The Young Planners Forum (YPF) provides a platform for students and emerging professionals to engage, learn, and lead within the planning community.
        </p>

        {/* Key Highlights */}
        <section className="bg-gray-50 p-6 rounded-xl shadow-inner">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Key Highlights</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Mentorship & Networking</li>
            <li>Competitions & Innovation Challenges</li>
            <li>YPF Talks Podcast Series</li>
          </ul>
        </section>
      </div>
    </SEOWrapper>
  );
}
