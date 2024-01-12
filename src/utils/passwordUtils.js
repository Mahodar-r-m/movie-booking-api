const bcrypt = require('bcryptjs');
require('dotenv').config();

// const hashPassword = async (password) => {
//   const saltRounds = process.env.PASSWORD_HASH_SALT_ROUNDS;
//   console.log('Salt Rounds:', saltRounds);
//   return await bcrypt.hash(password, saltRounds);
// };

const hashPassword = async (password) => {
  try {
    console.log('Password: ',password, typeof password); // Debugging
    // const saltRounds = process.env.PASSWORD_HASH_SALT_ROUNDS;
    const saltRounds = parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS, 10); // Ensure saltRounds is a number
    console.log('Salt Rounds:', saltRounds, typeof saltRounds); // Log the value for debugging
    // console.log(typeof parseInt(saltRounds));
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.error('Hashing Error:', error);
    throw new Error('Hashing Error');
  }
};


const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePasswords,
};
