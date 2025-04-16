import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Notification = () => {
  const { user } = useAuth();
  const notificationRef = useRef(null);
  const [showNotifications, setShowNotifications] = useState(false);
  // const notificationRef = useRef(null);

  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [unreadNotifications, setUnreadNotifications] = useState(0);

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
        setBookings(response.data.bookings);
        console.log("Owner Bookings:", response.data.bookings);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    // Load bookings from localStorage
    fetchBookingsForOwner(user.id);
    console.log(bookings);
  }, [user]);

  // Create notifications once bookings are updated
  useEffect(() => {
    if (bookings && bookings.length > 0) {
      console.log(bookings);
      const bookingNotifications = bookings.map((booking) => ({
        id: `notification-${booking.booking_id}`,
        type: "booking",
        message: `New booking request from ${
          booking.user_name || "Guest"
        } for ${booking.room_type} in ${booking.pg_name}`,
        time: booking.booking_date,
        read: booking.status == "pending" ? false : true,
        bookingId: booking.booking_id,
      }));

      setNotifications(bookingNotifications);
      setUnreadNotifications(
        bookingNotifications.filter((n) => !n.read).length
      );
    }
  }, [bookings]);

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const markAllNotificationsAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
    setUnreadNotifications(0);
  };

  return (
    <div className="relative" ref={notificationRef}>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell className="h-6 w-5" />
        {unreadNotifications > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadNotifications}
          </span>
        )}
      </Button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 overflow-hidden">
          <div className="p-3 border-b flex justify-between items-center">
            <h3 className="font-semibold">Booking Notifications</h3>
            {unreadNotifications > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7"
                onClick={markAllNotificationsAsRead}
              >
                Mark all as read
              </Button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-b hover:bg-gray-50 ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start">
                    <div className="rounded-full p-2 mr-3 bg-blue-100 text-blue-600">
                      <Bell size={16} />
                    </div>
                    <div>
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No booking notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
