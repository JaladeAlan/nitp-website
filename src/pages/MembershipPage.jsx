import React from "react";
import Button from "../components/ui/Button";

const MembershipPage = () => {
  return (
    <div className="space-y-16 max-w-5xl mx-auto px-6 py-12">
      {/* Page Title */}
      <header className="text-center space-y-4">
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto mb-0">
          Join the Nigerian Institute of Town Planners to advance your career and contribute
          to the development of sustainable cities and communities.
        </p>
      </header>

      {/* Membership Categories */}
      <section className="bg-white shadow-md rounded-xl p-8 md:p-12">
        <h2 className="text-3xl font-semibold text-green-700 mb-6 text-center">
          Membership Categories
        </h2>
        <ul className="grid md:grid-cols-2 gap-6 list-disc ml-6 text-gray-700 text-lg">
          <li className="hover:text-blue-700 transition">Student Membership</li>
          <li className="hover:text-blue-700 transition">Transfer Membership</li>
          <li className="hover:text-blue-700 transition">Full Membership</li>
          <li className="hover:text-blue-700 transition">Fellowship</li>
        </ul>
      </section>

      {/* Apply Button */}
      <div className="text-center">
        <Button className="bg-green-700 hover:bg-blue-800 text-white px-8 py-3 text-lg md:text-xl transition">
          Apply for Membership
        </Button>
      </div>
    </div>
  );
};

export default MembershipPage;
