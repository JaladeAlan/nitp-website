import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import logo from "../../assets/nitp-logo.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Our Work", path: "/our-work" },
    { name: "Membership", path: "/membership" },
    { name: "Events", path: "/events" },
    { name: "Resources", path: "/resources" },
    { name: "Contact", path: "/contact" },
    { name: "News & Media", path: "/news" },
    { name: "YPF", path: "/ypf" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  return (
<header className="bg-white shadow-md w-full">
  <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">
    {/* Left: Logo and title */}
    <div className="flex items-center gap-3 md:gap-4 flex-shrink-0 pr-8">
      <Link to="/" className="flex items-center gap-3">
        <img
          src={logo}
          alt="NITP Logo"
          className="w-10 h-10 md:w-12 md:h-12 object-contain"
        />
        <span className="font-bold text-green-800 text-sm md:text-lg lg:text-xl whitespace-nowrap">
          NITP Oyo State Chapter
        </span>
      </Link>
    </div>

    {/* Right: Navigation and search (desktop) */}
    <div className="hidden md:flex items-center gap-6 ml-auto">
      <nav className="flex items-center gap-4">
        {links.map((link) => (
        <NavLink
        key={link.name}
        to={link.path}
        className={({ isActive }) =>
          `whitespace-nowrap text-gray-700 hover:text-green-700 font-medium transition ${
            isActive ? "text-green-800 border-b-2 border-green-600" : ""
          }`
        }
      >
        {link.name}
      </NavLink>

        ))}
      </nav>

      <form
        onSubmit={handleSearch}
        className="flex items-center border border-gray-300 rounded-lg overflow-hidden"
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1 w-36 md:w-48 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-white border-l border-gray-300 px-3 flex items-center justify-center"
        >
          <Search size={18} color="#000" />
        </button>
      </form>
    </div>

    {/* Mobile menu button */}
    <button
      className="md:hidden text-green-800 ml-2"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? <X size={26} /> : <Menu size={26} />}
    </button>
  </div>

  {/* Mobile menu */}
  <div
    className={`md:hidden bg-white border-t border-gray-200 shadow-inner px-4 py-4 transition-all duration-300 ${
      menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
    }`}
  >
    <nav className="flex flex-col space-y-2">
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `block text-gray-700 hover:text-green-700 py-2 ${
              isActive ? "text-green-800 font-semibold" : ""
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </nav>

    <form onSubmit={handleSearch} className="flex mt-3 w-full">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
      />
      <button
        type="submit"
        className="bg-white border-l border-gray-300 px-3 rounded-r-lg flex items-center justify-center"
      >
        <Search size={18} color="#000" />
      </button>
    </form>
  </div>
</header>

  );
}
