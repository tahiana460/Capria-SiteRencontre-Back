const express = require('express');
const router = express.Router();
const { addView, getAllUsersView, getVisitors } = require('../services/view');

// router.route('/')
// .post(addView)
// .get(getUser)

router.post('/add', addView)
router.get('/:userId', getAllUsersView)
router.get('/visitor/:userId', getVisitors)

// router.route('/:id')
// .get(getUserById)
// .put(updateUserInformation)

// router.get('/pseudo/:pseudo', getUserByPseudo)
// router.get('/email/:email', getUserByEmail)


module.exports = router;