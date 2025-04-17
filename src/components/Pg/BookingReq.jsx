import { useState, useEffect } from "react";
import { X, Check, Eye, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "../hooks/use-toast";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { format } from "date-fns";

const BookingReq = ({ booking }) => {
  const { toast } = useToast();
  const { user } = useAuth();

  const [allBookings, setAllBookings] = useState([]); // Store all bookings
  const [filteredBookings, setFilteredBookings] = useState([]); // Store filtered bookings
  const [bookingFilter, setBookingFilter] = useState("all"); // Track selected filter
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Load bookings and notifications on component mount
  const fetchBookingsForOwner = async (ownerId) => {
    try {
      const response = await axios.get(
        "https://findmypg-i01x.onrender.com/api/get_owner_bookRoom",
        {
          headers: {
            owner_id: ownerId,
          },
        }
      );

      if (response.data.success) {
        setBookings([response.data.bookings[0]]);
        console.log("Owner Bookings:", response.data.bookings[0]);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    // Load bookings from localStorage
    // fetchBookingsForOwner(user.id);
    setAllBookings(booking);
    setFilteredBookings(booking); // Initially show all bookings
    console.log(filteredBookings);
  }, [booking]);

  useEffect(() => {
    if (bookingFilter === "all") {
      setFilteredBookings(allBookings);
    } else {
      const filtered = allBookings.filter(
        (booking) => booking.status === bookingFilter
      );
      setFilteredBookings(filtered);
    }
  }, [bookingFilter, allBookings]);

  const handleBookingAction = async (bookingId, action) => {
    // Update booking status based on action
    const newStatus = action === "approve" ? "active" : "cancelled";
    const updatedBookings = allBookings.map((booking) =>
      booking.booking_id === bookingId
        ? { ...booking, status: newStatus }
        : booking
    );
    // Update state and localStorage
    setAllBookings(updatedBookings);

    if (bookingFilter === "all" || bookingFilter === newStatus) {
      setFilteredBookings(
        bookingFilter === "all"
          ? updatedBookings
          : updatedBookings.filter(
              (booking) => booking.status === bookingFilter
            )
      );
    } else {
      // If we're filtering for a specific status and this booking no longer matches,
      // remove it from the filtered list
      setFilteredBookings(
        filteredBookings.filter((booking) => booking.booking_id !== bookingId)
      );
    }

    try {
      const res = await axios.post(
        "https://findmypg-i01x.onrender.com/api/update_booking_status",
        {
          booking_id: bookingId,
          status: action === "approve" ? "active" : "cancelled",
        }
      );

      if (res.data.success) {
        toast({
          title: action === "approve" ? "Booking Approved" : "Booking Rejected",
          description:
            action === "approve"
              ? "The booking has been approved successfully"
              : "The booking has been rejected",
        });
      } else {
        toast({
          title:
            action === "approve"
              ? "Failed to  Booking Approved"
              : "Failed to  Booking Rejected",
          description: res.data.message,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description:
          action === "approve"
            ? "An error occurred while approving the booking."
            : "An error occurred while aejecting the booking.",
      });
    }

    // Close modal if open
    setSelectedBooking(null);
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
  console.log(allBookings);
  return (
    <div className="">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Booking Requests</h2>
            <div className="flex items-center">
              <div className="relative">
                <Select
                  value={bookingFilter}
                  onValueChange={(value) => setBookingFilter(value)}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder={bookingFilter} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Bookings</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {filteredBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-300">
                    <th className="text-left p-3">PG Name</th>
                    <th className="text-left p-3">Room Type</th>
                    <th className="text-left p-3">Guest</th>
                    <th className="text-left p-3">Check-in</th>
                    <th className="text-left p-3">Amount</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking.booking_id}
                      className="border-b border-gray-300 hover:bg-gray-50"
                    >
                      <td className="p-3 font-medium">{booking.pg_name}</td>
                      <td className="p-3">{booking.room_type}</td>
                      <td className="p-3">{booking.user_name || "Guest"}</td>
                      <td className="p-3">
                        {format(new Date(booking.check_in_date), "yyyy-MM-dd")}
                      </td>
                      <td className="p-3 font-medium">{booking.amount}</td>
                      <td className="p-3">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex space-x-2 items-center">
                          <Button
                            variant="outline"
                            size="md"
                            className="border items-center py-2 px-3 border-gray-200 hover:bg-gray-100"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            <Eye size={14} className="" /> View
                          </Button>

                          {booking.status === "pending" && (
                            <>
                              <Button
                                variant="default"
                                size="md"
                                className="bg-green-600 text-white py-2 px-3 hover:bg-green-700"
                                onClick={() =>
                                  handleBookingAction(
                                    booking.booking_id,
                                    "approve"
                                  )
                                }
                              >
                                <Check size={14} className=" mt-1" /> Approve
                              </Button>
                              <Button
                                className="text-white py-2 px-3 bg-red-600 hover:bg-red-700"
                                size="md"
                                onClick={() =>
                                  handleBookingAction(
                                    booking.booking_id,
                                    "reject"
                                  )
                                }
                              >
                                <X size={14} className="" /> Reject
                              </Button>
                            </>
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
              <h3 className="text-xl font-bold mb-2">
                {bookingFilter === "all"
                  ? "No Booking Requests"
                  : `No ${
                      bookingFilter.charAt(0).toUpperCase() +
                      bookingFilter.slice(1)
                    } Bookings`}
              </h3>
              <p className="text-gray-600 mb-4">
                {bookingFilter === "all"
                  ? "You don't have any booking requests yet."
                  : `You don't have any ${bookingFilter} bookings.`}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      {selectedBooking && (
        <div className="fixed inset-0 bg-[rgb(0,0,0,.4)] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Booking Details</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedBooking(null)}
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
                  <p className="font-medium">{selectedBooking.pg_name}</p>
                  <p className="text-sm text-gray-600">
                    {selectedBooking.address}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Room Type:</span>{" "}
                    {selectedBooking.room_type}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Amount:</span>{" "}
                    {selectedBooking.amount}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-500 mb-1">
                  Booking Information
                </h4>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Booking Date:</span>{" "}
                    {format(
                      new Date(selectedBooking.booking_date),
                      "yyyy-MM-dd"
                    )}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Check-in:</span>{" "}
                    {format(
                      new Date(selectedBooking.check_in_date),
                      "yyyy-MM-dd"
                    )}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Check-out:</span>{" "}
                    {format(
                      new Date(selectedBooking.check_out_date),
                      "yyyy-MM-dd"
                    )}
                  </p>
                  <div>
                    <Badge className={getStatusColor(selectedBooking.status)}>
                      {selectedBooking.status.charAt(0).toUpperCase() +
                        selectedBooking.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-500 mb-2">
                Guest Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <p className="text-sm">
                  <span className="font-medium">Name:</span>{" "}
                  {selectedBooking.user_name || "N/A"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Gender:</span>{" "}
                  {selectedBooking.user_gender || "N/A"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Email:</span>{" "}
                  {selectedBooking.user_email || "N/A"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Phone:</span>{" "}
                  {selectedBooking.user_phone || "N/A"}
                </p>
              </div>
            </div>

            {selectedBooking.specialRequests && (
              <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold text-gray-500 mb-2">
                  Special Requests
                </h4>
                <p className="text-sm bg-gray-50 p-3 rounded">
                  {selectedBooking.specialRequests}
                </p>
              </div>
            )}

            <div className="flex justify-end mt-6 space-x-2">
              <Button
                variant="outline"
                className="border-gray-200 hover:bg-gray-100"
                onClick={() => setSelectedBooking(null)}
              >
                Close
              </Button>

              {selectedBooking.status === "pending" && (
                <>
                  <Button
                    variant="default"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() =>
                      handleBookingAction(selectedBooking.booking_id, "approve")
                    }
                  >
                    <Check size={16} className="mt-1" /> Approve Booking
                  </Button>
                  <Button
                    className="bg-red-600 text-white hover:bg-red-700"
                    onClick={() =>
                      handleBookingAction(selectedBooking.booking_id, "reject")
                    }
                  >
                    <X size={16} className="mr-2" /> Reject Booking
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingReq;
