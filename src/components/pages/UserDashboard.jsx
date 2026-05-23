import { useEffect, useState } from "react";
import { db, auth } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "Students"), where("createdBy", "==", user.uid));
      const snap = await getDocs(q);
      setStudents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    if (user) fetchData();
  }, [user]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/auth/login");
  };

  return (
    <div style={{ background: "#030712", minHeight: "100vh", padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: "700" }}>User Dashboard</h1>
            <p style={{ color: "#6b7280", fontFamily: "monospace", fontSize: ".8rem" }}>{user?.email}</p>
          </div>
          <button onClick={handleSignOut}
            style={{ background: "rgba(247,86,79,.15)", color: "#f7564f", border: "1px solid rgba(247,86,79,.3)", padding: ".5rem 1.2rem", borderRadius: "6px", cursor: "pointer", fontWeight: "700" }}>
            Sign Out
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
          {[
            ["My Students", students.length, "#4f8ef7"],
            ["Account", "Active ✓", "#4fcea2"],
          ].map(([label, val, color]) => (
            <div key={label} style={{ background: "#1a1a27", border: "1px solid #2a2a3d", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
              <p style={{ color, fontSize: "2rem", fontWeight: "700", fontFamily: "monospace" }}>{val}</p>
              <p style={{ color: "#6b7280", fontSize: ".75rem", textTransform: "uppercase", fontFamily: "monospace" }}>{label}</p>
            </div>
          ))}
        </div>

        {/* My Students */}
        <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>My Students</h2>
        {students.length === 0
          ? <p style={{ color: "#6b7280", fontFamily: "monospace" }}>No students added yet.</p>
          : students.map(s => (
            <div key={s.id} style={{ background: "#1a1a27", border: "1px solid #2a2a3d", borderRadius: "10px", padding: "1rem 1.5rem", marginBottom: "8px" }}>
              <p style={{ color: "#4f8ef7", fontWeight: "700" }}>{s.name}</p>
              <p style={{ color: "#6b7280", fontSize: ".8rem", fontFamily: "monospace" }}>{s.email} | {s.department}</p>
            </div>
          ))
        }

        {/* Button */}
        <button onClick={() => navigate("/students/add")}
          style={{ background: "#3b82f6", color: "#fff", border: "none", padding: ".7rem 1.5rem", borderRadius: "6px", cursor: "pointer", fontWeight: "700", marginTop: "1.5rem" }}>
          + Add Student
        </button>

      </div>
    </div>
  );
};

export default UserDashboard;