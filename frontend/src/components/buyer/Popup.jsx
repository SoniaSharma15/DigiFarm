import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRequirement } from "@/redux/buyerSlice";
import { motion, AnimatePresence } from "framer-motion";
import { BUYER_API_END_POINT } from "@/utils/constant";

function Popup({ showModal, setShowModal,onRequirementAdded }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    product: "",
    mandi: "",
    location: "",
    priceRange: "",
    pincode: "",
    needed: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Dispatch Redux action (local update)
      dispatch(addRequirement(formData));

      // Send data to backend
      const response = await fetch(`${BUYER_API_END_POINT}/add-requirement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add requirement");
      }

      const data = await response.json();
      console.log("✅ Requirement saved:", data);
 // ✅ Trigger parent update
      if (onRequirementAdded) {
        onRequirementAdded(data.requirement);
      }

      // Reset form and close modal
      setFormData({
        product: "",
        mandi: "",
        location: "",
        priceRange: "",
        pincode: "",
        needed: "",
      });
      setShowModal(false);
      alert("Requirement added successfully!");
    } catch (error) {
      console.error("❌ Error adding requirement:", error);
      alert("Something went wrong while saving the requirement!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            onClick={() => setShowModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-8 relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-4 text-gray-600 hover:text-black text-xl"
              >
                ✖
              </button>

              <h2 className="text-2xl font-bold text-green-700 mb-5 text-center ">
                Add Buyer Requirement
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: "Product", name: "product" },
                  { label: "Mandi", name: "mandi" },
                  { label: "Location", name: "location" },
                  { label: "Price Range", name: "priceRange" },
                  { label: "Pincode", name: "pincode" },
                  { label: "Needed (Quantity)", name: "needed" },
                ].map((item, idx) => (
                  <div key={idx}>
                    <label className="block font-medium text-gray-700 mb-1">
                      {item.label}
                    </label>
                    <input
                      type={item.name === "pincode" ? "number" : "text"}
                      name={item.name}
                      value={formData[item.name]}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Submit Requirement
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Popup;
