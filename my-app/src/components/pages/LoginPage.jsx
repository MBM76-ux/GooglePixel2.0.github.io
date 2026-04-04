import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (email === "" || password === "") {
      setErrorMsg("All fields are required!");
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      setErrorMsg("Enter a valid email!");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters!");
      return;
    }

    alert("Login Successful!");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
        >
          <h2 className="text-3xl font-bold text-center">Sign In</h2>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 rounded focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4" />
              <label className="ml-2 text-sm">Remember me</label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-700 transition"
          >
            Login
          </button>

          {/* Error */}
          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          {/* Link */}
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
