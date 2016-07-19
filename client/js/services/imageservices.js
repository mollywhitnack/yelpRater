'use strict';

var app = angular.module('myApp');

app.service('image', function($http, $q){

  this.getAll = () =>{
    return $http.get('/api/cruds');
  }

  this.getById = id =>{
    return $http.get(`/api/cruds/${id}`);
  }

  this.addCrud= (crud) =>{
    return $http.post(`/api/cruds`, crud)
      .then(res => {
        return $q.resolve(res.data);
      })
      .catch(err => {   
        console.log('err:', err);
      })
    };

  this.deleteCrud = (id) =>{
    return $http.delete(`/api/cruds/${id}`)
      .then( () => {
        return $q.resolve();
      })
      .catch(err => {   
        console.log('err:', err);
      })
    };

  this.updateCrud = (id, crud) =>{
      return $http.put(`/api/cruds/${id}`, crud)
      .then(res => {
        return $q.resolve(crud);
      })
      .catch(err => {   
        console.log('err:', err);
      })
    };

});

//in residents Resident.getAll()
//                .then(residents =>{})