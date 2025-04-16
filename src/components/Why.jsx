// import myImag from "./assets/WHY.png"
// const Why = () => {
//   return (
//     <div className=" mx-56 my-10 ">
//       <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
//         Why FindMyPG?
//       </h2>
//       <section className="py-10 ">
//         <div className="container  px-6 flex flex-col lg:flex-row items-center justify-evenly ">
//           <div className="lg:w-1/2 mt-6 lg:mt-0 mr-20">
//             <img
//               // src="https://cdni.iconscout.com/illustration/premium/preview/user-profile-illustration-download-in-svg-png-gif-file-formats--media-edit-image-onboarding-pack-business-illustrations-4849068.png?f=webp&h=1400" // Replace with your image path
//               src={myImag}
//               alt="Hero Illustration"
//               className="w-full"
//             />
//           </div>

//           <div className="grid grid-cols-1 gap-12">
//             <div className="flex flex-row ml-20 ">
//               <i className="text-blue-500 fas fa-building text-6xl mb-4 mx-4 p-2 w-15 h-15"></i>
//               <div>
//                 <h3 className="text-lg font-bold text-gray-700 ">
//                   Verified Properties
//                 </h3>
//                 <p className="text-gray-600">
//                   Choose from thousands of verified properties with ease.
//                 </p>
//               </div>
//             </div>
//             <div className="flex flex-row  ml-20">
//               <i className="text-green-500 fas fa-dollar-sign text-6xl mb-4 mx-4 p-2 w-15 h-15"></i>
//               <div>
//                 <h3 className="text-lg font-bold text-gray-700">
//                   Budget Friendly
//                 </h3>
//                 <p className="text-gray-600">
//                   No brokerage fees, no hidden costs. Best prices guaranteed.
//                 </p>
//               </div>
//             </div>
//             <div className="flex flex-row   ml-20">
//               <i className="text-yellow-500 fas fa-shield-alt text-[3.2rem] mb-4 mx-4 p-2 w-15 h-15"></i>
//               <div>
//                 <h3 className="text-lg font-bold text-gray-700">
//                   Safety & Security
//                 </h3>
//                 <p className="text-gray-600">
//                   Round-the-clock security for your peace of mind.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaBuilding, FaMapMarkedAlt, FaMapMarkerAlt, FaSearch } from "react-icons/fa";


function Why() {
  return (
    <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose FindMyPG?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <FaBuilding className="text-blue-600 text-2xl" />
          </div>
          <h3 className="text-xl font-bold">Verified Listings</h3>
          <p className="text-gray-600">
            All our PG accommodations are personally verified to ensure quality and accuracy.
          </p>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <FaSearch className="text-purple-600 text-2xl" />
          </div>
          <h3 className="text-xl font-bold">Easy Search</h3>
          <p className="text-gray-600">Find the perfect PG based on location, budget, amenities, and more.</p>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <FaMapMarkerAlt className="text-green-600 text-2xl" />
          </div>
          <h3 className="text-xl font-bold">Detailed Information</h3>
          <p className="text-gray-600">
            Get comprehensive details about each PG including facilities, rules, and charges.
          </p>
        </Card>
      </div>
    </div>
  </section>

  )
}

export default Why;
