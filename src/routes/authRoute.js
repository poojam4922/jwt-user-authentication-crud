const express = require('express');
const router =express.Router();
const {register, login, logout} = require('../controllers/authController')
const auth  = require('../middleware/auth');

router.post('/register', register);
// router.get('/register', register);
router.get('/register', (req, res) => {
    res.render('registerPage'); // Ensure this matches your view filename
});

router.post('/login', login)
router.get('/login', (req, res) => {
    res.render('loginPage'); // Ensure this matches your view filename
});

router.post('/logout',auth, logout);

module.exports = router;