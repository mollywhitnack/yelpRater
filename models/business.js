'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var Yelp = require("yelp")
//saved businesses once they are favorited


const JWT_SECRET = process.env.JWT_SECRET;


let businessSchema = new mongoose.Schema({
  yelpId: String, 
  favoredBy:[String]
});


businessSchema.statics.addFavorite = function(businessObj, user, cb){
    console.log('file1:', businessObj.id);
    console.log('user1:', user);

    this.findOne({yelpId: businessObj.id}, (err, business)=>{
      if(err) return cb(err);
      
      if(business){
        console.log(business)
        //business.favoritedBy.push(user);
        business.save(cb);
      }

      let newbusiness = new Business({
          yelpId: businessObj.id,
          favoredBy: [user]
        });

        newbusiness.save(err =>{
          if(err) return cb(err)
        })
    })
}

let Business = mongoose.model('Business', businessSchema);

module.exports = Business;


