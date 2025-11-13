// backend/routes/crop.route.js

import express from 'express';
import { 
    createCrop, 
    getAllCrops, 
    updateCrop, 
    deleteCrop 
} from '../controllers/crop.controller.js'; 
// Import authentication middleware for secured routes
import { isAuthenticatedUser } from '../middleware/isAuthenticated.js'; 

const router = express.Router();

// 1. READ: Public route to fetch all crops
router.route('/crops').get(getAllCrops); 

// 2. CREATE: Public route for testing 
router.route('/crop/new').post(createCrop); 

// 3. UPDATE & DELETE: Critical routes
// 🚨 FIX: TEMPORARILY REMOVE AUTHENTICATION FOR TESTING 🚨
router.route('/crop/:id')
    .put(updateCrop) // Unprotected for testing
    .delete(deleteCrop); // Unprotected for testing

export default router;