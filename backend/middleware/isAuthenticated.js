// backend/middleware/isAuthenticated.js (THE DEFINITIVE VERSION)

import jwt from "jsonwebtoken";

// 🚨 FIX: Export the function with the exact name 'isAuthenticatedUser' 🚨
export const isAuthenticatedUser = async (req, res, next) => { 
    try {   
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized Access", success: false });
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({ message: "Invalid Token", success: false });
        }
        req.id = decode.userId;
        next(); 
    } catch (error) {
       console.log("Validation error: " + error); 
       return res.status(401).json({ message: "Authentication Failed", success: false });
    }
}
// Ensure no other 'export' or 'module.exports' statements are in this file.