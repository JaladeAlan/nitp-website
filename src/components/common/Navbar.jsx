import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white py-4 px-6 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">NITP Oyo State</Link>
      <div className="space-x-6 hidden md:block">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/events">Events</Link>
        <Link to="/membership">Membership</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}
