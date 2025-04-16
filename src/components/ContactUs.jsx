import { useEffect } from "react";
function ContactUs() {
  useEffect(() => {
    window.scrollTo(top);
  }, []);
  return (
    <div className="">
      {/* Header Section */}
      <section className="text-center mt-22 m-8">
        <h1 className="text-5xl font-extrabold text-indigo-700">Contact Us</h1>
        <p className="text-gray-800 mt-6 max-w-4xl mx-auto text-lg leading-relaxed">
          We’d love to hear from you! Whether you have a question about our
          services, need assistance, or want to provide feedback, our team is
          here to help.
        </p>
      </section>
      <div className="bg-white flex items-center justify-center min-h-screen">
        <div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-center">
          <div className="w-2/3 bg-gray-50 shadow-lg rounded-lg p-8">
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-md font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-md font-medium text-gray-700"
                >
                  Phone number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Mobile"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-md font-medium text-gray-700"
                >
                  City name
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City Name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-md font-medium text-gray-700"
                >
                  Property/Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Property/Company Name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-md font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-md font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more..."
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="container mx-auto flex flex-col  justify-evenly text-center ">
          <div className="w-2/3 flex">
            <img
              src="https://img.freepik.com/free-vector/contact-center-abstract-concept_335657-3032.jpg?t=st=1739213946~exp=1739217546~hmac=3e81aeda02f229fe4b2771dc507b325ada82b7d25b6e938f353c228baccd252c&w=740"
              alt="Illustration of a woman standing next to a large yellow envelope with a letter inside"
              className=""
              width="600"
              height="600"
            />
          </div>
          <div className="flex items-start space-x-3">
            <i className="fas fa-phone-alt text-blue-600 text-lg p-1"></i>
            <span className="text-lg">+91 9876543210</span>
          </div>

          <div className="flex items-center space-x-3 mt-2">
            <i className="fas fa-envelope text-blue-600 text-lg p-1"></i>
            <span className="text-lg">support@findmypg.com</span>
          </div>

          <div className="flex items-start space-x-3 mt-2">
            <i className="fas fa-map-marker-alt text-blue-600 text-lg p-1"></i>
            <span className="pl-1 text-lg w-3/4 text-left">
              205, Ashram Road, Navrangpura, Ahmedabad, Gujarat 380009, India
            </span>
          </div>
        </div>
      </div>
      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">
          Our Location
        </h2>
        <div className="mx-auto w-3/4 h-96 rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps?q=205+Ashram+Road,+Navrangpura,+Ahmedabad,+Gujarat+380009&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
