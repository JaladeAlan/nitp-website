// src/components/home/QuickLinks.jsx
import { Link } from "react-router-dom";
import { Users, Calendar, FileText, Phone } from "lucide-react";

export default function QuickLinks() {
  const links = [
    {
      title: "Join NITP",
      description: "Become a member and grow your professional planning career.",
      icon: <Users className="w-10 h-10 text-green-700" />,
      path: "/membership",
    },
    {
      title: "Events & Training",
      description: "Participate in conferences, workshops, and learning sessions.",
      icon: <Calendar className="w-10 h-10 text-green-700" />,
      path: "/events",
    },
    {
      title: "Resources Hub",
      description: "Access planning laws, research papers, and publications.",
      icon: <FileText className="w-10 h-10 text-green-700" />,
      path: "/resources",
    },
    {
      title: "Contact Us",
      description: "Reach out for inquiries, collaborations, or consultations.",
      icon: <Phone className="w-10 h-10 text-green-700" />,
      path: "/contact",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-green-700">Quick Links</h2>
        <p className="text-gray-600 mt-2">Navigate through key areas of NITP Oyo Chapter</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 px-6 md:px-16">
        {links.map((link, index) => (
          <Link
            to={link.path}
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition group"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              {link.icon}
              <h3 className="text-lg font-semibold text-green-800">{link.title}</h3>
              <p className="text-gray-500 text-sm">{link.description}</p>
              <span className="text-yellow-600 font-semibold group-hover:underline">
                Learn More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
