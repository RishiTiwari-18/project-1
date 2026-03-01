const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  // 1. get token from cookie
  const token = req.cookies?.token;
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }
  
  try {
    // 2. verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // 3. attach user id to req
    req.user = decode;

    next(); // go to the next middleware or controller
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = verifyToken