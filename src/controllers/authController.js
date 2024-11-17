const User = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPass,
    });

    res.status(200).json({ message: "user registered successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  register,
};
