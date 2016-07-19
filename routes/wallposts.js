'use strict';

const express = require('express');

const WallPost = require('../models/wallpost');

let router = express.Router();

// wallposts.js
// /api/wallposts

router.get('/', (req, res)=>{
  WallPost.find({}, (err, wallposts)=>{
    res.status(err ? 400 : 200).send(err || wallposts);
  })
});

router.post('/', (req, res)=>{
  WallPost.create(req.body, (err, wallpost)=>{
    res.status(err ? 400 : 200).send(err || wallpost);
  })
})

router.route('/:id')
 .get((req, res) =>{
  WallPost.find({to: req.params.id}, (err, wallpost) =>{
     //if(err) return res.status(400)
     res.status(err ? 400 : 200).send(err || wallpost);
    });
  })
  .put((req, res) =>{
  WallPost.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, wallpost) =>{
     res.status(err ? 400 : 200).send(err || wallpost);
    });
  })
  .delete((req, res) =>{
  WallPost.findByIdAndRemove(req.params.id, err =>{
     res.status(err ? 400 : 200).send(err);
  });
});


module.exports = router;

