// backend/models/crop.model.js (Must use default export)
import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    quantity: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: String, default: 'Available', enum: ['Available', 'Pending Sale', 'Sold Out'] },
    farmer: { // Make this required: false for initial testing if no user login is implemented
        type: mongoose.Schema.ObjectId,
        ref: 'User', 
        required: false, // TEMPORARILY SET TO FALSE
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Crop', cropSchema);