import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useParams, Link } from "react-router-dom";

function ViewSinglePage() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const docRef = doc(db, "students", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStudent({ id: docSnap.id, ...docSnap.data() });
        } else {
          setStudent(null);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchStudent();
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!student) return <p>Student not found. <Link to="/items">Go back</Link></p>;

  return (
    <div className="detail-page">
      <h2>👤 Student Detail</h2>
      <div className="detail-card">
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Roll No:</strong> {student.rollNo}</p>
        <p><strong>Department:</strong> {student.department}</p>
        <p><strong>Semester:</strong> {student.semester}</p>
      </div>
      <div className="detail-actions">
        <Link to={`/edit/${student.id}`} className="btn btn-warning">✏️ Edit</Link>
        <Link to="/items" className="btn btn-secondary">⬅ Back to List</Link>
      </div>
    </div>
  );
}

export default ViewSinglePage;