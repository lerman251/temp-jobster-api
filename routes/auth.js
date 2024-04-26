const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/authentication');
const testUser = require('../middleware/testUser');
const { register, login, updateUser } = require('../controllers/auth');

const rateLimiter = require('express-rate-limit');

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: {
        msg:`You have exceeded the 2 requests in 15 minutes limit!`}
});
router.post('/register', apiLimiter, register)
router.post('/login', apiLimiter, login)

router.patch('/updateUser', authenticateUser, testUser, updateUser)
module.exports = router
