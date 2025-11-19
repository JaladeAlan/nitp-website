import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Dialog } from "../../components/ui/Dialog";
import Button from "../../components/ui/Button";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function AdminResources() {
  const [resources, setResources] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchResources(page);
  }, [page]);

  useEffect(() => {
    handleSearch(search);
  }, [search, resources]);

  const fetchResources = async (pageNumber = 1) => {
    try {
      const res = await api.get(`/admin/resources?per_page=${itemsPerPage}&page=${pageNumber}`);
      const data = res.data.data || [];
      setResources(data);
      setFiltered(data);
      setLastPage(res.data.meta.last_page || 1);
    } catch (err) {
      toast.error("Failed to load resources");
      console.error(err);
    }
  };

  const handleSearch = (query) => {
    const q = query.toLowerCase();
    const filteredList = resources.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );
    setFiltered(filteredList);
    setPage(1);
  };

  const resetForm = () => {
    setEditing(null);
    setTitle("");
    setDescription("");
    setFile(null);
    setFilePreview("");
  };

  const handleSave = async () => {
    if (!title.trim() || !description.trim())
      return toast.error("Title and description are required");

    if (!editing && !file) return toast.error("File is required");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (file) formData.append("file", file);

      if (editing) {
        // Update resource (PUT request)
        await api.post(`/admin/resources/${editing.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Resource updated!");
      } else {
        // Create new resource
        await api.post("/admin/resources", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Resource added!");
      }

      setOpen(false);
      resetForm();
      fetchResources(page);
    } catch (err) {
      toast.error("Failed to save resource");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resource?")) return;
    try {
      await api.delete(`/admin/resources/${id}`);
      toast.success("Resource deleted!");
      fetchResources(page);
    } catch (err) {
      toast.error("Failed to delete resource");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Resources</h2>
        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Resource
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search resources..."
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
              <th className="p-3">Description</th>
              <th className="p-3">File</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((item, i) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 font-medium">{item.title}</td>
                  <td className="p-3 text-gray-600 truncate max-w-sm">
                    {item.description.slice(0, 100)}...
                  </td>
                  <td className="p-3 text-blue-600">
                    {item.file ? (
                      <a
                        href={`http://localhost:8000/storage/${item.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Download
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      className="text-blue-600 hover:underline mr-3"
                      onClick={() => {
                        setEditing(item);
                        setTitle(item.title);
                        setDescription(item.description);
                        setFile(null);
                        setFilePreview("");
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
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No resources found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-6 space-x-2">
        <Button
          variant="outline"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </Button>
        <span className="px-3 py-2 text-sm text-gray-700">
          Page {page} of {lastPage || 1}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage(page + 1)}
          disabled={page === lastPage}
        >
          Next
        </Button>
      </div>

      {/* Modal */}
      <Dialog isOpen={open} onClose={() => { setOpen(false); resetForm(); }}>
        <div className="space-y-3">
          <h3 className="text-lg font-bold">
            {editing ? "Edit Resource" : "Add Resource"}
          </h3>

          <input
            type="text"
            placeholder="Title"
            className="border rounded-lg w-full p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="border rounded-lg w-full p-2 h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            className="border rounded-lg w-full p-2"
            onChange={(e) => {
              const f = e.target.files[0];
              setFile(f);
              if (f) setFilePreview(f.name);
            }}
          />
          {filePreview && <p className="text-sm text-gray-600">{filePreview}</p>}

          <div className="flex justify-end gap-2 mt-2">
            <Button
              variant="outline"
              onClick={() => { setOpen(false); resetForm(); }}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
