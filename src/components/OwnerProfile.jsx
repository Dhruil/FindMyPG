import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaSave, FaTimes, FaCamera, FaSpinner } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "./context/AuthContext";
import { addOwner, removeOwner } from "../utils/ownerSlice";
import Notification from "./Pg/Notification";

function OwnerProfile({ bookings }) {
  const { user, login } = useAuth();
  const [details, setDetails] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatar, setAvatar] = useState(details.image);
  console.log("avatar1 :", avatar);
  const dispatch = useDispatch();
  console.log(bookings);
  useEffect(() => {
    dispatch(removeOwner());
    dispatch(addOwner(details));
  }, [saving]);
  const data = useSelector((store) => store.owner.owner);
  console.log(data);

  // const [details, setDetails] = useState({
  //   name: "John Doe",
  //   mobile: "9876543210",
  //   email: "john.doe@example.com",
  //   password: "1234567890",
  //   no_of_pg_hold: "3",
  //   gender: "Male",
  //   aadhar_card: "1234-5678-9012",
  //   address: {
  //     residence_name: "Greenwood Residency",
  //     street: "123 Main Street",
  //     area: "Downtown",
  //     city: "New York",
  //     state: "NY",
  //     zip: "10001",
  //   },
  // });
  const [originalDetails, setOriginalDetails] = useState({ ...details });
  const [originalAvatar, setOriginalAvatar] = useState(avatar);
  const [showPassword, setShowPassword] = useState(false);

  const updateOwnerDetails = async (formData) => {
    try {
      const response = await axios.post(
        "https://findmypg-i01x.onrender.com/api/updateOwner",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Response:", response.data);
      if (response.data.owner) login(response.data.owner);
      // localStorage.setItem("owner", JSON.stringify(response.data.owner));
    } catch (error) {
      console.error("Error updating owner details:", error);
    }
  };

  // Call the function

  const handleEditClick = () => {
    // setOriginalDetails({ ...details });
    setOriginalAvatar(avatar);
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setSaving(true);

    const formData = new FormData();
    formData.append("id", details.id);
    formData.append("name", details.name);
    formData.append("mobile", details.mobile);
    formData.append("email", details.email);
    formData.append("password", details.password);
    formData.append("no_of_pg_hold", details.no_of_pg_hold);
    formData.append("gender", details.gender);
    formData.append("aadhar_card", details.aadhar_card);
    formData.append("residence_name", details.address.residence_name);
    formData.append("street", details.address.street);
    formData.append("area", details.address.area);
    formData.append("city", details.address.city);
    formData.append("state", details.address.state);
    formData.append("zip", details.address.zip);

    if (avatar) {
      formData.append("avatar", details.image); // Attach the image file
    }

    await new Promise((resolve) => {
      updateOwnerDetails(formData);
      setTimeout(resolve, 1000);
    });
    setSaving(false);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setDetails({ ...originalDetails });
    setAvatar(originalAvatar);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleGenderChange = (value) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      gender: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { id, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      address: { ...prevDetails.address, [id]: value },
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    console.log("/uploads/" + file.name);
    if (file) {
      // setAvatar("/uploads/" + file.name);
      setDetails((prevDetails) => ({
        ...prevDetails,
        image: file,
      }));
      setAvatar(URL.createObjectURL(file));

      console.log("image :", details.image);
      console.log("avatar :", avatar);
    }
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row">
      <div className="flex flex-col items-center md:w-1/3 mb-6 md:mb-0 relative">
        <img
          alt="Cartoon avatar of a person with heart eyes"
          className="w-48 h-48 rounded-full mb-4"
          src={avatar}
        />
        {isEditing && (
          <label className="absolute bottom-120 right-25 bg-blue-500 p-2 rounded-2xl cursor-pointer text-white hover:bg-blue-600">
            <FaCamera />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        )}
        <h2 className="text-xl font-semibold mt-4">{details.name}</h2>
        <p className="text-gray-500">PG Owner</p>
      </div>
      <div className="md:w-2/3 md:pl-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Owner Details</h2>
          <div className="flex items-center space-x-4 justify-end">
            <Notification />

            {!isEditing ? (
              <button
                className="bg-blue-600 text-white border flex items-center gap-2 px-3 py-1 rounded-md hover:bg-blue-700 hover-scale-up"
                onClick={handleEditClick}
              >
                <FaEdit />
                Edit
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  className="bg-white text-black border border-black flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-200 hover-scale-up"
                  onClick={handleCancelClick}
                >
                  <FaTimes /> Cancel
                </button>
                <button
                  className="bg-blue-600 text-white flex items-center gap-2 px-3 py-1 rounded-md hover:bg-blue-700 hover-scale-up"
                  onClick={handleSaveClick}
                >
                  {saving ? (
                    <>
                      <FaSpinner className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <FaSave /> Save
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              className={`w-full border border-gray-300 rounded-md p-2 outline-none ${
                isEditing
                  ? "bg-white focus:border-blue-500 focus:ring-blue-300 focus:ring-1 "
                  : "bg-gray-100"
              }`}
              id="name"
              type="text"
              value={details.name}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700">Mobile Number</label>
            <input
              className={`w-full border border-gray-300 rounded-md p-2 outline-none ${
                isEditing
                  ? "bg-white focus:border-blue-500 focus:ring-blue-300 focus:ring-1 "
                  : "bg-gray-100"
              }`}
              id="mobile"
              type="text"
              value={details.mobile}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              className={`w-full border border-gray-300 rounded-md p-2 outline-none ${
                isEditing
                  ? "bg-white focus:border-blue-500 focus:ring-blue-300 focus:ring-1 "
                  : "bg-gray-100"
              }`}
              id="email"
              type="text"
              value={details.email}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                className={`w-full border border-gray-300 rounded-md p-2 outline-none ${
                  isEditing
                    ? "bg-white focus:border-blue-500 focus:ring-blue-300 focus:ring-1 "
                    : "bg-gray-100"
                }`}
                id="password"
                type={showPassword ? "text" : "password"}
                value={details.password}
                onChange={handleChange}
                readOnly={!isEditing}
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <button onClick={handleTogglePassword}>
                  <i
                    className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}
                  ></i>
                </button>
              </span>
            </div>
          </div>
          <div>
            <label className="block text-gray-700">No. of PG Hold</label>
            <input
              className={`w-full border border-gray-300 rounded-md p-2 outline-none ${
                isEditing
                  ? "bg-white focus:border-blue-500 focus:ring-blue-300 focus:ring-1 "
                  : "bg-gray-100"
              }`}
              id="no_of_pg_hold"
              type="text"
              value={details.no_of_pg_hold}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700">Gender</label>
            {isEditing ? (
              <Select value={details.gender} onValueChange={handleGenderChange}>
                <SelectTrigger className="w-full border border-gray-300 rounded-md py-5 text-sm focus:border-blue-500 focus:ring-blue-300">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="w-full border border-gray-300  p-2 rounded-md bg-gray-100">
                {details.gender}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700">Aadhar Card</label>
            <input
              className={`w-full border border-gray-300 rounded-md p-2 outline-none ${
                isEditing
                  ? "bg-white focus:border-blue-500 focus:ring-blue-300 focus:ring-1 "
                  : "bg-gray-100"
              }`}
              id="aadhar_card"
              type="text"
              value={details.aadhar_card}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
        </div>
        <div className="mt-4">
          <h3
            className={`block text-gray-700 ${
              isEditing && "font-semibold text-lg"
            } `}
          >
            Address
          </h3>
          {!isEditing ? (
            <p className="bg-gray-100 p-2 border border-gray-300 rounded-md">
              {Object.values(details.address).join(", ")}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {Object.keys(details.address).map((key) => (
                <div key={key}>
                  <label className="block text-gray-700 capitalize">
                    {key.replace("_", " ")}
                  </label>
                  <input
                    className="w-full border border-gray-300 outline-none p-2 rounded-md focus:border-blue-500 focus:ring-blue-300 focus:ring-1"
                    id={key}
                    type="text"
                    value={details.address[key]}
                    onChange={handleAddressChange}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OwnerProfile;
