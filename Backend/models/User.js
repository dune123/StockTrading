const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, // Will be hashed using bcrypt
  balance: { type: Number, default: 10000}, // Initial virtual money

  // List of stocks user owns
  portfolio: [
    {
      symbol: { type: String, required: true }, // e.g. "AAPL"
      quantity: { type: Number, required: true },
      avgBuyPrice: { type: Number, required: true } // Used for PnL calculation
    }
  ],

  // References to transactions
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
