import { useState, useEffect } from "react";
import API from "../api/axios";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await API.get("/posts");
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p style={styles.center}>Loading posts...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Latest Posts</h1>
      {posts.length === 0 ? (
        <p style={styles.center}>
          No posts yet. Be the first to write one! ✍️
        </p>
      ) : (
        <div style={styles.grid}>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" },
  heading: { fontSize: "32px", fontWeight: "700", marginBottom: "30px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "24px",
  },
  center: { textAlign: "center", color: "#888", marginTop: "60px" },
};

export default Home;