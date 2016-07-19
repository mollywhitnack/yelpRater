'use strict';

let app = angular.module('myApp');

app.controller('businessCtrl', function($scope, $rootScope, Business, Profile, User){
  console.log("businessCtrl");

  $scope.businesses = [];

  $scope.searchBusiness = () => {
      console.log("$scope.newItem.searchParams" , $scope.newItem.searchParams)
      Business.searchYelp($scope.newItem.searchParams)
      .then(res =>{
        console.log("res:" , res);
        $scope.businesses.push(res);
      })    
      .catch(err =>{
        console.log("err in businessCtrl: ", err);
      })
    }

    //add to user favorites
    $scope.favorite = (index)=>{
      $scope.toggleFave = !$scope.toggleFave;
      console.log("$scope.businesses[index]:", $scope.businesses[index].id);
      Business.addFavorite($scope.businesses[index], Profile._id)      
      .then(res =>{
        console.log("res:" , res);
        User.addFavoritetoUser($scope.businesses[index], Profile._id)
      })    
      .catch(err =>{
        console.log("err in businessCtrl: ", err);
      })
    }
});