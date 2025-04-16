import { useEffect, useState } from "react";
import { Edit2, Save, X, Upload, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaBuilding,
  FaRegCalendarAlt,
  FaUser,
} from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import LoginPage from "./LoginPage";
export default function UserDashboard() {
  const url = new URL(window.location.href);
  const initialTab = url.searchParams.get("tab") || "profile";
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [isEditing, setIsEditing] = useState(false);
  // const [userInfo, setUserInfo] = useState({
  //   photo: "/placeholder.svg?height=200&width=200",
  //   firstName: "John",
  //   lastName: "Doe",
  //   email: "john.doe@example.com",
  //   phone: "1234567890",
  //   password: "password123",
  //   address: "123 Main St, City, State, 12345",
  //   joinDate: "January 15, 2023",
  // });
  const { user, login } = useAuth();
  const [userInfo, setUserInfo] = useState(user);
  const [originalInfo, setOriginalInfo] = useState({ ...userInfo });
  const [avatar, setAvatar] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savedPGs, setSavedPGs] = useState([
    {
      id: "1",
      name: "South Delhi Boys PG",
      address: "MAIN 118, IGNOU Main Rd, Saket, New Delhi",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop",
      price: "₹10,000 - ₹15,000",
      savedOn: "March 10, 2024",
    },
    {
      id: "2",
      name: "Student Haven",
      address: "Green Residency, College Road, Koramangala, Bangalore",
      image:
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop",
      price: "₹6,000 - ₹10,000",
      savedOn: "March 5, 2024",
    },
    {
      id: "3",
      name: "Urban Living PG",
      address: "Metro Apartments, MG Road, Gurgaon, Delhi",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
      price: "₹7,000 - ₹12,000",
      savedOn: "February 28, 2024",
    },
  ]);

  const [bookingHistory, setBookingHistory] = useState([]);
  const [bookingDetailsModal, setBookingDetailsModal] = useState(null);

  const fetchSavedPGs = async () => {
    try {
      const res = await axios.get(
        `https://findmypg-i01x.onrender.com/api/get_saved_pg_details?user_id=${user.user_id}`
      );
      console.log(res.data.savedPGs);
      setSavedPGs(res.data.savedPGs);
    } catch (error) {
      console.error("Error fetching saved PGs:", error);
    }
  };

  const fetchUserBookings = async (userId) => {
    try {
      const response = await axios.get(
        "https://findmypg-i01x.onrender.com/api/get_bookRoom",
        {
          headers: {
            "user-id": userId, // 👈 Send user_id via custom header
          },
        }
      );

      if (response.data.success) {
        console.log("Bookings fetched:", response.data.data);
        setBookingHistory(response.data.data);
      } else {
        console.warn("No bookings found.");
        setBookingHistory([]);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookingHistory([]);
    }
  };

  useEffect(() => {
    window.scroll(top);
    setTimeout(() => {
      fetchSavedPGs();
      fetchUserBookings(user.user_id);
      setLoading(false);
    }, 500);
  }, []);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setUserInfo({ ...originalInfo });
    setIsEditing(false);
    // Reset to original values if needed
  };

  const updateUserDetails = async (formData) => {
    try {
      const response = await axios.post(
        "https://findmypg-i01x.onrender.com/api/updateUser",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Response:", response.data);
      if (response.data.user) login(response.data.user);
    } catch (error) {
      console.error("Error updating owner details:", error);
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    // Here you would typically make an API call to save user information

    const formData = new FormData();
    formData.append("id", userInfo.user_id);
    formData.append("name", userInfo.name);
    formData.append("phone", userInfo.phone);
    formData.append("email", userInfo.email);
    formData.append("password", userInfo.password);
    formData.append("gender", userInfo.gender);

    if (avatar) {
      formData.append("avatar", avatar); // Attach the image file
    }
    await new Promise((resolve) => {
      updateUserDetails(formData);
      setTimeout(resolve, 1000);
    });
    console.log("Saving user info:", userInfo);
    console.log("avatar :", avatar);
    // Show success message
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully!",
    });
  };

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUserInfo({ ...userInfo, profile_image: event.target.result });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const removeSavedPG = async (id) => {
    await axios.post("https://findmypg-i01x.onrender.com/api/unsave_pg", {
      user_id: user.user_id,
      pg_id: id,
    });
    setSavedPGs(savedPGs.filter((pg) => pg.id !== id));
    toast({
      title: "PG Removed",
      description: "The PG has been removed from your saved list",
    });
  };

  const cancelBooking = async (bookingId) => {
    // Update booking status to cancelled
    const updatedBookings = bookingHistory.map((booking) =>
      booking.booking_id === bookingId
        ? { ...booking, status: "cancelled" }
        : booking
    );

    // Update state and localStorage
    setBookingHistory(updatedBookings);

    try {
      const res = await axios.post(
        "https://findmypg-i01x.onrender.com/api/update_booking_status",
        {
          booking_id: bookingId,
          status: "cancelled",
        }
      );

      if (res.data.success) {
        toast({
          title: "Booking Cancelled",
          description: "Your booking has been cancelled successfully",
        });
      } else {
        toast({
          title: "Failed to cancel booking",
          description: res.data.message,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred while canceling the booking.",
      });
    }
    // Close modal if open
    setBookingDetailsModal(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container p-4 my-20 px-30">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100 text-gray-600">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-white data-[state=active]:text-black p-1"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="saved"
            className="data-[state=active]:bg-white data-[state=active]:text-black p-1"
          >
            Saved PGs
          </TabsTrigger>
          <TabsTrigger
            value="bookings"
            className="data-[state=active]:bg-white data-[state=active]:text-black p-1"
          >
            Booking History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mx-2">My Profile</h2>
                {isEditing ? (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="bg-white text-black border border-gray-200 flex items-center rounded-md cursor-pointer hover:bg-gray-100"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="bg-black cursor-pointer text-white flex items-center  rounded-md hover:bg-gray-800"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleEdit}
                    className="bg-black cursor-pointer text-white flex items-center  rounded-md hover:bg-gray-800"
                  >
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Image */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      src={userInfo.profile_image || "/placeholder.svg"}
                      alt="Profile"
                      className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
                    />
                    {isEditing && (
                      <div className="absolute bottom-0 right-0">
                        <label
                          htmlFor="profile_image"
                          className="cursor-pointer"
                        >
                          <div className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                            <Upload size={16} />
                          </div>
                          <input
                            id="profile_image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{userInfo.name}</h2>
                    <div className="flex items-center justify-center mt-2 text-gray-600">
                      <FaCalendarAlt className="mr-2" />
                      <span>
                        Member since{" "}
                        {format(new Date(userInfo.created_at), "MMMM dd, yyyy")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* User Information */}
                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          name="name"
                          value={userInfo.name}
                          onChange={handleChange}
                          className="my-2"
                        />
                      ) : (
                        <div className="my-2 p-2 border border-gray-200 rounded-md bg-gray-50">
                          {userInfo.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="flex items-center">
                        <FaEnvelope className="mr-2 text-gray-500" />
                        Email Address
                      </Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={userInfo.email}
                          onChange={handleChange}
                          className="my-1"
                        />
                      ) : (
                        <div className="my-2 p-2 border border-gray-200 rounded-md bg-gray-50">
                          {userInfo.email}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="flex items-center">
                        <FaPhone className="mr-2 text-gray-500" />
                        Phone Number
                      </Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          name="phone"
                          value={userInfo.phone}
                          onChange={handleChange}
                          className="my-2"
                        />
                      ) : (
                        <div className="my-2 p-2 border border-gray-200 rounded-md bg-gray-50">
                          {userInfo.phone}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="flex items-center">
                        <FaUser className="mr-2 text-gray-500" />
                        Gender
                      </Label>
                      {isEditing ? (
                        <Select
                          value={userInfo.gender}
                          onValueChange={(value) =>
                            setUserInfo({ ...userInfo, gender: value })
                          }
                        >
                          <SelectTrigger className="w-full border mt-2 border-gray-300 rounded-md py-4 text-sm focus:border-blue-500 focus:ring-blue-300">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="my-2 p-2 border border-gray-200 rounded-md bg-gray-50">
                          {userInfo.gender}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="password" className="flex items-center">
                        <FaLock className="mr-2 text-gray-500" />
                        Password
                      </Label>
                      {isEditing ? (
                        <Input
                          id="password"
                          name="password"
                          value={userInfo.password}
                          onChange={handleChange}
                          className="my-2"
                        />
                      ) : (
                        <div className="my-2 p-2 border border-gray-200 rounded-md bg-gray-50 relative">
                          <input
                            className={`w-full  outline-none `}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={userInfo.password}
                            onChange={handleChange}
                            readOnly={!isEditing}
                          />
                          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 ">
                            <button
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <i
                                className={
                                  showPassword
                                    ? "fas fa-eye"
                                    : "fas fa-eye-slash"
                                }
                              ></i>
                            </button>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* <div className="md:col-span-2">
                      <Label htmlFor="address" className="flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-gray-500" />
                        Address
                      </Label>
                      {isEditing ? (
                        <Input
                          id="address"
                          name="address"
                          value={userInfo.address}
                          onChange={handleChange}
                          className="my-2"
                        />
                      ) : (
                        <div className="my-2 p-2 border border-gray-200 rounded-md bg-gray-50">
                          {userInfo.address}
                        </div>
                      )}
                    </div> */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPGs.length > 0 ? (
                savedPGs.map((pg) => (
                  <Card
                    key={pg.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow py-0 gap-2"
                  >
                    <div className="relative h-64">
                      <img
                        src={pg.image || "/placeholder.svg"}
                        alt={pg.name}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute cursor-pointer bg-red-600 top-2 right-2 hover:bg-red-500"
                        onClick={() => removeSavedPG(pg.id)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1">{pg.name}</h3>
                      <div className="flex items-start mb-2">
                        <FaMapMarkerAlt className="text-red-500 text-sm mt-1  mr-1 flex-shrink-0" />
                        <p className="text-gray-600 text-sm">{pg.address}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-blue-600">{pg.price}</p>
                        <p className="text-xs text-gray-500">
                          Saved on {pg.savedOn}
                        </p>
                      </div>
                      <Link to={`/pg/${pg.id}`}>
                        <Button className="w-full mt-4 bg-black text-white cursor-pointer">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">No Saved PGs</h3>
                  <p className="text-gray-600 mb-4">
                    You haven't saved any PGs yet.
                  </p>
                  <Link to="/search">
                    {" "}
                    <Button className="bg-black cursor-pointer text-white">
                      Browse PGs
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Booking History</h2>
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : bookingHistory.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-300">
                        <th className="text-left p-3">PG Name</th>
                        <th className="text-left p-3">Room Type</th>
                        <th className="text-left p-3">Check-in</th>
                        <th className="text-left p-3">Check-out</th>
                        <th className="text-left p-3">Amount</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingHistory.map((booking) => (
                        <tr
                          key={booking.booking_id}
                          className="border-b hover:bg-gray-50 border-gray-300"
                        >
                          <td className="p-3 font-medium">{booking.pg_name}</td>
                          <td className="p-3">{booking.room_type}</td>
                          <td className="p-3">{booking.check_in_date}</td>
                          <td className="p-3">{booking.check_out_date}</td>
                          <td className="p-3 font-medium">{booking.amount}</td>
                          <td className="p-3">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() +
                                booking.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex space-x-2">
                              <Button
                                className="border cursor-pointer border-gray-200 px-3 py-2 hover:bg-gray-100 "
                                size="md"
                                onClick={() => setBookingDetailsModal(booking)}
                              >
                                <Eye size={14} className="mr-1" />
                                View
                              </Button>
                              {booking.status == "pending" && (
                                <Button
                                  className="bg-red-600 cursor-pointer text-white px-3 py-2"
                                  size="md"
                                  onClick={() =>
                                    cancelBooking(booking.booking_id)
                                  }
                                >
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">No Booking History</h3>
                  <p className="text-gray-600 mb-4">
                    You haven't made any bookings yet.
                  </p>
                  <Button asChild className="text-white bg-black">
                    <a href="/search">Find a PG</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Booking Details Modal */}
      {bookingDetailsModal && (
        <div className="fixed inset-0 bg-[rgb(0,0,0,.4)] flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Booking Details</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBookingDetailsModal(null)}
                className="cursor-pointer"
              >
                <X size={18} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-500 mb-1">
                  PG Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <FaBuilding className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">
                        {bookingDetailsModal.pg_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {bookingDetailsModal.address}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Room Type:</span>{" "}
                    {bookingDetailsModal.room_type}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Amount:</span>{" "}
                    {bookingDetailsModal.amount}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-500 mb-1">
                  Booking Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FaRegCalendarAlt className="text-green-500 mr-2" />
                    <p className="text-sm">
                      <span className="font-medium">Booking Date:</span>{" "}
                      {bookingDetailsModal.booking_date}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-blue-500 mr-2" />
                    <p className="text-sm">
                      <span className="font-medium">Check-in:</span>{" "}
                      {bookingDetailsModal.check_in_date}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-red-500 mr-2" />
                    <p className="text-sm">
                      <span className="font-medium">Check-out:</span>{" "}
                      {bookingDetailsModal.check_out_date}
                    </p>
                  </div>
                  <div>
                    <Badge
                      className={getStatusColor(bookingDetailsModal.status)}
                    >
                      {bookingDetailsModal.status.charAt(0).toUpperCase() +
                        bookingDetailsModal.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-500 mb-2">
                Your Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <p className="text-sm">
                  <span className="font-medium">Name:</span>{" "}
                  {bookingDetailsModal.user_name}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Gender:</span>{" "}
                  {bookingDetailsModal.user_gender}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Email:</span>{" "}
                  {bookingDetailsModal.user_email}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Phone:</span>{" "}
                  {bookingDetailsModal.user_phone}
                </p>
              </div>
            </div>

            {bookingDetailsModal.specialRequests && (
              <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold text-gray-500 mb-2">
                  Special Requests
                </h4>
                <p className="text-sm bg-gray-50 p-3 rounded">
                  {bookingDetailsModal.special_requests}
                </p>
              </div>
            )}

            <div className="flex justify-end mt-6 space-x-2">
              <Button
                className="border cursor-pointer border-gray-200 hover:bg-gray-100"
                onClick={() => setBookingDetailsModal(null)}
              >
                Close
              </Button>

              {bookingDetailsModal.status === "pending" && (
                <Button
                  className="bg-red-600 cursor-pointer text-white hover:bg-red-500"
                  onClick={() => {
                    cancelBooking(bookingDetailsModal.booking_id);
                  }}
                >
                  Cancel Booking
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
