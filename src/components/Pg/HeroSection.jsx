
import SearchBar from './SearchBar';
const HeroSection = () =>{


    return (
        <section className="relative mt-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-[500px] flex items-center">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect PG Accommodation</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover comfortable and affordable PG accommodations across India with verified listings and detailed
              information.
            </p>

            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>
    )
}

export default HeroSection;