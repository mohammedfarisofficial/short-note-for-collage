import User from "../models/User.js";
import { compare, hash, sign } from "../utils/hash.js";

// Register User
const register = async (req, res) => {
  const { email, password, name } = req.body;

  if (email && password && name) {
    try {
      const isExist = await User.findOne({ email });

      if (isExist) {
        res.status(409).json("Email already exist!!");
      } else {
        const hashedPassword = await hash(password);
        const newUser = new User({ email, password: hashedPassword, name });
        const response = await newUser.save();

        if (response) {
          console.log("User registered!");
          res.status(201).json(response);
        }
      }
    } catch (error) {
      console.log("Error:", error);
      res.status(404).json("Error:", error);
    }
  } else {
    console.log("Missing form data");
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login Data:", req.body);
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log("User doesn't exist!");
      res.status(404).json("User doesn't exist!");
      return;
    }

    if (email && password) {
      const isMatch = await compare(password, user.password);
      if (isMatch) {
        const userObj = user.toObject();
        delete userObj.password;
        const token = await sign(userObj);

        res.status(200).json({ token });
      } else {
        res.status(404).json("Incorrect password!");
      }
    } else {
      console.log("Invalid Credientials!!");
    }
  } catch (err) {
    return res.json({ err: err.message });
  }
};

// Protected Route
const projectedRoute = (req, res) => {
  res.status(200).json({ isValid: true });
};
export { register, login, projectedRoute };
