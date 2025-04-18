const mongoose = require("mongoose");

const BlackListedTokenSchema = mongoose.Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const BlackListedTokenModel = mongoose.model("blacklistedtoken", BlackListedTokenSchema);

module.exports = BlackListedTokenModel;