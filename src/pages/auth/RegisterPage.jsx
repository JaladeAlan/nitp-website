export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow p-6 rounded w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Create an Account</h1>
        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full border p-2 rounded" />
          <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
          <input type="password" placeholder="Password" className="w-full border p-2 rounded" />
          <button className="w-full bg-green-600 text-white py-2 rounded">Register</button>
        </form>
      </div>
    </div>
  );
}
