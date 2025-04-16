import Navbar from "./components/Pg/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Pg/Home";
import OwnerDashboard from "./components/Owner";
import { AddPG } from "./components/PgNew/AddPG";
import { AuthProvider } from "./components/context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { PgDetails } from "./components/PgNew/PGDetails";
import { AddRoom } from "./components/PgNew/AddRoom";
import { Provider } from "react-redux";
import appstore from "./utils/appstore";
import SearchPage from "./components/Pg/SearchPage";
import PGDetailsPage from "./components/Pg/PgDetails";
import CityName from "./components/Pg/CityName";
import CitiesPage from "./components/Pg/CitiesPage";
import LoginPage from "./components/PgNew/LoginPage";
import RegisterPage from "./components/PgNew/RegisterPage";
import { useEffect } from "react";
import UserDashboard from "./components/PgNew/UserDashboard";
import OwnerDashbaoard from "./components/Pg/OwnerDashbaoard";
import SavedPGDetails from "./fetching";
const App = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Provider store={appstore}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<SavedPGDetails />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/pg/:id" element={<PGDetailsPage />} />
              <Route path="/cities" element={<CitiesPage />} />
              <Route path="/city/:name" element={<CityName />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              {/* 🔒 PROTECTED ROUTES (Only accessible after login) */}

              <Route element={<PrivateRoute />}>
                <Route path="/owner-dashboard" element={<OwnerDashbaoard />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/owner-dashboard/add-pg" element={<AddPG />} />
                <Route path="/owner-dashboard/pg/:id" element={<PgDetails />} />
                <Route
                  path="/owner-dashboard/pg/:id/add-room"
                  element={<AddRoom />}
                />
              </Route>
            </Routes>
            <Footer />
          </Provider>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
