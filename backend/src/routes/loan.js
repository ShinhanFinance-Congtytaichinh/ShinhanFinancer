const express = require('express');
const Lead = require('../models/Lead');
const { sendOTP, validateOTP } = require('../services/otp');

const router = express.Router();

// Submit loan application
router.post('/submit', async (req, res) => {
  try {
    const { fullName, phone, email, idNumber, loanAmount, loanTerm, loanType } = req.body;

    // Validate inputs
    if (!fullName || !phone || !email || !idNumber || !loanAmount || !loanTerm || !loanType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Sanitize inputs (basic example)
    const sanitizedData = {
      fullName: fullName.replace(/[<>&]/g, ''),
      phone,
      email,
      idNumber,
      loanAmount: parseFloat(loanAmount),
      loanTerm: parseInt(loanTerm),
      loanType,
      contractId: `SHF-${Date.now()}`,
    };

    // Save lead
    const lead = new Lead(sanitizedData);
    await lead.save();

    // Send OTP
    const otp = await sendOTP(phone, email);
    res.json({ message: 'Application submitted, OTP sent', contractId: lead.contractId, otpId: otp.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { otp, otpId, contractId } = req.body;
    const isValid = await validateOTP(otp, otpId);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Update lead status
    await Lead.findOneAndUpdate({ contractId }, { $set: { verified: true } });
    res.json({ message: 'OTP verified, contract generated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;