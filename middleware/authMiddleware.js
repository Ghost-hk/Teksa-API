import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  const headers = req.headers.authorization;
  const token = headers.split(" ")[1];

  try {
    if (headers && headers.startsWith("Bearer")) {
      const decoded = jwt.decode(token, process.env.JWT_SECRET_ACCESS_TOKEN);

      req.user = await User.findOne({ _id: decoded.id }).select([
        "email",
        "firstName",
        "lastName",
      ]);
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401);
    throw new Error("Not authorized");
  }

  if (!token) {
    res.status(400);
    throw new Error("Not authorized, No token");
  }
};
