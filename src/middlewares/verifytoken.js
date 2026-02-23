const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
  try {
    // 1. get token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // 2. verify token
    const decode = jwt.decode(token, process.env.JWT_SECRET);

    // 3. attach user id to req
    req.id = decode.id;

    next(); // go to the next middleware or controller
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = verifyToken