const express = require('express');
const router = express.Router();
const { getClaims, createClaim } = require('../controllers/claims');

router.route('/').get(getClaims).post(createClaim);

module.exports = router;
