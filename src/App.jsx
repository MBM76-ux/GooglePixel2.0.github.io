import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import PageNotFound from "./components/pages/PageNotFound";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <footer className="text-center p-4 bg-gray-200">
        © 2026 Google Pixel Clone | All Rights Reserved
      </footer>
    </>
  );
};

export default App;
