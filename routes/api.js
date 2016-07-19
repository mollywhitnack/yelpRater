'use strict';

const express = require('express');

let router = express.Router();

router.use('/users', require('./users'));
router.use('/wallposts', require('./wallposts'));
router.use('/images', require('./images'));
router.use('/businesses', require('./businesses'));

module.exports = router;
