const User = require("../User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



// ================= REGISTER USER =================

const registerUser = async (req, res) => {

  try {

    const { username, email, password } =
      req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({

      username,
      email,
      password: hashedPassword,

    });

    res.status(201).json({

      message: "User registered successfully",

      user: {

        id: user._id,
        username: user.username,
        email: user.email,

      },

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// ================= LOGIN USER =================

const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(400).json({
        message: "User not found",
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid password",
      });

    }

    const token = jwt.sign(

      {

        id: user._id,
        email: user.email,

      },

      "vidflow_secret_key",

      {

        expiresIn: "7d",

      }

    );

    res.status(200).json({

      message: "Login successful",

      token,

      user: {

        id: user._id,
        username: user.username,
        email: user.email,

      },

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// ================= EXPORTS =================

module.exports = {

  registerUser,
  loginUser,

};