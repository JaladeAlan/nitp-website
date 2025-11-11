import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function AdminPartners() {
  const [partners, setPartners] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  useEffect(() => {
    fetchPartners();
  }, []);

  useEffect(() => {
    handleSearch(search);
  }, [search, partners]);

  const fetchPartners = async () => {
    try {
      const res = await api.get("/admin/partners/getAll.php");
      setPartners(res.data || []);
      setFiltered(res.data || []);
    } catch (err) {
      toast.error("Failed to load partners");
      console.error(err);
    }
  };

  const handleSearch = (query) => {
    const q = query.toLowerCase();
    const filteredList = partners.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.website && p.website.toLowerCase().includes(q))
    );
    setFiltered(filteredList);
    setPage(1);
  };

  const openModal = (partner = null) => {
    if (partner) {
      setEditing(partner);
      setName(partner.name);
      setWebsite(partner.website || "");
      setLogo(partner.logo || "");
    } else {
      setEditing(null);
      setName("");
      setWebsite("");
      setLogo("");
    }
    setOpen(true);
  };

  const handleSave = async () => {
    if (!name.trim()) return toast.error("Partner name is required");

    setLoading(true);
    try {
      if (editing) {
        await api.post("/admin/partners/update.php", {
          id: editing.id,
          name,
          website,
          logo,
        });
        toast.success("Partner updated!");
      } else {
        await api.post("/admin/partners/create.php", {
          name,
          website,
          logo,
        });
        toast.success("Partner added!");
      }
      setOpen(false);
      fetchPartners();
    } catch (err) {
      toast.error("Failed to save partner");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this partner?")) return;

    try {
      await api.post("/admin/partners/delete.php", { id });
      toast.success("Partner deleted!");
      fetchPartners();
    } catch (err) {
      toast.error("Failed to delete partner");
      console.error(err);
    }
  };

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-green-800">Manage Partners</h2>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search partners..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
          >
            <Plus size={18} /> Add Partner
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        {paginated.length === 0 ? (
          <p className="p-6 text-center text-gray-500">No partners found</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-700 text-white text-left">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Website</th>
                <th className="py-3 px-4">Logo</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((p, i) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{(page - 1) * itemsPerPage + i + 1}</td>
                  <td className="py-3 px-4">{p.name}</td>
                  <td className="py-3 px-4">
                    <a href={p.website} className="text-blue-600" target="_blank" rel="noreferrer">
                      {p.website}
                    </a>
                  </td>
                  <td className="py-3 px-4">
                    {p.logo && <img src={p.logo} alt={p.name} className="w-12 h-12 object-contain" />}
                  </td>
                  <td className="py-3 px-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => openModal(p)}
                      className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg"
                    >
                      <Edit size={18} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2 bg-red-100 hover:bg-red-200 rounded-lg"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2 flex-wrap">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${page === i + 1 ? "bg-green-700 text-white" : ""}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4">
              {editing ? "Edit Partner" : "Add Partner"}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Website</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Logo URL</label>
                <input
                  type="text"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={loading}
                className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
              >
                {editing ? "Update Partner" : "Add Partner"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
