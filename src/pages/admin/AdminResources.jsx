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
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    handleSearch(search);
  }, [search, resources]);

  const fetchResources = async () => {
    try {
      const res = await api.get("/admin/resources/getAll.php");
      setResources(res.data || []);
      setFiltered(res.data || []);
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
        r.category.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );
    setFiltered(filteredList);
    setPage(1);
  };

  const handleSave = async () => {
    if (!title.trim() || !category.trim() || !description.trim())
      return toast.error("All fields required");

    setLoading(true);
    try {
      if (editing) {
        await api.post("/admin/resources/update.php", {
          id: editing.id,
          title,
          category,
          description,
          link,
        });
        toast.success("Resource updated!");
      } else {
        await api.post("/admin/resources/create.php", {
          title,
          category,
          description,
          link,
        });
        toast.success("Resource added!");
      }
      setOpen(false);
      resetForm();
      fetchResources();
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
      await api.post("/admin/resources/delete.php", { id });
      toast.success("Deleted!");
      fetchResources();
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setTitle("");
    setCategory("");
    setDescription("");
    setLink("");
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

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
              <th className="p-3">Category</th>
              <th className="p-3">Description</th>
              <th className="p-3">Link</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((item, i) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{startIndex + i + 1}</td>
                  <td className="p-3 font-medium">{item.title}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3 text-gray-600 truncate max-w-sm">
                    {item.description.slice(0, 100)}...
                  </td>
                  <td className="p-3 text-blue-600">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        View
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
                        setCategory(item.category);
                        setDescription(item.description);
                        setLink(item.link || "");
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
                <td colSpan="6" className="text-center p-6 text-gray-500">
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
          Page {page} of {totalPages || 1}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>

      {/* Modal */}
      <Dialog isOpen={open} onClose={() => setOpen(false)}>
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
          <input
            type="text"
            placeholder="Category"
            className="border rounded-lg w-full p-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="border rounded-lg w-full p-2 h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Optional link (PDF, website, etc.)"
            className="border rounded-lg w-full p-2"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <div className="flex justify-end gap-2 mt-2">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                resetForm();
              }}
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
