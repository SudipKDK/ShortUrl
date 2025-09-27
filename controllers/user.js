import { v4 as uuidv4 } from "uuid";
import User from "../models/user.js";
import { setUser } from "../service/auth.js";

export const handleSignup = async (req, res) => {
  const user = req.body;
  if (!req.body) return res.status(400).json({ msg: "all field are required" });
  await User.create({
    username: user.username,
    email: user.email,
    password: user.password,
  });
  res.redirect("/");
};

export const handleLogin = async (req, res) => {
//   try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.render("login", { error: "invalid username or password" });
    }
    // const sessionId =uuidv4();
    // setUser(sessionId,user);
    // console.log(user._id)
    const token = setUser(user._id,user);
    res.cookie("uid", token);
    return res.redirect("/");
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
};
