const express = require('express');
const router = express.Router();
const { register, getUser, getUserById, getUserByPseudo, getUserByEmail, updateUserInformation, getAdmin, envoiMail, updateUserMdp, getUserByGoogle, addGoogleAccount, removeGoogleAccount } = require('../services/user');

router.route('/')
.post(register)
.get(getUser)

router.route('/id/:id')
.get(getUserById)
.put(updateUserInformation)

router.put('/mdp/:id',updateUserMdp)

router.get('/pseudo/:pseudo', getUserByPseudo)
router.get('/email/:email', getUserByEmail)

router.get('/google/:email', getUserByGoogle)
router.put('/google/associate/:userId', addGoogleAccount)
router.put('/google/dissociate/:userId', removeGoogleAccount)

router.post('/mdp',envoiMail)

router.route('/admin')
.get(getAdmin)


module.exports = router;