const express = require('express')
const router = express.Router()
const { showLogin, register, showRegister, logout, login } = require('../controllers/authController');



router.get('/login', showLogin)
router.post('/login', login)
router.get('/logout', logout)
router.get('/register', showRegister)
router.post('/register', register)


module.exports = router