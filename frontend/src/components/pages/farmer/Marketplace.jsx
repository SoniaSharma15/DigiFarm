import React from "react";
import { MapPin, Store, IndianRupee, Package, PinIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const marketplaceData = [
  {
    id: 1,
    product: "Wheat",
    mandi: "Lucknow Mandi",
    location: "Lucknow, Uttar Pradesh",
    priceRange: "₹1800 - ₹2100 / quintal",
    pincode:220143,
    needed: "500 quintals",
  },
  {
    id: 2,
    product: "Rice",
    mandi: "Kanpur Mandi",
    location: "Kanpur, Uttar Pradesh",
    priceRange: "₹2000 - ₹2300 / quintal",
    pincode:220143,
    needed: "300 quintals",
  },
  {
    id: 3,
    product: "Sugarcane",
    mandi: "Varanasi Mandi",
    location: "Varanasi, Uttar Pradesh",
    priceRange: "₹280 - ₹320 / quintal",
    pincode:220143,
    needed: "800 quintals",
  },
  {
    id: 4,
    product: "Potato",
    mandi: "Agra Mandi",
    location: "Agra, Uttar Pradesh",
    priceRange: "₹1200 - ₹1500 / quintal",
    pincode:220143,
    needed: "1000 quintals",
  },
];

export default function Marketplace() {
    const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-[#f8f5f0] px-6 py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        🧺 Farmer Marketplace
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {marketplaceData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 border-t-4 border-green-500"
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-3">
              {item.product}
            </h2>
            <div className="space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <Store size={18} /> <span className="font-medium">Mandi:</span>{" "}
                {item.mandi}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={18} /> <span className="font-medium">Location:</span>{" "}
                {item.location}
              </p>
              <p className="flex items-center gap-2">
                <PinIcon size={18} /> <span className="font-medium">Pincode:</span>{" "}
                {item.pincode}
              </p>
              <p className="flex items-center gap-2">
                <IndianRupee size={18} />{" "}
                <span className="font-medium">Price Range:</span> {item.priceRange}
              </p>
              <p className="flex items-center gap-2">
                <Package size={18} />{" "}
                <span className="font-medium">Product Needed:</span> {item.needed}
              </p>
            </div>

            {/* Button */}
            <button onClick={() => navigate("/contact-buyer")}className="mt-5 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              Contact Buyer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
