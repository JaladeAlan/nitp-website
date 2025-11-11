import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Dialog } from "../../components/ui/Dialog";
import Button from "../../components/ui/Button";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    handleSearch(search);
  }, [search, news]);

  const fetchNews = async () => {
    try {
      const res = await api.get("/admin/news/getAll.php");
      setNews(res.data || []);
    } catch (err) {
      toast.error("Failed to load news");
      console.error(err);
    }
  };

  const handleSearch = (query) => {
    const lower = query.toLowerCase();
    const filtered = news.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.body.toLowerCase().includes(lower)
    );
    setFilteredNews(filtered);
    setPage(1);
  };

  const handleSave = async () => {
    if (!title.trim() || !body.trim()) return toast.error("All fields required");
    setLoading(true);
    try {
      if (editing) {
        await api.post("/admin/news/update.php", { id: editing.id, title, body });
        toast.success("News updated!");
      } else {
        await api.post("/admin/news/create.php", { title, body });
        toast.success("News added!");
      }
      setOpen(false);
      setEditing(null);
      setTitle("");
      setBody("");
      fetchNews();
    } catch (err) {
      toast.error("Error saving news");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news item?")) return;
    try {
      await api.post("/admin/news/delete.php", { id });
      toast.success("Deleted!");
      fetchNews();
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginated = filteredNews.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage News</h2>
        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add News
        </Button>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search news..."
          className="pl-10 border rounded-lg w-full p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* News Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="p-3">#</th>
              <th className="p-3">Title</th>
              <th className="p-3">Body</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((item, i) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{startIndex + i + 1}</td>
                  <td className="p-3 font-medium">{item.title}</td>
                  <td className="p-3 text-gray-600 truncate max-w-xs">
                    {item.body.slice(0, 100)}...
                  </td>
                  <td className="p-3 text-right">
                    <button
                      className="text-blue-600 hover:underline mr-3"
                      onClick={() => {
                        setEditing(item);
                        setTitle(item.title);
                        setBody(item.body);
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
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No news found
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

      {/* Modal Form */}
      <Dialog isOpen={open} onClose={() => setOpen(false)}>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">
            {editing ? "Edit News" : "Add News"}
          </h3>

          <input
            type="text"
            placeholder="Title"
            className="border rounded-lg w-full p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Body"
            className="border rounded-lg w-full p-2 h-32"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setEditing(null);
                setTitle("");
                setBody("");
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
