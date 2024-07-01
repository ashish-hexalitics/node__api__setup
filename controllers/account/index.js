const User = require("@models/userSchema.js");
const asyncHandler = require("express-async-handler");

const addAdminUser = asyncHandler(async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const admin = await User.create({
      email,
      name,
      password,
      type: "admin",
    });
    res.status(201).json({
      success: true,
      message: "Admin User Created",
    });
    admin.admin_id = admin._id;
    await admin.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = {
  addAdminUser,
};
