import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const [errors, setErrors] = useState({});

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/users");
      setUsers(res.data.data || []);
      setFiltered(res.data.data || []);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Typeahead search
  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.role.toLowerCase().includes(q)
      )
    );
  }, [search, users]);

  const openModal = (user = null) => {
    setSelectedUser(user);
    setFormData(
      user
        ? { name: user.name, email: user.email, password: "", role: user.role }
        : { name: "", email: "", password: "", role: "member" }
    );
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setErrors({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  // Save user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSaving(true);

    const payload = { ...formData };
    if (!payload.password) delete payload.password;

    try {
      if (selectedUser) {
        await api.put(`/admin/users/${selectedUser.id}`, payload);
        toast.success("User updated");
      } else {
        await api.post("/admin/users/create", payload);
        toast.success("User created");
      }
      fetchUsers();
      closeModal();
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
        toast.error("Validation failed");
      } else {
        toast.error(err.response?.data?.message || "Action failed");
      }
    } finally {
      setSaving(false);
    }
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      setDeleting(true);
      await api.delete(`/admin/users/${userToDelete.id}`);
      toast.success("User deleted");
      fetchUsers();
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header + Search */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Users</h2>
        <button
          className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-800 transition"
          onClick={() => openModal()}
        >
          <Plus size={16} className="mr-1" /> Add User
        </button>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by name, email or role..."
          className="border rounded-lg w-full p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        {loading ? (
          <p className="p-6 text-center text-gray-500">Loading users...</p>
        ) : filtered.length === 0 ? (
          <p className="p-6 text-center text-gray-500">No users found</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-sm font-semibold">
              <tr>
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="p-3 border">{user.id}</td>
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">{user.role}</td>
                  <td className="p-3 border flex gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => openModal(user)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className={`text-red-600 hover:text-red-800 ${deleting && userToDelete?.id === user.id ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={() => openDeleteModal(user)}
                      disabled={deleting && userToDelete?.id === user.id}
                    >
                      {deleting && userToDelete?.id === user.id ? "Deleting..." : <Trash2 size={16} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-lg">
            <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={closeModal}>
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-4">{selectedUser ? "Edit User" : "Add User"}</h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name[0]}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email[0]}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  {selectedUser ? "Password (leave blank to keep current)" : "Password"}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  {...(!selectedUser && { required: true })}
                />
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password[0]}</p>}
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
                {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role[0]}</p>}
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
              >
                {saving ? "Saving..." : selectedUser ? "Update User" : "Add User"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-sm p-6 shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4 text-red-600">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete <strong>{userToDelete?.name}</strong>?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex-1"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
