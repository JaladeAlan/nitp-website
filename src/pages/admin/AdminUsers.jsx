import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X, Search, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "member" });
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  // Fetch users (with pagination)
  const fetchUsers = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/users/get_all.php?page=${pageNum}`);
      if (res.data.success) {
        setUsers(res.data.data || []);
        setFiltered(res.data.data || []);
        setTotalPages(res.data.pagination.pages);
        setPage(res.data.pagination.page);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  // Filter users
  useEffect(() => {
    let result = users;
    if (search.trim()) {
      result = result.filter(
        (u) =>
          u.name?.toLowerCase().includes(search.toLowerCase()) ||
          u.email?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (roleFilter !== "all") {
      result = result.filter((u) => u.role === roleFilter);
    }
    setFiltered(result);
  }, [search, roleFilter, users]);

  // Modal open/close
  const openModal = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setFormData({ name: user.name, email: user.email, role: user.role });
    } else {
      setSelectedUser(null);
      setFormData({ name: "", email: "", role: "member" });
    }
    setShowModal(true);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Save user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = selectedUser
        ? "/admin/users/update.php"
        : "/admin/users/create.php";
      const res = await api.post(endpoint, { ...formData, id: selectedUser?.id });

      if (res.data.success) {
        toast.success(res.data.message || "User saved successfully");
        setShowModal(false);
        fetchUsers(page);
      } else {
        toast.error(res.data.message || "Error saving user");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save user");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await api.post("/admin/users/delete.php", { id });
      if (res.data.success) {
        toast.success("User deleted");
        fetchUsers(page);
      } else {
        toast.error("Failed to delete user");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting user");
    }
  };

  // Pagination helpers
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => changePage(i)}
          className={`px-3 py-1 rounded-lg ${
            i === page ? "bg-green-700 text-white" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-6">
        <button
          onClick={() => changePage(page - 1)}
          disabled={page <= 1}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronLeft size={18} />
        </button>

        {pages}

        <button
          onClick={() => changePage(page + 1)}
          disabled={page >= totalPages}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-green-800">Manage Users</h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>

          {/* Add Button */}
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
          >
            <Plus size={18} /> Add User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        {loading ? (
          <p className="p-6 text-center text-gray-500">Loading users...</p>
        ) : filtered.length === 0 ? (
          <p className="p-6 text-center text-gray-500">No matching users found</p>
        ) : (
          <>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-700 text-white text-left">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr key={u.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">{(page - 1) * limit + i + 1}</td>
                    <td className="py-3 px-4">{u.name}</td>
                    <td className="py-3 px-4">{u.email}</td>
                    <td className="py-3 px-4 capitalize">{u.role}</td>
                    <td className="py-3 px-4 text-right flex justify-end gap-2">
                      <button
                        onClick={() => openModal(u)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg"
                      >
                        <Edit size={18} className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="p-2 bg-red-100 hover:bg-red-200 rounded-lg"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {renderPagination()}
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-semibold mb-4">
              {selectedUser ? "Edit User" : "Add New User"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
              >
                {selectedUser ? "Update User" : "Add User"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
