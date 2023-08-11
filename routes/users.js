const express = require('express');
const router = express.Router();
const { register, getUser, getUserById, getUserByPseudo, getUserByEmail, updateUserInformation, getAdmin } = require('../services/user');

router.route('/')
.post(register)
.get(getUser)

router.route('/id/:id')
.get(getUserById)
.put(updateUserInformation)

router.get('/pseudo/:pseudo', getUserByPseudo)
router.get('/email/:email', getUserByEmail)

router.route('/admin')
.get(getAdmin)


module.exports = router;