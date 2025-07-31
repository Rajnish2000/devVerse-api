import User from "../../models/authModel/users.model.js";
import ApiResponse from "../../utilities/ApiResponse.js";
import asyncHandler from "../../utilities/AsyncHandlers.js";
import ApiError from "../../utilities/ApiError.js";

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
    const userData = await User.create(bodyData);
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

export { getAllUsers, registerUser };
