import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-8xl font-bold text-black">404</h1>
      <p className="text-2xl mt-4 text-gray-600">Page Not Found</p>
      <Link
        to="/"
        className="mt-6 bg-black text-white px-6 py-3 rounded hover:bg-gray-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
