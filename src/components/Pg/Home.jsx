import Testimonials from "../Testimonials";
import Why from "../Why";
import HeroSection from "./HeroSection";
import CitiesSection from "./CitiesSection";
import { useDispatch, useSelector } from "react-redux";
import { addDetails, removeDetails } from "../../utils/pgSlice";
import { useEffect } from "react";
import axios from "axios";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(top);
    getPG_Details();
  }, []);
  const getPG_Details = async () => {
    try {
      const pgData = await axios.get(
        "https://findmypg-i01x.onrender.com/api/getData",
        {
          headers: {
            Owner_id: 1,
          },
        }
      );
      console.log(pgData.data);
      if (pgData.data && Array.isArray(pgData.data.owner)) {
        dispatch(removeDetails());
        dispatch(addDetails(pgData.data.owner));
      }
    } catch (error) {
      console.log("Error logging in.", error);
    }
  };
  const data = useSelector((store) => store.pgDetails.details);
  console.log(data);
  return (
    <>
      <HeroSection />
      <CitiesSection />
      <Why />
      <Testimonials />
    </>
  );
};

export default Home;
