'use strict';

var app = angular.module('myApp');

app.service('WallPost', function($http, $q) {

    this.addWallPost= (wallpost) =>{
    console.log("in add wallpost: ", wallpost);
    return $http.post(`/api/wallposts`, wallpost)
      .then(res => {
        return $q.resolve(res.data);
      })
      .catch(err => {   
        console.log('err:', err);
      })
    };


    this.getWallPosts = (userId) =>{
    return $http.get(`/api/wallposts/${userId}`)
      .then(res => {
        return $q.resolve(res.data);
      })
      .catch(err=>{
        console.log("err: ", err);
      });
  };

});
