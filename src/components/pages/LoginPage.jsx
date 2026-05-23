import { useState } from "react";
import { auth, googleProvider, db } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password!");
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const snap = await getDoc(doc(db, "users", user.uid));
      if (!snap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          role: "user",
          createdAt: new Date()
        });
      }
      navigate("/");
    } catch (err) {
      setError("Google sign-in failed!");
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
          Sign In
        </h1>
        <div style={{ background: "#1a1a27", border: "1px solid #2a2a3d", borderRadius: "12px", padding: "2rem" }}>
          {error && <p style={{ color: "#f7564f", marginBottom: "1rem", fontSize: ".875rem" }}>{error}</p>}
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Email</label>
            <input name="email" value={form.email} onChange={handleChange}
              placeholder="email@example.com" style={inputStyle} />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={labelStyle}>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange}
              placeholder="••••••••" style={inputStyle} />
          </div>
          <button onClick={handleLogin}
            style={{ background: "#3b82f6", color: "#fff", border: "none", padding: ".7rem", borderRadius: "6px", cursor: "pointer", fontWeight: "700", fontSize: ".875rem", width: "100%", marginBottom: "1rem" }}>
            Sign In
          </button>
          <button onClick={handleGoogle}
            style={{ background: "#fff", color: "#111", border: "none", padding: ".7rem", borderRadius: "6px", cursor: "pointer", fontWeight: "700", fontSize: ".875rem", width: "100%", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20" />
            Sign in with Google
          </button>
          <p style={{ color: "#6b7280", fontSize: ".875rem", textAlign: "center" }}>
            Don't have an account? <Link to="/auth/register" style={{ color: "#4f8ef7" }}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;