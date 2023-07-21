const {register, login, profile} = require ('../controllers/userController.js');
const {authenticateToken} = require ('../middlewares/auth.js');

const express = require ('express');
const router = express.Router ();

router.post ('/register', register);
router.post ('/login', login);
router.get ('/profile', authenticateToken, profile);

module.exports = router;
