const jwt = require("jsonwebtoken");
const SECRET_KEY = "hien1234";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({message: "Bạn cần phải đăng nhập."});
  }
  const tokenValue = token.slice(7);
  try {
    const decoded = jwt.verify(tokenValue, SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({message: "Token không hợp lệ."});
  }
};

module.exports = {verifyToken};
