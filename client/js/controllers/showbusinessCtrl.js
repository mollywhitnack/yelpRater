'use strict';

let app = angular.module('myApp');

app.controller('showbusinessCtrl', function($scope, $stateParams, Business) {
  console.log('showbusinessCtrl!');

  let businessId = $stateParams;
  console.log("businessId", businessId.businessId);

  Business.searchYelp(businessId.businessId)
  .then(res =>{
    console.log("res:" , res);
    $scope.business = res;
  })    
  .catch(err =>{
    console.log("err in businessCtrl: ", err);
  })

});
