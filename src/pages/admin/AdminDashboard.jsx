import { useEffect, useState } from "react";
import { Users, FileText, Calendar, Layers, BookOpen, Image, Users as PartnersIcon } from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    news: 0,
    events: 0,
    projects: 0,
    resources: 0,
    gallery: 0,
    partners: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/dashboard/stats.php");
      if (res.data) setStats(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard stats");
    }
  };

  const cards = [
    { name: "Users", count: stats.users, icon: <Users size={24} />, link: "/admin/users" },
    { name: "News", count: stats.news, icon: <FileText size={24} />, link: "/admin/news" },
    { name: "Events", count: stats.events, icon: <Calendar size={24} />, link: "/admin/events" },
    { name: "Projects", count: stats.projects, icon: <Layers size={24} />, link: "/admin/projects" },
    { name: "Resources", count: stats.resources, icon: <BookOpen size={24} />, link: "/admin/resources" },
    { name: "Gallery", count: stats.gallery, icon: <Image size={24} />, link: "/admin/gallery" },
    { name: "Partners", count: stats.partners, icon: <PartnersIcon size={24} />, link: "/admin/partners" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Overview of your site’s content and user statistics.</p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link
            key={card.name}
            to={card.link}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start gap-4 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between w-full">
              <div className="text-gray-500">{card.icon}</div>
              <span className="text-xl font-bold text-green-700">{card.count}</span>
            </div>
            <p className="text-gray-700 font-medium">{card.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
