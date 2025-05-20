import jwt from 'jsonwebtoken'
import User from '../models/User.js'


//Middleware to protect route
export const protectRoute=async (req,res,next) => {
  try {
    const token=req.headers
    if(!token){
    return res.json({success:false,message:"not authorized,login again"})
  }
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    const user=await User.findById(decode.userId).select("-password")
    if(!user) return res.json({success:false,message:"User not found"});
    req.user=user
    next()
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}