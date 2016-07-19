'use strict';

let app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $state, $auth, $rootScope) {
  console.log('mainCtrl!');

  $rootScope.currentUser;

  $scope.isAuthenticated = () => $auth.isAuthenticated();

  $scope.logout = () => {
    $auth.logout();
    $state.go('home');
  };

  $scope.authenticate = provider => {
    $auth.authenticate(provider)
      .then(res => {
        $state.go('home');
      })
      .catch(err => {
        console.log('err:', err);
      })
  };
});
