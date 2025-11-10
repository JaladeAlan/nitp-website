import { useState } from "react";

export default function RenewalForm() {
  const [formData, setFormData] = useState({
    membershipId: "",
    email: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Renewal Request:", formData);
    alert("Your membership renewal request has been submitted.");
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-xl mx-auto bg-gray-50 shadow rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Membership Renewal
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Membership ID</label>
            <input
              type="text"
              name="membershipId"
              value={formData.membershipId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Renewal Amount (₦)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Renew Membership
          </button>
        </form>
      </div>
    </section>
  );
}
