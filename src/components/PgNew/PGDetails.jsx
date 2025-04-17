import { useState, useEffect } from "react";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { Home } from "lucide-react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Loader2, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FaPlus, FaImage } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import js from "@eslint/js";
export function PgDetails() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [pgToDelete, setPgToDelete] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  // Mock data for PG details
  const [pgDetails, setPgDetails] = useState({
    id: "1",
    name: "Sunshine PG",
    address: "123 Park Street, Green Park, New Delhi",
    residence_name: "Sunshine Residency",
    street: "123 Park Street",
    area: "Green Park",
    city: "New Delhi",
    state: "Delhi",
    zip: "110016",
    description:
      "A premium PG accommodation offering comfortable living spaces with modern amenities. Located in a peaceful neighborhood with easy access to public transportation.",
    images: [
      "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/18285930/pexels-photo-18285930/free-photo-of-interior-of-a-luxurious-bedroom.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    pg_facilities: {
      food: true,
      free_wifi: true,
      library: false,
      parking: true,
      lift: true,
      houseKeeping: true,
      daily_cleaning: true,
      tv_lounge: true,
      laundary: true,
      ironing: false,
      kitchen: true,
      dining_Area: true,
      gym: false,
      ground: false,
      cafeteria: false,
      swimming_pool: false,
      game_zone: false,
      cab_facility: false,
      water: true,
      electricity: true,
      hot_water: true,
      ro_purifier: true,
      water_Cooler: false,
      cctv: true,
      security_warden: true,
      medical_services: false,
    },
    rules_in_pg: {
      visitor_allowed: true,
      non_veg: false,
      other_gender: false,
      smoking: false,
      drinking: false,
      party: false,
      gate_close_time: "10:00 PM",
    },
    other_charges: {
      electricity: "As per usage",
      laundary: "₹500 per month",
      food: "₹3500 per month",
      deposit_amount: "₹10000",
      refundable: "Yes",
      notice_period: "1 month",
    },
    rooms: [
      {
        id: "101",
        room_type: "Single",
        no_of_people_in_one_room: "1",
        room_size: "100 sq ft",
        person_type: "Student",
        gender: "Male",
        no_of_rooms: "5",
        rent: "₹8000",
        image:
          "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        images: [
          "https://images.pexels.com/photos/18285930/pexels-photo-18285930/free-photo-of-interior-of-a-luxurious-bedroom.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          "https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          "https://images.pexels.com/photos/7606067/pexels-photo-7606067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        ],
        room_facilities: {
          ac: false,
          tv: false,
          wifi: true,
          fridge: false,
          attached_bathroom: true,
          attached_toilets: true,
          balcony: false,
          wardrobe: true,
          safety_locker: false,
          study_table: true,
          mattress: true,
          bed_sheets: true,
          pillows: true,
        },
      },
      {
        id: "102",
        room_type: "Double Sharing",
        no_of_people_in_one_room: "2",
        room_size: "150 sq ft",
        person_type: "Working Professional",
        gender: "Female",
        no_of_rooms: "3",
        rent: "₹6000",
        image:
          "https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=6000",
        images: [
          "/placeholder.svg?height=400&width=600&text=Double+Room+1",
          "/placeholder.svg?height=400&width=600&text=Double+Room+2",
          "/placeholder.svg?height=400&width=600&text=Double+Room+3",
        ],
        room_facilities: {
          ac: true,
          tv: true,
          wifi: true,
          fridge: false,
          attached_bathroom: true,
          attached_toilets: true,
          balcony: true,
          wardrobe: true,
          safety_locker: true,
          study_table: true,
          mattress: true,
          bed_sheets: true,
          pillows: true,
        },
      },
    ],
  });
  const { user } = useAuth();
  const { id } = useParams();
  const getPG_Details = async () => {
    try {
      const pgData = await axios.get(
        "https://findmypg-i01x.onrender.com/api/getPG_Details",
        {
          headers: {
            Owner_id: user.id,
            Pg_id: id,
          },
        }
      );
      console.log(pgData.data);
      if (pgData.data) {
        setPgDetails(pgData.data.owner[0]);
      }
    } catch (error) {
      console.log("Error logging in.", error);
    }
  };
  useEffect((resolve) => {
    window.scrollTo(top);
    getPG_Details();
    setTimeout(resolve, 1500);
  }, []);

  const [tempDetails, setTempDetails] = useState(pgDetails);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomEditMode, setRoomEditMode] = useState(false);
  const [tempRoomData, setTempRoomData] = useState(null);
  const [roomCurrentImageIndex, setRoomCurrentImageIndex] = useState(0);
  const [roomImageLoading, setRoomImageLoading] = useState(true);
  const [showRoomFacilities, setShowRoomFacilities] = useState({});
  const [pgImages, setPgImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [roomImages, setRoomImages] = useState([]);
  const [removedRoomImages, setRemovedRoomImages] = useState([]);
  // Auto-rotate room images in edit mode

  const handleEdit = () => {
    setTempDetails(pgDetails);
    setEditMode(true);
  };
  const updatePGDetails = async (formData) => {
    try {
      const response = await axios.post(
        "https://findmypg-i01x.onrender.com/api/updatePG",
        formData,
        { headers: { Pg_id: id } }
      );

      console.log("Response:", response.data);
      if (response.data.uploaded_images) {
        setTempDetails((prev) => ({
          ...prev,
          images: [...prev.images, response.data.uploaded_images],
        }));
        setNewImageUrl("");
      }
      //localStorage.setItem("owner", JSON.stringify(response.data.owner));
    } catch (error) {
      console.error("Error updating PG details:", error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    console.log(pgImages);
    console.log(removedImages);
    const formData = new FormData();
    if (pgImages.length > 0) {
      for (let i = 0; i < pgImages.length; i++) {
        formData.append("PgImages[]", pgImages[i]);
      }
    }
    formData.append("RmImages", JSON.stringify(removedImages));
    formData.append("data", JSON.stringify(tempDetails));
    // if(removedImages.length > 0){
    // for (let i = 0; i < removedImages.length; i++) {
    //   formData.append("RmImages[]", removedImages[i]);
    // }
    // }
    await new Promise((resolve) => {
      updatePGDetails(formData);
      setTimeout(resolve, 1500);
    });
    // setPgDetails(tempDetails);
    const fullAddress = `${tempDetails.street}, ${tempDetails.area},    ${tempDetails.city}`;
    console.log(tempDetails);

    setPgDetails({
      ...tempDetails,
      address: fullAddress,
    });
    console.log(pgDetails);
    setRemovedImages([]);
    setPgImages([]);
    setEditMode(false);
    setSaving(false);
  };

  const handleCancel = () => {
    setRemovedImages([]);
    setPgImages([]);
    setEditMode(false);
  };

  const handleFacilityChange = (key) => {
    setTempDetails((prev) => ({
      ...prev,
      pg_facilities: {
        ...prev.pg_facilities,
        [key]: !prev.pg_facilities[key],
      },
    }));
  };

  const handleRuleChange = (key) => {
    setTempDetails((prev) => ({
      ...prev,
      rules_in_pg: {
        ...prev.rules_in_pg,
        [key]: prev.rules_in_pg[key] ? 0 : 1,
      },
    }));
  };

  const handleChargeChange = (e) => {
    const { name, value } = e.target;
    setTempDetails((prev) => ({
      ...prev,
      other_charges: {
        ...prev.other_charges,
        [name]: value,
      },
    }));
  };
  const handleToggle = (roomId) => {
    setShowRoomFacilities((prev) => ({
      ...prev,
      [roomId]: !prev[roomId],
    }));
  };

  const handleRoomEdit = (room) => {
    setSelectedRoom(room);
    setTempRoomData({ ...room });
    setRoomEditMode(true);
    setRoomCurrentImageIndex(0);
  };

  const updateRoomDetails = async (roomData) => {
    try {
      const response = await axios.post(
        "https://findmypg-i01x.onrender.com/api/updateRoom",
        roomData
      );
      console.log("Response", response.data);
    } catch (error) {
      console.error("Error updating Room details:", error);
    }
  };

  const handleRoomSave = async (roomId) => {
    setSaving(true);
    // Simulate API call
    console.log(roomImages);
    console.log(removedRoomImages);
    const roomData = new FormData();
    if (roomImages.length > 0) {
      for (let i = 0; i < roomImages.length; i++) {
        roomData.append("RoomImages[]", roomImages[i]);
      }
    }
    roomData.append("RmRoomImages", JSON.stringify(removedRoomImages));
    roomData.append("data", JSON.stringify(tempRoomData));
    console.log(tempRoomData);
    await new Promise((resolve) => {
      updateRoomDetails(roomData);
      setTimeout(resolve, 3000);
    });

    setPgDetails((prev) => ({
      ...prev,
      rooms: prev.rooms.map((room) =>
        room.room_id === tempRoomData.room_id ? tempRoomData : room
      ),
    }));
    setRemovedRoomImages([]);
    setRoomImages([]);
    setRoomEditMode(false);
    setSaving(false);
  };

  const handleRoomCancel = () => {
    setRoomEditMode(false);
    setRemovedRoomImages([]);
    setRoomImages([]);
    ("");
  };

  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setTempRoomData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoomFacilityChange = (key) => {
    setTempRoomData((prev) => ({
      ...prev,
      room_facilities: {
        ...prev.room_facilities,
        [key]: !prev.room_facilities[key],
      },
    }));
  };

  const nextImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev + 1) % (editMode ? tempDetails.images : pgDetails.images).length
    );
    setLoading(true);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + (editMode ? tempDetails.images : pgDetails.images).length) %
        (editMode ? tempDetails.images : pgDetails.images).length
    );
    setLoading(true);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
    setLoading(true);
  };

  const nextRoomImage = () => {
    if (tempRoomData && tempRoomData.images.length > 0) {
      setRoomCurrentImageIndex(
        (prev) => (prev + 1) % tempRoomData.images.length
      );
      setRoomImageLoading(true);
    }
  };

  const prevRoomImage = () => {
    if (tempRoomData && tempRoomData.images.length > 0) {
      setRoomCurrentImageIndex(
        (prev) =>
          (prev - 1 + tempRoomData.images.length) % tempRoomData.images.length
      );
      setRoomImageLoading(true);
    }
  };

  const goToRoomImage = (index) => {
    setRoomCurrentImageIndex(index);
    setRoomImageLoading(true);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log("/uploads/" + file.name);
    if (file) {
      setPgImages((prev) => [...prev, file]);
      await new Promise((resolve) => {
        setTempDetails((prev) => ({
          ...prev,
          images: [...prev.images, URL.createObjectURL(file)],
        }));
        setNewImageUrl("");
        setTimeout(resolve, 1000);
      });
      // setNewImageUrl(URL.createObjectURL(file));
    }
  };

  const handleRoomImageChange = async (e) => {
    const file = e.target.files[0];
    console.log("/uploads/" + file.name);
    if (file) {
      setRoomImages((prev) => [...prev, file]);
      setTempRoomData((prev) => ({
        ...prev,
        images: [...prev.images, URL.createObjectURL(file)],
      }));
    }
  };

  const addPgImage = () => {
    setTempDetails((prev) => ({
      ...prev,
      images: [...prev.images, newImageUrl],
    }));
    setNewImageUrl("");
  };

  const removePgImage = (index, image) => {
    setTempDetails((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    if (index >= pgDetails.images.length) {
      setPgImages((prev) =>
        prev.filter((_, i) => i !== index - pgDetails.images.length)
      );
    } else {
      setRemovedImages((prev) => [...prev, image]);
    }
    if (currentImageIndex >= index && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  const addRoomImage = () => {
    if (newRoomImageUrl.trim() && tempRoomData) {
      setTempRoomData((prev) => ({
        ...prev,
        images: [...prev.images, newRoomImageUrl],
        image: prev.images.length === 0 ? newRoomImageUrl : prev.image,
      }));
    }
  };

  const removeRoomImage = (index, image) => {
    if (tempRoomData) {
      const newImages = tempRoomData.images.filter((_, i) => i !== index);
      setTempRoomData((prev) => ({
        ...prev,
        images: newImages,
        image:
          newImages.length > 0
            ? index === 0
              ? newImages[0]
              : prev.image
            : "/placeholder.svg",
      }));
      console.log(tempRoomData.images.length);
      if (index >= tempRoomData.images.length - roomImages.length) {
        setRoomImages((prev) =>
          prev.filter(
            (_, i) =>
              i !== index - tempRoomData.images.length - -roomImages.length
          )
        );
      } else {
        setRemovedRoomImages((prev) => [...prev, image]);
      }
      if (roomCurrentImageIndex >= index && roomCurrentImageIndex > 0) {
        setRoomCurrentImageIndex(roomCurrentImageIndex - 1);
      }
    }
  };
  const deletePgDetails = async (data) => {
    try {
      const response = await axios.post(
        "https://findmypg-i01x.onrender.com/api/deletePG",
        data,
        { headers: { id: data } }
      );

      console.log("Response:", response.data);
      if (response.data) {
        console.log("Success");
      }
      //localStorage.setItem("owner", JSON.stringify(response.data.owner));
    } catch (error) {
      console.error("Error updating PG details:", error);
    }
  };
  const handleDeletePg = async (pgId) => {
    // Here we would call an API to delete the PG
    // For demonstration purposes, we'll redirect back to the listings
    await new Promise((resolve) => {
      deletePgDetails(pgId);
      setTimeout(() => {
        navigate("/owner-dashboard");
        resolve();
      }, 3000);
    });
    setPgToDelete(null);
  };

  const handleDeleteRoom = async (roomId) => {
    console.log(roomId);
    await new Promise((resolve) => {
      deletePgDetails(roomId);
      setTimeout(resolve, 3000);
    });
    setPgDetails((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((r) => r.room_id !== roomId),
    }));
    setRoomToDelete(null);
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
    <div className="space-y-6 mt-16 mb-10 mx-50">
      <div className="flex items-center gap-4">
        <button
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => navigate("/owner-dashboard")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Listings
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{pgDetails.pg_name}</h1>
            <p className="text-gray-600">{pgDetails.address}</p>
          </div>
          <div className="flex gap-2">
            {!editMode ? (
              <>
                <button
                  className="inline-flex items-center rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  onClick={() => setPgToDelete(pgDetails.pg_id)}
                >
                  {" "}
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete PG
                </button>
                <button
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={handleEdit}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit PG
                </button>
              </>
            ) : (
              <>
                <button
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={handleCancel}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Cancel
                </button>
                <button
                  className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <svg
                  className="h-8 w-8 animate-spin text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}
            <img
              src={
                (editMode ? tempDetails.images : pgDetails.images)[
                  currentImageIndex
                ] || "/placeholder.svg"
              }
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

          <div className="flex gap-2 overflow-x-auto p-2">
            {(editMode ? tempDetails.images : pgDetails.images).map(
              (image, index) => (
                <div key={index} className="relative">
                  <button
                    className={`relative aspect-video w-20 flex-shrink-0 overflow-hidden rounded-md transition-all ${
                      currentImageIndex === index
                        ? "ring-2 ring-blue-500 ring-offset-2"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setLoading(true);
                    }}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`PG View ${index + 1}`}
                      className="object-cover"
                    />
                  </button>
                  {editMode && (
                    <button
                      onClick={() => removePgImage(index, image)}
                      className="absolute -right-1 -top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
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
                  )}
                </div>
              )
            )}
            {editMode && (
              <button
                className={
                  "relative aspect-video w-20 flex-shrink-0 overflow-hidden rounded-md transition-al opacity-70 hover:opacity-100"
                }
                onClick={() => {
                  handleImageChange;
                }}
              >
                <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg p-2 cursor-pointer bg-blue-50 hover:bg-blue-100 transition duration-300">
                  <FaImage className="text-blue-500 text-3xl" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    placeholder="Enter image URL"
                    className="rounded-md border border-gray-300 text-[0px] "
                  />
                </label>
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-300 text-lg">
          <div className="flex overflow-x-auto">
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
        </div>

        {/* Tab Content */}
        <div className="py-4">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-4">
              {editMode ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      PG Name
                    </label>
                    <input
                      type="text"
                      value={tempDetails.pg_name}
                      onChange={(e) =>
                        setTempDetails((prev) => ({
                          ...prev,
                          pg_name: e.target.value,
                        }))
                      }
                      className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300 "
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-lg font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={tempDetails.description}
                      onChange={(e) =>
                        setTempDetails((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="w-full min-h-[100px] rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300 "
                    />
                  </div>

                  <div className="border border-gray-300 p-4 rounded-md space-y-4">
                    <h3 className="font-medium">Address Details</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Residence Name
                        </label>
                        <input
                          type="text"
                          value={tempDetails.residence_name}
                          onChange={(e) =>
                            setTempDetails((prev) => ({
                              ...prev,
                              residence_name: e.target.value,
                            }))
                          }
                          className="w-full rounded-md border border-gray-300 p-2 text-smfocus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300 sm:text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Street
                        </label>
                        <input
                          type="text"
                          value={tempDetails.street}
                          onChange={(e) =>
                            setTempDetails((prev) => ({
                              ...prev,
                              street: e.target.value,
                            }))
                          }
                          className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300 sm:text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Area
                        </label>
                        <input
                          type="text"
                          value={tempDetails.area}
                          onChange={(e) =>
                            setTempDetails((prev) => ({
                              ...prev,
                              area: e.target.value,
                            }))
                          }
                          className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300 sm:text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          value={tempDetails.city}
                          onChange={(e) =>
                            setTempDetails((prev) => ({
                              ...prev,
                              city: e.target.value,
                            }))
                          }
                          className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300 sm:text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          State
                        </label>
                        <input
                          type="text"
                          value={tempDetails.state}
                          onChange={(e) =>
                            setTempDetails((prev) => ({
                              ...prev,
                              state: e.target.value,
                            }))
                          }
                          className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300 sm:text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          value={tempDetails.zip}
                          onChange={(e) =>
                            setTempDetails((prev) => ({
                              ...prev,
                              zip: e.target.value,
                            }))
                          }
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-700">{pgDetails.description}</p>
                  <div className="border border-gray-300 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Address</h3>
                    <p className="text-gray-700">
                      {pgDetails.residence_name &&
                        `${pgDetails.residence_name}, `}
                      {pgDetails.street}, {pgDetails.area}, {pgDetails.city},{" "}
                      {pgDetails.state} {pgDetails.zip}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Facilities Tab */}
          {activeTab === "facilities" && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.entries(
                editMode ? tempDetails.pg_facilities : pgDetails.pg_facilities
              ).map(([key, value]) => (
                <div
                  key={key}
                  className={`flex items-center gap-2 rounded-lg p-3 ${
                    value == 1 ? "bg-blue-50" : "bg-gray-100"
                  }`}
                >
                  {editMode ? (
                    <input
                      type="checkbox"
                      id={key}
                      checked={value == 1}
                      onChange={() => handleFacilityChange(key)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  ) : value == 1 ? (
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
                  <label htmlFor={key} className="capitalize cursor-pointer">
                    {key.replace(/_/g, " ")}
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* Rules Tab */}
          {activeTab === "rules" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(
                  editMode ? tempDetails.rules_in_pg : pgDetails.rules_in_pg
                )
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
                      {editMode ? (
                        <input
                          type="checkbox"
                          id={key}
                          checked={value == 1}
                          onChange={() => handleRuleChange(key)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      ) : value == 1 ? (
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
                      <label
                        htmlFor={key}
                        className="capitalize cursor-pointer"
                      >
                        {key.replace(/_/g, " ")}
                      </label>
                    </div>
                  ))}
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Gate Close Time</p>
                    {editMode ? (
                      // <input
                      //   type="text"
                      //   value={tempDetails.rules_in_pg.gate_close_time}
                      //   onChange={(e) =>
                      //     setTempDetails((prev) => ({
                      //       ...prev,
                      //       rules_in_pg: {
                      //         ...prev.rules_in_pg,
                      //         gate_close_time: e.target.value,
                      //       },
                      //     }))
                      //   }
                      //   className="mt-1 p-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300 sm:text-sm"
                      // />
                      <Input
                        id="gate_close_time"
                        name="gate_close_time"
                        type="time"
                        value={tempDetails.rules_in_pg.gate_close_time}
                        onChange={(e) =>
                          setTempDetails((prev) => ({
                            ...prev,
                            rules_in_pg: {
                              ...prev.rules_in_pg,
                              gate_close_time: e.target.value,
                            },
                          }))
                        }
                        className="mt-1 p-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300 sm:text-sm"
                      />
                    ) : (
                      <p className="font-medium">
                        {convertTime(pgDetails.rules_in_pg.gate_close_time)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Charges Tab */}
          {activeTab === "charges" && (
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(
                editMode ? tempDetails.other_charges : pgDetails.other_charges
              )
                .filter(([key]) => key !== "charge_id" && key !== "pg_id")
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="p-3 shadow-md rounded-lg bg-gray-50 border border-gray-300"
                  >
                    <p className=" text-gray-600 capitalize">
                      {key.replace(/_/g, " ")}
                    </p>
                    {editMode ? (
                      <input
                        type="text"
                        name={key}
                        value={tempDetails.other_charges[key]}
                        onChange={handleChargeChange}
                        className="mt-1 p-1 block w-full rounded-md border border-gray-300  focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300 sm:text-sm"
                      />
                    ) : (
                      <p className="font-medium">{value}</p>
                    )}
                  </div>
                ))}
            </div>
          )}

          {/* Rooms Tab */}
          {activeTab === "rooms" && (
            <div className="space-y-6">
              {/* Room List */}
              {pgDetails.rooms.map((room) => (
                <div
                  key={room.room_id}
                  className="border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="relative as">
                      <div className="relative w-full h-full">
                        <RoomCard room={room} />
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
                            {room.no_of_rooms} rooms
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Home className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{room.room_size}</span>
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
                          <span className="text-sm">{room.person_type}</span>
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
                                {Object.entries(room.room_facilities).filter(
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
                      <div className="mt-4 flex justify-end gap-2">
                        <button
                          className="inline-flex items-center rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 transition-colors"
                          onClick={() => setRoomToDelete(room.room_id)}
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          Delete
                        </button>
                        <button
                          className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                          onClick={() => handleRoomEdit(room)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-1 h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                          Edit Room
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <Link
                  to={`/owner-dashboard/pg/${pgDetails.pg_id}/add-room`}
                  className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
                >
                  <FaPlus className="mr-2 h-3 w-3" />
                  Add Room
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Room Edit Modal */}
      {selectedRoom && roomEditMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 mt-10 overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
            <button
              className="absolute right-4 top-4 rounded-full bg-gray-200 p-2 hover:bg-gray-300 transition-colors z-10"
              onClick={handleRoomCancel}
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
              <h2 className="text-xl font-bold mb-4">Edit Room</h2>

              {/* Room Image Gallery */}
              <div className="mb-6">
                <div className="relative  overflow-hidden rounded-lg">
                  {roomImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                    </div>
                  )}
                  {tempRoomData &&
                  tempRoomData.images &&
                  tempRoomData.images.length > 0 ? (
                    <img
                      src={
                        tempRoomData.images[roomCurrentImageIndex] ||
                        "/placeholder.svg"
                      }
                      alt="Room View"
                      className="aspect-video object-cover w-full"
                      onLoad={() => setRoomImageLoading(false)}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <p className="text-gray-500">No images available</p>
                    </div>
                  )}
                  {tempRoomData &&
                    tempRoomData.images &&
                    tempRoomData.images.length > 1 && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <button
                          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-all"
                          onClick={prevRoomImage}
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-all"
                          onClick={nextRoomImage}
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                      </>
                    )}
                </div>

                <div className="mt-2 flex gap-2 overflow-x-auto p-2">
                  {tempRoomData &&
                    tempRoomData.images &&
                    tempRoomData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <div
                          className={`relative aspect-video w-20 flex-shrink-0 overflow-hidden rounded-md transition-all ${
                            roomCurrentImageIndex === index
                              ? "ring-2 ring-blue-500 ring-offset-2"
                              : "opacity-70 hover:opacity-100"
                          }`}
                          onClick={() => {
                            setRoomCurrentImageIndex(index);
                            setRoomImageLoading(true);
                          }}
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Room View ${index + 1}`}
                            className="object-cover cursor-pointer"
                          />
                        </div>
                        <button
                          onClick={() => removeRoomImage(index, image)}
                          className="absolute -right-1 -top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
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
                      </div>
                    ))}
                  <button
                    className={
                      "relative aspect-video w-20  flex-shrink-0 overflow-hidden rounded-md transition-al opacity-70 hover:opacity-100"
                    }
                    onClick={() => {
                      handleRoomImageChange;
                    }}
                  >
                    <label className="relative flex flex-col items-center justify-center border-2 h-full border-dashed border-blue-400 rounded-lg p-1 cursor-pointer bg-blue-50 hover:bg-blue-100 transition duration-300">
                      <FaImage className="text-blue-500 text-3xl" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleRoomImageChange}
                        placeholder="Enter image URL"
                        className="rounded-md border border-gray-300 text-[0px] "
                      />
                    </label>
                  </button>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Room Type
                    </label>
                    <Select
                      name="room_type"
                      value={tempRoomData.room_type}
                      onValueChange={(value) => {
                        setTempRoomData((prev) => ({
                          ...prev,
                          room_type: value,
                        }));
                      }}
                    >
                      <SelectTrigger className=" w-full border border-gray-300  rounded-md px-3 py-2 text-sm ">
                        <SelectValue placeholder={tempRoomData.person_type} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Double Sharing">
                          Double Sharing
                        </SelectItem>
                        <SelectItem value="Triple Sharing">
                          Triple Sharing
                        </SelectItem>
                        <SelectItem value="Four Sharing">
                          Four Sharing
                        </SelectItem>
                        <SelectItem value="Shared">Shared</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Available Rooms
                    </label>
                    <input
                      type="text"
                      name="available_room"
                      value={tempRoomData.available_room}
                      onChange={handleRoomChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300 sm:text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Room Size
                    </label>
                    <input
                      type="text"
                      name="room_size"
                      value={tempRoomData.room_size}
                      onChange={handleRoomChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300 sm:text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Person Type
                    </label>
                    {/* <select
                      name="person_type"
                      value={tempRoomData.person_type}
                      onChange={handleRoomChange}
                      
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300 sm:text-sm"
                    >
                      <option className={
                              "focus-visible:bg-gray-100"
                            } value="Student">Student</option>
                      <option value="Working Professional">
                        Working Professional
                      </option>
                      <option value="Any">Any</option>
                    </select> */}
                    <Select
                      name="person_type"
                      value={tempRoomData.person_type}
                      onValueChange={(value) => {
                        setTempRoomData((prev) => ({
                          ...prev,
                          person_type: value,
                        }));
                      }}
                    >
                      <SelectTrigger className=" w-full border border-gray-300  rounded-md px-3 py-2 text-sm ">
                        <SelectValue placeholder={tempRoomData.person_type} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Student">Student</SelectItem>
                        <SelectItem value="Job">
                          Working Professional
                        </SelectItem>
                        <SelectItem value="Any">Any</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    {/* <select
                      name="gender"
                      value={tempRoomData.gender}
                      onChange={handleRoomChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300 sm:text-sm"
                     >
                      <option className="hover:bg-gray-100" value="Male">Male</option>
                      <option className="hover:bg-gray-100" value="Female">Female</option>
                      <option className="hover:bg-gray-100" value="Any">Any</option>
                    </select> */}
                    <Select
                      name="gender"
                      value={tempRoomData.gender}
                      onValueChange={(value) => {
                        setTempRoomData((prev) => ({
                          ...prev,
                          gender: value,
                        }));
                      }}
                    >
                      <SelectTrigger className=" w-full border border-gray-300  rounded-md px-3 py-2 text-sm ">
                        <SelectValue placeholder={tempRoomData.gender} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Any">Any</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Number of Rooms
                    </label>
                    <input
                      type="number"
                      name="no_of_rooms"
                      value={tempRoomData.no_of_rooms}
                      onChange={handleRoomChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300 sm:text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Rent
                    </label>
                    <input
                      type="text"
                      name="rent"
                      value={tempRoomData.rent}
                      onChange={handleRoomChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300 sm:text-sm"
                    />
                  </div>
                </div>
                {console.log(tempRoomData)}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Room Facilities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {Object.entries(tempRoomData.room_facilities)
                      .filter(
                        ([key]) =>
                          key !== "room_id" && key !== "room_facility_id"
                      )
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className={`flex items-center gap-2 rounded-lg p-3 ${
                            value == 1 ? "bg-blue-50" : "bg-gray-100"
                          } hover:bg-opacity-80 transition-colors cursor-pointer`}
                          onClick={() => handleRoomFacilityChange(key)}
                        >
                          <input
                            type="checkbox"
                            id={`facility-${key}`}
                            checked={value == 1}
                            onChange={() => handleRoomFacilityChange(key)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label
                            htmlFor={`facility-${key}`}
                            className="capitalize cursor-pointer"
                          >
                            {key.replace(/_/g, " ")}
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={handleRoomCancel}
                >
                  Cancel
                </button>
                <button
                  className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                  onClick={() => handleRoomSave(tempRoomData.room_id)}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {pgToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Delete PG</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this PG? This action cannot be
              undone and all associated data will be permanently removed.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => setPgToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                onClick={() => handleDeletePg(pgToDelete)}
              >
                Delete PG
              </button>{" "}
            </div>
          </div>
        </div>
      )}

      {roomToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Delete Room
            </h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this room? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => setRoomToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                onClick={() => handleDeleteRoom(roomToDelete)}
              >
                Delete Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RoomCard({ room }) {
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
function FacilitiesModal({ room }) {
  return (
    <dialog
      id={`facilities-modal-${room.room_id}`}
      className="modal p-4 rounded-lg shadow-lg max-w-md w-full"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {room.room_type} - All Facilities
          </h3>
          <button
            onClick={() =>
              document
                .getElementById(`facilities-modal-${room.room_id}`)
                .close()
            }
            className="p-1 rounded-full hover:bg-gray-100"
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
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(room.room_facilities)
            .filter(([_, value]) => value)
            .map(([key]) => (
              <span
                key={key}
                className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700"
              >
                {key.replace(/_/g, " ")}
              </span>
            ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={() =>
              document
                .getElementById(`facilities-modal-${room.room_id}`)
                .close()
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
