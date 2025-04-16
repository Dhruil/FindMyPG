import { useEffect } from "react";

import OwnerProfile from "./OwnerProfile";
import { PgListing } from "./PgNew/Pg_listing";
import BookingReq from "./Pg/OwnerDashbaoard";
function OwnerDashboard() {
  useEffect(() => window.scrollTo(top), []);

  return (
    <>
      <div className="max-w-4/5 mx-auto mt-22 bg-white p-8 rounded-lg">
        {/* <OwnerProfile/>
      <PgListing/> */}
        <BookingReq />
      </div>
    </>
  );
}

export default OwnerDashboard;
