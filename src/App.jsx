import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import HomePage from "./components/pages/HomePage";
import CreateItemPage from "./components/pages/CreateItemPage";
import ViewAllPage from "./components/pages/ViewAllPage";
import ViewSinglePage from "./components/pages/ViewSinglePage";
import EditItemPage from "./components/pages/EditItemPage";
import PageNotFound from "./components/pages/PageNotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateItemPage />} />
          <Route path="/items" element={<ViewAllPage />} />
          <Route path="/items/:id" element={<ViewSinglePage />} />
          <Route path="/edit/:id" element={<EditItemPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;