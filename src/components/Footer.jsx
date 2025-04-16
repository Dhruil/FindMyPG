import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FindMyPG</h3>
            <p className="mb-4">
              Your trusted platform for finding the perfect PG accommodation
              across India.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-white hover:text-blue-400">
                <FaFacebook size={20} />
              </Link>
              <Link to="#" className="text-white hover:text-blue-400">
                <FaTwitter size={20} />
              </Link>
              <Link to="#" className="text-white hover:text-blue-400">
                <FaInstagram size={20} />
              </Link>
              <Link to="#" className="text-white hover:text-blue-400">
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-blue-400">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/cities" className="hover:text-blue-400">
                  Cities
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-blue-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Popular Cities</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/city/new-delhi" className="hover:text-blue-400">
                  New Delhi
                </Link>
              </li>
              <li>
                <Link to="/city/mumbai" className="hover:text-blue-400">
                  Mumbai
                </Link>
              </li>
              <li>
                <Link to="/city/bengaluru" className="hover:text-blue-400">
                  Bengaluru
                </Link>
              </li>
              <li>
                <Link to="/city/ahmedabad" className="hover:text-blue-400">
                  Ahmedabad
                </Link>
              </li>
              <li>
                <Link to="/city/chennai" className="hover:text-blue-400">
                  Chennai
                </Link>
              </li>
            </ul>
          </div>

          {/* <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <FaMapMarkerAlt className="mr-2" /> 123 Main Street, New Delhi
            </li>
            <li className="flex items-center">
              <FaPhone className="mr-2" /> +91 1234567890
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" /> info@findmypg.com
            </li>
          </ul>
        </div> */}

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2 mb-5" /> 205 Ashram Road,
                Navrangpura, Ahmedabad, Gujarat
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2" /> +91 9876543210
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" /> support@findmypg.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} FindMyPG. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
