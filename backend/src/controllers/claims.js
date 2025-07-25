const Claim = require('../models/Claim');

// @desc    Get all claims
// @route   GET /api/v1/claims
// @access  Public
exports.getClaims = async (req, res, next) => {
  try {
    const claims = await Claim.find();

    res.status(200).json({ success: true, data: claims });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Create a claim
// @route   POST /api/v1/claims
// @access  Public
exports.createClaim = async (req, res, next) => {
  try {
    const claim = await Claim.create(req.body);

    res.status(201).json({
      success: true,
      data: claim,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
