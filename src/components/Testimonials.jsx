import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Vikram Singh",
    text: "FindMyPG saved me from endless searches! I found a great boys’ PG near my college in Kharadi with AC and Wi-Fi. The app’s filters made it so easy—highly recommend it to anyone in Pune!",
    location: "Kharadi",
    city: "Pune",
    state: "Maharashtra",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    name: "Anjali Nair",
    text: "Moving to Bengaluru was stressful, but FindMyPG helped me find a safe girls’ PG in Koramangala with CCTV and home-cooked meals. It’s the best app for quick and reliable options!",
    location: "Koramangala",
    city: "Bengaluru",
    state: "Karnataka",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    name: "Arjun Reddy",
    text: "I needed a PG near my office in Madhapur, and FindMyPG delivered! Got a single room with all amenities at a decent price. This app is a must-have for anyone relocating to Hyderabad.",
    location: "Madhapur",
    city: "Hyderabad",
    state: "Telangana",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    name: "Pooja Gupta",
    text: "FindMyPG made finding a PG in Delhi so smooth! I got a spacious girls’ PG in Saket with laundry and power backup. The detailed listings really helped me decide—awesome app!",
    location: "Saket",
    city: "Delhi",
    state: "Delhi",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    name: "Siddharth Bose",
    text: "Relocating to Kolkata for work was a breeze thanks to FindMyPG. Found a budget-friendly boys’ PG in Salt Lake with good food and connectivity. Can’t ask for a better tool!",
    location: "Salt Lake",
    city: "Kolkata",
    state: "West Bengal",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    name: "Lakshmi Iyer",
    text: "FindMyPG is a lifesaver for students like me! I found a cozy PG near Anna Nagar in Chennai with all the details upfront—price, location, and photos. Totally recommend it!",
    location: "Anna Nagar",
    city: "Chennai",
    state: "Tamil Nadu",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
  },
];
  const MAX_LENGTH = 100; // Adjust character limit as needed

  const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [expanded, setExpanded] = useState({});
  
    const toggleReadMore = (index) => {
      setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
    };
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 2 : prevIndex - 2
      );
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= testimonials.length - 2 ? 0 : prevIndex + 2
      );
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        handleNext();
      }, 10000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <>
        <h2 className="text-center text-3xl font-bold text-gray-800 my-8">
          Why FindMyPG?
        </h2>
        <div className="flex items-center justify-center space-x-4 my-5">
          <button
            onClick={handlePrev}
            className="bg-blue-600 text-white p-2 text-sm w-10"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="flex space-x-4">
            {testimonials
              .slice(currentIndex, currentIndex + 2)
              .map((testimonial, index) => {
                const isExpanded = expanded[index] || false;
                const text =
                  testimonial.text.length > MAX_LENGTH && !isExpanded
                    ? `${testimonial.text.substring(0, MAX_LENGTH)}...`
                    : testimonial.text;
  
                return (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md w-96">
                    <div className="flex items-center space-x-4">
                      <img
                        src={testimonial.image}
                        alt={`Profile picture of ${testimonial.name}`}
                        className="w-16 h-16 rounded-full"
                      />
                      <div className="flex items-center">
                        <i className="fas fa-star text-yellow-500"></i>
                        <i className="fas fa-star text-yellow-500"></i>
                        <i className="fas fa-star text-yellow-500"></i>
                        <i className="fas fa-star text-yellow-500"></i>
                        <i className="fas fa-star text-yellow-500"></i>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-700">{text}</p>
                    {testimonial.text.length > MAX_LENGTH && (
                      <button
                        className="text-blue-600 font-semibold mt-2"
                        onClick={() => toggleReadMore(index)}
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}
                    <p className="mt-4 text-right text-blue-900 font-semibold">
                      - {testimonial.name}
                    </p>
                  </div>
                );
              })}
          </div>
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white p-2 text-sm w-10"
          >
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </>
    );
  };
  

export default Testimonials;
