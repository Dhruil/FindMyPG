import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import OwnerProfile from "../OwnerProfile";
import { PgListing } from "../PgNew/Pg_listing";
import BookingReq from "./BookingReq";

export default function OwnerDashbaoard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [bookings, setBookings] = useState([]);
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
    window.scroll(top);
    fetchBookingsForOwner(user.id);
    console.log(bookings);
  }, [user]);

  console.log(bookings);
  return (
    <div className="container max-w-4/5 mx-auto mt-22 rounded-lg">
      {bookings && <OwnerProfile bookings={bookings} />}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="my-8">
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 text-gray-600">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-white data-[state=active]:text-black p-1"
          >
            PG Listings
          </TabsTrigger>
          <TabsTrigger
            value="bookings"
            className="data-[state=active]:bg-white data-[state=active]:text-black p-1"
          >
            Booking Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <PgListing />
        </TabsContent>

        <TabsContent value="bookings">
          <BookingReq booking={bookings} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
