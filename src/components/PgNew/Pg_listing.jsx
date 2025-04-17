import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Star,
  ChevronRight,
  MapPin,
  Users,
  Home,
  DollarSign,
  Clock,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
// Mock data for PG listings
// const pgListings = [
//   {
//     id: "1",
//     name: "Sunshine PG",
//     address: "123 Park Street, Green Park, New Delhi",
//     rating: 4.5,
//     image:
//       "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     images: [
//       "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       "https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     ],
//     amenities: ["WiFi", "AC", "Food", "Laundry"],
//     price: "₹8,000 - ₹12,000",
//     availability: "5 rooms available",
//     description:
//       "A premium PG accommodation offering comfortable living spaces with modern amenities. Located in a peaceful neighborhood with easy access to public transportation.",
//     pg_facilities: {
//       food: true,
//       free_wifi: true,
//       library: false,
//       parking: true,
//       lift: true,
//       houseKeeping: true,
//       daily_cleaning: true,
//       tv_lounge: true,
//       laundary: true,
//       ironing: false,
//       kitchen: true,
//       dining_Area: true,
//       gym: false,
//       ground: false,
//       cafeteria: false,
//       swimming_pool: false,
//       game_zone: false,
//       cab_facility: false,
//       water: true,
//       electricity: true,
//       hot_water: true,
//       ro_purifier: true,
//       water_Cooler: false,
//       cctv: true,
//       security_warden: true,
//       medical_services: false,
//     },
//     rules_in_pg: {
//       visitor_allowed: true,
//       non_veg: false,
//       other_gender: false,
//       smoking: false,
//       drinking: false,
//       party: false,
//       gate_close_time: "10:00 PM",
//     },
//     other_charges: {
//       electricity: "As per usage",
//       laundary: "₹500 per month",
//       food: "₹3500 per month",
//       deposit_amount: "₹10000",
//       refundable: "Yes",
//       notice_period: "1 month",
//     },
//     rooms: [
//       {
//         id: "101",
//         room_type: "Single",
//         no_of_people_in_one_room: "1",
//         room_size: "100 sq ft",
//         person_type: "Student",
//         gender: "Male",
//         no_of_rooms: "5",
//         rent: "₹8000",
//         image:
//           "https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=6000",
//         images: [
//           "https://images.pexels.com/photos/18285930/pexels-photo-18285930/free-photo-of-interior-of-a-luxurious-bedroom.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           "https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           "https://images.pexels.com/photos/7606067/pexels-photo-7606067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         ],
//         room_facilities: {
//           ac: false,
//           tv: false,
//           wifi: true,
//           fridge: false,
//           attached_bathroom: true,
//           attached_toilets: true,
//           balcony: false,
//           wardrobe: true,
//           safety_locker: false,
//           study_table: true,
//           mattress: true,
//           bed_sheets: true,
//           pillows: true,
//         },
//       },
//       {
//         id: "102",
//         room_type: "Double Sharing",
//         no_of_people_in_one_room: "2",
//         room_size: "150 sq ft",
//         person_type: "Working Professional",
//         gender: "Female",
//         no_of_rooms: "3",
//         rent: "₹6000",
//         image:
//           "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         images: [
//           "https://images.pexels.com/photos/18285930/pexels-photo-18285930/free-photo-of-interior-of-a-luxurious-bedroom.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           "https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           "https://images.pexels.com/photos/7606067/pexels-photo-7606067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         ],
//         room_facilities: {
//           ac: true,
//           tv: true,
//           wifi: true,
//           fridge: false,
//           attached_bathroom: true,
//           attached_toilets: true,
//           balcony: true,
//           wardrobe: true,
//           safety_locker: true,
//           study_table: true,
//           mattress: true,
//           bed_sheets: true,
//           pillows: true,
//         },
//       },
//     ],
//   },
//   {
//     id: "2",
//     name: "Comfort Stay PG",
//     address: "456 Main Road, Koramangala, Bangalore",
//     rating: 4.2,
//     image: "/placeholder.svg?height=200&width=300",
//     images: [
//       "/placeholder.svg?height=400&width=600&text=Room1",
//       "/placeholder.svg?height=400&width=600&text=Room2",
//       "/placeholder.svg?height=400&width=600&text=Room3",
//     ],
//     amenities: ["WiFi", "Food", "Security", "Parking"],
//     price: "₹7,000 - ₹10,000",
//     availability: "3 rooms available",
//     description:
//       "A cozy PG accommodation in the heart of Koramangala. Perfect for working professionals and students.",
//     pg_facilities: {
//       food: true,
//       free_wifi: true,
//       library: false,
//       parking: true,
//       lift: false,
//       houseKeeping: true,
//       daily_cleaning: true,
//       tv_lounge: false,
//       laundary: true,
//       ironing: false,
//       kitchen: true,
//       dining_Area: true,
//       gym: false,
//       ground: false,
//       cafeteria: false,
//       swimming_pool: false,
//       game_zone: false,
//       cab_facility: false,
//       water: true,
//       electricity: true,
//       hot_water: true,
//       ro_purifier: true,
//       water_Cooler: false,
//       cctv: true,
//       security_warden: true,
//       medical_services: false,
//     },
//     rooms: [
//       {
//         id: "201",
//         room_type: "Single",
//         no_of_people_in_one_room: "1",
//         room_size: "90 sq ft",
//         person_type: "Working Professional",
//         gender: "Male",
//         no_of_rooms: "2",
//         rent: "₹7000",
//         image: "/placeholder.svg?height=200&width=300",
//         room_facilities: {
//           ac: false,
//           tv: false,
//           wifi: true,
//           fridge: false,
//           attached_bathroom: true,
//           attached_toilets: true,
//           balcony: false,
//           wardrobe: true,
//           safety_locker: false,
//           study_table: true,
//           mattress: true,
//           bed_sheets: true,
//           pillows: true,
//         },
//       },
//       {
//         id: "202",
//         room_type: "Triple Sharing",
//         no_of_people_in_one_room: "3",
//         room_size: "200 sq ft",
//         person_type: "Student",
//         gender: "Male",
//         no_of_rooms: "1",
//         rent: "₹5000",
//         image: "/placeholder.svg?height=200&width=300",
//         room_facilities: {
//           ac: true,
//           tv: true,
//           wifi: true,
//           fridge: false,
//           attached_bathroom: true,
//           attached_toilets: true,
//           balcony: false,
//           wardrobe: true,
//           safety_locker: false,
//           study_table: true,
//           mattress: true,
//           bed_sheets: true,
//           pillows: true,
//         },
//       },
//     ],
//   },
//   {
//     id: "3",
//     name: "Urban Living PG",
//     address: "789 College Road, Viman Nagar, Pune",
//     rating: 4.0,
//     image: "/placeholder.svg?height=200&width=300",
//     images: [
//       "/placeholder.svg?height=400&width=600&text=Room1",
//       "/placeholder.svg?height=400&width=600&text=Room2",
//       "/placeholder.svg?height=400&width=600&text=Room3",
//     ],
//     amenities: ["WiFi", "Gym", "Food", "TV Room"],
//     price: "₹9,000 - ₹15,000",
//     availability: "2 rooms available",
//     description:
//       "Modern PG accommodation with premium amenities. Located near major IT parks and educational institutions.",
//     pg_facilities: {
//       food: true,
//       free_wifi: true,
//       library: true,
//       parking: true,
//       lift: true,
//       houseKeeping: true,
//       daily_cleaning: true,
//       tv_lounge: true,
//       laundary: true,
//       ironing: true,
//       kitchen: true,
//       dining_Area: true,
//       gym: true,
//       ground: false,
//       cafeteria: true,
//       swimming_pool: false,
//       game_zone: true,
//       cab_facility: true,
//       water: true,
//       electricity: true,
//       hot_water: true,
//       ro_purifier: true,
//       water_Cooler: true,
//       cctv: true,
//       security_warden: true,
//       medical_services: true,
//     },
//     rooms: [
//       {
//         id: "301",
//         room_type: "Premium Single",
//         no_of_people_in_one_room: "1",
//         room_size: "120 sq ft",
//         person_type: "Working Professional",
//         gender: "Any",
//         no_of_rooms: "1",
//         rent: "₹15000",
//         image: "/placeholder.svg?height=200&width=300",
//         room_facilities: {
//           ac: true,
//           tv: true,
//           wifi: true,
//           fridge: true,
//           attached_bathroom: true,
//           attached_toilets: true,
//           balcony: true,
//           wardrobe: true,
//           safety_locker: true,
//           study_table: true,
//           mattress: true,
//           bed_sheets: true,
//           pillows: true,
//         },
//       },
//       {
//         id: "302",
//         room_type: "Double Sharing",
//         no_of_people_in_one_room: "2",
//         room_size: "160 sq ft",
//         person_type: "Student",
//         gender: "Female",
//         no_of_rooms: "1",
//         rent: "₹9000",
//         image: "/placeholder.svg?height=200&width=300",
//         room_facilities: {
//           ac: true,
//           tv: true,
//           wifi: true,
//           fridge: false,
//           attached_bathroom: true,
//           attached_toilets: true,
//           balcony: false,
//           wardrobe: true,
//           safety_locker: true,
//           study_table: true,
//           mattress: true,
//           bed_sheets: true,
//           pillows: true,
//         },
//       },
//     ],
//   },
// ];

function ImageGallery({ images, autoRotate = true }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (autoRotate && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setLoading(true);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images, autoRotate]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
    setLoading(true);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    setLoading(true);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        )}
        <img
          src={images[currentImage] || "/placeholder.svg"}
          alt="PG View"
          fill
          className="object-cover transition-transform duration-300 w-full"
          onLoad={() => setLoading(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-all"
          onClick={prevImage}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-all"
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto p-1">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative aspect-video w-20 flex-shrink-0 overflow-hidden rounded-md transition-all ${
              currentImage === index
                ? "ring-2 ring-blue-500 ring-offset-2"
                : "opacity-70 hover:opacity-100"
            }`}
            onClick={() => {
              setCurrentImage(index);
              setLoading(true);
            }}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`PG View ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function PgDetailView({ pg, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showRoomFacilities, setShowRoomFacilities] = useState({});
  const navigate = useNavigate();

  const handleManagePG = () => {
    navigate(`/owner-dashboard/pg/${pg.pg_id}`);
  };

  const handleToggle = (roomId) => {
    setShowRoomFacilities((prev) => ({
      ...prev,
      [roomId]: !prev[roomId],
    }));
  };

  const convertTime = (value) => {
    const [hour, minute] = value.split(":").map(Number);
    const isPM = hour >= 12;
    const adjustedHour = isPM ? hour - 12 : hour;
    const formattedTime = `${adjustedHour}:${minute
      .toString()
      .padStart(2, "0")} ${isPM ? "PM" : "AM"}`;
    return formattedTime;
  };

  return (
    <div className="fixed top-14 inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        <button
          className="absolute right-4 top-4 rounded-full bg-gray-200 p-2 hover:bg-gray-300 transition-colors z-10"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">{pg.pg_name}</h2>
            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <MapPin className="h-4 w-4" />
              <span>{pg.address}</span>
            </div>
          </div>

          <ImageGallery images={pg.images} />

          <div className="mt-6">
            <div className="flex border-b border-gray-300">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "overview"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "facilities"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("facilities")}
              >
                Facilities
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "rules"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("rules")}
              >
                Rules
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "charges"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("charges")}
              >
                Charges
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "rooms"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("rooms")}
              >
                Rooms
              </button>
            </div>

            <div className="py-4">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <p className="text-gray-700">{pg.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600">Price Range</p>
                        <p className="font-medium">{pg.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600">Availability</p>
                        <p className="font-medium">
                          {pg.availability} rooms available
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-sm text-gray-600">Rating</p>
                        <p className="font-medium">{pg.rating}/5</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600">For</p>
                        <p className="font-medium">
                          {pg.rooms.some((r) => r.gender === "Male") && "Male"}

                          {pg.rooms.some((r) => r.gender === "Male") &&
                            pg.rooms.some((r) => r.gender === "Female") &&
                            " & "}
                          {pg.rooms.some((r) => r.gender === "Female") &&
                            "Female"}
                          {pg.rooms.some((r) => r.gender === "Any") && "Any"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {pg.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "facilities" && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Object.entries(pg.pg_facilities).map(([key, value]) => (
                    <div
                      key={key}
                      className={`flex items-center gap-2 rounded-lg p-3 ${
                        value == 1 ? "bg-blue-50" : "bg-gray-100"
                      }`}
                    >
                      {value == 1 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <span className="capitalize">
                        {key.replace(/_/g, " ")}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "rules" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.entries(pg.rules_in_pg)
                      .filter(
                        ([key]) =>
                          key !== "gate_close_time" &&
                          key !== "rule_id" &&
                          key !== "pg_id"
                      )
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className={`flex items-center gap-2 rounded-lg p-3 ${
                            value == 1 ? "bg-blue-50" : "bg-gray-100"
                          }`}
                        >
                          {value == 1 ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-blue-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                          <span className="capitalize">
                            {key.replace(/_/g, " ")}
                          </span>
                        </div>
                      ))}
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Gate Close Time</p>
                      <p className="font-medium">
                        {convertTime(pg.rules_in_pg.gate_close_time)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "charges" && (
                <div className="grid gap-4 md:grid-cols-2">
                  {Object.entries(pg.other_charges)
                    .filter(([key]) => key !== "charge_id" && key !== "pg_id")
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="p-3 rounded-lg bg-gray-50 border border-gray-300"
                      >
                        <p className="text-sm text-gray-600 capitalize">
                          {key.replace(/_/g, " ")}
                        </p>
                        <p className="font-medium">{value}</p>
                      </div>
                    ))}
                </div>
              )}

              {activeTab === "rooms" && (
                <div className="space-y-6">
                  {pg.rooms.map((room) => (
                    <div
                      key={room.room_id}
                      className="border border-gray-300 rounded-lg overflow-hidden"
                    >
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="relative aspect-auto">
                          <div className="relative w-full h-full">
                            <RoomImageCarousel room={room} />
                          </div>
                        </div>
                        <div className="p-4 md:col-span-2">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold">
                              {room.room_type}
                            </h3>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-y-2">
                            <div className="flex items-center gap-1">
                              <BsFillDoorOpenFill className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">
                                {room.no_of_rooms} Room
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Home className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">
                                {room.room_size} sq ft
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                              </svg>
                              <span className="text-sm">
                                {room.person_type}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-sm">{room.gender}</span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">
                              Room Facilities
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {(showRoomFacilities[room.room_id]
                                ? Object.entries(room.room_facilities).filter(
                                    ([key, value]) =>
                                      key !== "room_facility_id" &&
                                      key !== "room_id" &&
                                      value != 0
                                  )
                                : Object.entries(room.room_facilities)
                                    .filter(
                                      ([key, value]) =>
                                        key !== "room_facility_id" &&
                                        key !== "room_id" &&
                                        value != 0
                                    )
                                    .slice(0, 6)
                              ).map(([key]) => (
                                <span
                                  key={key}
                                  className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700"
                                >
                                  {key.replace(/_/g, " ")}
                                </span>
                              ))}
                              {Object.entries(room.room_facilities).filter(
                                ([_, value]) => value == 1
                              ).length > 6 &&
                                !showRoomFacilities[room.room_id] && (
                                  <button
                                    onClick={() => handleToggle(room.room_id)}
                                    className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 cursor-pointer"
                                  >
                                    +
                                    {Object.entries(
                                      room.room_facilities
                                    ).filter(
                                      ([key, value]) =>
                                        key !== "room_facility_id" &&
                                        key !== "room_id" &&
                                        value != 0
                                    ).length - 6}{" "}
                                    more
                                  </button>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
              onClick={handleManagePG}
            >
              Manage PG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoomImageCarousel({ room }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (room.images && room.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % room.images.length);
        setLoading(true);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [room.images]);

  const goToImage = (index, e) => {
    e.stopPropagation();
    setCurrentImage(index);
    setLoading(true);
  };

  return (
    <>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        </div>
      )}
      <img
        src={
          room.images && room.images.length > 0
            ? room.images[currentImage]
            : room.image || "/placeholder.svg"
        }
        alt={room.room_type}
        fill
        className="aspect-video h-full"
        onLoad={() => setLoading(false)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {room.images && room.images.length > 1 && (
        <>
          {/* Image indicator dots */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {room.images.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 w-1.5 rounded-full transition-all ${
                  currentImage === index ? "bg-white w-3" : "bg-white/60"
                }`}
                onClick={(e) => goToImage(index, e)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-medium">
        ₹{room.rent}/month
      </div>
    </>
  );
}

function PgCard({ pg }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [amenities, setAmenities] = useState([]);
  // console.log(pg);
  useEffect(() => {
    const trueFacilities = Object.entries(pg.pg_facilities)
      .filter(([_, value]) => value === "1") // Select only "1" (true values)
      .slice(0, 4)
      .map(([key]) => key.replace(/_/g, " "));

    setAmenities(trueFacilities);
  }, [pg.pg_facilities]);
  useEffect(() => {
    if (pg.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % pg.images.length);
        setLoading(true);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [pg.images]);

  const goToImage = (index, e) => {
    e.stopPropagation();
    setCurrentImage(index);
    setLoading(true);
  };

  return (
    <div className="group overflow-hidden rounded-lg bg-white ">
      <div className="relative h-60 cursor-pointer">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          </div>
        )}
        <img
          src={pg.images[currentImage] || "/placeholder.svg"}
          alt={pg.pg_name}
          fill
          className="aspect-video h-full transition-transform duration-300 group-hover:scale-101"
          onLoad={() => setLoading(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {pg.images.length > 1 && (
          <>
            {/* Image indicator dots */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {pg.images.map((_, index) => (
                <button
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full transition-all ${
                    currentImage === index ? "bg-white w-3" : "bg-white/60"
                  }`}
                  onClick={(e) => goToImage(index, e)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between text-white">
            <h3 className="font-semibold">{pg.pg_name}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span>{pg.rating}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <p className="text-sm truncate">{pg.address}</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {amenities.map((amenity) => (
            <span
              key={amenity}
              className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800"
            >
              {amenity}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-blue-600">{pg.price}</span>
          <span className="text-gray-600">
            {pg.availability} rooms available
          </span>
        </div>
      </div>
    </div>
  );
}

export function PgListing() {
  const [selectedPg, setSelectedPg] = useState(null);
  const [pgListings, setPgListings] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(
    (resolve) => {
      getPG_Details();
      setTimeout(resolve, 1500);
    },
    [true]
  );
  const getPG_Details = async () => {
    try {
      const pgData = await axios.get(
        "https://findmypg-i01x.onrender.com/api/getPG_Details",
        {
          headers: {
            Owner_id: user.id,
          },
        }
      );
      console.log(pgData.data);
      if (pgData.data) {
        setPgListings(pgData.data.owner);
      }
    } catch (error) {
      console.log("Error logging in.", error);
    }
  };

  console.log(pgListings);
  const handleViewDetails = (pg) => {
    setSelectedPg(pg);
  };

  const handleManagePG = (id) => {
    navigate(`/owner-dashboard/pg/${id}`);
  };

  return (
    <div className="space-y-6 ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your PG Listings</h2>
        <Link
          to="/owner-dashboard/add-pg"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
          replace
        >
          <FaPlus className="mr-2 h-3 w-3" />
          Add New PG
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pgListings.map((pg) => (
          <div
            key={pg.pg_id}
            onClick={() => handleViewDetails(pg)}
            className="shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
          >
            <PgCard pg={pg} />
            <div className=" p-4 border-t  border-blue-500 flex justify-between">
              <button
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetails(pg);
                }}
              >
                View Details
                <ChevronRight className="ml-1 h-4 w-4" />
              </button>
              <button
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleManagePG(pg.pg_id);
                }}
              >
                Manage
                <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPg && (
        <PgDetailView pg={selectedPg} onClose={() => setSelectedPg(null)} />
      )}
    </div>
  );
}
