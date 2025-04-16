"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
export function AddPG() {
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const { user } = useAuth();
  const uuid = uuidv4();
  const numericId = parseInt(uuid.replace(/-/g, "").slice(0, 7), 16);
  const [formData, setFormData] = useState({
    owner_id: user.id,
    pg_id: numericId,
    pg_name: "",
    address_id: numericId,
    residence_name: "",
    street: "",
    area: "",
    city: "",
    state: "",
    zip: "",
    map_location: "",
    description: "",
  });

  const [pgFacilities, setPgFacilities] = useState({
    food: false,
    free_wifi: false,
    library: false,
    parking: false,
    lift: false,
    daily_cleaning: false,
    tv_lounge: false,
    laundry: false,
    ironing: false,
    kitchen: false,
    dining_Area: false,
    gym: false,
    ground: false,
    cafeteria: false,
    swimming_pool: false,
    game_zone: false,
    cab_facility: false,
    _24_x_7_water: false,
    _24_x_7_electricity: false,
    hot_water: false,
    ro_purifier: false,
    water_Cooler: false,
    cctv: false,
    security_warden: false,
    medical_services: false,
  });

  const [pgRules, setPgRules] = useState({
    visitor_allowed: false,
    non_veg: false,
    other_gender: false,
    smoking: false,
    drinking: false,
    party: false,
    gate_close_time: "22:00",
  });

  const [otherCharges, setOtherCharges] = useState({
    electricity: "",
    laundry: "",
    food: "",
    deposit_amount: "",
    refundable: "Yes",
    notice_period: "",
  });

  useEffect(() => window.scrollTo(top), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFacilityChange = (key) => {
    setPgFacilities((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleRuleChange = (key) => {
    setPgRules((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleRuleInputChange = (e) => {
    const { name, value } = e.target;
    setPgRules((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChargeChange = (e) => {
    const { name, value } = e.target;
    setOtherCharges((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages((prev) => [...prev, ...fileArray]);
    }
  };

  const insertPGDetails = async (data) => {
    try {
      const response = await axios.post(
        "https://findmypg-i01x.onrender.com/api/addPG",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    const pgData = new FormData();
    const pgdetails = {
      ...formData,
      operating_since: date,
      pg_facilities: pgFacilities,
      rules_in_pg: pgRules,
      other_charges: otherCharges,
    };
    pgData.append("data", JSON.stringify(pgdetails));

    console.log(images);
    for (let i = 0; i < images.length; i++) {
      pgData.append("images[]", images[i]);
    }
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Here you would typically send the data to your backend
    console.log({
      ...formData,
      operating_since: date,
      images,
      pg_facilities: pgFacilities,
      rules_in_pg: pgRules,
      other_charges: otherCharges,
    });
    insertPGDetails(pgData);
    // Navigate to the dashboard after submission
    navigate("/owner-dashboard");
  };

  const nextTab = () => {
    if (activeTab === "basic") setActiveTab("facilities");
    else if (activeTab === "facilities") setActiveTab("rules");
    else if (activeTab === "rules") setActiveTab("charges");
    window.scrollTo(top);
  };

  const prevTab = () => {
    if (activeTab === "charges") setActiveTab("rules");
    else if (activeTab === "rules") setActiveTab("facilities");
    else if (activeTab === "facilities") setActiveTab("basic");
    window.scrollTo(top);
  };

  return (
    <>
      <h1 className="text-3xl text-center font-bold mt-20 mb-7 ">Add New PG</h1>

      <form onSubmit={handleSubmit} className="space-y-8 mb-5">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6 mx-40 "
        >
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 text-gray-700">
            <TabsTrigger
              value="basic"
              className="
            data-[state=active]:bg-blue-600 data-[state=active]:text-white p-1"
            >
              Basic Info
            </TabsTrigger>
            <TabsTrigger
              value="facilities"
              className="
            data-[state=active]:bg-blue-600 data-[state=active]:text-white p-1"
            >
              Facilities
            </TabsTrigger>
            <TabsTrigger
              value="rules"
              className="
            data-[state=active]:bg-blue-600 data-[state=active]:text-white p-1"
            >
              Rules
            </TabsTrigger>
            <TabsTrigger
              value="charges"
              className="
            data-[state=active]:bg-blue-600 data-[state=active]:text-white p-1"
            >
              Charges
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6 ">
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 ">
                  <div className="space-y-2 ">
                    <Label htmlFor="pg_name">PG Name</Label>
                    <Input
                      id="pg_name"
                      name="pg_name"
                      value={formData.pg_name}
                      onChange={handleChange}
                      required
                      className=" border-gray-300 transition-all focus:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="residence_name">Residence Name</Label>
                    <Input
                      id="residence_name"
                      name="residence_name"
                      value={formData.residence_name}
                      onChange={handleChange}
                      className="border-gray-300 transition-all focus:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your PG accommodation..."
                      className="border-gray-300 min-h-[100px] transition-all focus:scale-[1.01]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Address Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street</Label>
                    <Input
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      required
                      className="border-gray-300 transition-all focus:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Area</Label>
                    <Input
                      id="area"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      required
                      className=" border-gray-300 transition-all focus:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="border-gray-300 transition-all focus:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="border-gray-300 transition-all focus:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      name="zip"
                      maxLength={6}
                      value={formData.zip}
                      onChange={handleChange}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      required
                      className="border-gray-300 transition-all focus:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="map_location">
                      Map Location (Optional)
                    </Label>
                    <Input
                      id="map_location"
                      name="map_location"
                      value={formData.map_location}
                      onChange={handleChange}
                      placeholder="Google Maps URL"
                      className="border-gray-300 transition-all focus:scale-[1.02]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Operating Since</Label>
                    <div className="flex items-center justify-center">
                      <Input
                        id="operating_since"
                        name="operating_since"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        type="date"
                        className="hover:bg-gray-100 border-gray-300  transition-all hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="images">Upload Images</Label>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="hover:bg-gray-100 border-gray-300 w-full transition-all hover:scale-[1.02]"
                        onClick={() =>
                          document.getElementById("images")?.click()
                        }
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Select Images
                      </Button>
                      <Input
                        id="images"
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

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={nextTab}
                className="bg-blue-600 hover:bg-blue-500 text-white transition-all hover:scale-[1.05]"
              >
                Next: Facilities
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-6">
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  PG Facilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                  {Object.entries(pgFacilities).map(([key, value]) => (
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
                      <Label
                        htmlFor={key}
                        className="capitalize cursor-pointer"
                      >
                        {key.replace(/_/g, " ")}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevTab}
                className="border-gray-300 hover:bg-[#F1F5F9] transition-all hover:scale-[1.05]"
              >
                Back: Basic Info
              </Button>
              <Button
                type="button"
                onClick={nextTab}
                className="bg-blue-600 text-white hover:bg-blue-500 transition-all hover:scale-[1.05]"
              >
                Next: Rules
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-lg font-medium">PG Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(pgRules).map(([key, value]) => {
                      if (key === "gate_close_time") return null;
                      return (
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
                            onCheckedChange={() => handleRuleChange(key)}
                            className="cursor-pointer transition-transform data-[state=checked]:scale-110  data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-blue-600"
                          />
                          <Label
                            htmlFor={key}
                            className="capitalize cursor-pointer"
                          >
                            {key.replace(/_/g, " ")}
                          </Label>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gate_close_time">Gate Close Time</Label>
                    <Input
                      id="gate_close_time"
                      name="gate_close_time"
                      type="time"
                      value={pgRules.gate_close_time}
                      onChange={handleRuleInputChange}
                      className="border-gray-300 max-w-1/9 transition-all focus:scale-[1.02]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevTab}
                className="border-gray-300 hover:bg-[#F1F5F9] transition-all hover:scale-[1.05]"
              >
                Back: Facilities
              </Button>
              <Button
                type="button"
                onClick={nextTab}
                className="bg-blue-600 hover:bg-blue-500 text-white transition-all hover:scale-[1.05]"
              >
                Next: Charges
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="charges" className="space-y-6">
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Other Charges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="electricity">Electricity Charges</Label>
                    <Input
                      id="electricity"
                      name="electricity"
                      type="number"
                      value={otherCharges.electricity}
                      onChange={handleChargeChange}
                      placeholder="e.g., ₹10 per unit "
                      className="border-gray-300 transition-all focus:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="laundry">Laundry Charges</Label>
                    <Input
                      id="laundry"
                      name="laundry"
                      type="number"
                      value={otherCharges.laundry}
                      onChange={handleChargeChange}
                      placeholder="e.g., ₹500 per month"
                      className="border-gray-300 transition-all focus:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="food">Food Charges</Label>
                    <Input
                      id="food"
                      name="food"
                      type="number"
                      value={otherCharges.food}
                      onChange={handleChargeChange}
                      placeholder="e.g., ₹3500 per month"
                      className="border-gray-300 transition-all focus:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deposit_amount">Deposit Amount</Label>
                    <Input
                      id="deposit_amount"
                      name="deposit_amount"
                      type="number"
                      value={otherCharges.deposit_amount}
                      onChange={handleChargeChange}
                      placeholder="e.g., ₹10000"
                      className="border-gray-300 transition-all focus:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="refundable">Refundable</Label>
                    <Input
                      id="refundable"
                      name="refundable"
                      value={otherCharges.refundable}
                      onChange={handleChargeChange}
                      placeholder="e.g., Yes/No"
                      className="border-gray-300 transition-all focus:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notice_period">Notice Period</Label>
                    <Input
                      id="notice_period"
                      name="notice_period"
                      type="number"
                      value={otherCharges.notice_period}
                      onChange={handleChargeChange}
                      placeholder="e.g., 1 month"
                      className="border-gray-300 transition-all focus:scale-[1.02]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevTab}
                className="border-gray-300 hover:bg-[#F1F5F9] transition-all hover:scale-[1.05]"
              >
                Back: Rules
              </Button>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/owner-dashboard")}
                  className="border-gray-300 transition-all hover:scale-[1.05]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-500 text-white transition-all hover:scale-[1.05]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save PG"
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </>
  );
}
