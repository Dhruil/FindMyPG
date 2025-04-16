import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEnvelope, FaLock, FaUser, FaHome, FaBuilding } from "react-icons/fa";
import axios from "axios";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [userType, setUserType] = useState("user"); // 'user' or 'owner'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Validate fields
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Show loading state
    setIsLoading(true);

    try {
      // Here you would implement your actual login logic
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.post(
        "https://findmypg-i01x.onrender.com/api/login",
        {
          userType,
          email,
          password,
        }
      );
      const data = response.data;
      console.log(data);
      if (data.message === "Login successful." && data.owner_id) {
        const ownerData = await axios.get(
          "https://findmypg-i01x.onrender.com/api/getOwner",
          {
            headers: {
              Owner_id: data.owner_id,
            },
          }
        );
        if (ownerData.data.status === "success") {
          const owner = ownerData.data.owner;
          console.log(owner);
          login(owner);
          navigate("/owner-dashboard");
        }
      } else if (data.message === "Login successful." && data.user_id) {
        const userData = await axios.get(
          "https://findmypg-i01x.onrender.com/api/getUser",
          {
            headers: {
              User_id: data.user_id,
            },
          }
        );
        if (userData.data.status === "success") {
          const user = userData.data.user;
          console.log(user);
          login(user);
          navigate("/user-dashboard");
        }
      } else {
        setErrors({ form: data.message });
      }
      //   // Redirect based on user type
    } catch (error) {
      setErrors({ form: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // Background images for different user types
  const backgroundImages = {
    user: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
    owner:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
  };

  return (
    <>
      <div className="min-h-[91vh] mt-[4rem] flex flex-col md:flex-row">
        {/* Left side - Image (full height on desktop, partial on mobile) */}
        <div
          className="md:w-1/2 h-40 md:h-auto bg-cover bg-center relative transition-all duration-700"
          style={{
            backgroundImage: `url("${backgroundImages[userType]}")`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
          <div className="absolute  inset-0 flex flex-col justify-center items-center text-white p-6">
            <div className="mb-4 bg-white/10 backdrop-blur-md p-5 rounded-full">
              {userType === "user" ? (
                <FaHome className="h-12 w-12 text-white drop-shadow-lg" />
              ) : (
                <FaBuilding className="h-12 w-12 text-white drop-shadow-lg" />
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center drop-shadow-lg">
              {userType === "user"
                ? "Find Your Perfect PG"
                : "Manage Your Properties"}
            </h1>
            <p className="text-lg text-center max-w-md drop-shadow-md">
              {userType === "user"
                ? "Login to discover the best PG accommodations for your needs"
                : "Login to manage your PG listings and connect with potential tenants"}
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="md:w-1/2 bg-white flex flex-col justify-center p-6 md:p-12 lg:p-16">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Login to FindMyPG
              </h2>

              {/* Attractive Toggle Switch */}
              <div className="relative w-full h-14 bg-gray-100 rounded-full p-1 mb-6">
                <div
                  className="absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-md transition-all duration-300"
                  style={{
                    left: userType === "user" ? "2px" : "50%",
                    right: userType === "owner" ? "2px" : "50%",
                  }}
                ></div>
                <div className="relative flex h-full">
                  <button
                    onClick={() => setUserType("user")}
                    className={`flex-1 flex items-center justify-center rounded-full z-10 transition-colors duration-300 ${
                      userType === "user" ? "text-white" : "text-gray-700"
                    }`}
                  >
                    <FaUser className="mr-2" />
                    <span className="font-medium">User</span>
                  </button>
                  <button
                    onClick={() => setUserType("owner")}
                    className={`flex-1 flex items-center justify-center rounded-full z-10 transition-colors duration-300 ${
                      userType === "owner" ? "text-white" : "text-gray-700"
                    }`}
                  >
                    <FaBuilding className="mr-2" />
                    <span className="font-medium">Owner</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div
                className={`p-4 rounded-md ${
                  userType === "user"
                    ? "bg-blue-50 border-l-4 border-blue-500"
                    : "bg-purple-50 border-l-4 border-purple-500"
                }`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    {userType === "user" ? (
                      <FaUser
                        className={`h-5 w-5 ${
                          userType === "user"
                            ? "text-blue-500"
                            : "text-purple-500"
                        }`}
                      />
                    ) : (
                      <FaBuilding
                        className={`h-5 w-5 ${
                          userType === "user"
                            ? "text-blue-500"
                            : "text-purple-500"
                        }`}
                      />
                    )}
                  </div>
                  <div className="ml-3">
                    <p
                      className={`text-sm ${
                        userType === "user"
                          ? "text-blue-700"
                          : "text-purple-700"
                      }`}
                    >
                      {userType === "user"
                        ? "Login as a user to find your perfect PG accommodation"
                        : "Login as an owner to manage your PG listings and connect with tenants"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {errors.form && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{errors.form}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.password ? "border-red-300" : "border-gray-300"
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    placeholder="••••••"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all transform hover:-translate-y-1 hover:shadow-lg ${
                    userType === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                      : "bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
                  } disabled:opacity-50`}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Don't have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/register"
                  className={`w-full flex justify-center py-3 px-4 border rounded-lg shadow-sm text-sm font-medium transition-all transform hover:-translate-y-1 hover:shadow-md ${
                    userType === "user"
                      ? "border-blue-300 text-blue-600 hover:bg-blue-50"
                      : "border-purple-300 text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  Register for FindMyPG
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
