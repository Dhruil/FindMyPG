"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FaStar,
  FaMapMarkerAlt,
  FaWifi,
  FaUtensils,
  FaParking,
  FaBroom,
  FaTint,
  FaBolt,
  FaVideo,
} from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addDetails, removeDetails } from "../../utils/pgSlice";
import SaveButton from "./SaveButton";
import { useAuth } from "../context/AuthContext";
// Sample data based on the provided JSON
// const samplePGs = [
//   {
//     pg_id: "266307108",
//     pg_name: "South Delhi Boys PG",
//     address: "MAIN 118, IGNOU Main Rd, near HDFC BANK, Saket, New Delhi, Delhi, 110068",
//     amenities: ["food", "free_wifi", "parking", "daily_cleaning", "_24_x_7_water", "_24_x_7_electricity"],
//     price: "₹2000 - ₹15000",
//     availability: 7,
//     rating: 4.2,
//     images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop", "/pgs/south-delhi-pg2.jpg", "/pgs/south-delhi-pg3.jpg"],
//     city: "New Delhi",
//     state: "Delhi",
//     gender: "Male",
//   },
//   {
//     pg_id: "164117399",
//     pg_name: "Student Haven",
//     address: "Green Residency, College Road, Koramangala, Bangalore, Karnataka, 560034",
//     amenities: ["food", "free_wifi", "daily_cleaning", "cctv"],
//     price: "₹6000 - ₹10000",
//     availability: 3,
//     rating: 4.2,
//     images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop", "/pgs/pg2-room.jpg", "/pgs/pg2-common.jpg"],
//     city: "Bangalore",
//     state: "Karnataka",
//     gender: "Female",
//   },
//   {
//     pg_id: "164117400",
//     pg_name: "Urban Living PG",
//     address: "Metro Apartments, MG Road, Gurgaon, Delhi, 110001",
//     amenities: ["free_wifi", "parking", "hot_water", "cctv"],
//     price: "₹7000 - ₹12000",
//     availability: 2,
//     rating: 4.7,
//     images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop", "/pgs/pg3-room.jpg", "/pgs/pg3-common.jpg"],
//     city: "Delhi",
//     state: "Delhi",
//     gender: "Male",
//   },
//   {
//     pg_id: "164117401",
//     pg_name: "Serene Stay",
//     address: "Peaceful Homes, Lake Road, Banjara Hills, Hyderabad, Telangana, 500034",
//     amenities: ["food", "free_wifi", "parking", "_24_x_7_electricity"],
//     price: "₹5500 - ₹9000",
//     availability: 4,
//     rating: 4.0,
//     images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop"],
//     city: "Hyderabad",
//     state: "Telangana",
//     gender: "Any",
//   },
// ]

const amenityIcons = {
  food: <FaUtensils className="text-orange-500" />,
  free_wifi: <FaWifi className="text-blue-500" />,
  parking: <FaParking className="text-gray-500" />,
  daily_cleaning: <FaBroom className="text-green-500" />,
  _24_x_7_water: <FaTint className="text-blue-400" />,
  _24_x_7_electricity: <FaBolt className="text-yellow-500" />,
  hot_water: <FaTint className="text-red-400" />,
  cctv: <FaVideo className="text-purple-500" />,
};

function CityName() {
  const { name } = useParams();
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [samplePGs, setSamplePGs] = useState([]);
  const { isAuthenticated, user } = useAuth();
  const pgData = useSelector((store) => store.pgDetails.details);
  console.log(pgData);

  useEffect(() => {
      if (pgData && pgData.length > 0) {
      setSamplePGs(pgData[0]);
    }
  }, [pgData]);
  useEffect(() => {
    // In a real app, you would fetch data from an API based on the city name
    // For now, we'll filter the sample data
    window.scrollTo(top);
    const cityName = name
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    console.log(samplePGs);
    const filteredPGs = samplePGs.filter(
      (pg) =>
        pg.city.toLowerCase() === cityName.toLowerCase() ||
        pg.state.toLowerCase() === cityName.toLowerCase()
    );
    console.log("useEffect");
    setTimeout(() => {
      setPgs(filteredPGs);
      setLoading(false);
    }, 500);
  }, [name, samplePGs]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const cityName = name
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mt-15 mx-auto px-15 py-8">
        <div className="mb-8">
          <Link
            to="/"
            className="text-blue-600 hover:underline mb-4 inline-block"
          >
            <span className="flex items-center gap-2">
              <FaArrowLeftLong />
              Back to Home
            </span>
          </Link>

          <h1 className="text-3xl font-bold mb-2">
            PG Accommodations in {cityName}
          </h1>
          <p className="text-gray-600">
            {pgs.length} PG{pgs.length !== 1 ? "s" : ""} available in {cityName}
          </p>
        </div>

        {pgs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold mb-2">
              No PGs Found in {cityName}
            </h3>
            <p className="text-gray-600 mb-4">Try searching in another city</p>
            <Link to="/search">
              <Button className=" p-5 border bg-black text-white cursor-pointer">
                Search PGs
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pgs.map((pg) => (
              <Link to={`/pg/${pg.pg_id}`} key={pg.pg_id}>
                <Card className="overflow-hidden p-0  space-y-[-1em] h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-56">
                    <img
                      src={
                        pg.images[0] || `/placeholder.svg?height=200&width=300`
                      }
                      alt={pg.pg_name}
                      className="w-full h-full object-cover"
                    />
                    {pg.rating && (
                      <div className="absolute bottom-2 right-2 bg-white rounded-full px-2 py-1 flex items-center">
                        <FaStar className="text-yellow-500 mr-1" />
                        <span className="text-sm font-bold">{pg.rating}</span>
                      </div>
                    )}
                    {isAuthenticated && user.user_id && (
                      <div className="absolute top-2 right-2">
                        <SaveButton
                          pgId={pg.pg_id}
                          pgName={pg.pg_name}
                          address={pg.address}
                          image={pg.images[0]}
                          price={pg.price}
                        />
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2">
                      <Badge
                        className={`${
                          pg.rooms
                            ? pg.rooms.some((r) => r.gender === "Any") ||
                              (pg.rooms.some((r) => r.gender === "Male") &&
                                pg.rooms.some((r) => r.gender === "Female"))
                              ? "bg-purple-500"
                              : pg.rooms.some((r) => r.gender === "Female")
                              ? "bg-pink-500"
                              : pg.rooms.some((r) => r.gender === "Male")
                              ? "bg-blue-500"
                              : "bg-red-500"
                            : "bg-purple-500" // default color when pg.rooms is empty
                        } text-white`}
                      >
                        {pg.rooms
                          ? pg.rooms.some((r) => r.gender === "Any") ||
                            (pg.rooms.some((r) => r.gender === "Male") &&
                              pg.rooms.some((r) => r.gender === "Female"))
                            ? "Male/Female"
                            : pg.rooms.some((r) => r.gender === "Female")
                            ? "Female Only"
                            : pg.rooms.some((r) => r.gender === "Male")
                            ? "Male Only"
                            : "No rooms available"
                          : "No rooms available"}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1 truncate">
                      {pg.pg_name}
                    </h3>
                    <div className="flex items-start mb-2">
                      <FaMapMarkerAlt className="text-red-500 mt-1 text-sm mr-1 flex-shrink-0" />
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {pg.address}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {pg.amenities.slice(0, 3).map((amenity) => (
                        <Badge
                          key={amenity}
                          variant="outline"
                          className="flex items-center gap-1 border-gray-300"
                        >
                          {amenityIcons[amenity]}
                          <span>{amenity.replace(/_/g, " ")}</span>
                        </Badge>
                      ))}
                      {pg.amenities.length > 3 && (
                        <Badge variant="outline" className="border-gray-300">
                          +{pg.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-blue-600">{pg.price}</p>
                      <Badge className="bg-green-100 px-3 py-1 rounded-2xl text-green-800 hover:bg-green-100">
                        {pg.availability} rooms available
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default CityName;
