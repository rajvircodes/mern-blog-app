import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        setPost(data);
      } catch (error) {
        toast.error("Post not found");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await API.delete(`/posts/${id}`);
      toast.success("Post deleted!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  if (loading) return <p style={styles.center}>Loading...</p>;
  if (!post)   return null;

  const isOwner = user && user.id === post.author?._id;
  const imageUrl = post.coverImage
    ? `http://localhost:5000/uploads/${post.coverImage}`
    : null;

  return (
    <div style={styles.container}>
      {imageUrl && (
        <img src={imageUrl} alt={post.title} style={styles.image} />
      )}

      <div style={styles.card}>
        <div style={styles.meta}>
          <span style={styles.category}>{post.category}</span>
          <span style={styles.author}>✍️ {post.author?.username}</span>
          <span style={styles.date}>
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h1 style={styles.title}>{post.title}</h1>
        <p style={styles.content}>{post.content}</p>

        {/* Only show edit/delete to the post owner */}
        {isOwner && (
          <div style={styles.actions}>
            <Link to={`/edit/${post._id}`} style={styles.editBtn}>
              ✏️ Edit
            </Link>
            <button onClick={handleDelete} style={styles.deleteBtn}>
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "800px", margin: "0 auto", padding: "40px 20px" },
  image: {
    width: "100%",
    height: "380px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "24px",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  meta: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    marginBottom: "16px",
    flexWrap: "wrap",
  },
  category: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#4f46e5",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  author: { fontSize: "14px", color: "#888" },
  date:   { fontSize: "14px", color: "#888" },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#1a1a2e",
  },
  content: {
    fontSize: "16px",
    lineHeight: "1.9",
    color: "#444",
    whiteSpace: "pre-wrap",
  },
  actions: { display: "flex", gap: "12px", marginTop: "32px" },
  editBtn: {
    padding: "10px 20px",
    background: "#4f46e5",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
  },
  deleteBtn: {
    padding: "10px 20px",
    background: "#fff",
    color: "#e53e3e",
    border: "1px solid #e53e3e",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default PostDetail;