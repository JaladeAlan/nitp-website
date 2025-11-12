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
    // { name: "Projects", path: "/projects" },
    // { name: "Partners", path: "/partners" },
    { name: "YPF", path: "/ypf" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setMenuOpen(false); 
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-0 flex items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 flex-shrink-0 whitespace-nowrap">
          <img src={logo} alt="NITP Logo" className="w-12 h-12 object-contain" />
          <span className="font-bold text-green-800 text-lg md:text-xl">
            NITP Oyo State Chapter
          </span>
        </Link>
        
        {/* Spacer */} 
        <div className="flex-1 mr-10  " />
        
        {/* Desktop Nav + Search */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-4 whitespace-nowrap">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-green-700 font-medium transition ${
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
            className="flex items-center border border-gray-300 rounded-lg overflow-hidden ml-4"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1 w-48 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white border-l border-gray-300 px-3 flex items-center justify-center"
            >
              <Search size={18} color="#000000" />
            </button>
          </form>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-green-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-inner px-6 py-4">
          <nav className="flex flex-col items-start space-y-3">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block w-full text-gray-700 hover:text-green-700 py-2 whitespace-nowrap ${
                    isActive ? "text-green-800 font-semibold" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

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
                <Search size={18} color="#000000" />
              </button>
            </form>
          </nav>
        </div>
      )}
    </header>
  );
}
