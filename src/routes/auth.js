const express = require('express');
const router = express.Router();
const {authenticateToken, adminOnly} = require('../middleware/auth.js');
const { registerUser, userLogin } = require('../controllers/auth');
const {loadDashboard} = require('../controllers/dashboard.js');

router.route('/register-user').post(registerUser);
router.route('/login').post(userLogin);
router.route('/dashboard').get(authenticateToken, adminOnly, loadDashboard);


module.exports = router;