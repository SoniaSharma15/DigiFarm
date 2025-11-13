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

// 2. CREATE: Public route for testing (Authentication middleware removed temporarily)
router.route('/crop/new').post(createCrop); 

// 3. UPDATE & DELETE: Critical routes (Authentication required)
router.route('/crop/:id')
    .put(isAuthenticatedUser, updateCrop)
    .delete(isAuthenticatedUser, deleteCrop);

export default router;