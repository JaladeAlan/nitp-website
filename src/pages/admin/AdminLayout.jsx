import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Newspaper,
  Calendar,
  FolderOpen,
  FileText,
  Image,
  Handshake,
  LogOut,
} from "lucide-react";

export default function AdminLayout() {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "News", icon: Newspaper, path: "/admin/news" },
    { name: "Events", icon: Calendar, path: "/admin/events" },
    { name: "Projects", icon: FolderOpen, path: "/admin/projects" },
    { name: "Resources", icon: FileText, path: "/admin/resources" },
    { name: "Gallery", icon: Image, path: "/admin/gallery" },
    { name: "Partners", icon: Handshake, path: "/admin/partners" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4 flex flex-col">
        <h1 className="text-xl font-bold text-blue-800 mb-6 border-b pb-3">
          Admin Panel
        </h1>
        <nav className="flex-1 space-y-1">
          {menuItems.map(({ name, icon: Icon, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }`
              }
            >
              <Icon size={18} />
              {name}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg mt-auto"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
