'use strict';

let app = angular.module('myApp');

app.controller('businessCtrl', function($scope, User, $rootScope, Business, Profile){
  console.log("businessCtrl");

  $scope.businesses = [];
  console.log("Profile:", Profile)
  var favorites = Profile.favorites;

  $scope.searchBusiness = () => {
      console.log("$scope.newItem.searchParams" , $scope.newItem.searchParams)
      Business.searchYelp($scope.newItem.searchParams)
      .then(res =>{
        console.log("res from search businsess:" , res);
        for(var i=0; i< favorites.length; i++){
          console.log(res.id ," vs ", favorites[i]);
          if(res.id === favorites[i]){
            $scope.toggleFave = true;
          }
        }
        $scope.businesses.push(res);
      })    
      .catch(err =>{
        console.log("err in businessCtrl: ", err);
      })
    }

  $scope.searchBusiness2 = () => {
      console.log("search");
      var searchBy = {};

      if($scope.newItem.location){
        searchBy.location = $scope.newItem.location
      }
      if($scope.newItem.term){
        searchBy.term = $scope.newItem.term;
      }
      console.log("searchBy:", searchBy);

      Business.searchCatagories(searchBy)
      .then(res =>{
        console.log("res from search businsess:" , res);
        for(var i=0; i< favorites.length; i++){
          console.log(res.id ," vs ", favorites[i]);
          if(res.id === favorites[i]){
            $scope.toggleFave = true;
          }
        }
        $scope.businesses.push(res);
      })    
      .catch(err =>{
        console.log("err in businessCtrl: ", err);
      })
    }


    //add to user favorites
    $scope.favorite = (index)=>{
      $scope.toggleFave = !$scope.toggleFave;
      console.log("$scope.businesses[index].id", $scope.businesses[index].id)
      User.addFavoriteToUser( Profile._id, $scope.businesses[index].id)
      .then(Business.addFavorite($scope.businesses[index], Profile._id))
      .then(res =>{
        console.log("res:" , res);
      })
      .catch(err =>{
        console.log("err in businessCtrl: ", err);
      })    
      console.log("$scope.businesses[index]:", $scope.businesses[index].id);
      /*     
      .then(res =>{
        console.log("res:" , res);
      })
      .catch(err =>{
        console.log("err in businessCtrl: ", err);
      })*/
    }

    $scope.unFavorite = (index)=>{
      $scope.toggleFave = !$scope.toggleFave;
      console.log("$scope.businesses[index].id", $scope.businesses[index].id)
      User.removeFavoritefromUser( Profile._id, $scope.businesses[index].id)
      //.then(Business.removeFavorite($scope.businesses[index], Profile._id))
      .then(res =>{
        console.log("res:" , res);
      })
      .catch(err =>{
        console.log("err in businessCtrl: ", err);
      })    
      console.log("$scope.businesses[index]:", $scope.businesses[index].id);
    }

});