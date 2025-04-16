import axios from "axios";
import { useEffect, useState } from "react";

function SavedPGDetails() {
  const [pgData, setPgData] = useState([]);

  useEffect(() => {
    axios
      .get("https://findmypg-i01x.onrender.com/api/get_saved_pgs", {
        headers: {
          user_id: 36,
        },
      })
      .then((response) => {
        console.log("✅ Got response:", response.data);
        setPgData(response.data.savedPGs);
      })
      .catch((error) => {
        console.error("❌ API call failed:", error);
      });
  }, []);

  return (
    <div>
      <h2>Saved PGs</h2>
      <pre>{JSON.stringify(pgData, null, 2)}</pre>
    </div>
  );
}

export default SavedPGDetails;
