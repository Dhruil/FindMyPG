import { useContext } from "react";
import { FaEnvelope, FaLock, FaHome } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const Login = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
   setIsAuthenticated(true); // ✅ Simulate storing a token


      const redirectPath = location.state?.from?.pathname || "/dashboard";
      console.log("🔍 Redirecting to:", redirectPath);
      navigate(redirectPath, { replace: true });

  };

  return (
       <div className="flex items-center justify-center">
         <div className="relative w-full max-w-md p-10 rounded-xl text-center">
           <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-purple-600 flex items-center justify-center rounded-full shadow-lg">
             <FaHome className="text-orange-400 text-5xl" />
           </div>
           <h2 className="mt-16 text-3xl font-bold text-gray-800">Login</h2>
           <form className="mt-6 space-y-4">
             <div className="flex items-center px-4 py-3 bg-gray-100 border-2 border-orange-400 rounded-lg">
               <FaEnvelope className="text-orange-500" />
               <input
                 type="email"
                 placeholder="Email"
                 className="w-full pl-3 focus:outline-none bg-transparent text-orange-900"
               />
             </div>
             <div className="flex items-center px-4 py-3 bg-gray-100 border-2 border-orange-400 rounded-lg">
               <FaLock className="text-orange-500" />
               <input
                 type="password"
                 placeholder="Password"
                 className="w-full pl-3 focus:outline-none bg-transparent text-orange-900"
               />
             </div>
             <button
               onClick={handleLogin}
               className="w-full py-3 mt-4 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition"
             >
               Login
             </button>
           </form>
         </div>
       </div>
  );
};

export default Login;
