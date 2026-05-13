import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";

function ViewAllPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "students"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setStudents(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    await deleteDoc(doc(db, "students", id));
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  if (loading) return <p className="loading">Loading students...</p>;

  return (
    <div className="list-page">
      <h2>📋 All Students ({students.length})</h2>
      {students.length === 0 ? (
        <p>No students yet. <Link to="/create">Add one!</Link></p>
      ) : (
        <div className="cards-grid">
          {students.map(s => (
            <div className="card" key={s.id}>
              <h3>{s.name}</h3>
              <p>🆔 {s.rollNo}</p>
              <p>🏛 {s.department} — Sem {s.semester}</p>
              <div className="card-actions">
                <Link to={`/items/${s.id}`} className="btn btn-sm btn-info">View</Link>
                <Link to={`/edit/${s.id}`} className="btn btn-sm btn-warning">Edit</Link>
                <button onClick={() => handleDelete(s.id)} className="btn btn-sm btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewAllPage;