import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  const header = req.headers.authorization;
  var token;

  try {
    token = header.split(" ")[1];

    if (header && header.startsWith("Bearer")) {
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
    return res.status(401).json({ message: "Not authorized" });
  }

  if (!token) {
    return res.status(400).json({ message: "Not authorized, No token" });
  }
};
