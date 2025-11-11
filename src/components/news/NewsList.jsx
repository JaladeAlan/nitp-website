import NewsCard from "./NewsCard";

export default function NewsList() {
  const newsData = [
    {
      title: "NITP Oyo Hosts Annual Urban Planning Conference",
      date: "November 8, 2025",
      author: "Admin",
      excerpt:
        "The Oyo State Chapter of NITP organized its annual conference focused on sustainable development, attracting top urban planners from across Nigeria.",
      image:
        "https://images.unsplash.com/photo-1581091870621-3ab6f02d1f59?auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "NITP Advocates for Improved City Infrastructure",
      date: "October 22, 2025",
      author: "Editorial Team",
      excerpt:
        "Town planners have called for stronger collaboration between government agencies and the private sector to improve infrastructure planning.",
      image:
        "https://images.unsplash.com/photo-1520975918318-3e68f84f75d3?auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "Training Workshop on GIS for Young Planners",
      date: "September 30, 2025",
      author: "NITP YPF Oyo",
      excerpt:
        "Young planners were trained on modern GIS techniques and urban data mapping tools to enhance smart city development.",
      image:
        "https://images.unsplash.com/photo-1591012911207-0b5c8b4f6c72?auto=format&fit=crop&w=800&q=60",
    },
  ];

  return (
    <section className="py-10 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-green-700">Latest News & Articles</h2>
        <p className="text-gray-600 mt-2">
          Stay informed on updates and publications from NITP Oyo State Chapter
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 px-6 md:px-16">
        {newsData.map((item, index) => (
          <NewsCard key={index} {...item} />
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-8 py-3 rounded-lg transition">
          View All News
        </button>
      </div>
    </section>
  );
}
