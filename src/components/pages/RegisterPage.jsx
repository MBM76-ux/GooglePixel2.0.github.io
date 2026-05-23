import { useState } from "react";
import { auth, db } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields!");
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await setDoc(doc(db, "users", result.user.uid), {
        name: form.name,
        email: form.email,
        role: form.role,
        createdAt: new Date()
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
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
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: "700", marginBottom: "2rem", textAlign: "center" }}>
          Register
        </h1>
        <div style={{ background: "#1a1a27", border: "1px solid #2a2a3d", borderRadius: "12px", padding: "2rem" }}>
          {error && <p style={{ color: "#f7564f", marginBottom: "1rem", fontSize: ".875rem" }}>{error}</p>}
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Full Name</label>
            <input name="name" value={form.name} onChange={handleChange}
              placeholder="Ali Hassan" style={inputStyle} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Email</label>
            <input name="email" value={form.email} onChange={handleChange}
              placeholder="email@example.com" style={inputStyle} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange}
              placeholder="••••••••" style={inputStyle} />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={labelStyle}>Role</label>
            <select name="role" value={form.role} onChange={handleChange} style={inputStyle}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button onClick={handleRegister}
            style={{ background: "#3b82f6", color: "#fff", border: "none", padding: ".7rem", borderRadius: "6px", cursor: "pointer", fontWeight: "700", fontSize: ".875rem", width: "100%", marginBottom: "1.5rem" }}>
            Register
          </button>
          <p style={{ color: "#6b7280", fontSize: ".875rem", textAlign: "center" }}>
            Already have an account? <Link to="/auth/login" style={{ color: "#4f8ef7" }}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;