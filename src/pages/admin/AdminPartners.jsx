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
  const [logoFile, setLogoFile] = useState(null); // New: File object
  const [logoPreview, setLogoPreview] = useState(""); // For preview
  const [loading, setLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchPartners();
  }, []);

  useEffect(() => {
    handleSearch(search);
  }, [search, partners]);

  // Fetch partners
  const fetchPartners = async () => {
    try {
      const res = await api.get("/admin/partners", { params: { per_page: 1000 } });
      const items = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setPartners(items);
      setFiltered(items);
    } catch (err) {
      toast.error("Failed to load partners");
      console.error(err);
      setPartners([]);
      setFiltered([]);
    }
  };

  const handleSearch = (query) => {
    const q = query.toLowerCase();
    const filteredList = (partners || []).filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.website?.toLowerCase().includes(q)
    );
    setFiltered(filteredList);
    setPage(1);
  };

  const openModal = (partner = null) => {
    if (partner) {
      setEditing(partner);
      setName(partner.name || "");
      setWebsite(partner.website || "");
      setLogoPreview(partner.logo || "");
      setLogoFile(null);
    } else {
      setEditing(null);
      setName("");
      setWebsite("");
      setLogoPreview("");
      setLogoFile(null);
    }
    setOpen(true);
  };

  const handleSave = async () => {
    if (!name.trim()) return toast.error("Partner name is required");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("website", website);
      if (logoFile) formData.append("logo", logoFile);

      if (editing) {
        await api.post(`/admin/partners/${editing.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Partner updated!");
      } else {
        await api.post("/admin/partners", formData, {
          headers: { "Content-Type": "multipart/form-data" },
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
    if (!confirm("Are you sure you want to delete this partner?")) return;
    try {
      await api.delete(`/admin/partners/${id}`);
      toast.success("Partner deleted!");
      fetchPartners();
    } catch (err) {
      toast.error("Failed to delete partner");
      console.error(err);
    }
  };

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = (filtered || []).slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Partners</h2>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
          <button onClick={() => openModal()} className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
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
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Website</th>
                <th className="p-3">Logo</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((p, i) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{(page - 1) * itemsPerPage + i + 1}</td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">
                    <a href={p.website} target="_blank" rel="noreferrer" className="text-blue-600">{p.website}</a>
                  </td>
                  <td className="p-3">
                    {p.logo && <img src={p.logo} alt={p.name} className="w-12 h-12 object-contain" />}
                  </td>
                  <td className="p-3 flex justify-end gap-2">
                    <button onClick={() => openModal(p)} className="p-2 bg-blue-100 rounded-lg">
                      <Edit size={18} className="text-blue-600" />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 bg-red-100 rounded-lg">
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
        <div className="flex justify-center mt-4 gap-2">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={page === i + 1 ? "bg-green-700 text-white px-3 py-1 rounded" : "px-3 py-1 rounded"}>{i + 1}</button>
          ))}
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-gray-500">✕</button>
            <h3 className="text-lg font-semibold mb-4">{editing ? "Edit Partner" : "Add Partner"}</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
              <input type="text" placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full border rounded-lg px-3 py-2" />

              {/* Logo Upload */}
              <div>
                <label className="block mb-1 text-sm font-medium">Logo</label>
                {logoPreview && (
                  <img src={logoPreview} alt="preview" className="w-20 h-20 object-contain mb-2" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setLogoFile(file);
                    setLogoPreview(URL.createObjectURL(file));
                  }}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <button onClick={handleSave} disabled={loading} className="w-full bg-green-700 text-white py-2 rounded-lg">
                {editing ? "Update" : "Add"} Partner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
