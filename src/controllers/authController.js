const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      return res.status(400).json({ message: "invalid user name or email" });
    }

    const token = jwt.sign({ id: user?.id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
      sameSite: "None",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: "user login successfully", token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getUserByToken = async (req, res, next) => {
  try {
    const user = await User.find({ _id: req.userId }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "user fetched successfully", user });
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Strict",
      secure: true,
    });

    res.status(200).json({ message: "logout successful" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getUserByToken,
};
