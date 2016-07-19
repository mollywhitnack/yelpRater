'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET;

let wallpostSchema = new mongoose.Schema({
  to: String,
  from: String,
  fromName: String,
  text: String,
  createdAt: String
});

let Wallpost;

Wallpost =  mongoose.model('Wallpost', wallpostSchema);

module.exports = Wallpost;