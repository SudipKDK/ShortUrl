import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { setUser } from "../service/auth.js";

// Input validation helper
const validateUserInput = (userData) => {
  const { username, email, password } = userData;
  const errors = [];

  if (!username || username.trim().length < 3) {
    errors.push("Username must be at least 3 characters long");
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please provide a valid email address");
  }

  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  return errors;
};

export const handleSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    const validationErrors = validateUserInput({ username, email, password });
    if (validationErrors.length > 0) {
      return res.render("signup", { 
        error: validationErrors.join(", "),
        username: username || "",
        email: email || ""
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.render("signup", { 
        error: "User with this email or username already exists",
        username: username || "",
        email: email || ""
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    await User.create({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    res.redirect("/login?message=Account created successfully. Please login.");
  } catch (error) {
    console.error("Signup error:", error);
    res.render("signup", { 
      error: "Something went wrong. Please try again.",
      username: req.body.username || "",
      email: req.body.email || ""
    });
  }
};

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.render("login", { 
        error: "Email and password are required",
        email: email || ""
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.render("login", { 
        error: "Invalid email or password",
        email: email || ""
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render("login", { 
        error: "Invalid email or password",
        email: email || ""
      });
    }

    // Generate JWT token
    const token = setUser(user._id, user);
    
    // Set secure cookie
    res.cookie("uid", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    res.render("login", { 
      error: "Something went wrong. Please try again.",
      email: req.body.email || ""
    });
  }
};

export const handleLogout = (req, res) => {
  res.clearCookie("uid");
  res.redirect("/login");
};
