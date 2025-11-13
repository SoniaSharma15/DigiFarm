import express from "express";
import {
    register,
    login,
    updateProfile,
    logout,
} from "../controllers/user.controller.js";

// 🚨 FIX 1: Import singleUpload from multer.js 🚨
import { singleUpload } from "../middleware/multer.js"; 

// 🚨 FIX 2: Import isAuthenticatedUser from isAuthenticated.js 🚨
import { isAuthenticatedUser } from "../middleware/isAuthenticated.js"; 


const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);

// 🚨 FIX 3: Use the correct function name: isAuthenticatedUser 🚨
router.route("/profile/update").post(isAuthenticatedUser, singleUpload, updateProfile);

export default router;