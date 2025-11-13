// backend/controllers/crop.controller.js (Must use named exports)
import Crop from '../models/crop.model.js'; 
// Assuming a general error handler is defined or imported
const catchAsyncErrors = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// 1. CREATE: Use 'export const'
export const createCrop = catchAsyncErrors(async (req, res) => {
    // 🚨 WARNING: TEMPORARILY COMMENT OUT USER ATTACHMENT FOR INITIAL TESTING 🚨
    // req.body.farmer = req.user.id; 

    const crop = await Crop.create(req.body);
    res.status(201).json({ success: true, crop });
});

// 2. READ: Use 'export const'
export const getAllCrops = catchAsyncErrors(async (req, res) => {
    const crops = await Crop.find(); 
    res.status(200).json({ success: true, crops });
});

// 3. UPDATE: Use 'export const'
export const updateCrop = catchAsyncErrors(async (req, res, next) => {
    let crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ success: false, message: "Crop not found" });

    crop = await Crop.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, crop });
});

// 4. DELETE: Use 'export const'
export const deleteCrop = catchAsyncErrors(async (req, res, next) => {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ success: false, message: "Crop not found" });
    
    await crop.deleteOne(); 
    res.status(200).json({ success: true, message: "Crop Listing Deleted Successfully" });
});