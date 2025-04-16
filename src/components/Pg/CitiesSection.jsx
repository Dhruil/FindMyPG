 import { Link } from "react-router-dom";
 import { Card } from "@/components/ui/card"
const popularCities = [
    {
      name: "New Delhi",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop",
      count: 6,
    },
    {
      name: "Mumbai",
      image: "https://images.unsplash.com/photo-1562979314-bee7453e911c?q=80&w=1000&auto=format&fit=crop",
      count: 5,
    },
    {
      name: "Bengaluru",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1000&auto=format&fit=crop",
      count: 2,
    },
    {
      name: "Hyderabad",
      image: "https://images.unsplash.com/photo-1626014303757-6366ef55c4ab?q=80&w=1000&auto=format&fit=crop",
      count: 0,
    },
    {
      name: "Chennai",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000&auto=format&fit=crop",
      count: 0,
    },
    {
      name: "Kolkata",
      image: "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1000&auto=format&fit=crop",
      count: 0,
    },
    {
      name: "Pune",
      image: "https://www.mkgandhi.org/images/agakhan.jpg",
      count: 0,
    },
    {
      name: "Ahmedabad",
      image: "https://images.unsplash.com/photo-1609948543911-7f01ff385be5?q=80&w=1000&auto=format&fit=crop",
      count: 5,
    },
  ]
 const CitiesSection =  () =>{

    return (

        <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Cities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {popularCities.map((city) => (
              <Link to={`/city/${city.name.toLowerCase().replace(/\s+/g, "-")}`} key={city.name}>
                <Card className="overflow-hidden transition-transform py-0 hover:scale-105 hover:shadow-lg">
                  <div className="relative h-48 aspect-video">
                    <img
                      src={city.image || `/placeholder.svg?height=200&width=300`}
                      alt={city.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0  bg-[rgb(0,0,0,0.4)] bg-opacity-40  flex flex-col justify-end p-4">
                      <h3 className="text-white text-xl font-bold">{city.name}</h3>
                      <p className="text-white text-sm">{city.count} PGs available</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    )
 }

 export default CitiesSection;