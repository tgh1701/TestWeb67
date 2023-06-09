const {db} = require("../db");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "hien1234";

const login = async (req, res) => {
  const {username, password} = req.body;
  try {
    const user = await db.users.findOne({username});
    if (!user || password !== user.password) {
      return res
        .status(401)
        .json({message: "Tên đăng nhập hoặc mật khẩu không hợp lệ."});
    }
    const token = jwt.sign({userId: user._id}, SECRET_KEY, {expiresIn: "1m"});
    res.status(200).json({
      message: "Đăng nhập thành công.",
      token,
    });
  } catch (error) {
    console.error("Đăng nhập không thành công", error);
    res.status(500).json({message: "Đăng nhập không thành công."});
  }
};

module.exports = {login};
