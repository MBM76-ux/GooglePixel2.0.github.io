import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/auth/login");
  };

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Google Pixel</Link>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-400 transition">Home</Link>
        <Link to="/about" className="hover:text-blue-400 transition">About</Link>
        <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
        <Link to="/students" className="hover:text-blue-400 transition">Students</Link>

        {user ? (
          <>
            {role === "admin" && (
              <Link to="/dashboard/admin"
                style={{ color: "#a78bfa" }}
                className="hover:opacity-80 transition font-semibold">
                Admin
              </Link>
            )}
            {role === "user" && (
              <Link to="/dashboard/user"
                style={{ color: "#4fcea2" }}
                className="hover:opacity-80 transition font-semibold">
                Dashboard
              </Link>
            )}
            <button onClick={handleSignOut}
              style={{ background: "rgba(247,86,79,.15)", color: "#f7564f", border: "1px solid rgba(247,86,79,.3)", padding: ".3rem .9rem", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: ".85rem" }}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/auth/login"
              className="hover:text-blue-400 transition">
              Sign In
            </Link>
            <Link to="/auth/register"
              style={{ background: "#3b82f6", color: "#fff", padding: ".3rem .9rem", borderRadius: "6px", fontWeight: "600", fontSize: ".85rem", textDecoration: "none" }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;