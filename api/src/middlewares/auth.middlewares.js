const Auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json(new ApiError(401, { message: "Unauthorized" }));
    }
    jwt.verify(token, process.env.secret, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json(new ApiError(403, { message: "Forbidden" }));
      }
      req.userId = decoded.data;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, { message: "Internal Server Error" }, error));
  }
};

export default Auth;
