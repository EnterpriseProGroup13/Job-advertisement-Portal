import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// 📝 REGISTER A NEW USER
export const registerUser = async (req, res) => {
  try {
    // Extract fields from the request body
    const { firstName, surname, email, phone_number, password } = req.body;

    // Check for required fields
    if (!firstName || !surname || !email || !phone_number || !password) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    // Optional: Handle file upload for profile photo
    const file = req.file;
    let profilePhotoUrl = "";
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudResponse.secure_url;
    }

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Combine firstName and surname into a full name
   
    const fullname = `${firstName} ${surname}`;

    // Create new user. 
    // Note: We store "phone_number" from the request as "phoneNumber" in our DB.
    const newUser = await User.create({
      firstName,
      surname,
      email,
      phoneNumber: phone_number,
      password: hashedPassword,
      fullname,
      profile: {
        profilePhoto: profilePhotoUrl || "",
      },
      // Role is set to "customer" by default by the signup form (if needed)
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
      detail: error.message,
    });
  }
};

// 🔐 LOGIN A USER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    // Generate JWT token using process.env.JWT_SECRET
    const tokenData = { userId: user._id }; // Only storing the user ID in the token.
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Prepare a user object for response
    // Ensure that your user model actually has a "fullname" property (which we computed during registration)
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back, ${user.fullname}!`,
        user,
        success: true,
      });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

// 🚪 LOGOUT A USER
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({
        message: "Logged out successfully.",
        success: true,
      });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

// 📝 UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    // For updating profile we assume that req.user is already set by your auth middleware.
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.user._id; // Ensure that your auth middleware attaches user info to req.user

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // Optional: Handle resume file upload
    const file = req.file;
    let resumeUrl = "";
    let originalFileName = "";
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      resumeUrl = cloudResponse.secure_url;
      originalFileName = file.originalname;
    }

    // Update fields if provided
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) {
      const skillsArray = skills.split(",");
      user.profile.skills = skillsArray;
    }
    if (resumeUrl) {
      user.profile.resume = resumeUrl;
      user.profile.resumeOriginalName = originalFileName;
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};
