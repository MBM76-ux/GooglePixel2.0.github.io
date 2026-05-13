import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const loadStudents = async () => {
    const snapshot = await getDocs(collection(db, "Students"));
    setStudents(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => { loadStudents(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this student?")) return;
    await deleteDoc(doc(db, "Students", id));
    loadStudents();
  };

  return (
    <div style={{ background: "#030712", minHeight: "100vh", padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: "700" }}>All Students</h1>
          <Link to="/students/add"
            style={{ background: "#3b82f6", color: "#fff", padding: ".6rem 1.5rem", borderRadius: "8px", textDecoration: "none", fontWeight: "600" }}>
            + Add Student
          </Link>
        </div>

        {students.length === 0
          ? <p style={{ color: "#6b7280", fontFamily: "monospace" }}>No students yet.</p>
          : students.map((s) => (
            <div key={s.id} style={{ background: "#1a1a27", border: "1px solid #2a2a3d", borderRadius: "10px", padding: "1rem 1.5rem", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ color: "#4f8ef7", fontWeight: "700", fontSize: "1rem" }}>{s.name}</p>
                <p style={{ color: "#6b6b85", fontSize: ".8rem", fontFamily: "monospace" }}>{s.email} | {s.department}</p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => navigate(`/students/${s.id}`)}
                  style={{ background: "rgba(79,142,247,.15)", color: "#4f8ef7", border: "1px solid rgba(79,142,247,.3)", padding: ".4rem .9rem", borderRadius: "6px", cursor: "pointer", fontSize: ".75rem", fontWeight: "700" }}>
                  View
                </button>
                <button onClick={() => navigate(`/students/edit/${s.id}`)}
                  style={{ background: "rgba(167,139,250,.15)", color: "#a78bfa", border: "1px solid rgba(167,139,250,.3)", padding: ".4rem .9rem", borderRadius: "6px", cursor: "pointer", fontSize: ".75rem", fontWeight: "700" }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(s.id)}
                  style={{ background: "rgba(247,86,79,.15)", color: "#f7564f", border: "1px solid rgba(247,86,79,.3)", padding: ".4rem .9rem", borderRadius: "6px", cursor: "pointer", fontSize: ".75rem", fontWeight: "700" }}>
                  Delete
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default StudentsPage;