import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
export function AddRoom() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    pg_id: id,
    room_type: "",
    available_room: "",
    room_size: "",
    person_type: "",
    gender: "",
    no_of_rooms: "",
    rent: "",
  });
  const [roomFacilities, setRoomFacilities] = useState({
    ac: false,
    tv: false,
    wifi: false,
    fridge: false,
    attached_bathroom: false,
    attached_toilets: false,
    balcony: false,
    wardrobe: false,
    safety_locker: false,
    study_table: false,
    mattress: false,
    bed_sheets: false,
    pillows: false,
  });

  useEffect(() => window.scrollTo(top), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFacilityChange = (key) => {
    setRoomFacilities((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages((prev) => [...prev, ...fileArray]);
    }
  };

  const inserRoomData = async (data) => {
    try {
      const response = await axios.post(
        "https://findmypg-i01x.onrender.com/api/addRoom",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const roomData = new FormData();
    // Here you would typically send the data to your backend
    const roomDetails = { ...formData, room_facilities: roomFacilities };
    roomData.append("data", JSON.stringify(roomDetails));
    console.log({ ...formData, room_facilities: roomFacilities, images });
    for (let i = 0; i < images.length; i++) {
      roomData.append("images[]", images[i]);
    }
    inserRoomData(roomData);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Navigate back to the PG details page
    navigate(`/owner-dashboard/pg/${id}`);
  };

  return (
    <div className="flex-1 my-15 container mx-auto py-6 px-4">
      <h1 className="text-2xl text-center font-bold mb-6">Add Room to PG</h1>

      <form onSubmit={handleSubmit} className="space-y-8 mx-35">
        <Card>
          <CardHeader>
            <CardTitle>Room Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="room_type">Room Type</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("room_type", value)
                  }
                  required
                >
                  <SelectTrigger
                    className="border border-gray-300 w-full"
                    id="room_type"
                  >
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Double Sharing">
                      Double Sharing
                    </SelectItem>
                    <SelectItem value="Triple Sharing">
                      Triple Sharing
                    </SelectItem>
                    <SelectItem value="Four Sharing">Four Sharing</SelectItem>
                    <SelectItem value="Shared">Shared</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="no_of_rooms">Number of Rooms</Label>
                <Input
                  id="no_of_rooms"
                  name="no_of_rooms"
                  type="number"
                  value={formData.no_of_rooms}
                  onChange={handleChange}
                  placeholder="e.g., 5 room"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room_size">Room Size</Label>
                <Input
                  id="room_size"
                  name="room_size"
                  type="number"
                  value={formData.room_size}
                  onChange={handleChange}
                  placeholder="e.g., 100 sq ft"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="available_room">Availabel Room</Label>
                <Input
                  id="available_room"
                  name="available_room"
                  type="number"
                  value={formData.available_room}
                  onChange={handleChange}
                  placeholder="e.g., 1 room"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="person_type">Person Type</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("person_type", value)
                  }
                  required
                >
                  <SelectTrigger
                    className="border border-gray-300 w-full"
                    id="person_type"
                  >
                    <SelectValue placeholder="Select person type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Job">Working Professional</SelectItem>
                    <SelectItem value="Any">Any</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("gender", value)}
                  required
                >
                  <SelectTrigger
                    className="border border-gray-300 w-full"
                    id="gender"
                  >
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Any">Any</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rent">Rent</Label>
                <Input
                  id="rent"
                  name="rent"
                  type="number"
                  value={formData.rent}
                  onChange={handleChange}
                  placeholder="e.g., ₹8000 per month"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room_images">Room Images</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="border border-gray-300 w-full"
                    onClick={() =>
                      document.getElementById("room_images")?.click()
                    }
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Select Images
                  </Button>
                  <Input
                    id="room_images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
                {images.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <p className="text-sm text-muted-foreground">
                      {images.length} image(s) selected
                    </p>
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="text-xs bg-muted rounded-full px-2 py-1"
                      >
                        {image.name.length > 15
                          ? `${image.name.substring(0, 15)}...`
                          : image.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Room Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(roomFacilities).map(([key, value]) => (
                <div
                  key={key}
                  className={cn(
                    "flex items-center space-x-2 rounded-lg p-3 transition-colors",
                    value ? "bg-[#e9eefd]" : "bg-[#F1F5F9]"
                  )}
                >
                  <Checkbox
                    id={key}
                    checked={value}
                    onCheckedChange={() => handleFacilityChange(key)}
                    className="cursor-pointer transition-transform data-[state=checked]:scale-110 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-blue-600"
                  />
                  <Label htmlFor={key} className="capitalize cursor-pointer">
                    {key.replace(/_/g, " ")}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            className="border-gray-300 hover:bg-gray-100"
            type="button"
            variant="outline"
            onClick={() => {
              navigate(`/owner-dashboard/pg/${id}`);
              console.log(id);
            }}
          >
            Cancel
          </Button>
          <Button
            className="border-gray-300 text-white bg-blue-600 hover:bg-blue-500"
            type="submit"
          >
            Save Room
          </Button>
        </div>
      </form>
    </div>
  );
}
