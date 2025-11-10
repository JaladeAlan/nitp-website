import Card from "../components/ui/Card";

export default function AboutPage() {
  return (
    <div className="bg-gray-50 py-20 px-6">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-10">
        About NITP Oyo State Chapter
      </h1>

      <div className="max-w-5xl mx-auto space-y-8">
        <Card>
          <h2 className="text-xl font-semibold text-green-700 mb-3">
            Our History
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The Nigerian Institute of Town Planners (NITP) Oyo State Chapter has
            been at the forefront of professional planning and sustainable
            development since its establishment. Our members actively contribute
            to policy reforms, city resilience, and community-based planning in
            Oyo State.
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-green-700 mb-3">
            Mission & Vision
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Mission:</strong> To advance the art and science of town
              planning and promote sustainable urban development in Oyo State.
            </li>
            <li>
              <strong>Vision:</strong> To be a leading force in shaping
              inclusive, sustainable, and resilient communities.
            </li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-green-700 mb-3">
            Our Leadership
          </h2>
          <p className="text-gray-700">
            The Chapter is led by a team of dedicated professionals who bring
            diverse expertise from academia, public service, and private
            practice.
          </p>
        </Card>
      </div>
    </div>
  );
}
