import { Link, useLocation } from "react-router-dom";
import { getData } from "../utils/storage";

const Navbar = () => {
  const user = getData("userId");
  const location = useLocation();
  const currentPageUrl = location.pathname + location.search;

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-cyan-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to="/home"
              className="text-white text-3xl font-bold tracking-wide"
            >
              AgroTech
            </Link>
          </div>
          <div className="flex space-x-6 text-md items-center">
            {user && currentPageUrl !== "/" && (
              <>
                <Link
                  to="/home"
                  className="text-white hover:text-blue-100 transition-colors duration-300"
                >
                  Home
                </Link>
                <Link
                  to="/"
                  className="text-white hover:text-blue-100 transition-colors duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
