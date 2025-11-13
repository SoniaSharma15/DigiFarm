// backend/models/crop.model.js (ES Module)

import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
    cropTitle: { type: String, required: [true, "Please enter the crop title"], trim: true },
    cropCategory: { type: String, required: [true, "Please enter the crop category"], trim: true },
    quantity: { type: String, required: [true, "Please enter the quantity"] },
    sellingPrice: { type: String, required: [true, "Please enter the selling price"] },
    location: { type: String, required: [true, "Please enter the farm location"] },
    mandiName: { type: String, required: [true, "Please enter the nearest Mandi name"] },
    pinCode: { type: String, required: [true, "Please enter the pin code"], match: [/^\d{6}$/, "Pin Code must be 6 digits"] },
    comment: { type: String, required: false }, // OPTIONAL
    dateOfSale: { type: Date, required: [true, "Please enter the target date of sale"] },
    status: { type: String, default: 'Available', enum: ['Available', 'Pending Sale', 'Sold Out'], required: true },
    
    images: [{ type: String, required: false }], // OPTIONAL
    video: { type: String, required: false }, // OPTIONAL

    farmer: { type: mongoose.Schema.ObjectId, ref: 'User', required: false }, 
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Crop', cropSchema);