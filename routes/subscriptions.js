const express = require('express');
const router = express.Router();
const { getSubscriptions, addSubscription, getLastUserSubscription } = require('../services/subscription');

router.route('/')
.post(addSubscription)
.get(getSubscriptions)

router.get('/:userId', getLastUserSubscription)


module.exports = router;