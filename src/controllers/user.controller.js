import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res)=>{
   const {fullName,email,username,password} = req.body
   console.log("email",email);

  if([fullName,email,username,password].some((field)=>field?.trim()==="")){
    throw new ApiError(400,"all fields ar erequired")
  }

  const existedUser= User.findOne({
    $or:[{username},{email}]
  }) 

  if(existedUser){
    throw new ApiError(409,"User with email or name alrrady existed")
    }
   
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
    throw new ApiError(200,"avatar file is required")
  }

  const avatar= await uploadOnCloudinary(avatarLocalPath);
  const coverImage= await uploadOnCloudinary(coverImageLocalPath);

  if(!avatar){
    throw new ApiError(200,"avatar file is required")
  }
  
 const user= await User.create({
    fullName,
    avatar: avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
  })
  
  const createdUSer = await User.findById(user._id).select(
     "-password -refreshToken"
  )

  if(!createdUSer){
    throw new ApiError(500,"something went wrong with registeration")
  }

  return res.status(201).json(
    new ApiResponse(200,createdUSer,"user registered successfully")
  )

})

export {registerUser}