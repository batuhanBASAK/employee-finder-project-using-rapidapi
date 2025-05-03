const mongoose = require("mongoose");

const actionLogSchema = new mongoose.Schema({
  email: { type: String, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ActionLog", actionLogSchema);
