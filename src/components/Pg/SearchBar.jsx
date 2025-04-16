import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch, FaMapMarkerAlt, FaBuilding, FaCity } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { addDetails, removeDetails } from "../../utils/pgSlice";

// Sample data for suggestions
// const suggestions = [
//   { type: "city", name: "New Delhi", state: "Delhi" },
//   { type: "city", name: "Mumbai", state: "Maharashtra" },
//   { type: "city", name: "Bangalore", state: "Karnataka" },
//   { type: "city", name: "Hyderabad", state: "Telangana" },
//   { type: "city", name: "Chennai", state: "Tamil Nadu" },
//   { type: "area", name: "Saket", city: "New Delhi", state: "Delhi" },
//   { type: "area", name: "Koramangala", city: "Bangalore", state: "Karnataka" },
//   {
//     type: "area",
//     name: "Banjara Hills",
//     city: "Hyderabad",
//     state: "Telangana",
//   },
//   { type: "pg", name: "South Delhi Boys PG", area: "Saket", city: "New Delhi" },
//   { type: "pg", name: "Comfort PG", area: "Andheri", city: "Mumbai" },
//   { type: "pg", name: "Student Haven", area: "Koramangala", city: "Bangalore" },
// ];
// const generateSuggestions = (pgData) => {
//   const suggestions = [];
//   const uniqueCities = new Set();
//   const uniqueAreas = new Set();
//   const uniquePGs = new Set();
//   const uniqueStates = new Set();

//   pgData.forEach((pg) => {
//     // Add city if not already added
//     if (pg.state && !uniqueStates.has(pg.state)) {
//       uniqueStates.add(pg.state);
//       suggestions.push({ type: "state", name: pg.state });
//     }

//     if (pg.city && !uniqueCities.has(pg.city)) {
//       uniqueCities.add(pg.city);
//       suggestions.push({ type: "city", name: pg.city, state: pg.state });
//     }

//     // Add area if not already added
//     if (pg.area && !uniqueAreas.has(pg.area)) {
//       uniqueAreas.add(pg.area);
//       suggestions.push({
//         type: "area",
//         name: pg.area,
//         city: pg.city,
//         state: pg.state,
//       });
//     }

//     // Add PG name if not already added
//     if (pg.pg_name && !uniquePGs.has(pg.pg_name)) {
//       uniquePGs.add(pg.pg_name);
//       suggestions.push({
//         type: "pg",
//         name: pg.pg_name,
//         id: pg.pg_id,
//         area: pg.area,
//         city: pg.city,
//       });
//     }
//   });

//   return suggestions;
// };
const generateSuggestions = (pgData) => {
  const uniqueStates = new Set();
  const uniqueCities = new Set();
  const uniqueAreas = new Set();
  const uniquePGs = new Set();

  const stateSuggestions = [];
  const citySuggestions = [];
  const areaSuggestions = [];
  const pgSuggestions = [];

  pgData.forEach((pg) => {
    // Collect unique states first
    if (pg.state && !uniqueStates.has(pg.state)) {
      uniqueStates.add(pg.state);
      stateSuggestions.push({ type: "state", name: pg.state });
    }

    // Collect unique cities
    if (pg.city && !uniqueCities.has(pg.city)) {
      uniqueCities.add(pg.city);
      citySuggestions.push({ type: "city", name: pg.city, state: pg.state });
    }

    // Collect unique areas
    if (pg.area && !uniqueAreas.has(pg.area)) {
      uniqueAreas.add(pg.area);
      areaSuggestions.push({
        type: "area",
        name: pg.area,
        city: pg.city,
        state: pg.state,
      });
    }

    // Collect unique PGs
    if (pg.pg_name && !uniquePGs.has(pg.pg_name)) {
      uniquePGs.add(pg.pg_name);
      pgSuggestions.push({
        type: "pg",
        name: pg.pg_name,
        id: pg.pg_id,
        area: pg.area,
        city: pg.city,
      });
    }
  });

  // Ensure the order: First states → cities → areas → PGs
  return [
    ...stateSuggestions,
    ...citySuggestions,
    ...areaSuggestions,
    ...pgSuggestions,
  ];
};

function SearchBar() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const pgData = useSelector((store) => store.pgDetails.details);
  console.log(pgData);
  // Update suggestions when pgData changes
  useEffect(() => {
    if (pgData && pgData.length > 0) {
      setSuggestions(generateSuggestions(pgData[0]));
      console.log(suggestions);
    }
  }, [pgData]);
  useEffect(() => {
    // Filter suggestions based on query
    if (query.length > 1) {
      const filtered = suggestions.filter(
        (suggestion) =>
          suggestion.name.toLowerCase().includes(query.toLowerCase()) ||
          (suggestion.city &&
            suggestion.city.toLowerCase().includes(query.toLowerCase())) ||
          (suggestion.state &&
            suggestion.state.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  useEffect(() => {
    // Close suggestions when clicking outside
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === "city") {
      navigate(`/city/${suggestion.name.toLowerCase().replace(/\s+/g, "-")}`);
    } else if (suggestion.type === "area") {
      navigate(
        `/search?area=${encodeURIComponent(
          suggestion.name
        )}&city=${encodeURIComponent(suggestion.city)}`
      );
    } else if (suggestion.type === "pg") {
      // Assuming pg_id would be available in a real implementation
      navigate(`/pg/${suggestion.id}`); // Using the sample PG ID from the data
    } else if (suggestion.type === "state") {
      navigate(`/search?q=${encodeURIComponent(suggestion.name)}`);
    }
    setShowSuggestions(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by city, area or PG name"
            className="pl-10 py-6 text-gray-800"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 1 && setShowSuggestions(true)}
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white py-6 w-1/5   "
        >
          <FaSearch className="mr-2" /> Search
        </Button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2  text-gray-500 hover:bg-blue-50 cursor-pointer flex overflow-hidden"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.type === "state" && (
                  <>
                    <FaMapMarkerAlt className="text-red-500 mr-2 mt-1" />
                    <div className="overflow-hidden">
                      <span className="font-medium">{suggestion.name}</span>
                    </div>
                  </>
                )}
                {suggestion.type === "city" && (
                  <>
                    <FaMapMarkerAlt className="text-blue-500 mr-2 mt-1" />
                    <div className="overflow-hidden">
                      <span className="font-medium">{suggestion.name}</span>
                      <span className="text-gray-500 text-sm ml-2">
                        {suggestion.state}
                      </span>
                    </div>
                  </>
                )}
                {suggestion.type === "area" && (
                  <>
                    <FaCity className="text-green-500 mr-2 mt-1" />
                    <div className="overflow-hidden">
                      <span className="font-medium">{suggestion.name}</span>
                      <span className="text-gray-500 text-sm ml-2">
                        {suggestion.city}, {suggestion.state}
                      </span>
                    </div>
                  </>
                )}
                {suggestion.type === "pg" && (
                  <>
                    <FaBuilding className="text-purple-500 mr-2 mt-1" />
                    <div className="overflow-hidden">
                      <span className="font-medium">{suggestion.name}</span>
                      <span className="text-gray-500 text-sm ml-2">
                        {suggestion.area}, {suggestion.city}
                      </span>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Example Usage

export default SearchBar;
