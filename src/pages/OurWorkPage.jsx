import Card from "../components/ui/Card";

export default function OurWorkPage() {
  const works = [
    {
      title: "Advocacy & Policy",
      desc: "Promoting planning reforms and policy engagement with government agencies.",
    },
    {
      title: "Community Planning",
      desc: "Collaborating with local communities to improve living conditions and sustainability.",
    },
    {
      title: "Urban Innovation",
      desc: "Supporting GIS mapping, smart city initiatives, and research-driven urban solutions.",
    },
    {
      title: "Public Awareness",
      desc: "Educating the public on urban resilience, cleanliness, and safety.",
    },
  ];

  return (
    <div className="bg-white py-20 px-6">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-10">
        Our Work
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((work, index) => (
          <Card key={index}>
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              {work.title}
            </h3>
            <p className="text-gray-600 text-sm">{work.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
