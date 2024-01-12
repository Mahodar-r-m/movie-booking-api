const User = require('../models/userModel');
const { hashPassword, comparePasswords } = require('../utils/passwordUtils');
const { generateToken } = require('../utils/authUtils');

exports.signup = async (req, res) => {
    try {

      const userCount = await User.countDocuments();
      const maxUsers = parseInt(process.env.MAX_USERS, 10);

      if (userCount >= maxUsers) {
          return res.status(403).json({
              error: 'Maximum user limit reached. Sorry, the free trial for user signups has ended!',
          });
      }

      // console.log('Request Body:', req.body); // Log the entire request body
      const { username, email, password } = req.body;
      // console.log('Body username: ',username);
      // console.log('Body email: ',email);
      // console.log('Body password: ',password);
  
      // Hash the password before saving it
      const hashedPassword = await hashPassword(password);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword, // Store the hashed password
      });
  
      const savedUser = await newUser.save();
      res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed: User not found' });
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await comparePasswords(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Authentication failed: Invalid password' });
      }
  
      // Generate JWT token upon successful login
      const token = generateToken(user._id);
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// exports.getAllUsers = async (req, res) => {
//     try {
//       const users = await User.find();
//       res.status(200).json({
//         success: true,
//         data: users
//       });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
// };

// exports.createUser = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const user = await User.create({ username, email, password });
//     res.status(201).json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { username, email, password } = req.body;
//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       { username, email, password },
//       { new: true }
//     );
//     if (!updatedUser) return res.status(404).json({ message: 'User not found' });
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedUser = await User.findByIdAndDelete(id);
//     if (!deletedUser) return res.status(404).json({ message: 'User not found' });
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
