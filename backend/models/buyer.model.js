import mongoose from "mongoose";

const buyerRequirementSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
    },
    mandi: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    priceRange: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    needed: {
      type: String,
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // link to buyer user
      required: false, // make required if you plan to associate requirements with users
    },
  },
  { timestamps: true }
);

// ✅ Export same way as your User model
export const BuyerRequirement = mongoose.model(
  "BuyerRequirement",
  buyerRequirementSchema
);
