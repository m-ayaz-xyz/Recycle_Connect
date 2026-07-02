const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {

    const { email, password, name, role } = req.body;

    const userExists =
      await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role
    });

    res.status(201).json({
      message: "User Created",
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role:user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.cookie(
      "token",
      token,
      {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge:
          24 * 60 * 60 * 1000
      }
    );

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role:user.role,
      message: "Login Success"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};