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
    <header className="sticky top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex items-center justify-between gap-6">

        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <img src={logo} alt="NITP Logo" className="w-10 h-10 lg:w-12 lg:h-12" />
          <span className="font-bold text-green-800 text-lg lg:text-xl whitespace-nowrap">
            NITP Oyo State Chapter
          </span>
        </Link>

        {/* Desktop Navigation + Search */}
        <div className="hidden lg:flex items-center flex-nowrap min-w-0 ml-2 gap-4">

          {/* NAV LINKS */}
          <nav className="flex items-center flex-nowrap gap-4 overflow-x-auto scrollbar-hide max-w-[60vw]">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-green-700 font-medium whitespace-nowrap transition ${
                    isActive ? "text-green-800 border-b-2 border-green-700 pb-1" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* SEARCH BAR */}
          <form
            onSubmit={handleSearch}
            className="flex items-center border rounded-full overflow-hidden bg-white h-10 min-w-[170px]"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 w-[120px] focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 border-l bg-white flex items-center justify-center"
            >
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-green-800"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-white shadow-inner ${
          menuOpen ? "max-h-[500px] py-4" : "max-h-0 py-0"
        }`}
      >
        <div className="px-4 space-y-3">

          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="flex border rounded-lg overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 focus:outline-none"
            />
            <button className="bg-green-700 text-white px-3">
              <Search size={18} />
            </button>
          </form>

          {/* Mobile Nav */}
          <nav className="flex flex-col space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-gray-700 hover:text-green-700 font-medium ${
                    isActive ? "text-green-800" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
