import User from "../../models/authModel/users.model.js";
import ApiResponse from "../../utilities/ApiResponse.js";
import asyncHandler from "../../utilities/AsyncHandlers.js";
import ApiError from "../../utilities/ApiError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const userData = await User.find({}, { password: 0 });
    if (!userData) {
      return res
        .status(404)
        .json(new ApiError(404, { message: "No users found" }));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { message: "All users fetched successfully" },
          userData
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, { message: "Error fetching users" }, error));
  }
});

//create user:
const registerUser = asyncHandler(async (req, res) => {
  try {
    const bodyData = req.body;
    if (!bodyData) {
      return res
        .status(400)
        .json(new ApiError(400, { message: "Invalid user data" }));
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(bodyData.password, salt);
    const userData = await User.create({ ...bodyData, password: hash });
    if (!userData) {
      return res
        .status(400)
        .json(new ApiError(400, { message: "User creation failed" }));
    }
    return res
      .status(201)
      .json(
        new ApiResponse(201, { message: "User created successfully" }, userData)
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, { message: "Error creating user" }, error));
  }
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await User.findById(userId, { password: 0 });
    if (!userData) {
      return res
        .status(404)
        .json(new ApiError(404, { message: "User not found" }));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, { message: "User fetched successfully" }, userData)
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, { message: "Error fetching user" }, error));
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    if (req.userId != userId) {
      return res.status(403).json(new ApiError(403, { message: "Forbidden" }));
    }
    const updateData = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
      select: "-password",
    });
    if (!updatedUser) {
      return res
        .status(404)
        .json(new ApiError(404, { message: "User not found" }));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { message: "User updated successfully" },
          updatedUser
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, { message: "Error updating user" }, error));
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    if (req.userId != userId) {
      return res.status(403).json(new ApiError(403, { message: "Forbidden" }));
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res
        .status(404)
        .json(new ApiError(404, { message: "User not found" }));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { message: "User deleted successfully" },
          deletedUser
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, { message: "Error deleting user" }, error));
  }
});

const logIn = asyncHandler(async (req, res) => {
  // Placeholder for login functionality
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json(
          new ApiError(400, { message: "Username and password are required" })
        );
    }
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json(new ApiError(404, { message: "User not found" }));
    }

    let isMatched = await bcrypt.compare(password, user.password);
    if (isMatched === false) {
      return res
        .status(401)
        .json(new ApiError(401, { message: "Invalid credentials" }));
    }
    const token = jwt.sign(
      {
        data: user.id,
      },
      process.env.secret,
      { expiresIn: "1h" }
    );
    return res
      .status(200)
      .json(
        new ApiResponse(200, { message: "Login successful" }, { user, token })
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, { message: "Error logging in" }, error));
  }
});

const updateProfilePic = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const profilePic = req.file.path;
  if (req.userId != userId) {
    return res.status(403).json(new ApiError(403, { message: "Forbidden" }));
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json(new ApiError(404, { message: "User not found" }));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { message: "Profile picture updated successfully" },
          updatedUser
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiError(500, { message: "Error updating profile picture" }, error)
      );
  }
});

export {
  getAllUsers,
  registerUser,
  getUserById,
  updateUser,
  deleteUser,
  logIn,
  updateProfilePic,
};
