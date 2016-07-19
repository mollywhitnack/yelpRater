'use strict';

const express = require('express');
const request = require('request');
const Business = require('../models/business');
let router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var Yelp = require("yelp")


const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;
const TOKEN = process.env.TOKEN;
const TOKEN_SECRET = process.env.TOKEN_SECRET;

var yelp = new Yelp({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  token: TOKEN,
  token_secret: TOKEN_SECRET
});

router.get('/', (req, res) =>{
  Business.find({}, (err, businesses) =>{
    res.status(err ? 400 : 200).send(err || businesses);
  });
});

router.delete('/:id', (req, res) =>{
  Business.findByIdAndRemove(req.params.id, err =>{
     res.status(err ? 400 : 200).send(err);
  });
});

router.post('/:userId', (req, res)=>{
    console.log("----------In post to / ------------");
    console.log("req.body:", req.body);
    console.log("req.params.userId:", req.params.userId);
    Business.addFavorite(req.body, req.params.userId, (err, url)=>{
      res.status(err ? 400 :200).send(err || url);
    })
  })

router.get('/test', (req, res) =>{
  console.log("-----in test------");
  console.log("yelp:", yelp);
  yelp.business('yelp-san-francisco', function(err, data){
    res.status(err ? 400 : 200).send(err || data);
  })
});

router.get('/yelp/:searchParam', (req, res) =>{
  yelp.business(`${req.params.searchParam}`, function(err, data){
    res.status(err ? 400 : 200).send(err || data);
  })
});


router.get('/yelpCatagories', (req, res) =>{
  console.log('req.body:', req.body);
  yelp.search(req.body, function(err, data){
    res.status(err ? 400 : 200).send(err || data);
  })
});


module.exports = router;