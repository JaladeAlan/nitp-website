import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import logo from "../../assets/nitp-logo.png";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-gray-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* About Section */}
        <div className="flex flex-col">
        <Link to="/" className="flex items-center gap-4 flex-shrink-0 mb-4">
          <img src={logo} alt="NITP Logo" className="w-12 h-12 object-contain" />
          <span className="font-bold text-white text-lg md:text-xl">
            NITP Oyo State Chapter
          </span>
        </Link>
          <p className="text-gray-300 leading-relaxed">
            Advancing Sustainable Planning and Development in Oyo State through
            professional excellence, collaboration, and advocacy.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-3">
            <Link to="/about" className="text-white hover:text-yellow-400 transition-colors">About Us</Link>
            <Link to="/membership" className="text-white hover:text-yellow-400 transition-colors">Membership</Link>
            <Link to="/partners" className="text-white hover:text-yellow-400 transition-colors">Partners</Link>
            <Link to="/projects" className="text-white hover:text-yellow-400 transition-colors">Projects</Link>
            <Link to="/events" className="text-white hover:text-yellow-400 transition-colors">Events & Training</Link>
            <Link to="/resources" className="text-white hover:text-yellow-400 transition-colors">Resources</Link>
            <Link to="/contact" className="text-white hover:text-yellow-400 transition-colors">Contact Us</Link>
          </div>
        </div>

        {/* Contact & Socials */}
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
          <p className="text-gray-300 mb-2">
            NITP Oyo State Secretariat,
            <br />
            Ibadan, Oyo State, Nigeria
          </p>
          <p className="text-gray-300 mb-2">📧 info@nitpoyostate.org.ng</p>
          <p className="text-gray-300 mb-4">📞 +234 812 345 6789</p>

          <div className="flex gap-4 mt-3">
            <a href="#" className="hover:text-yellow-400 transition-colors" aria-label="Facebook"><Facebook /></a>
            <a href="#" className="hover:text-yellow-400 transition-colors" aria-label="Instagram"><Instagram /></a>
            <a href="#" className="hover:text-yellow-400 transition-colors" aria-label="LinkedIn"><Linkedin /></a>
            <a href="#" className="hover:text-yellow-400 transition-colors" aria-label="YouTube"><Youtube /></a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-green-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} NITP Oyo State Chapter. All rights reserved.
      </div>
    </footer>
  );
}
