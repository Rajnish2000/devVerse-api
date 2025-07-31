import ApiResponse from "../utilities/ApiResponse.js";

const healthCheck = (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, "API is healthy. Working properly.❤😁🤗👋✔"));
};

export { healthCheck };
