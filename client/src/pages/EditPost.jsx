import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/axios";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading]     = useState(false);
  const [fetching, setFetching]   = useState(true);
  const [image, setImage]         = useState(null);
  const [formData, setFormData]   = useState({
    title: "",
    content: "",
    category: "General",
  });

  // Pre-fill form with existing post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        setFormData({
          title:    data.title,
          content:  data.content,
          category: data.category,
        });
      } catch (error) {
        toast.error("Failed to load post");
        navigate("/");
      } finally {
        setFetching(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title",    formData.title);
      data.append("content",  formData.content);
      data.append("category", formData.category);
      if (image) data.append("coverImage", image);

      await API.put(`/posts/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Post updated successfully! ✅");
      navigate(`/post/${id}`);

    } catch (error) {
      const msg = error.response?.data?.message || "Failed to update post";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Edit Post</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Title</label>
            <input
              style={styles.input}
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Category</label>
            <select
              style={styles.input}
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>General</option>
              <option>Tech</option>
              <option>Travel</option>
              <option>Food</option>
              <option>Lifestyle</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Content</label>
            <textarea
              style={styles.textarea}
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={8}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>New Cover Image (optional)</label>
            <input
              style={styles.input}
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            style={loading ? styles.buttonDisabled : styles.button}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "700px", margin: "0 auto", padding: "40px 20px" },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  title: { fontSize: "26px", fontWeight: "700", marginBottom: "28px" },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontWeight: "600", fontSize: "14px" },
  input: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "15px",
    outline: "none",
  },
  textarea: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "15px",
    outline: "none",
    resize: "vertical",
  },
  button: {
    padding: "12px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  buttonDisabled: {
    padding: "12px",
    background: "#a5a3f0",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "not-allowed",
  },
};

export default EditPost;