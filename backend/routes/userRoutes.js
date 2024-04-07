const express = require("express");
const User = require("../model/userModel");
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const blacklistToken = require("../model/blacklist")
const nodemailer = require("nodemailer")

router.post("/register", async (req, res) => {
  const { password } = req.body
  try {
    const newPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ ...req.body, password: newPassword })
    if (!user) {
      res.status(400).json({ msg: "regitration failed" })
    }
    res.status(200).json({ msg: "successfully registered" })
  } catch (error) {
    res.status(400).json({ msg: "registration failed" })
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ msg: "User not found" });
    }

    const verify = await bcrypt.compare(password, existingUser.password);

    if (!verify) {
      return res.status(401).json({ msg: "Wrong credentials" });
    }

    const token = jwt.sign(
      { userId: existingUser._id, name: existingUser.name },
      "ironman",
    );

    const refreshToken = jwt.sign(
      { userId: existingUser._id, name: existingUser.name },
      "thanos",
    );

    res.status(200).json({
      msg: "Login successful",
      token,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});



router.get("/logout", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]
  try {
    if (!token) {
      return res.status(400).json({ error: 'Token not provided' });
    }
    const isBlacklisted = await blacklistToken.exists({ token });
    if (isBlacklisted) {
      return res.status(400).json({ error: 'Token has already been invalidated' });
    }

    await blacklistToken.create({ token });

    res.status(200).json({ msg: 'User has been logged out' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log out' });
  }
})

router.get("/myuser", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "ironman");
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const generateRandomToken = async (email) => {
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ msg: "User not found" });
    }

    const token = jwt.sign(
      { userId: existingUser._id, name: existingUser.name },
      "ironman",
    );
    return token;
  } catch (err) {
    console.log(err);
  }
}


// Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const token = generateRandomToken(email);

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your_email@gmail.com',
        pass: 'your_email_password'
      }
    });

    const mailOptions = {
      from: 'your_email@gmail.com',
      to: user.email,
      subject: 'Password Reset Link',
      text: `Click the following link to reset your password: https://gentle-concha-cfd0e9.netlify.app/user/reset-password/${token}`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Reset Password
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Profile
router.patch('/update-profile', async (req, res) => {
  const { userId, fullName, avatar } = req.body;
  // const userId = req.userId;
  console.log(userId);

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { ...req.body, fullName, avatar }, { new: true });
    res.status(200).json({ updatedUser: updatedUser, message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Avatar
router.patch('/update-avatar', async (req, res) => {
  const { avatar } = req.body;
  const userId = req.userId;

  try {
    await User.findByIdAndUpdate(userId, { avatar });
    res.status(200).json({ message: 'Avatar updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Change Password
router.patch('/change-password', async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
  // const userId = req.userId;

  try {
    const user = await User.findById(userId);

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid old password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router