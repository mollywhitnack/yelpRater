
'use strict';

let app = angular.module('myApp');

app.controller('loginCtrl', function($scope, $state, $auth, $rootScope) {
  console.log('loginCtrl!');

  $scope.login = () => {
      $auth.login($scope.user)
      .then(res =>{
        console.log("res: ", res);
        //$rootScope.currentUser = res.data;
        $state.go('profile');
      })
      .catch(err =>{
        console.log("err:", err);
      })
    };
});