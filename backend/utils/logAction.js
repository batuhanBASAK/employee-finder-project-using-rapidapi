const ActionLog = require("../models/ActionLog");

const logAction = async (email, action) => {
  try {
    await ActionLog.create({ email, action });
  } catch (err) {
    console.error("Failed to log action:", err);
  }
};

module.exports = logAction;
