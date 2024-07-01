const User = require("@models/userSchema.js");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { email, name, password, type } = req.body;
  console.log(email, name, password);
  const user = await User.findOne({ email });
  if (user) {
    return res.status(404).json({
      success: false,
      message: "User Already exist",
    });
  }
  const newUser = await User.create({
    name,
    email,
    password,
    type,
  });

  const access_token = await newUser.generateAuthToken();
  res.status(200).json({
    success: true,
    name: newUser.name,
    type: newUser.type,
    message: "Register Successful",
    data: {
      access_token,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password, type } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.is_email_verified === false) {
    return res.status(404).json({
      success: false,
      message: "User not found or email not verified",
    });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "Incorrect Password",
    });
  }
  const access_token = await user.generateAuthToken();
  res.status(200).json({
    success: true,
    name: user.name,
    type: user.type,
    message: "Login Successful",
    data: {
      access_token,
    },
  });
});


module.exports = {
  login,
  register,
  // forgotPassword,
  // resetPassword
};
