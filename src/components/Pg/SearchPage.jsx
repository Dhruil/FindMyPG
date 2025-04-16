import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FaStar,
  FaMapMarkerAlt,
  FaWifi,
  FaUtensils,
  FaParking,
  FaTint,
  FaBolt,
  FaSnowflake,
  FaTv,
  FaBook,
  FaUserShield,
  FaFirstAid,
} from "react-icons/fa";
import {
  MdCleaningServices,
  MdDining,
  MdLocalLaundryService,
  MdIron,
  MdOutlineLocalLibrary,
} from "react-icons/md";
import { GiCooler, GiCctvCamera } from "react-icons/gi";
import { PiElevatorFill } from "react-icons/pi";
import { FaKitchenSet } from "react-icons/fa6";
import SearchBar from "./SearchBar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addDetails, removeDetails } from "../../utils/pgSlice";
import { useNavigate } from "react-router-dom";
import SaveButton from "./SaveButton";
import { useAuth } from "../context/AuthContext";
// Sample data based on the provided JSON
const samplePGs1 = [
  {
    pg_id: "266307108",
    pg_name: "South Delhi Boys PG",
    address:
      "MAIN 118, IGNOU Main Rd, near HDFC BANK, Saket, New Delhi, Delhi, 110068",
    amenities: [
      "food",
      "free_wifi",
      "parking",
      "daily_cleaning",
      "_24_x_7_water",
      "_24_x_7_electricity",
      "hot_water",
      "ro_purifier",
      "water_cooler",
      "cctv",
      "security_warden",
    ],
    price: "₹2000 - ₹30000",
    minRent: 2000,
    maxRent: 30000,
    availability: 7,
    rating: 4.2,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=1000&auto=format&fit=crop",
    ],
    city: "New Delhi",
    state: "Delhi",
    gender: "Male",
    personType: ["Student", "Job", "Any"],
    roomTypes: ["Double Sharing", "Triple Sharing"],
  },
  {
    pg_id: "164117399",
    pg_name: "Student Haven",
    address:
      "Green Residency, College Road, Koramangala, Bangalore, Karnataka, 560034",
    amenities: [
      "food",
      "free_wifi",
      "daily_cleaning",
      "cctv",
      "hot_water",
      "ro_purifier",
    ],
    price: "₹6000 - ₹10000",
    minRent: 6000,
    maxRent: 10000,
    availability: 3,
    rating: 4.2,
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=1000&auto=format&fit=crop",
    ],
    city: "Bangalore",
    state: "Karnataka",
    gender: "Female",
    personType: ["Student"],
    roomTypes: ["Double Sharing", "Triple Sharing"],
  },
  {
    pg_id: "164117400",
    pg_name: "Urban Living PG",
    address: "Metro Apartments, MG Road, Gurgaon, Delhi, 110001",
    amenities: [
      "free_wifi",
      "parking",
      "hot_water",
      "cctv",
      "gym",
      "tv_lounge",
    ],
    price: "₹7000 - ₹12000",
    minRent: 7000,
    maxRent: 12000,
    availability: 2,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000&auto=format&fit=crop",
    ],
    city: "Delhi",
    state: "Delhi",
    gender: "Male",
    personType: ["Job"],
    roomTypes: ["Single", "Double Sharing"],
  },
  {
    pg_id: "164117401",
    pg_name: "Serene Stay",
    address:
      "Peaceful Homes, Lake Road, Banjara Hills, Hyderabad, Telangana, 500034",
    amenities: [
      "food",
      "free_wifi",
      "parking",
      "_24_x_7_electricity",
      "laundry",
      "kitchen",
    ],
    price: "₹5500 - ₹9000",
    minRent: 5500,
    maxRent: 9000,
    availability: 4,
    rating: 4.0,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1000&auto=format&fit=crop",
    ],
    city: "Hyderabad",
    state: "Telangana",
    gender: "Any",
    personType: ["Student", "Job"],
    roomTypes: ["Double Sharing", "Triple Sharing"],
  },
];

const amenityIcons = {
  food: <FaUtensils className="text-orange-500" />,
  free_wifi: <FaWifi className="text-blue-500" />,
  library: <MdOutlineLocalLibrary className="text-purple-500" />,
  parking: <FaParking className="text-gray-500" />,
  lift: <PiElevatorFill className="text-blue-700" />,
  daily_cleaning: <MdCleaningServices className="text-green-500" />,
  tv_lounge: <FaTv className="text-red-500" />,
  laundry: <MdLocalLaundryService className="text-blue-400" />,
  ironing: <MdIron className="text-gray-600" />,
  kitchen: <FaKitchenSet className="text-yellow-600" />,
  dining_Area: <MdDining className="text-amber-500" />,
  gym: <FaSnowflake className="text-purple-600" />,
  ground: <FaBook className="text-green-600" />,
  cafeteria: <FaUtensils className="text-red-400" />,
  _24_x_7_water: <FaTint className="text-blue-400" />,
  _24_x_7_electricity: <FaBolt className="text-yellow-500" />,
  hot_water: <FaTint className="text-red-400" />,
  ro_purifier: <FaTint className="text-cyan-500" />,
  water_cooler: <GiCooler className="text-blue-300" />,
  cctv: <GiCctvCamera className="text-gray-700" />,
  security_warden: <FaUserShield className="text-blue-800" />,
  medical_services: <FaFirstAid className="text-red-600" />,
};

const states = [
  "All States",
  "Delhi",
  "Karnataka",
  "Maharashtra",
  "Telangana",
  "Tamil Nadu",
];
const cities = [
  "All Cities",
  "New Delhi",
  "Bangalore",
  "Mumbai",
  "Hyderabad",
  "Chennai",
];
const genders = ["Any", "Male", "Female"];
const personTypes = ["Any", "Student", "Job"];
const roomTypes = ["Any", "Single", "Double Sharing", "Triple Sharing"];
export default function SearchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("q") || "";
  const initialArea = searchParams.get("area") || "";
  const initialCity = searchParams.get("city") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCity, setSelectedCity] = useState(initialCity || "All Cities");
  const [selectedGender, setSelectedGender] = useState("Any");
  const [selectedPersonType, setSelectedPersonType] = useState("Any");
  const [selectedRoomType, setSelectedRoomType] = useState("Any");
  const [priceRange, setPriceRange] = useState([2000, 30000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [filteredPGs, setFilteredPGs] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [samplePGs, setSamplePGs] = useState(samplePGs1);
  const [states, setStates] = useState(["All States"]); // Stores unique states
  const [cities, setCities] = useState(["All Cities"]); // Stores unique cities
  const { isAuthenticated, user } = useAuth();
  const naviagate = useNavigate();

  const dispatch = useDispatch();
  const data = useSelector((store) => store.pgDetails.details[0]);
  console.log(data);
  useEffect(() => {
    window.scrollTo(top);
    // if(data){
    //   setSamplePGs([...data])
    //   extractStatesAndCities(data);
    // }else{
    getPG_Details();
    // }
  }, []);

  useEffect(() => {
    // Set the search query from URL parameters
    handleSearch();
    console.log(initialQuery);
    setSearchQuery(initialQuery);
    console.log(searchQuery);
    if (initialCity) {
      setSelectedCity(initialCity);
    }
    // Run the search with the initial parameters
  }, [initialQuery, initialArea, initialCity, samplePGs, searchQuery]);

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
        setSamplePGs([...pgData.data.owner]);
        dispatch(removeDetails());
        dispatch(addDetails(pgData.data.owner));
        extractStatesAndCities(pgData.data.owner);
        console.log(samplePGs); // Ensure state gets updated
      }
    } catch (error) {
      console.log("Error logging in.", error);
    }
  };

  const extractStatesAndCities = (pgData) => {
    const uniqueStates = new Set();
    const uniqueCities = new Set();

    uniqueStates.add("All States");
    uniqueCities.add("All Cities");
    pgData.forEach((pg) => {
      if (pg.state) uniqueStates.add(pg.state);
      if (pg.city) uniqueCities.add(pg.city);
    });

    setStates([...uniqueStates]);
    setCities([...uniqueCities]);
  };

  const handleSearch = (e) => {
    let filtered = samplePGs;
    console.log(searchQuery);
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (pg) =>
          pg.pg_name.toLowerCase().includes(query) ||
          pg.address.toLowerCase().includes(query) ||
          pg.city.toLowerCase().includes(query) ||
          pg.state.toLowerCase().includes(query)
      );
    }

    // Filter by state
    if (selectedState !== "All States") {
      filtered = filtered.filter((pg) => pg.state === selectedState);
    }

    // Filter by city
    if (selectedCity !== "All Cities") {
      filtered = filtered.filter((pg) => pg.city === selectedCity);
    }

    // Filter by gender
    if (selectedGender !== "Any") {
      filtered = filtered.filter(
        (pg) =>
          pg.rooms.some((r) => r.gender === selectedGender) ||
          pg.rooms.some((r) => r.gender === "Any")
      );
    }

    // Filter by person type
    if (selectedPersonType !== "Any") {
      filtered = filtered.filter((pg) =>
        pg.rooms.some((r) => r.person_type.includes(selectedPersonType))
      );
    }

    // Filter by room type
    if (selectedRoomType !== "Any") {
      filtered = filtered.filter((pg) =>
        pg.rooms.some((r) => r.room_type.includes(selectedRoomType))
      );
    }

    // Filter by price range
    filtered = filtered.filter((pg) => {
      if (priceRange[1] != 30000 || priceRange[0] != 2000) {
        const [minPrice, maxPrice] = pg.price.split(" - ");
        const minP = parseInt(minPrice.replace("₹", ""));
        const maxP = parseInt(maxPrice.replace("₹", ""));
        return minP <= priceRange[1] && maxP >= priceRange[0];
      } else {
        return true; // or return true depending on the desired behavior
      }
    });

    // Filter by amenities
    if (selectedAmenities.length > 0) {
      console.log(selectedAmenities);
      filtered = filtered.filter((pg) => {
        const amenities = Object.keys(pg.pg_facilities).filter(
          (key) => pg.pg_facilities[key] === "1"
        );
        console.log(amenities);
        return selectedAmenities.every((amenity) =>
          amenities.includes(amenity)
        );
      });
    }
    setFilteredPGs(filtered);
  };

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const popularAmenities = [
    "food",
    "free_wifi",
    "parking",
    "daily_cleaning",
    "_24_x_7_water",
    "_24_x_7_electricity",
    "hot_water",
    "cctv",
  ];
  const allAmenities = Object.keys(amenityIcons);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mt-15 mx-auto px-15 py-8">
        <h1 className="text-3xl font-bold mb-8">Find Your Perfect PG</h1>

        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="md:col-span-1">
            <Card className="sticky ">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedState("All States");
                      setSelectedCity("All Cities");
                      setSelectedGender("Any");
                      setSelectedPersonType("Any");
                      setSelectedRoomType("Any");
                      setPriceRange([2000, 30000]);
                      setSelectedAmenities([]);
                    }}
                  >
                    Reset All
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <Label className="mb-2 block font-semibold">
                      Price Range
                    </Label>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                    <Slider
                      defaultValue={priceRange}
                      min={2000}
                      max={30000}
                      step={500}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-4 cursor-pointer"
                    />
                  </div>

                  <div className="border-b pb-4">
                    <Label className="mb-2 block font-semibold">Location</Label>
                    <div className="space-y-3">
                      <div>
                        <Label className="mb-1 block text-sm">State</Label>
                        <Select
                          value={selectedState}
                          onValueChange={(value) => setSelectedState(value)}
                        >
                          <SelectTrigger className="border border-gray-300  w-full">
                            <SelectValue placeholder={selectedState} />
                          </SelectTrigger>
                          <SelectContent>
                            {states.length > 0 &&
                              states.map((state) => (
                                <SelectItem key={state} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="mb-1 block text-sm">City</Label>
                        <Select
                          value={selectedCity}
                          onValueChange={(value) => setSelectedCity(value)}
                        >
                          <SelectTrigger className="border border-gray-300  w-full">
                            <SelectValue placeholder={selectedCity} />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="border-b pb-4">
                    <Label className="mb-2 block font-semibold">
                      Preferences
                    </Label>
                    <div className="space-y-3">
                      <div>
                        <Label className="mb-1 block text-sm">Gender</Label>
                        <Select
                          value={selectedGender}
                          onValueChange={(value) => setSelectedGender(value)}
                        >
                          <SelectTrigger className="border border-gray-300  w-full">
                            <SelectValue placeholder={selectedGender} />
                          </SelectTrigger>
                          <SelectContent>
                            {genders.map((gender) => (
                              <SelectItem key={gender} value={gender}>
                                {gender}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="mb-1 block text-sm">
                          Person Type
                        </Label>
                        <Select
                          value={selectedPersonType}
                          onValueChange={(value) =>
                            setSelectedPersonType(value)
                          }
                        >
                          <SelectTrigger className="border border-gray-300  w-full">
                            <SelectValue placeholder={selectedPersonType} />
                          </SelectTrigger>
                          <SelectContent>
                            {personTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="mb-1 block text-sm">Room Type</Label>
                        <Select
                          value={selectedRoomType}
                          onValueChange={(value) => setSelectedRoomType(value)}
                        >
                          <SelectTrigger className="border border-gray-300  w-full">
                            <SelectValue placeholder={selectedRoomType} />
                          </SelectTrigger>
                          <SelectContent>
                            {roomTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block font-semibold">
                      Amenities
                    </Label>
                    <Tabs defaultValue="popular" className="w-full">
                      <TabsList className="grid w-full grid-cols-2  bg-gray-100 ">
                        <TabsTrigger
                          value="popular"
                          className="
             data-[state=active]:bg-white data-[state=active]:text-black p-1 text-gray-500"
                        >
                          Popular
                        </TabsTrigger>
                        <TabsTrigger
                          value="all"
                          className="
            data-[state=active]:bg-white data-[state=active]:text-black p-1 text-gray-500"
                        >
                          All
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="popular" className="mt-2">
                        <div className="grid grid-cols-1 gap-2">
                          {popularAmenities.map((amenity) => (
                            <div key={amenity} className="flex items-center">
                              <Checkbox
                                id={`popular-${amenity}`}
                                checked={selectedAmenities.includes(amenity)}
                                onCheckedChange={() =>
                                  handleAmenityChange(amenity)
                                }
                              />
                              <Label
                                htmlFor={`popular-${amenity}`}
                                className="ml-2 flex items-center"
                              >
                                <span className="mr-2">
                                  {amenityIcons[amenity]}
                                </span>
                                <span>
                                  {amenity
                                    .replace(/_/g, " ")
                                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                                </span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="all" className="mt-2">
                        <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-2">
                          {allAmenities.map((amenity) => (
                            <div key={amenity} className="flex items-center">
                              <Checkbox
                                id={`all-${amenity}`}
                                checked={selectedAmenities.includes(amenity)}
                                onCheckedChange={() =>
                                  handleAmenityChange(amenity)
                                }
                              />
                              <Label
                                htmlFor={`all-${amenity}`}
                                className="ml-2 flex items-center"
                              >
                                <span className="mr-2">
                                  {amenityIcons[amenity]}
                                </span>
                                <span>
                                  {amenity
                                    .replace(/_/g, " ")
                                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                                </span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <Button
                    onClick={handleSearch}
                    className="w-full border bg-black text-white"
                  >
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search Results */}
          <div className="md:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-6"
            >
              <TabsList className="w-full grid grid-cols-3 bg-gray-100 h-full p-1 ">
                <TabsTrigger
                  value="all"
                  className="
             data-[state=active]:bg-white data-[state=active]:text-black p-1 text-gray-500 text-md"
                >
                  All PGs
                </TabsTrigger>
                <TabsTrigger
                  value="male"
                  className="
             data-[state=active]:bg-white data-[state=active]:text-black p-1 text-gray-500 text-md"
                >
                  For Males
                </TabsTrigger>
                <TabsTrigger
                  value="female"
                  className="
             data-[state=active]:bg-white data-[state=active]:text-black p-1 text-gray-500 text-md"
                >
                  For Females
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {filteredPGs.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-2">No PGs Found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button
                  className=" p-5 border bg-black text-white cursor-pointer"
                  onClick={() => {
                    naviagate("/search");
                    setSearchQuery("");
                    setSelectedState("All States");
                    setSelectedCity("All Cities");
                    setSelectedGender("Any");
                    setSelectedPersonType("Any");
                    setSelectedRoomType("Any");
                    setPriceRange([2000, 30000]);
                    setSelectedAmenities([]);
                    setFilteredPGs(samplePGs);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPGs
                  .filter((pg) => {
                    if (activeTab === "all") return true;
                    if (activeTab === "male")
                      return (
                        pg.rooms.some((r) => r.gender === "Male") ||
                        pg.rooms.some((r) => r.gender === "Any")
                      );
                    if (activeTab === "female")
                      return (
                        pg.rooms.some((r) => r.gender === "Female") ||
                        pg.rooms.some((r) => r.gender === "Any")
                      );
                    return true;
                  })
                  .map((pg) => (
                    <Link to={`/pg/${pg.pg_id}`} key={pg.pg_id}>
                      <Card className="overflow-hidden h-full hover:shadow-lg py-0 space-y-[-1em] transition-shadow">
                        <div className="relative h-56">
                          <img
                            src={
                              pg.images[0] ||
                              `/placeholder.svg?height=200&width=300`
                            }
                            alt={pg.pg_name}
                            className="w-full h-full object-cover"
                          />
                          {pg.rating && (
                            <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 flex items-center">
                              <FaStar className="text-yellow-500 mr-1" />
                              <span className="text-sm px-2 font-bold">
                                {pg.rating}
                              </span>
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
                            {/* <Badge
                              className={`${
                                pg.rooms.some((r) => r.gender === "Male")
                                  ? "bg-blue-500"
                                  : pg.rooms.some((r) => r.gender === "Female")
                                  ? "bg-pink-500"
                                  : "bg-purple-500"
                              } text-white`}
                            >
                              {pg.rooms.some((r) => r.gender === "Any")
                                ? "Male/Female"
                                : `${
                                    pg.rooms.some((r) => r.gender === "Male") &&
                                    "Male"
                                    ||
                                    pg.rooms.some(
                                      (r) => r.gender === "Female"
                                    ) && "Female"
                                  } Only`}
                            </Badge> */}
                            <Badge
                              className={`${
                                pg.rooms
                                  ? pg.rooms.some((r) => r.gender === "Any") ||
                                    (pg.rooms.some(
                                      (r) => r.gender === "Male"
                                    ) &&
                                      pg.rooms.some(
                                        (r) => r.gender === "Female"
                                      ))
                                    ? "bg-purple-500"
                                    : pg.rooms.some(
                                        (r) => r.gender === "Female"
                                      )
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
                            <FaMapMarkerAlt className="text-red-500 mt-1 mr-1 flex-shrink-0" />
                            <p className="text-gray-600 text-sm line-clamp-2">
                              {pg.address}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {pg.amenities.slice(0, 3).map((amenity) => (
                              <Badge
                                key={amenity}
                                variant="outline"
                                className="flex  border-gray-300 items-center gap-1"
                              >
                                {amenityIcons[amenity]}
                                <span>{amenity.replace(/_/g, " ")}</span>
                              </Badge>
                            ))}
                            {pg.amenities.length > 3 && (
                              <Badge
                                variant="outline"
                                className="border-gray-300"
                              >
                                +{pg.amenities.length - 3} more
                              </Badge>
                            )}
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="font-bold text-blue-600">
                              {pg.price}
                            </p>
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
          </div>
        </div>
      </main>
    </div>
  );
}
