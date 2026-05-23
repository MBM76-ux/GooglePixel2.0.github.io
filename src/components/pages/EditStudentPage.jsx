import { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

const EditStudentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", department: "" });

  useEffect(() => {
    const fetchStudent = async () => {
      const snap = await getDoc(doc(db, "Students", id));
      if (snap.exists()) setForm(snap.data());
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    if (!form.name || !form.email || !form.department) {
      alert("Please fill all fields!");
      return;
    }
    await updateDoc(doc(db, "Students", id), form);
    navigate("/students");
  };

  const inputStyle = {
    background: "#111", border: "1px solid #2a2a3d", color: "#e8e8f0",
    padding: ".55rem .85rem", borderRadius: "6px", fontSize: ".88rem", width: "100%"
  };
  const labelStyle = {
    fontFamily: "monospace", fontSize: ".65rem", color: "#6b6b85",
    textTransform: "uppercase", display: "block", marginBottom: ".3rem"
  };

  return (
    <div style={{ background: "#030712", minHeight: "100vh", padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: "700", marginBottom: "2rem" }}>Edit Student</h1>
        <div style={{ background: "#1a1a27", border: "1px solid #2a2a3d", borderRadius: "12px", padding: "2rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Student Name</label>
            <input name="name" value={form.name} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Email</label>
            <input name="email" value={form.email} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={labelStyle}>Department</label>
            <input name="department" value={form.department} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={handleUpdate}
              style={{ background: "#10b981", color: "#fff", border: "none", padding: ".6rem 1.5rem", borderRadius: "6px", cursor: "pointer", fontWeight: "700", fontSize: ".875rem" }}>
              Update Student
            </button>
            <button onClick={() => navigate("/students")}
              style={{ background: "transparent", color: "#6b7280", border: "1px solid #2a2a3d", padding: ".6rem 1.5rem", borderRadius: "6px", cursor: "pointer", fontSize: ".875rem" }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudentPage;