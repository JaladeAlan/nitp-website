import React from "react";
import SEOWrapper from "../components/common/SEOWrapper";

export default function MemberDashboard() {
  return (
    <SEOWrapper
      title="Member Dashboard | NITP Oyo State Chapter"
      description="Access your account, manage your profile, and view member-specific resources with the NITP Oyo State Chapter member dashboard."
      image="/assets/dashboard-hero.jpg"
      baseUrl="https://nitp-oyo.org"
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Welcome to your Member Dashboard
        </h1>

        {/* Example dashboard sections */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="font-semibold text-lg text-green-700 mb-2">Profile</h2>
            <p>Manage your account details and update your profile information.</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="font-semibold text-lg text-green-700 mb-2">Wallet</h2>
            <p>Fund your account, view transactions, and track contributions.</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="font-semibold text-lg text-green-700 mb-2">Resources</h2>
            <p>Access member-only documents, templates, and publications.</p>
          </div>
        </section>
      </div>
    </SEOWrapper>
  );
}
