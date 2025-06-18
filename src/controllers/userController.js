const User = require("../models/user");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId } }).select(
      "-password"
    );
    res.status(200).json({ message: "users fetched successfully", users });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllUsers,
};
