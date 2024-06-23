const User = require("../models/user");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");
require("dotenv").config();
const user = require("../models/user");
const  generateToken  = require('../middleware/generateToken');

const register = async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;
  const password = Math.random().toString(36).slice(-8); // Generate a simple password

  try {
    // const hashedPassword = await bcrypt.hash(password, 10);
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password
    });

   const response =  await user.save();
   console.log("data saved");
  //  const payload ={
  //   id:response.id,
  //   email:response.email
  //  }

  //  console.log(JSON.stringify(payload));
  //  const token = generateToken(payload);
  //  console.log("token is: ", token);
   
   res.status(200).json({response:response, message:"User saved successfully"});
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (isMatch) {
    //   return res.status(401).json({ message: "Invalid credentials" });
    // }
    // const accessToken = jwt.sign(
    //   { email: user.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "30m" }
    // );
    const payload ={
      id:user._id,
      email:user.email
    }
    const token = generateToken(payload);
    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.REFRESH_SECRET
    );
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie('jwt',token, { httpOnly: true, secure: true, maxAge: 3600000 })
    res.json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const logout = async(req, res) =>{
  try {
    const user = await User.findById(req.user.id);
    console.log(user);
    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }
    user.refreshToken = null;
    await user.save();

    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  register,
  login,
  logout
};
