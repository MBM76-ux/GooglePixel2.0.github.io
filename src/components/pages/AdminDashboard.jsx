import { useEffect, useState } from "react";
import { db, auth } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const studSnap = await getDocs(collection(db, "Students"));
      setStudents(studSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      const userSnap = await getDocs(collection(db, "users"));
      setUsers(userSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    fetchData();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/auth/login");
  };

  const adminCount = users.filter(u => u.role === "admin").length;
  const userCount = users.filter(u => u.role === "user").length;

  return (
    <div style={{ background: "#030712", minHeight: "100vh", padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: "700" }}>Admin Dashboard</h1>
            <p style={{ color: "#6b7280", fontFamily: "monospace", fontSize: ".8rem" }}>{user?.email}</p>
          </div>
          <button onClick={handleSignOut}
            style={{ background: "rgba(247,86,79,.15)", color: "#f7564f", border: "1px solid rgba(247,86,79,.3)", padding: ".5rem 1.2rem", borderRadius: "6px", cursor: "pointer", fontWeight: "700" }}>
            Sign Out
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            ["Total Users", users.length, "#4f8ef7"],
            ["Admins", adminCount, "#a78bfa"],
            ["Normal Users", userCount, "#4fcea2"],
            ["Total Students", students.length, "#f7b64f"],
          ].map(([label, val, color]) => (
            <div key={label} style={{ background: "#1a1a27", border: "1px solid #2a2a3d", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
              <p style={{ color, fontSize: "2rem", fontWeight: "700", fontFamily: "monospace" }}>{val}</p>
              <p style={{ color: "#6b7280", fontSize: ".75rem", textTransform: "uppercase", fontFamily: "monospace" }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Users List */}
        <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>All Users</h2>
        <div style={{ marginBottom: "2rem" }}>
          {users.map(u => (
            <div key={u.id} style={{ background: "#1a1a27", border: "1px solid #2a2a3d", borderRadius: "10px", padding: "1rem 1.5rem", marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ color: "#fff", fontWeight: "600" }}>{u.name}</p>
                <p style={{ color: "#6b7280", fontSize: ".8rem", fontFamily: "monospace" }}>{u.email}</p>
              </div>
              <span style={{
                background: u.role === "admin" ? "rgba(167,139,250,.15)" : "rgba(79,200,162,.15)",
                color: u.role === "admin" ? "#a78bfa" : "#4fcea2",
                border: `1px solid ${u.role === "admin" ? "rgba(167,139,250,.3)" : "rgba(79,200,162,.3)"}`,
                padding: ".2rem .6rem", borderRadius: "4px", fontFamily: "monospace", fontSize: ".7rem", fontWeight: "700"
              }}>{u.role}</span>
            </div>
          ))}
        </div>

        {/* Students Button */}
        <button onClick={() => navigate("/students")}
          style={{ background: "#3b82f6", color: "#fff", border: "none", padding: ".7rem 1.5rem", borderRadius: "6px", cursor: "pointer", fontWeight: "700" }}>
          Manage Students
        </button>

      </div>
    </div>
  );
};

export default AdminDashboard;