import User from "../modules/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(501).json({ message: "user exists" });
      return;
    }

    const userVal = {
      firstName,
      lastName,
      friends:[],
      email,
      password: hashedPassword,
      picturePath,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    };

    const newUser = new User({
      ...userVal,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email }).lean();
    if (!user) {
      res.status(505).json({ message: "email not found plz signup" });
      return;
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      res.status(505).json({ message: "password does not match" });
      return;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password
    const finalUser = { user, token: token };
    
    res.status(200).json(finalUser);
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};
