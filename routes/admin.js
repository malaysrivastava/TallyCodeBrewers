const express = require('express')
const router = express.Router();
const authAdmin = require('../middleware/auth')

const {allUsers} = require('../controllers/admin')

router.get('/users',authAdmin,allUsers);

module.exports = router;