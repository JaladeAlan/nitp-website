import React from "react";
import Button from "../components/ui/Button";

const MembershipPage = () => {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-blue-900">Membership</h1>
      <p className="text-gray-700 mb-6">
        Join the Nigerian Institute of Town Planners to advance your career and contribute
        to the development of sustainable cities and communities.
      </p>

      <section className="bg-gray-50 p-8 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4">Membership Categories</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Student Membership</li>
          <li>Transfer Membership</li>
          <li>Full Membership</li>
          <li>Fellowship</li>
        </ul>
      </section>

      <div className="text-center">
        <Button>Apply for Membership</Button>
      </div>
    </div>
  );
};

export default MembershipPage;
