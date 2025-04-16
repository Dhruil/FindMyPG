import { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(top);
  }, []);
  return (
    <div className="p-8 bg-indigo-50 px-40">
      {/* Header Section */}
      <section className="text-center my-14">
        <h1 className="text-5xl font-extrabold text-indigo-700">About Us</h1>
        <p className="text-indigo-900 mt-6 max-w-4xl mx-auto text-lg leading-relaxed">
          Book My PG is a technology-driven platform for booking PGs, serviced
          apartments, shared flats, and rooms. Users can filter accommodations
          by location, IT parks, landmarks, price, room type, amenities, gender,
          and food preferences. Currently operational in Chennai, Coimbatore,
          and Bangalore, we aim to expand to all major cities in the country.
        </p>
      </section>

      {/* Who We Are Section */}
      <section className="flex flex-col lg:flex-row items-center mb-16">
        <div className="lg:w-1/2">
          <img
            src="https://bookmypg.co.in/assets/front/images/about-01.jpg" // Replace with your image URL
            alt="Who We Are"
            className="rounded-xl shadow-lg object-cover w-full h-full"
          />
        </div>
        <div className="lg:w-1/2 lg:ml-12 mt-8 lg:mt-0">
          <h2 className="text-4xl font-bold text-indigo-700">Who We Are?</h2>
          <p className="text-indigo-900 mt-6 text-lg leading-relaxed">
            We are a dedicated team passionate about providing quality and
            reliable living spaces for our users. Our journey began with a
            mission to bridge the gap between homeowners and tenants, ensuring a
            seamless connection that prioritizes comfort, safety, and
            convenience. By leveraging cutting-edge technology and a deep
            understanding of our users' needs, we aim to redefine how people
            find their ideal homes away from home.
          </p>
          <p className="text-indigo-900 mt-4 text-lg leading-relaxed">
            Every accommodation listed on our platform goes through a rigorous
            selection process to ensure it meets our standards of safety,
            hygiene, and hospitality. Our team works tirelessly to make the
            experience as smooth as possible for both guests and homeowners.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center mb-16">
        <div className="lg:w-1/2 lg:mr-12 mt-8 lg:mt-0">
          <h2 className="text-4xl font-bold text-indigo-700">What We Do?</h2>
          <p className="text-indigo-900 mt-6 text-lg leading-relaxed">
            At Book My PG, we simplify the search for quality accommodations by
            curating a comprehensive list of options tailored to your
            preferences. From budget-friendly shared spaces to premium serviced
            apartments, we cater to a diverse range of needs. Our platform
            allows users to easily filter and compare properties, ensuring they
            find the perfect fit.
          </p>
          <p className="text-indigo-900 mt-4 text-lg leading-relaxed">
            Additionally, we tackle common challenges faced by both guests and
            homeowners. For guests, we provide verified and detailed listings to
            eliminate uncertainties and ensure a hassle-free move. For
            homeowners, we offer a reliable platform to connect with potential
            tenants, minimizing vacancies and maximizing trust.
          </p>
        </div>
        <div className="lg:w-1/2">
          <img
            src="https://bookmypg.co.in/assets/front/images/about-02.jpg" // Replace with your image URL
            alt="What We Do"
            className="rounded-xl shadow-lg object-cover w-150 h-100"
          />
        </div>
      </section>

      {/* Aiming Section */}
      <section className="text-center mb-16">
        <h2 className="text-4xl font-bold text-indigo-700">
          What Are We Aiming At?
        </h2>
        <p className="text-indigo-900 mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
          Our mission is simple: to provide guests with a PG that feels like
          home and aligns with their needs while ensuring homeowners find
          tenants who fit perfectly. By prioritizing safety, quality, and
          satisfaction, we promise a seamless experience for all parties
          involved.
        </p>
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-12 bg-indigo-200 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-indigo-700">
          Ready to Find Your Perfect PG?
        </h2>
        <p className="text-indigo-900 mt-4 text-lg">
          Join our platform today and discover a wide range of verified
          accommodations tailored to your needs.
        </p>
        <button className="mt-6 px-6 py-3 bg-indigo-700 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-800 transition duration-200">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
