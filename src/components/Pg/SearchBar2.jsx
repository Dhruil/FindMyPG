import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch, FaMapMarkerAlt, FaBuilding, FaCity } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addDetails, removeDetails } from "../../utils/pgSlice";

// Function to generate dynamic suggestions
const generateSuggestions = (pgData) => {
    const suggestions = [];
  
    // Extract unique states and cities
    const uniqueStates = new Set();
    const uniqueCities = new Set();
    const uniqueAreas = new Set();
  
    pgData.forEach((pg) => {
      uniqueStates.add(pg.state);
      uniqueCities.add(pg.city);
      uniqueAreas.add(pg.area);
  
      // Add PGs with ID for navigation
      suggestions.push({
        type: "pg",
        name: pg.pg_name,
        id: pg.pg_id, // Include ID for navigation
        area: pg.area,
        city: pg.city,
      });
    });
  
    // Add states
    uniqueStates.forEach((state) =>
      suggestions.push({ type: "state", name: state })
    );
  
    // Add cities
    uniqueCities.forEach((city) =>
      suggestions.push({ type: "city", name: city })
    );
  
    // Add areas
    uniqueAreas.forEach((area) =>
      suggestions.push({ type: "area", name: area })
    );
  
    return suggestions;
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

  // Filter suggestions based on user input
  useEffect(() => {
    if (query.length > 1) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query, suggestions]);

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
        navigate(`/pg/${suggestion.id}`);
    } else if(suggestion.type === "state"){
      navigate(`/search?q=${encodeURIComponent(suggestion.state)}`);
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
          className="bg-blue-600 hover:bg-blue-700 text-white py-6 w-1/5"
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
                className="px-4 py-2 text-gray-500 hover:bg-blue-50 cursor-pointer flex overflow-hidden"
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

export default SearchBar;
