const mongoose = require('mongoose');

const ClaimSchema = new mongoose.Schema({
  policyNumber: {
    type: String,
    required: true,
  },
  claimantName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dateOfClaim: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Claim', ClaimSchema);
