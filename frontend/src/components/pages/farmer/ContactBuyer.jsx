import React, { useState } from "react";

export default function ContactBuyer() {
  const [formData, setFormData] = useState({
    farmerName: "",
    cropName: "",
    quantity: "",
    price: "",
    mandi: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Your offer has been sent to the buyer!");
    setFormData({
      farmerName: "",
      cropName: "",
      quantity: "",
      price: "",
      mandi: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col items-center justify-center px-6 py-10">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
        🌾 Contact Buyer
      </h1>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg border-t-4 border-green-500"
      >
        {/* Farmer Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Farmer Name
          </label>
          <input
            type="text"
            name="farmerName"
            value={formData.farmerName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Crop Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Crop Name
          </label>
          <input
            type="text"
            name="cropName"
            value={formData.cropName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Quantity Available (in quintals)
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Price Expectation */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Expected Price (₹ per quintal)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Mandi Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Mandi Name
          </label>
          <input
            type="text"
            name="mandi"
            value={formData.mandi}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Message (optional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-all"
        >
          Send Offer
        </button>
      </form>
    </div>
  );
}