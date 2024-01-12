const express = require('express');
const router = express.Router();
const { 
    signup, 
    login, 
    // getAllUsers, 
    // createUser, 
    // getUserById, 
    // updateUser, 
    // deleteUser 
} = require('../controllers/userController');

router.post('/signup', signup); 
router.post('/login', login); 

// router.get('/', authenticate, getAllUsers);
// router.post('/', createUser);
// router.get('/:id', authenticate, getUserById);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

module.exports = router;
