import { Link } from "react-router-dom";

const Navbar = () => {
  const toggleTheme = () => {
    const cur = localStorage.getItem("theme") || "dark";
    const next = cur === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  const applyTheme = (t) => {
    document.body.style.background = t === "dark" ? "#111827" : "";
    const btn = document.getElementById("themeToggleBtn");
    if (btn) btn.textContent = t === "dark" ? "☀️ Light" : "🌙 Dark";
  };

  return (
    <nav className="bg-black shadow items-center p-5 flex justify-between text-white">
      <h1 className="text-2xl font-bold cursor-pointer hover:scale-110 transition">
        Google Pixel
      </h1>

      <ul className="flex gap-6 font-medium">
        <li>
          <Link to="/" className="hover:text-black hover:bg-white px-3 py-2 hover:rounded-2xl transition duration-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-black hover:bg-white px-3 py-2 hover:rounded-2xl transition duration-300">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-black hover:bg-white px-3 py-2 hover:rounded-2xl transition duration-300">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/auth/login" className="hover:text-black hover:bg-white px-3 py-2 hover:rounded-2xl transition duration-300">
            Sign In
          </Link>
        </li>
        <li>
          <Link to="/auth/register" className="hover:text-black hover:bg-white px-3 py-2 hover:rounded-2xl transition duration-300">
            Sign Up
          </Link>
        </li>
      </ul>

      <button
        id="themeToggleBtn"
        onClick={toggleTheme}
        className="ml-4 border border-gray-500 text-white text-xs font-mono px-3 py-1.5 rounded hover:border-blue-400 hover:text-blue-400 transition"
      >
        🌙 Dark
      </button>
    </nav>
  );
};

export default Navbar;
