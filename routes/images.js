'use strict';

const express = require('express');
const multer = require('multer');
const aws = require('aws-sdk');
const s3 = new aws.S3();
const fs = require('fs');
const uuid = require('uuid');

const Image = require('../models/image');

//middlewear to accept files we send up
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {fileSize: 52428800}
});

let router = express.Router();

let urlBase = 'https://s3.amazonaws.com';
let bucketName = 'MollyWhitnackBucket';

router.post('/', upload.single('photo'), (req, res)=>{
  console.log("req.body", req.body);
  console.log("req.file:", req.file);

    Image.upload(req.file, req.body, (err, url)=>{
        res.status(err ? 400 :200).send(err || url);
    })
})

router.get('/', (req, res)=>{
  Image.find({}, (err, images)=>{
    res.status(err ? 400 : 200).send(err || images);
  })
})

router.route('/:id')
 .get((req, res) =>{
  Image.findById(req.params.id, (err, image) =>{
     res.status(err ? 400 : 200).send(err || image);
    });
})

router.route('/user/:id')
 .get((req, res) =>{
  Image.find({user: req.params.id}, (err, image) =>{
     res.status(err ? 400 : 200).send(err || image);
    });
  })

module.exports = router;




/*'use strict';

const express = require('express');
const Image = require('../models/image');
let router = express.Router();

// images.js
// /api/images



router.post('/', (req, res)=>{
  Image.create(req.body, (err, image)=>{
    res.status(err ? 400 : 200).send(err || image);
  })
})

router.route('/:id')
 .get((req, res) =>{
  Image.findById(req.params.id, (err, image) =>{
     res.status(err ? 400 : 200).send(err || image);
    });
  })
  .put((req, res) =>{
  Image.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, image) =>{
     res.status(err ? 400 : 200).send(err || image);
    });
  })
  .delete((req, res) =>{
  Image.findByIdAndRemove(req.params.id, err =>{
     res.status(err ? 400 : 200).send(err);
  });
});

module.exports = router;*/
