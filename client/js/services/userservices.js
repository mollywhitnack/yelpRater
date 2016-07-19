'use strict';

var app = angular.module('myApp');

app.service('User', function($http, $q) {

  this.profile = () => {
    return $http.get('/api/users/profile')
      .then(res => {
        return $q.resolve(res.data);
      });
  };

  this.getProfile = (id) =>{
     return $http.get(`/api/users/profile/${id}`)
    .then(res => {
        return $q.resolve(res.data);
    })
    .catch(err =>{
      console.log("err:", err);
    });
  }

  this.getAll = () =>{
    return $http.get('/api/users');
  }

  this.updateProfile = (id, profileObj) =>{
    console.log("here");
    console.log(id , " " ,profileObj);
    return $http.put(`/api/users/profile/${id}`,  profileObj)
    .then(res => {
        return $q.resolve();
    })
    .catch(err =>{
      console.log("err:", err);
    });
  }

  this.deleteAccount = (id) =>{
    return $http.delete(`/api/users/profile/${id}`)
    .then(res => {
        return $q.resolve();
    })
    .catch(err =>{
      console.log("err:", err);
    });
  }

  this.addFavoriteToUser = (id, yelpId) =>{
    //console.log("addFavoriteToUser", "id:", id, "yelpId", yelpId)
    return $http.put(`/api/users/profile/${id}/add/${yelpId}`)
     .then(res => {
        //console.log("res ln 53:", res);
        return $q.resolve();
    })
    .catch(err =>{
      console.log("err:", err);
    });
  }

  this.removeFavoritefromUser = (id, yelpId) =>{
    console.log("remove Favorite", "id:", id, "yelpId", yelpId)
    return $http.put(`/api/users/profile/${id}/remove/${yelpId}`)
     .then(res => {
        console.log("res ln 53:", res);
        return $q.resolve();
    })
    .catch(err =>{
      console.log("err:", err);
    });
  }
 

});
