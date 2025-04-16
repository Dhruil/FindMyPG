import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaHome,
  FaPhone,
  FaBuilding,
  FaShieldAlt,
} from "react-icons/fa";
import axios from "axios";
function RegisterPage() {
  const [userType, setUserType] = useState("user"); // 'user' or 'owner'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Basic Info, 2: Password
  const navigate = useNavigate();
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  };

  const handleNextStep = () => {
    // Validate first step fields
    const newErrors = {};

    if (!name) {
      newErrors.name = "Name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Move to next step
    setStep(2);
    setErrors({});
  };

  const handlePrevStep = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password fields
    const newErrors = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Show loading state
    setIsLoading(true);

    try {
      // Here you would implement your actual signup logic
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.post(
        "https://findmypg-i01x.onrender.com/api/register",
        {
          userType,
          name,
          email,
          phone,
          password,
        }
      );
      const data = response.data;
      console.log(data);
      // If the response is successful, we'll redirect to the login page
      if (data.status === "success") {
        navigate("/login");
      }
      // If the response is not successful, we'll display an error message
      else {
        setErrors({ form: data.message });
      }
    } catch (error) {
      setErrors({ form: "Registration failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // Background images for different user types
  const backgroundImages = {
    user: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=2070&auto=format&fit=crop",
    owner:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop",
  };

  return (
    <>
      <div className="min-h-screen  mt-[4rem] flex flex-col md:flex-row">
        {/* Left side - Image (full height on desktop, partial on mobile) */}
        <div
          className="md:w-1/2 h-40 md:h-auto bg-cover bg-center relative transition-all duration-700"
          style={{
            backgroundImage: `url("${backgroundImages[userType]}")`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
            <div className="mb-4 bg-white/10 backdrop-blur-md p-5 rounded-full">
              {userType === "user" ? (
                <FaHome className="h-12 w-12 text-white drop-shadow-lg" />
              ) : (
                <FaBuilding className="h-12 w-12 text-white drop-shadow-lg" />
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center drop-shadow-lg">
              {userType === "user"
                ? "Join FindMyPG Today"
                : "List Your Properties"}
            </h1>
            <p className="text-lg text-center max-w-md drop-shadow-md">
              {userType === "user"
                ? "Create an account to find your perfect PG accommodation"
                : "Register as an owner to list your PG properties"}
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="md:w-1/2 bg-white flex flex-col justify-center p-6 md:p-12 lg:p-16">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Register to FindMYPG
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

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step >= 1
                      ? userType === "user"
                        ? "bg-blue-600"
                        : "bg-purple-600"
                      : "bg-gray-300"
                  } text-white font-bold transition-colors duration-300`}
                >
                  1
                </div>
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step >= 2
                      ? userType === "user"
                        ? "bg-blue-600"
                        : "bg-purple-600"
                      : "bg-gray-300"
                  } transition-colors duration-300`}
                ></div>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step >= 2
                      ? userType === "user"
                        ? "bg-blue-600"
                        : "bg-purple-600"
                      : "bg-gray-300"
                  } text-white font-bold transition-colors duration-300`}
                >
                  2
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs font-medium text-gray-500">
                  Basic Information
                </span>
                <span className="text-xs font-medium text-gray-500">
                  Security
                </span>
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

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border ${
                        errors.name ? "border-red-300" : "border-gray-300"
                      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

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
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border ${
                        errors.phone ? "border-red-300" : "border-gray-300"
                      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      placeholder="1234567890"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all transform hover:-translate-y-1 hover:shadow-lg ${
                      userType === "user"
                        ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                        : "bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
                    }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div
                  className={`p-4 rounded-md ${
                    userType === "user"
                      ? "bg-blue-50 border-l-4 border-blue-500"
                      : "bg-purple-50 border-l-4 border-purple-500"
                  }`}
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaShieldAlt
                        className={`h-5 w-5 ${
                          userType === "user"
                            ? "text-blue-500"
                            : "text-purple-500"
                        }`}
                      />
                    </div>
                    <div className="ml-3">
                      <p
                        className={`text-sm ${
                          userType === "user"
                            ? "text-blue-700"
                            : "text-purple-700"
                        }`}
                      >
                        Create a strong password to secure your account
                      </p>
                    </div>
                  </div>
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
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border ${
                        errors.password ? "border-red-300" : "border-gray-300"
                      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      placeholder="••••••"
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border ${
                        errors.confirmPassword
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      placeholder="••••••"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {userType === "owner" && (
                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FaBuilding className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          As a PG owner, you'll be able to list your properties,
                          manage bookings, and connect with potential tenants.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all transform hover:-translate-y-1 hover:shadow-lg ${
                      userType === "user"
                        ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                        : "bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
                    } disabled:opacity-50`}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>
              </form>
            )}

            {step === 1 && (
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Already have an account?
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to="/login"
                    className={`w-full flex justify-center py-3 px-4 border rounded-lg shadow-sm text-sm font-medium transition-all transform hover:-translate-y-1 hover:shadow-md ${
                      userType === "user"
                        ? "border-blue-300 text-blue-600 hover:bg-blue-50"
                        : "border-purple-300 text-purple-600 hover:bg-purple-50"
                    }`}
                  >
                    Log in to your account
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
