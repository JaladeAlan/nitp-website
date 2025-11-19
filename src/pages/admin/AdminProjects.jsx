import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Dialog } from "../../components/ui/Dialog";
import Button from "../../components/ui/Button";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [published, setPublished] = useState(false);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    handleSearch(search);
  }, [search, projects]);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/admin/projects");
      const items = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setProjects(items);
      setFiltered(items);
    } catch (err) {
      toast.error("Failed to load projects");
      console.error(err);
    }
  };

  const handleSearch = (query) => {
    const q = query.toLowerCase();
    const filteredList = (projects || []).filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.summary?.toLowerCase().includes(q) ||
        p.body?.toLowerCase().includes(q)
    );
    setFiltered(filteredList);
    setPage(1);
  };

  const resetForm = () => {
    setEditing(null);
    setTitle("");
    setSummary("");
    setBody("");
    setPublished(false);
    setCoverFile(null);
    setCoverPreview("");
  };

  const handleSave = async () => {
    if (!title.trim() || !summary.trim() || !body.trim())
      return toast.error("Title, summary, and body are required");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("summary", summary);
      formData.append("body", body);
      formData.append("published", published);
      if (coverFile) formData.append("cover", coverFile);

      if (editing) {
        await api.post(`/admin/projects/${editing.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Project updated!");
      } else {
        await api.post("/admin/projects", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Project added!");
      }

      setOpen(false);
      resetForm();
      fetchProjects();
    } catch (err) {
      toast.error("Failed to save project");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await api.delete(`/admin/projects/${id}`);
      toast.success("Deleted!");
      fetchProjects();
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        <Button onClick={() => { setOpen(true); resetForm(); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects..."
          className="pl-10 border rounded-lg w-full p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="p-3">#</th>
              <th className="p-3">Title</th>
              <th className="p-3">Summary</th>
              <th className="p-3">Published</th>
              <th className="p-3">Cover</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((item, i) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{startIndex + i + 1}</td>
                  <td className="p-3 font-medium">{item.title}</td>
                  <td className="p-3 text-gray-600 truncate max-w-sm">{item.summary?.slice(0, 100)}...</td>
                  <td className="p-3">{item.published ? "Yes" : "No"}</td>
                  <td className="p-3">
                    {item.cover && <img src={item.cover} alt={item.title} className="w-16 h-16 object-contain" />}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      className="text-blue-600 hover:underline mr-3"
                      onClick={() => {
                        setEditing(item);
                        setTitle(item.title);
                        setSummary(item.summary || "");
                        setBody(item.body || "");
                        setPublished(item.published);
                        setCoverPreview(item.cover || "");
                        setOpen(true);
                      }}
                    >
                      <Edit className="inline w-4 h-4" />
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="inline w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">No projects found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-6 space-x-2">
        <Button variant="outline" onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</Button>
        <span className="px-3 py-2 text-sm text-gray-700">Page {page} of {totalPages || 1}</span>
        <Button variant="outline" onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</Button>
      </div>

      {/* Modal */}
      <Dialog isOpen={open} onClose={() => setOpen(false)}>
        <div className="space-y-3">
          <h3 className="text-lg font-bold">{editing ? "Edit Project" : "Add Project"}</h3>

          <input type="text" placeholder="Title" className="border rounded-lg w-full p-2" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder="Summary" className="border rounded-lg w-full p-2 h-20" value={summary} onChange={(e) => setSummary(e.target.value)} />
          <textarea placeholder="Body" className="border rounded-lg w-full p-2 h-32" value={body} onChange={(e) => setBody(e.target.value)} />

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
            Published
          </label>

          {/* Cover Upload */}
          <div>
            {coverPreview && <img src={coverPreview} alt="preview" className="w-32 h-32 object-contain mb-2" />}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setCoverFile(file);
                setCoverPreview(URL.createObjectURL(file));
              }}
              className="border rounded-lg w-full p-2"
            />
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline" onClick={() => { setOpen(false); resetForm(); }}>Cancel</Button>
            <Button onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
