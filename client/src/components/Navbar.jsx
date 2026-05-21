import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>📝 MERN Blog</Link>

      <div style={styles.links}>
        {user ? (
          <>
            <span style={styles.username}>👤 {user.username}</span>
            <Link to="/create" style={styles.btn}>+ New Post</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"    style={styles.link}>Login</Link>
            <Link to="/register" style={styles.btn}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 32px",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  brand: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#4f46e5",
    textDecoration: "none",
  },
  links: { display: "flex", alignItems: "center", gap: "16px" },
  link: { color: "#555", textDecoration: "none", fontWeight: "500" },
  btn: {
    padding: "8px 16px",
    background: "#4f46e5",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "14px",
  },
  logoutBtn: {
    padding: "8px 16px",
    background: "transparent",
    color: "#e53e3e",
    border: "1px solid #e53e3e",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },
  username: { color: "#555", fontWeight: "500" },
};

export default Navbar;