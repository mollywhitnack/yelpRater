'use strict';

var app = angular.module('myApp');

app.service('Business', function($http, $q){

  this.searchYelp = (search) =>{
    console.log("search: ", search);
    return $http.get(`/api/businesses/yelp/${search}`)
     .then(res => {
        console.log("res.data in services:", res.data);
        console.log("res in services:", res);
        return $q.resolve(res.data);
      })
      .catch(err => {   
        console.log('err:', err);
      })
  }

  this.addFavorite = (businessObj, userId) =>{
    console.log("businessObj:", businessObj);
    return $http.post(`/api/businesses/${userId}`, businessObj)
    .then(res => {
        console.log("res ln 24 business services:", res);
        return $q.resolve(res);
      })
      .catch(err => {   
        console.log('err:', err);
      })
    };
});

//do find, if not in db then add, if in db add user to favorited