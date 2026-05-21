import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const imageUrl = post.coverImage
    ? `http://localhost:5000/uploads/${post.coverImage}`
    : null;

  return (
    <div style={styles.card}>
      {imageUrl && (
        <img src={imageUrl} alt={post.title} style={styles.image} />
      )}
      <div style={styles.body}>
        <span style={styles.category}>{post.category}</span>
        <h2 style={styles.title}>{post.title}</h2>
        <p style={styles.content}>
          {post.content.length > 120
            ? post.content.substring(0, 120) + "..."
            : post.content}
        </p>
        <div style={styles.footer}>
          <span style={styles.author}>✍️ {post.author?.username}</span>
          <Link to={`/post/${post._id}`} style={styles.readMore}>
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    overflow: "hidden",
    transition: "transform 0.2s",
    cursor: "pointer",
  },
  image: { width: "100%", height: "200px", objectFit: "cover" },
  body: { padding: "20px" },
  category: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#4f46e5",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    margin: "8px 0",
    color: "#1a1a2e",
  },
  content: { color: "#666", fontSize: "14px", lineHeight: "1.6" },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "16px",
  },
  author: { fontSize: "13px", color: "#888" },
  readMore: {
    color: "#4f46e5",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "14px",
  },
};

export default PostCard;