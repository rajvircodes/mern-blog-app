import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <h2 style={styles.title}>Page Not Found</h2>
      <p style={styles.subtitle}>
        Looks like this page doesn't exist or was removed.
      </p>
      <Link to="/" style={styles.btn}>← Back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "20px",
  },
  code: {
    fontSize: "100px",
    fontWeight: "900",
    color: "#4f46e5",
    lineHeight: 1,
  },
  title: { fontSize: "28px", fontWeight: "700", margin: "16px 0 8px" },
  subtitle: { color: "#888", marginBottom: "32px" },
  btn: {
    padding: "12px 24px",
    background: "#4f46e5",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default NotFound;