import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useParams, useNavigate } from "react-router-dom";

function EditItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", rollNo: "", department: "", semester: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      const docRef = doc(db, "students", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setForm({
          name: data.name || "",
          rollNo: data.rollNo || "",
          department: data.department || "",
          semester: data.semester || ""
        });
      }
      setLoading(false);
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateDoc(doc(db, "students", id), form);
      alert("Student updated successfully!");
      navigate("/items");
    } catch (err) {
      console.error(err);
      alert("Error updating.");
    }
    setSaving(false);
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="form-page">
      <h2>✏️ Edit Student</h2>
      <form onSubmit={handleSubmit} className="crud-form">
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input name="rollNo" placeholder="Roll Number" value={form.rollNo} onChange={handleChange} required />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
        <input name="semester" placeholder="Semester" value={form.semester} onChange={handleChange} />
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Updating..." : "Update Student"}
        </button>
      </form>
    </div>
  );
}

export default EditItemPage;