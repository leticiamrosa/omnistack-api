// Model começa com letra maiscula e é no singular
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
});

module.exports = mongoose.model('User', UserSchema);