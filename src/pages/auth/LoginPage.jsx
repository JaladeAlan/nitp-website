export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow p-6 rounded w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Member Login</h1>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
          <input type="password" placeholder="Password" className="w-full border p-2 rounded" />
          <button className="w-full bg-green-600 text-white py-2 rounded">Login</button>
        </form>
      </div>
    </div>
  );
}
