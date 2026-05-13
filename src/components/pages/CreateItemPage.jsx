import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateItemPage() {
  const [form, setForm] = useState({ name: "", rollNo: "", department: "", semester: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.rollNo) return alert("Name and Roll No are required!");
    setLoading(true);
    try {
      await addDoc(collection(db, "students"), {
        ...form,
        createdAt: serverTimestamp()
      });
      setSuccess("Student added successfully!");
      setForm({ name: "", rollNo: "", department: "", semester: "" });
      setTimeout(() => navigate("/items"), 1500);
    } catch (err) {
      console.error(err);
      alert("Error adding student.");
    }
    setLoading(false);
  };

  return (
    <div className="form-page">
      <h2>➕ Add New Student</h2>
      {success && <p className="success-msg">{success}</p>}
      <form onSubmit={handleSubmit} className="crud-form">
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input name="rollNo" placeholder="Roll Number" value={form.rollNo} onChange={handleChange} required />
        <input name="department" placeholder="Department (e.g., BSCS)" value={form.department} onChange={handleChange} />
        <input name="semester" placeholder="Semester (e.g., 4)" value={form.semester} onChange={handleChange} />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Add Student"}
        </button>
      </form>
    </div>
  );
}

export default CreateItemPage;