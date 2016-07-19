'use strict';

const mongoose = require('mongoose');

const express = require('express');
const multer = require('multer');
const aws = require('aws-sdk');
const s3 = new aws.S3();
const fs = require('fs');
const uuid = require('uuid');

let imageSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    url: {type: String, required: true},
    name: {type: String, required: true}
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {fileSize: 52428800}
});

let urlBase = 'https://s3.amazonaws.com';
let bucketName = 'MollyWhitnackBucket';

// Image;

imageSchema.statics.upload = function(file, user, cb){
    console.log('file1:', file);
    console.log('user1:', user);

    let base64Image = file.buffer.toString('base64');
    let url = `${urlBase}/${bucketName}/${file.originalname}`;

    console.log('here');

    let image = new Image({
      user: user.user,
      url: url,
      name: file.originalname
    });

    console.log("image: " , image);
    image.save(err =>{    
      if(err) return cb(err)
      let key = uuid()+'.'+file.originalname.split('.')[1];
      console.log('key:', key);

      s3.putObject({
        Bucket: 'MollyWhitnackBucket',
        Key: `${key}`,
        Body: file.buffer,
        ACL: 'public-read'
      }, (err, data) =>{
        if(err) return cb(err)
        console.log("err2:", err);
        console.log("data2:", data);
      })
        //res.send(url);
        cb(null, url);
    })
}
/*
imageSchema.methods.delete =function(cb){

}

Image.upload(req.file, req.user, err =>{

})

//Image.delete(err =>{})*/

const Image =  mongoose.model('Image', imageSchema);

module.exports = Image;





//cant use arrow functions
/*crudSchema.statics.addResident = function(apartmentId, residentId, cb){
    //'this' is apartment model
    this.findById(apartmentId, (err, apartment)=>{
      if(err || !apartment) return cb(err || 'apartment not found');
       apartment.addResidentMethod(residentId, cb);
    })
}

crudSchema.methods.addResidentMethod = function(residentId, cb){
  if(this.residents.length < this.maxOccupancy){
    this.residents.push(residentId);
    this.save(cb);
  }
  else{
    cb('apartment at capacity');
  }
}

crudSchema.methods.getSomething = function(crudId, cb){
    let tenants = this.residents.length;
    var totalRent = tenants * this.rent;
    return totalRent;
*/






