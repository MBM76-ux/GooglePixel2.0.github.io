import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

const StudentForm = () => {
  const [form, setForm] = useState({ name: "", email: "", department: "" });
  const [students, setStudents] = useState([]);
  const [msg, setMsg] = useState(false);

  const loadStudents = async () => {
    const snapshot = await getDocs(collection(db, "Students"));
    setStudents(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { loadStudents(); }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.department) {
      alert("Please fill all fields!");
      return;
    }
    await addDoc(collection(db, "Students"), form);
    setForm({ name: "", email: "", department: "" });
    setMsg(true);
    setTimeout(() => setMsg(false), 3000);
    loadStudents();
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
    <section style={{ background: "#030712", padding: "4rem 1.5rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white">Student Records</h2>
          <p className="text-gray-400 mt-2">Firebase Firestore – Create & Read Operations</p>
        </div>

        {/* Form */}
        <div style={{ background: "#1a1a27", border: "1px solid #2a2a3d", borderRadius: "12px", padding: "2rem", marginBottom: "2rem" }}>
          <h3 className="text-white text-xl font-bold mb-4">Add Student</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label style={labelStyle}>Student Name</label>
              <input name="name" value={form.name} onChange={handleChange}
                placeholder="e.g. Ali Hassan" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input name="email" value={form.email} onChange={handleChange}
                placeholder="e.g. ali@gmail.com" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Department</label>
              <input name="department" value={form.department} onChange={handleChange}
                placeholder="e.g. Computer Science" style={inputStyle} />
            </div>
          </div>
          <button onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded text-sm uppercase">
            + Add Student
          </button>
          {msg && <p className="mt-3 text-green-400 text-sm">✅ Student added successfully!</p>}
        </div>

        {/* Students List */}
        <h3 className="text-white text-xl font-bold mb-4">All Students</h3>
        {students.length === 0
          ? <p style={{ color: "#6b7280", fontFamily: "monospace", fontSize: ".875rem" }}>No students yet. Add one above!</p>
          : students.map((s) => (
            <div key={s.id} style={{ background: "#1a1a27", border: "1px solid #2a2a3d", borderRadius: "10px", padding: "1rem 1.5rem", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ color: "#4f8ef7", fontWeight: "700", fontSize: "1rem" }}>{s.name}</p>
                <p style={{ color: "#6b6b85", fontSize: ".8rem", fontFamily: "monospace" }}>{s.email} &nbsp;|&nbsp; {s.department}</p>
              </div>
              <span style={{ background: "rgba(79,142,247,.12)", color: "#4f8ef7", border: "1px solid rgba(79,142,247,.25)", fontFamily: "monospace", fontSize: ".6rem", padding: ".2rem .6rem", borderRadius: "4px" }}>Firestore ✓</span>
            </div>
          ))
        }
      </div>
    </section>
  );
};

export default StudentForm;