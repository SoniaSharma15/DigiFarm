import mongoose from "mongoose";
const  userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['buyer','farmer'],
        required:true
    },
  
     notifications: {
    emailAlerts: { type: Boolean, default: true },
    smsAlerts: { type: Boolean, default: false },
    jobCategories: [{ type: String }], // e.g., ['Frontend', 'Backend']
    frequency: {
      type: String,
      enum: ['instant', 'daily', 'weekly'],
      default: 'instant',
    }
  }

},{timestamps:true});
export const User = mongoose.model('User',userSchema);
