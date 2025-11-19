import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../services/api";

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [publishedAt, setPublishedAt] = useState("");

  const fetchNews = async () => {
    try {
      const { data } = await api.get("/admin/news");
      const normalized = data.data.map((n) => ({
        id: n.id,
        title: n.title ?? "",
        content: n.content ?? "",
        image: n.image ?? null,
        is_published: n.is_published ?? false,
        published_at: n.published_at ? n.published_at.slice(0, 16) : "",
      }));
      setNews(normalized);
    } catch (err) {
      toast.error("Failed to fetch news");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleCreate = () => {
    setEditing(null);
    setTitle("");
    setContent("");
    setImage(null);
    setImagePreview("");
    setIsPublished(false);
    setPublishedAt("");
    setOpen(true);
  };

  const handleEdit = (item) => {
    setEditing(item);
    setTitle(item.title);
    setContent(item.content);
    setImage(null);
    setImagePreview(item.image);
    setIsPublished(item.is_published);
    setPublishedAt(item.published_at);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return;
    try {
      await api.delete(`/admin/news/${id}`);
      toast.success("News deleted!");
      fetchNews();
    } catch (err) {
      toast.error("Failed to delete news");
      console.error(err);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      return toast.error("Title and content are required");
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("is_published", isPublished);
      formData.append("published_at", publishedAt || null);
      if (image) formData.append("image", image);

      if (editing) {
        await api.post(`/admin/news/${editing.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("News updated!");
      } else {
        await api.post("/admin/news", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("News added!");
      }

      setOpen(false);
      setEditing(null);
      setTitle("");
      setContent("");
      setImage(null);
      setImagePreview("");
      setIsPublished(false);
      setPublishedAt("");

      fetchNews();
    } catch (err) {
      toast.error("Failed to save news");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">News</h1>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add News
        </button>
      </div>

      <table className="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Content</th>
            <th className="p-3">Image</th>
            <th className="p-3">Published</th>
            <th className="p-3">Publish Date</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item.id} className="border-t border-gray-200">
              <td className="p-3">{item.title}</td>
              <td className="p-3">{item.content}</td>
              <td className="p-3">
                {item.image ? (
                  <img
                    src={item.image}
                    alt="News"
                    className="w-14 h-14 object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-400">No image</span>
                )}
              </td>
              <td className="p-3 text-center">
                {item.is_published ? "✅" : "❌"}
              </td>
              <td className="p-3 text-center">
                {item.published_at ? item.published_at.replace("T", " ") : "-"}
              </td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-600 font-bold"
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4">
              {editing ? "Edit News" : "Add News"}
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            />

            <input
              type="file"
              accept="image/*"
              className="border p-2 rounded w-full mb-3"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                if (file) setImagePreview(URL.createObjectURL(file));
              }}
            />
            {(imagePreview || editing?.image) && (
              <img
                src={imagePreview || editing.image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded mb-3"
              />
            )}

            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
              />
              <label>Published</label>
            </div>

            <input
              type="datetime-local"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            />

            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
