import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaWifi,
  FaUtensils,
  FaParking,
  FaBook,
  FaTint,
  FaBolt,
  FaUserShield,
  FaFirstAid,
  FaSnowflake,
  FaTv,
  FaToilet,
  FaWarehouse,
  FaLock,
  FaBed,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaCheck,
  FaTimes,
  FaClock,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaHourglass,
  FaWhatsapp,
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import {
  MdBalcony,
  MdCleaningServices,
  MdDining,
  MdLocalLaundryService,
  MdIron,
  MdOutlineLocalLibrary,
  MdLock,
} from "react-icons/md";
import { GiCooler, GiCctvCamera, GiPillow } from "react-icons/gi";
import { PiElevatorFill } from "react-icons/pi";
import { FaArrowLeftLong, FaKitchenSet } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addDetails, removeDetails } from "../../utils/pgSlice";
import SaveButton from "./SaveButton";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../hooks/use-toast";
import { Lock, LockIcon } from "lucide-react";
import axios from "axios";
// Sample PG data based on the provided JSON
const samplePG = {
  pg_id: "266307108",
  pg_name: "South Delhi Boys PG",
  owner_id: "1",
  address_id: "266307108",
  map_location: "https://maps.app.goo.gl/ac2uj7UxhBFdEDL48",
  description:
    "A premium PG accommodation offering comfortable living spaces with modern amenities. Located in a peaceful neighborhood with easy access to public transportation.",
  rating: "4.2",
  operating_since: "2021-03-09",
  address:
    "MAIN 118, IGNOU Main Rd, near HDFC BANK, Saket, New Delhi, Delhi, 110068",
  amenities: ["food", "free_wifi", "parking", "daily_cleaning"],
  price: "₹2000 - ₹15000",
  availability: 7,
  images: [
    "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ],
  pg_facilities: {
    food: "1",
    free_wifi: "1",
    library: "0",
    parking: "1",
    lift: "0",
    daily_cleaning: "1",
    tv_lounge: "1",
    laundry: "1",
    ironing: "1",
    kitchen: "1",
    dining_Area: "1",
    gym: "0",
    ground: "0",
    cafeteria: "0",
    swimming_pool: "0",
    game_zone: "0",
    cab_facility: "0",
    _24_x_7_water: "1",
    _24_x_7_electricity: "1",
    hot_water: "1",
    ro_purifier: "1",
    water_cooler: "1",
    cctv: "1",
    security_warden: "1",
    medical_services: "0",
  },
  rules_in_pg: {
    rule_id: "5",
    pg_id: "266307108",
    visitor_allowed: "1",
    non_veg: "0",
    other_gender: "0",
    smoking: "0",
    drinking: "0",
    party: "0",
    gate_close_time: "23:00:00",
  },
  other_charges: {
    charge_id: "5",
    pg_id: "266307108",
    electricity: "0",
    laundry: "0",
    food: "0",
    deposit_amount: "10000",
    refundable: "Yes",
    notice_period: "1",
  },
  rooms: [
    {
      room_id: "1",
      pg_id: "266307108",
      room_type: "Double Sharing",
      available_room: "1",
      room_size: "90",
      person_type: "Student",
      gender: "Male",
      no_of_rooms: "5",
      rent: "13000",
      room_facilities: {
        room_facility_id: "1",
        room_id: "1",
        ac: "0",
        tv: "0",
        wifi: "1",
        fridge: "0",
        attached_bathroom: "1",
        attached_toilets: "1",
        balcony: "1",
        wardrobe: "1",
        safety_locker: "1",
        study_table: "1",
        mattress: "1",
        bed_sheets: "1",
        pillows: "1",
      },
      images: [
        "https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=6000",
        "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      ],
    },
    {
      room_id: "2",
      pg_id: "266307108",
      room_type: "Double Sharing",
      available_room: "2",
      room_size: "90",
      person_type: "Job",
      gender: "Male",
      no_of_rooms: "5",
      rent: "15000",
      room_facilities: {
        room_facility_id: "2",
        room_id: "2",
        ac: "1",
        tv: "0",
        wifi: "1",
        fridge: "1",
        attached_bathroom: "1",
        attached_toilets: "1",
        balcony: "0",
        wardrobe: "1",
        safety_locker: "1",
        study_table: "1",
        mattress: "1",
        bed_sheets: "1",
        pillows: "1",
      },
      images: ["/pgs/room2-1.jpg", "/pgs/room2-2.jpg"],
    },
    {
      room_id: "3",
      pg_id: "266307108",
      room_type: "Triple Sharing",
      available_room: "2",
      room_size: "125",
      person_type: "Job",
      gender: "Male",
      no_of_rooms: "7",
      rent: "11000",
      room_facilities: {
        room_facility_id: "3",
        room_id: "3",
        ac: "0",
        tv: "0",
        wifi: "1",
        fridge: "0",
        attached_bathroom: "1",
        attached_toilets: "1",
        balcony: "0",
        wardrobe: "1",
        safety_locker: "1",
        study_table: "1",
        mattress: "1",
        bed_sheets: "1",
        pillows: "1",
      },
      images: ["/pgs/room3-1.jpg"],
    },
    {
      room_id: "4",
      pg_id: "266307108",
      room_type: "Triple Sharing",
      available_room: "1",
      room_size: "130",
      person_type: "Job",
      gender: "Male",
      no_of_rooms: "4",
      rent: "13500",
      room_facilities: {
        room_facility_id: "4",
        room_id: "4",
        ac: "1",
        tv: "0",
        wifi: "1",
        fridge: "1",
        attached_bathroom: "1",
        attached_toilets: "1",
        balcony: "1",
        wardrobe: "1",
        safety_locker: "1",
        study_table: "1",
        mattress: "1",
        bed_sheets: "1",
        pillows: "1",
      },
      images: ["/pgs/room4-1.jpg", "/pgs/room4-2.jpg"],
    },
    {
      room_id: "5",
      pg_id: "266307108",
      room_type: "Triple Sharing",
      available_room: "1",
      room_size: "100",
      person_type: "Any",
      gender: "Male",
      no_of_rooms: "2",
      rent: "2000",
      room_facilities: {
        room_facility_id: "5",
        room_id: "5",
        ac: "0",
        tv: "1",
        wifi: "1",
        fridge: "0",
        attached_bathroom: "0",
        attached_toilets: "1",
        balcony: "0",
        wardrobe: "0",
        safety_locker: "0",
        study_table: "0",
        mattress: "0",
        bed_sheets: "0",
        pillows: "0",
      },
      images: ["/pgs/room5-1.jpg"],
    },
  ],
  residence_name: "MAIN 118",
  street: "IGNOU Main Rd, near HDFC BANK",
  area: "Saket",
  city: "New Delhi",
  state: "Delhi",
  zip: "110068",
  owner: {
    name: "Rahul Sharma",
    phone: "+91 9876543210",
    email: "rahul.sharma@example.com",
    image:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
};

const facilityIcons = {
  food: <FaUtensils />,
  free_wifi: <FaWifi />,
  library: <MdOutlineLocalLibrary />,
  parking: <FaParking />,
  lift: <PiElevatorFill />,
  daily_cleaning: <MdCleaningServices />,
  tv_lounge: <FaTv />,
  laundry: <MdLocalLaundryService />,
  ironing: <MdIron />,
  kitchen: <FaKitchenSet />,
  dining_area: <MdDining />,
  gym: <FaSnowflake />,
  ground: <FaBook />,
  cafeteria: <FaUtensils />,
  swimming_pool: <FaTint />,
  game_zone: <FaTv />,
  cab_facility: <FaUserShield />,
  _24_x_7_water: <FaTint />,
  _24_x_7_electricity: <FaBolt />,
  hot_water: <FaTint />,
  ro_purifier: <FaTint />,
  water_cooler: <GiCooler />,
  cctv: <GiCctvCamera />,
  security_warden: <FaUserShield />,
  medical_services: <FaFirstAid />,
};

const roomFacilityIcons = {
  ac: <FaSnowflake />,
  tv: <FaTv />,
  wifi: <FaWifi />,
  fridge: <FaSnowflake />,
  attached_bathroom: <FaToilet />,
  attached_toilets: <FaToilet />,
  balcony: <MdBalcony />,
  wardrobe: <FaWarehouse />,
  safety_locker: <FaLock />,
  study_table: <FaBook />,
  mattress: <FaBed />,
  bed_sheets: <FaBed />,
  pillows: <GiPillow />,
};

const ruleIcons = {
  visitor_allowed: <FaUser />,
  non_veg: <FaUtensils />,
  other_gender: <FaUser />,
  smoking: <FaSnowflake />,
  drinking: <FaTint />,
  party: <FaTv />,
  gate_close_time: <FaClock />,
};

const chargeIcons = {
  electricity: <FaBolt />,
  laundry: <MdLocalLaundryService />,
  food: <FaUtensils />,
  deposit_amount: <FaMoneyBillWave />,
  refundable: <FaExchangeAlt />,
  notice_period: <FaHourglass />,
};

export default function PGDetailsPage() {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [pgData, setPgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAllFacilitiesMap, setShowAllFacilitiesMaps] = useState({});
  const [bookingForm, setBookingForm] = useState();

  const { toast } = useToast();
  const navigate = useNavigate();
  let samplePG = useSelector((store) => store.pgDetails.details[0]);
  useEffect(() => {
    // In a real app, you would fetch data from an API
    // For now, we'll use the sample data
    console.log(id);
    console.log(samplePG);
    window.scroll(top);
    samplePG = samplePG.filter((pg) => pg.pg_id == id);
    console.log(samplePG);
    if (isAuthenticated) {
      const bookingUserInfo = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        moveInDate: "",
        duration: "12", // Default to 12 months
        specialRequests: "",
      };
      setBookingForm(bookingUserInfo);
    }
    setTimeout(() => {
      setPgData(samplePG[0]);
      setLoading(false);
    }, 1500);
  }, [id]);
  console.log(pgData);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!pgData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">PG Not Found</h2>
          <p className="mb-4">
            The PG you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button className="p-5 border bg-black text-white cursor-pointer">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleBookingFormChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookingSubmit = async () => {
    // Validate form
    if (
      !bookingForm.name ||
      !bookingForm.phone ||
      !bookingForm.gender ||
      !bookingForm.moveInDate
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
      });
      return;
    }

    // Create booking object
    const booking = {
      userId: user.user_id,
      pgId: pgData.pg_id,
      pgName: pgData.pg_name,
      address: pgData.address,
      roomType: selectedRoom.room_type,
      roomId: selectedRoom.room_id,
      amount: `₹${selectedRoom.rent}/month`,
      checkInDate: new Date(bookingForm.moveInDate).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      ),
      // Calculate checkout date based on duration
      checkOutDate: new Date(
        new Date(bookingForm.moveInDate).setMonth(
          new Date(bookingForm.moveInDate).getMonth() +
            Number.parseInt(bookingForm.duration)
        )
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      status: "pending",
      bookingDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      userDetails: {
        name: bookingForm.name,
        email: bookingForm.email,
        phone: bookingForm.phone,
        gender: bookingForm.gender,
      },
      specialRequests: bookingForm.specialRequests,
    };
    console.log(booking);
    // Save to localStorage
    const existingBookings = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );
    localStorage.setItem(
      "bookings",
      JSON.stringify([...existingBookings, booking])
    );

    try {
      const response = await axios.post(
        "https://findmypg-i01x.onrender.com/api/bookRoom",
        booking
      );
      if (response.data.success) {
        toast({
          title: "Booking Successful",
          description: "Your booking request has been submitted successfully!",
        });
      } else {
        toast({
          title: "Booking failed",
          description: response.data.message,
        });
      }
    } catch (error) {
      toast({
        title: "Error booking room",
        description: "Something went wrong. Please try again.",
      });
      console.error("Error booking room:", error);
    }

    // Show success message
    toast({
      title: "Booking Successful",
      description: "Your booking request has been submitted successfully!",
    });

    // Close modal and reset form
    setSelectedRoom(null);
    setBookingForm({
      name: "",
      email: "",
      phone: "",
      gender: "Male",
      moveInDate: "",
      duration: "12",
      specialRequests: "",
    });

    // Redirect to dashboard
    setTimeout(() => {
      navigate("/user-dashboard?tab=bookings");
    }, 1500);
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
    <div className="flex flex-col min-h-screen ">
      <main className="flex-grow container mx-auto mt-15 px-15 py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="text-blue-600 hover:underline mb-4 inline-block"
          >
            <span className="flex items-center gap-2">
              <FaArrowLeftLong />
              Back to Home
            </span>
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">{pgData.pg_name}</h1>
              <div className="flex items-center mt-2">
                <FaMapMarkerAlt className="text-red-500 mr-2" />
                <span className="text-gray-600">{pgData.address}</span>
              </div>
            </div>

            <div className="flex items-center">
              {isAuthenticated && user.user_id && (
                <div className="flex items-center px-2  rounded-full">
                  <SaveButton
                    pgId={pgData.pg_id}
                    pgName={pgData.pg_name}
                    address={pgData.address}
                    image={pgData.images[0]}
                    price={pgData.price}
                  />
                </div>
              )}
              {pgData.rating && (
                <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full mr-4">
                  <FaStar className="text-yellow-500 mr-1" />
                  <span className="font-bold">{pgData.rating}</span>
                </div>
              )}
              <Badge className="bg-green-100 p-2 px-3 rounded-2xl font-bold text-green-800">
                {pgData.availability} rooms available
              </Badge>
            </div>
          </div>
        </div>

        {/* PG Images Carousel */}
        <div className="mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {pgData.images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2  lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card className="py-0">
                      <CardContent className="flex aspect-square  items-center justify-center p-0">
                        <img
                          src={image || `/placeholder.svg?height=400&width=600`}
                          alt={`${pgData.pg_name} - Image ${index + 1}`}
                          className="w-full h-full aspect-square rounded-md"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 border-gray-100 bg-gray-100" />
            <CarouselNext className="right-1 border-gray-100 bg-gray-100" />
          </Carousel>
        </div>

        {/* PG Details Tabs */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid grid-cols-5 w-full h-full bg-gray-100">
            <TabsTrigger
              value="overview"
              className="
             data-[state=active]:bg-white data-[state=active]:text-black p-1 text-gray-500 text-md"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="rooms"
              className="
             data-[state=active]:bg-white data-[state=active]:text-black p-1 text-gray-500 text-md"
            >
              Rooms
            </TabsTrigger>
            <TabsTrigger
              value="facilities"
              className="
             data-[state=active]:bg-white data-[state=active]:text-black p-1 text-gray-500 text-md"
            >
              Facilities
            </TabsTrigger>
            <TabsTrigger
              value="rules"
              className="
             data-[state=active]:bg-white data-[state=active]:text-black p-1 text-gray-500 text-md"
            >
              Rules
            </TabsTrigger>
            <TabsTrigger
              value="charges"
              className="
             data-[state=active]:bg-white data-[state=active]:text-black p-1 text-gray-500 text-md"
            >
              Charges
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">About this PG</h3>
                    <p className="text-gray-700 mb-4">{pgData.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FaCalendarAlt className="text-blue-500 mr-3" />
                        <span>
                          Operating since:{" "}
                          {new Date(
                            pgData.operating_since
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-red-500 mr-3" />
                        <a
                          href={pgData.map_location}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View on Google Maps
                        </a>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mt-6 mb-4">
                      Key Amenities
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(pgData.pg_facilities)
                        .filter(([_, value]) => value == 1)
                        .slice(0, 8)
                        .map(([key]) => (
                          <div key={key} className="flex items-center">
                            <span className="text-blue-500 mr-2">
                              {facilityIcons[key]}
                            </span>
                            <span>
                              {key
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* <div>
                    <h3 className="text-xl font-bold mb-4">Owner Details</h3>
                      
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-4">
                        <img
                          src={
                            pgData.owner.image ||
                            `/placeholder.svg?height=100&width=100`
                          }
                          alt={pgData.owner.name}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4
                            className="font-bold"
                          >
                            {isAuthenticated && user.user_id
                              ? pgData.owner.name
                              : (<a className="flex gap-1 items-baseline underline  " href="/login"><MdLock/> Unlock</a>)}
                          </h4>
                          <p className="text-gray-600 text-sm">PG Owner</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center">
                          <FaPhone className="text-green-500 mr-3" />
                          {isAuthenticated && user.user_id ? (
                            <a
                              href={`tel:${pgData.owner.mobile}`}
                              className="hover:underline"
                            >
                              {pgData.owner.mobile}
                            </a>
                          ) : (
                            <div className="blur-sm">Mobile Number</div>
                          )}
                        </div>
                        <div className="flex items-center">
                          <FaEnvelope className="text-blue-500 mr-3" />
                          {isAuthenticated && user.user_id ? (
                            <a
                              href={`mailto:${pgData.owner.email}`}
                              className="hover:underline"
                            >
                              {pgData.owner.email}
                            </a>
                          ) : (
                            <div className="blur-sm">Email Address</div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <Button
                        className="w-full  bg-black text-white cursor-pointer "
                        onClick={() => {
                          if (isAuthenticated) {
                            if (user.user_id) {
                              setShowContactModal(true);
                            } else {
                              alert(
                                "You need to be a registered user to select a room"
                              );
                            }
                          } else {
                            alert("Access denied, please login");
                          }
                        }}
                      >
                        Contact Owner
                      </Button>
                      {isAuthenticated && user.user_id && (
                        <a
                          href={`https://wa.me/${pgData.owner.mobile.replace(
                            /\D/g,
                            ""
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                        >
                          <FaWhatsapp className="mr-2" /> WhatsApp
                        </a>
                      )}
                      {isAuthenticated && !user.user_id && (
                        <div
                          onClick={() =>
                            alert(
                              "You need to be a registered user to select a room"
                            )
                          }
                          className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                        >
                          <FaWhatsapp className="mr-2" /> WhatsApp
                        </div>
                      )}
                      {!isAuthenticated && (
                        <div
                          onClick={() => alert("Access denied, please login")}
                          className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                        >
                          <FaWhatsapp className="mr-2" /> WhatsApp
                        </div>
                      )}
                    </div>
                  </div> */}
                  <div className="relative">
                    <h3 className="text-xl font-bold mb-4">Owner Details</h3>

                    {/* Owner Card */}
                    <div className="bg-gray-50 p-4 rounded-lg relative overflow-hidden">
                      {/* Blur & Overlay if not authenticated */}
                      {((isAuthenticated && !user.user_id) ||
                        !isAuthenticated) && (
                        <div className="absolute inset-0  bg-opacity-70  z-10 flex flex-col justify-center items-center text-center p-4">
                          <p className="text-gray-700 font-semibold mb-2">
                            {isAuthenticated && !user.user_id
                              ? "Please login as User to view owner details"
                              : "Please login to view owner details"}
                          </p>
                          <a
                            href="/login"
                            className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
                          >
                            Login
                          </a>
                        </div>
                      )}

                      <div
                        className={`${
                          (isAuthenticated && !user.user_id) || !isAuthenticated
                            ? "blur-sm pointer-events-none select-none"
                            : ""
                        }`}
                      >
                        <div className="flex items-center mb-4">
                          <img
                            src={
                              pgData.owner.image ||
                              `/placeholder.svg?height=100&width=100`
                            }
                            alt={pgData.owner.name}
                            className="w-16 h-16 rounded-full object-cover mr-4"
                          />
                          <div>
                            <h4 className="font-bold">{pgData.owner.name}</h4>
                            <p className="text-gray-600 text-sm">PG Owner</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center">
                            <FaPhone className="text-green-500 mr-3" />
                            <a
                              href={`tel:${pgData.owner.mobile}`}
                              className="hover:underline"
                            >
                              {pgData.owner.mobile}
                            </a>
                          </div>
                          <div className="flex items-center">
                            <FaEnvelope className="text-blue-500 mr-3" />
                            <a
                              href={`mailto:${pgData.owner.email}`}
                              className="hover:underline"
                            >
                              {pgData.owner.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact and WhatsApp buttons */}
                    <div className="mt-6 space-y-3">
                      <div
                        onClick={() => {
                          if (isAuthenticated && user.user_id) {
                            window.open(
                              `https://wa.me/${pgData.owner.mobile.replace(
                                /\D/g,
                                ""
                              )}`,
                              "_blank"
                            );
                          } else if (isAuthenticated && !user.user_id) {
                            alert(
                              "Please login as User to use WhatsApp feature"
                            );
                          } else {
                            alert("Please login to use WhatsApp feature");
                          }
                        }}
                        className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md cursor-pointer"
                      >
                        <FaWhatsapp className="mr-2" /> WhatsApp
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rooms" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pgData.rooms.map((room) => (
                <Card
                  key={room.room_id}
                  className="overflow-hidden border-0 py-0 h-full flex flex-col shadow-md hover:shadow-lg transition-all"
                >
                  <Carousel className="w-full">
                    <CarouselContent>
                      {room.images.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1 aspect-video">
                            <img
                              src={
                                image || `/placeholder.svg?height=300&width=500`
                              }
                              alt={`Room ${room.room_id} - Image ${index + 1}`}
                              className="w-full h-full object-cover rounded-t-md"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-1" />
                    <CarouselNext className="right-1" />
                  </Carousel>

                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{room.room_type}</h3>
                        <p className="text-gray-600">
                          {room.person_type} · {room.gender} · {room.room_size}{" "}
                          sq.ft
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          ₹{room.rent}
                        </p>
                        <p className="text-sm text-gray-600">per month</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Badge className="bg-green-100 px-3 py-1 rounded-3xl text-green-800">
                        {room.available_room} of {room.no_of_rooms} available
                      </Badge>
                    </div>

                    {/* Improved Facilities Section */}
                    <div className="mb-4 flex-grow">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold">Room Facilities</h4>
                        {(() => {
                          // Get all facilities that are enabled (value === "1")
                          const enabledFacilities = Object.entries(
                            room.room_facilities
                          ).filter(
                            ([key, value]) =>
                              value == 1 &&
                              key !== "room_facility_id" &&
                              key !== "room_id"
                          );

                          if (enabledFacilities.length > 6) {
                            return (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium text-sm"
                                onClick={() =>
                                  setShowAllFacilitiesMaps((prevState) => ({
                                    ...prevState,
                                    [room.room_id]: !prevState[room.room_id],
                                  }))
                                }
                              >
                                {showAllFacilitiesMap[room.room_id]
                                  ? "Show Less"
                                  : "View All"}
                              </Button>
                            );
                          }
                          return null;
                        })()}
                      </div>

                      {(() => {
                        // Get all facilities that are enabled (value === "1")
                        const enabledFacilities = Object.entries(
                          room.room_facilities
                        ).filter(
                          ([key, value]) =>
                            value == 1 &&
                            key !== "room_facility_id" &&
                            key !== "room_id"
                        );

                        // Show first 6 facilities by default
                        const visibleFacilities = showAllFacilitiesMap[
                          room.room_id
                        ]
                          ? enabledFacilities
                          : enabledFacilities.slice(0, 6);

                        return (
                          <div className="grid grid-cols-2 gap-3">
                            {visibleFacilities.map(([key]) => (
                              <div
                                key={key}
                                className="flex items-center bg-gray-50 p-2 rounded-md"
                              >
                                <span className="text-blue-500 mr-2 flex-shrink-0">
                                  {roomFacilityIcons[key]}
                                </span>
                                <span className="text-sm">
                                  {key
                                    .replace(/_/g, " ")
                                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                                </span>
                              </div>
                            ))}

                            {!showAllFacilitiesMap[room.room_id] &&
                              enabledFacilities.length > 6 && (
                                <div
                                  className="flex items-center justify-center bg-blue-50 p-2 rounded-md cursor-pointer hover:bg-blue-100 transition-colors"
                                  onClick={() =>
                                    setShowAllFacilitiesMaps((prevState) => ({
                                      ...prevState,
                                      [room.room_id]: true,
                                    }))
                                  }
                                >
                                  <span className="text-blue-600 text-sm font-medium">
                                    +{enabledFacilities.length - 6} more
                                  </span>
                                </div>
                              )}
                          </div>
                        );
                      })()}
                    </div>

                    <Button
                      className="w-full mt-auto text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                      onClick={() => {
                        if (isAuthenticated) {
                          if (user.user_id) {
                            setSelectedRoom(room);
                          } else {
                            alert(
                              "You need to be a registered user to select a room"
                            );
                          }
                        } else {
                          alert("Access denied, please login");
                        }
                      }}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="facilities" className="mt-6 ">
            <Card>
              <CardContent className="bg-white rounded-lg border-0 p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  PG Facilities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Object.entries(pgData.pg_facilities)
                    .filter(
                      ([key]) => key !== "pg_facility_id" && key !== "pg_id"
                    )
                    .sort((a, b) => b[1] - a[1]) // Sort facilities by value in descending order
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className={`flex items-center p- rounded-lg transition-all  border ${
                          value == 1
                            ? " text-white-800 border-0 "
                            : " text-gray-500 border-0 cursor-not-allowed"
                        }`}
                      >
                        <span
                          className={` mr-2 ${
                            value == 1 ? "text-blue-500" : "text-gray-400"
                          }`}
                        >
                          {facilityIcons[key] ||
                            (value === "1" ? (
                              <FaCheckCircle />
                            ) : (
                              <FaTimesCircle />
                            ))}
                        </span>
                        <span className="font-medium capitalize">
                          {value === 0 && "No "}
                          {key.replace(/_/g, " ")}
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">PG Rules</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* {Object.entries(pgData.rules_in_pg)
                    .filter(([key]) => key !== "rule_id" && key !== "pg_id")
                    .map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        <span className="text-blue-500 mr-2">{ruleIcons[key]}</span>
                        <span>
                          {key === "gate_close_time"
                            ? `Gate Closing Time: ${value}`
                            : `${key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}: ${
                                value === "1" ? (
                                  <span className="text-green-600 flex items-center">
                                    <FaCheck className="mr-1" /> Allowed
                                  </span>
                                ) : (
                                  <span className="text-red-600 flex items-center">
                                    <FaTimes className="mr-1" /> Not Allowed
                                  </span>
                                )
                              }`}
                        </span>
                      </div>
                    ))} */}
                  {Object.entries(pgData.rules_in_pg)
                    .filter(([key]) => key !== "rule_id" && key !== "pg_id")
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className={`flex items-center p- rounded-lg transition-all  border ${
                          value == 1 || key === "gate_close_time"
                            ? " text-white-800 border-0 "
                            : " text-gray-500 border-0 cursor-not-allowed"
                        }`}
                      >
                        <span
                          className={` mr-2 ${
                            value == 1 || key === "gate_close_time"
                              ? "text-blue-500"
                              : "text-gray-400"
                          }`}
                        >
                          {ruleIcons[key]}
                        </span>
                        <span className="font-medium capitalize">
                          {key === "gate_close_time"
                            ? `Gate Closing Time :  ${convertTime(value)} `
                            : `${key
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}   :`}
                        </span>
                        <span className=" ml-2 ">
                          {key === "gate_close_time" ? null : value == 1 ? (
                            <FaCheck />
                          ) : (
                            <FaTimes />
                          )}
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="charges" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Other Charges</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(pgData.other_charges)
                    .filter(([key]) => key !== "charge_id" && key !== "pg_id")
                    .map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        <span className="text-blue-500 mr-2">
                          {chargeIcons[key]}
                        </span>
                        <span className="font-medium capitalize">
                          {key === "refundable"
                            ? `Deposit ${
                                value === "Yes" ? "is" : "is not"
                              } refundable`
                            : `${key
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}: ${
                                key === "notice_period"
                                  ? `${value} month(s)`
                                  : key === "electricity" ||
                                    key === "food" ||
                                    key === "laundry"
                                  ? `₹${value} Per Month`
                                  : `₹${value} `
                              }`}
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Room Booking Modal */}
        {selectedRoom && (
          <div className="fixed inset-0 top-15 bg- bg-[rgb(0,0,0,0.5)] g-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4">
                Book {selectedRoom.room_type}
              </h3>
              <p className="mb-4">Fill out the form below to book this room.</p>

              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleBookingFormChange}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleBookingFormChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Gender</Label>
                  <Select
                    id="gender"
                    name="gender"
                    value={bookingForm.gender}
                    onValueChange={(value) => {
                      setBookingForm((prev) => ({
                        ...prev,
                        gender: value,
                      }));
                    }}
                  >
                    <SelectTrigger className="border border-gray-300  mt-2 w-full">
                      <SelectValue placeholder="Male" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moveInDate">Expected Move-in Date</Label>
                  <Input
                    id="moveInDate"
                    name="moveInDate"
                    type="date"
                    value={bookingForm.moveInDate}
                    onChange={handleBookingFormChange}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (months)</Label>
                  <Select
                    id="duration"
                    name="duration"
                    value={bookingForm.duration}
                    onValueChange={(value) => {
                      setBookingForm((prev) => ({
                        ...prev,
                        duration: value,
                      }));
                    }}
                  >
                    <SelectTrigger className="border border-gray-300  mt-2 w-full">
                      <SelectValue placeholder={bookingForm.duration} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 month</SelectItem>
                      <SelectItem value="3">3 months</SelectItem>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="specialRequests">
                    Special Requests (Optional)
                  </Label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={bookingForm.specialRequests}
                    onChange={handleBookingFormChange}
                    className="w-full p-2 border outline-none border-gray-300 shadow-sm mt-2 focus:border-blue-500 focus:ring-blue-200 focus:ring-2 rounded-md min-h-[100px]"
                    placeholder="Any special requirements or questions..."
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  className="border-gray-300 hover:bg-gray-100"
                  variant="outline"
                  onClick={() => setSelectedRoom(null)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleBookingSubmit}
                  className="bg-blue-600 text-white hover:bg-blue-500"
                >
                  Submit Booking Request
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Modal */}
        {showContactModal && (
          <div className="fixed inset-0  backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4">Contact Owner</h3>
              <p className="mb-4">
                Fill out the form below to send a message to the owner.
              </p>

              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Your Name</Label>
                  <Input id="contact-name" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email Address</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Phone Number</Label>
                  <Input
                    id="contact-phone"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    className="w-full p-2 border border-gray-200 shadow-sm rounded-md min-h-[100px]"
                    placeholder="Enter your message here..."
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  className="border-gray-200"
                  onClick={() => setShowContactModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-black text-white"
                  onClick={() => {
                    alert("Message sent! The owner will contact you soon.");
                    setShowContactModal(false);
                  }}
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
