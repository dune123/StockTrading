const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symbols: [
    { type: String } // e.g., ["AAPL", "TSLA"]
  ]
});

module.exports = mongoose.model('Watchlist', watchlistSchema);
