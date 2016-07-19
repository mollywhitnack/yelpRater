'use strict';

var app = angular.module('myApp');

app.controller('usersCtrl', function($scope, $$state, $state, User) {
  console.log('usersCtrl!');

  var userPromise = User.getAll();
  console.log("userPromise:", userPromise);
  userPromise.then(
    function(result) {
       console.log(result.data);
       $scope.userFeed = result.data;
    });
});