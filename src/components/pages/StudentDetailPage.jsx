import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

const StudentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      const snap = await getDoc(doc(db, "Students", id));
      if (snap.exists()) setStudent({ id: snap.id, ...snap.data() });
    };
    fetchStudent();
  }, [id]);

  if (!student) return (
    <div style={{ background: "#030712", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#6b7280", fontFamily: "monospace" }}>Loading...</p>
    </div>
  );

  return (
    <div style={{ background: "#030712", minHeight: "100vh", padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: "700", marginBottom: "2rem" }}>
          Student Detail
        </h1>
        <div style={{ background: "#1a1a27", border: "1px solid #2a2a3d", borderRadius: "12px", padding: "2rem" }}>
          {[
            ["Name", student.name],
            ["Email", student.email],
            ["Department", student.department],
          ].map(([label, val]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: ".8rem 0", borderBottom: "1px solid #2a2a3d" }}>
              <span style={{ color: "#6b7280", fontFamily: "monospace", fontSize: ".8rem", textTransform: "uppercase" }}>{label}</span>
              <span style={{ color: "#e8e8f0", fontWeight: "600" }}>{val}</span>
            </div>
          ))}
          <div style={{ display: "flex", gap: "10px", marginTop: "1.5rem" }}>
            <button onClick={() => navigate(`/students/edit/${student.id}`)}
              style={{ background: "rgba(167,139,250,.15)", color: "#a78bfa", border: "1px solid rgba(167,139,250,.3)", padding: ".6rem 1.2rem", borderRadius: "6px", cursor: "pointer", fontWeight: "700", fontSize: ".875rem" }}>
              Edit
            </button>
            <button onClick={() => navigate("/students")}
              style={{ background: "transparent", color: "#6b7280", border: "1px solid #2a2a3d", padding: ".6rem 1.2rem", borderRadius: "6px", cursor: "pointer", fontSize: ".875rem" }}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPage;