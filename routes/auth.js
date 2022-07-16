const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')

const {googleLogin} = require('../controllers/auth')

router.post('/googlelogin',googleLogin);


module.exports = router;