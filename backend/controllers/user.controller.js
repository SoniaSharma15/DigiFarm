import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js";
import {v2 as cloudinary} from "cloudinary";

export const register = async (req, res) => {  
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is Missing",
        success: false,
      });
    }
    const file=req.file;
    const fileUri=getDataUri(file);
    const cloudResponse=await cloudinary.uploader.upload(fileUri.content);
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400)
        .json({ message: "User Already exists with this email.", success: false });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashPassword,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url,
         }
    });
    return res.status(201)
    .json({ message: "User Created Successfully.", success: true });

  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email,  password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is Missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No User exist with this email !", success: false });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials !", success: false });
    }
    //check role is correct or not
 if(role!= user.role){
    return res
      .status(400)
      .json({ message: "Account doesn't exists with this role !", success: false });
  }
  const tokenData={userId:user._id }
  
  const token= jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'})
  
 user={
    _id:user._id,
    fullname:user.fullname,email:user.email,
    phoneNumber:user.phoneNumber,
    role:user.role,
    profile:user.profile
 }

  res.status(200).cookie("token", token, {
  httpOnly: false,
  secure: true, // ✅ Required for HTTPS/Vercel
  sameSite: "None", // ✅ Required for cross-origin cookies
  maxAge: 24 * 60 * 60 * 1000,
});

res.json({
  message: `Welcome Back ${user.fullname}`,
  user,
  success: true
});

  } catch (error) {
    console.log(error);
  }
};

export const logout=async(req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged Out Successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile=async(req,res)=>{
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file=req.file;
        //cloudinary ...
  const fileUri=getDataUri(file);
  const cloudResponse=await cloudinary.uploader.upload(fileUri.content);


let skillsArray;
        if(skills){
skillsArray=skills.split(",");
        }
       const userId=req.id; // from middleware authentication
        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"User Not found",
                success:true
            })
        }
        //updating data
        user.fullname=fullname,
        user.email=email,
        user.phoneNumber=phoneNumber,
        user.profile.skills=skillsArray,
        user.profile.bio=bio

        //resume is left....
         if (cloudResponse){
          user.profile.resume=cloudResponse.secure_url //save the cloudinary url
          user.profile.resumeOriginalName=file.originalname;
          // save the original file name
         }
        await user.save();
        
        user={
            _id:user._id,
            fullname:user.fullname,email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
         }
        
          return res.status(200).json({
            message:"Profile Updated Successfully",
            user,
            success:true
          })

    } catch (error) {
       console.log(error) 
    }
}