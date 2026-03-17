const express = require('express')
const router = express.Router()
const{
    registerStudent,
    activateAccount,
    loginStudent
} = require('../controllers/authController')

router.post('/register', registerStudent)
router.post('/activate', activateAccount)
router.post('/login', loginStudent)


module.exports = router