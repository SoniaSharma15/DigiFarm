// backend/controllers/crop.controller.js (ES Module)

import Crop from '../models/crop.model.js'; 
const catchAsyncErrors = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export const createCrop = catchAsyncErrors(async (req, res) => {
    const crop = await Crop.create(req.body);
    res.status(201).json({ success: true, crop });
});

export const getAllCrops = catchAsyncErrors(async (req, res) => {
    const crops = await Crop.find(); 
    res.status(200).json({ success: true, crops });
});

export const updateCrop = catchAsyncErrors(async (req, res, next) => {
    let crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ success: false, message: "Crop not found" });

    crop = await Crop.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, crop });
});

export const deleteCrop = catchAsyncErrors(async (req, res, next) => {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ success: false, message: "Crop not found" });
    
    await crop.deleteOne(); 
    res.status(200).json({ success: true, message: "Crop Listing Deleted Successfully" });
});