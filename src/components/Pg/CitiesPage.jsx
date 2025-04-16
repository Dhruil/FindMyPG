import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
import { useEffect } from "react";

// List of cities with their details
const cities = [
  {
    name: "New Delhi",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop",
    count: 6,
    state: "Delhi",
    description:
      "The capital city with a blend of historical monuments and modern infrastructure.",
  },
  {
    name: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1562979314-bee7453e911c?q=80&w=1000&auto=format&fit=crop",
    count: 5,
    state: "Maharashtra",
    description:
      "The financial capital of India with vibrant city life and coastal beauty.",
  },
  {
    name: "Bengaluru",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1000&auto=format&fit=crop",
    count: 2,
    state: "Karnataka",
    description:
      "India's Silicon Valley with pleasant weather and tech-friendly environment.",
  },
  {
    name: "Hyderabad",
    image:
      "https://images.unsplash.com/photo-1626014303757-6366ef55c4ab?q=80&w=1000&auto=format&fit=crop",
    count: 0,
    state: "Telangana",
    description:
      "The city of pearls with a perfect blend of traditional and modern culture.",
  },
  {
    name: "Chennai",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000&auto=format&fit=crop",
    count: 0,
    state: "Tamil Nadu",
    description:
      "A major cultural and economic center in South India with beautiful beaches.",
  },
  {
    name: "Kolkata",
    image:
      "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1000&auto=format&fit=crop",
    count: 0,
    state: "West Bengal",
    description:
      "The cultural capital of India with rich heritage and intellectual history.",
  },
  {
    name: "Pune",
    image:
      "https://images.unsplash.com/photo-1609740537912-cc6655007aa5?q=80&w=1974&auto=format&fit=crop",
    count: 0,
    state: "Maharashtra",
    description:
      "A city known for its educational institutions and pleasant climate.",
  },
  {
    name: "Ahmedabad",
    image:
      "https://images.unsplash.com/photo-1609948543911-7f01ff385be5?q=80&w=1000&auto=format&fit=crop",
    count: 5,
    state: "Gujarat",
    description:
      "A rapidly growing city with rich cultural heritage and industrial growth.",
  },
  {
    name: "Jaipur",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop",
    count: 0,
    state: "Rajasthan",
    description:
      "The Pink City known for its stunning architecture and royal heritage.",
  },
  {
    name: "Lucknow",
    image:
      "https://plus.unsplash.com/premium_photo-1697729447666-c39f50d595ea?q=80&w=2071&auto=format&fit=crop",
    count: 0,
    state: "Uttar Pradesh",
    description:
      "The city of Nawabs with rich cultural heritage and exquisite cuisine.",
  },
  {
    name: "Chandigarh",
    image:
      "https://images.unsplash.com/photo-1614687345141-7c9e45e3b223?q=80&w=1974&auto=format&fit=crop",
    count: 0,
    state: "Punjab & Haryana",
    description:
      "A well-planned city with modern architecture and beautiful gardens.",
  },
  {
    name: "Bhopal",
    image:
      "https://plus.unsplash.com/premium_photo-1697730350965-9f1b6d4a6319?q=80&w=2070&auto=format&fit=crop",
    count: 0,
    state: "Madhya Pradesh",
    description:
      "The City of Lakes with a blend of natural beauty and historical significance.",
  },
];

function CitiesPage() {
  useEffect(() => {
    window.scrollTo(top);
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mt-15 mx-auto px-15 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Explore PG Accommodations by City
          </h1>
          <p className="text-gray-600">
            Find the perfect PG accommodation in your preferred city. We have
            verified listings across major cities in India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link
              to={`/city/${city.name.toLowerCase().replace(/\s+/g, "-")}`}
              key={city.name}
            >
              <Card className="overflow-hidden h-full space-y-[-1em] py-0 hover:shadow-lg transition-transform hover:scale-105">
                <div className="relative h-48 aspect-video">
                  <img
                    src={city.image || `/placeholder.svg?height=200&width=300`}
                    alt={city.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[rgb(0,0,0,.4)] flex flex-col justify-end p-4">
                    <h3 className="text-white text-xl font-bold">
                      {city.name}
                    </h3>
                    <div className="flex items-center mt-1 text-white text-sm">
                      <FaMapMarkerAlt className="mr-1 " />
                      <span>{city.state}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-blue-600">
                      <FaBuilding className="mr-1" />
                      <span className="font-semibold">
                        {city.count} PGs available
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {city.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default CitiesPage;
