const express = require('express');
const router = express.Router();
const { register, getUser } = require('../services/user');

router.route('/')
.post(register)
.get(getUser)


module.exports = router;