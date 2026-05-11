import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (name === "" || email === "" || password === "" || confirmPassword === "") {
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

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    if (!terms) {
      setErrorMsg("You must accept terms!");
      return;
    }

    alert("Registration Successful!");
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <section className="flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md space-y-4"
        >
          <h2 className="text-3xl font-bold text-center">Create Account</h2>

          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded focus:ring-2 focus:ring-black"
            />
          </div>

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

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border p-3 rounded focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="ml-2 text-sm">Accept Terms & Conditions</label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-black text-white w-full py-3 rounded hover:bg-gray-700 transition"
          >
            Register
          </button>

          {/* Error */}
          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          {/* Link */}
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default RegisterPage;
