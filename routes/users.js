const express = require('express');
const router = express.Router();
const { register, getUser, getUserByPseudo, getUserByEmail } = require('../services/user');

router.route('/')
.post(register)
.get(getUser)

router.get('/pseudo/:pseudo', getUserByPseudo)
router.get('/email/:email', getUserByEmail)


module.exports = router;