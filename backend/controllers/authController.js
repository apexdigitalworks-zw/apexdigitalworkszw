const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");
const { sendEmail } = require("../utils/email");

// POST /api/auth/register
async function register(req, res, next) {
  try {
    const { fullName, email, password, phone, company } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Full name, email, and password are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with that email already exists" });
    }

    const user = await User.create({ fullName, email, password, phone, company });
    const token = generateToken(user._id, user.role);

    // Welcome email (non-blocking — don't fail registration if email fails)
    sendEmail({
      to: user.email,
      subject: "Welcome to APEXDIGITALWORKSZW!",
      text: `Hi ${user.fullName}, welcome aboard! Your account has been created successfully. Explore our services and let's build something great together.`,
      html: `<p>Hi ${user.fullName},</p><p>Welcome aboard! Your account has been created successfully.</p><p>Explore our services and let's build something great together.</p><p>— The APEXDIGITALWORKSZW Team</p>`,
    }).catch((e) => console.error("Welcome email failed:", e.message));

    res.status(201).json({
      message: "Account created successfully",
      token,
      user: user.toSafeObject(),
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = generateToken(user._id, user.role);

    res.json({
      message: "Logged in successfully",
      token,
      user: user.toSafeObject(),
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/auth/me
async function getMe(req, res, next) {
  try {
    res.json({ user: req.user.toSafeObject() });
  } catch (err) {
    next(err);
  }
}

// PUT /api/auth/profile
async function updateProfile(req, res, next) {
  try {
    const allowedFields = ["fullName", "phone", "company", "address", "avatarUrl"];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        req.user[field] = req.body[field];
      }
    });

    await req.user.save();
    res.json({ message: "Profile updated successfully", user: req.user.toSafeObject() });
  } catch (err) {
    next(err);
  }
}

// PUT /api/auth/change-password
async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current and new password are required" });
    }

    const user = await req.user.constructor.findById(req.user._id).select("+password");
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, getMe, updateProfile, changePassword };
