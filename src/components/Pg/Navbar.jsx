import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaHome, FaUser, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth(); // Get auth state
  const navigate = useNavigate();
  return (
    <div>
      <nav className="fixed z-100 top-0 right-0 left-0 transition-all bg-white duration-300 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <FaHome className="text-blue-600 text-2xl mr-2" />
              <span className="text-xl font-bold">FindMyPG</span>
            </Link>

            <div className="hidden md:flex items-center  space-x-4">
              <Link to="/" className="text-black-700 hover:text-blue-600">
                Home
              </Link>
              <Link to="/search" className="text-black-700 hover:text-blue-600">
                Search
              </Link>
              <Link to="/cities" className="text-black-700 hover:text-blue-600">
                Cities
              </Link>
              <Link
                to="/about-us"
                className="text-black-700 hover:text-blue-600"
              >
                About
              </Link>
              <Link
                to="/contact-us"
                className="text-black-700 hover:text-blue-600"
              >
                Contact
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              {isAuthenticated ? (
                // If Owner is logged in, show owner details + Logout
                <div className="flex items-center space-x-4">
                  <Link
                    to={user.id ? "/owner-dashboard" : "/user-dashboard"}
                    className="hover:text-gray-500"
                  >
                    {user.name}
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-gray-900 text-white px-2 py-2 rounded-lg hover:bg-gray-700"
                  >
                    <MdLogout />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  {/* <button
                    onClick={() => setIsRegisterOpen(true)}
                    className=" font-semibold px-4 py-2 rounded-xl border-1 border-gray-300  hover:bg-gray-100"
                  >
                    PG Owner Login
                  </button>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="bg-blue-700 font-semibold text-white px-4 py-2 rounded-xl hover:bg-blue-600"
                  >
                    User Login
                  </button> */}
                  <Button variant="outline" onClick={()=>navigate('/login')} className="flex items-center hover:bg-gray-100">
                <FaSignInAlt className="mr-2" /> Login
                   </Button>
                  <Button onClick={()=>navigate('/register')} className="bg-blue-600 hover:bg-purple-700 text-white flex items-center">
                <FaUser className="mr-2" /> Register
                    </Button>
                </div>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-black-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <Link
                to="/"
                className="block py-2 text-black-700 hover:text-blue-600"
              >
                Home
              </Link>
              <Link
                to="/search"
                className="block py-2 text-black-700 hover:text-blue-600"
              >
                Search
              </Link>
              <Link
                to="/cities"
                className="block py-2 text-black-700 hover:text-blue-600"
              >
                Cities
              </Link>
              <Link
                to="/about-us"
                className="block py-2 text-black-700 hover:text-blue-600"
              >
                About
              </Link>
              <Link
                to="/contact-us"
                className="block py-2 text-black-700 hover:text-blue-600"
              >
                Contact
              </Link>
              <div className="flex space-x-2 mt-4">
                {isAuthenticated ? (
                  // If Owner is logged in, show owner details + Logout
                  <div className="flex items-center space-x-4">
                    <Link to="/dashboard" className="hover:text-gray-500">
                      {user.name}
                    </Link>
                    <button
                      onClick={logout}
                      className="bg-gray-900 text-white px-2 py-2 rounded-lg hover:bg-gray-700"
                    >
                      <MdLogout />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => setIsRegisterOpen(true)}
                      className=" font-semibold px-4 py-2  rounded-xl border-1 border-gray-300  hover:bg-gray-100"
                    >
                      PG Owner Login
                    </button>
                    <button
                      onClick={() => setIsLoginOpen(true)}
                      className="bg-blue-700 font-semibold text-white px-4 py-2 rounded-xl hover:bg-blue-600"
                    >
                      User Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* <Modal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
        <OwnerRegister close={() => setIsRegisterOpen(false)} />
      </Modal>

      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <SignIn />
      </Modal> */}
    </div>
  );
}

export default Navbar;
