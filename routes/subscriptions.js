const express = require('express');
const router = express.Router();
const { getSubscriptions } = require('../services/subscription');

router.route('/')
.get(getSubscriptions)
// .post(addView)


module.exports = router;