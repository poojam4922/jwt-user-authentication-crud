const jwt = require('jsonwebtoken')


const generateToken = (userData) => {
    // Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "1d" }); // Token valid for 30 minutes
  };


  module.exports = generateToken