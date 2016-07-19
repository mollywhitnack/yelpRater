'use strict';

let app = angular.module('myApp');

app.controller('profileCtrl', function($scope, Profile, ProfileByID, $state, User, $rootScope, WallPost) {
  
  console.log('profileCtrl!');

  $rootScope.currentUser = Profile;

  $scope.user = ProfileByID || Profile;

  WallPost.getWallPosts($scope.user._id)
    .then(res =>{
    $scope.userWallposts = res;
  })

  console.log("user:", $scope.user );
  console.log("curruser:", $rootScope.currentUser );

  $scope.showdisplayNameForm = () =>{
    console.log("show form");
    $scope.displayNameForm = true;
  }

  $scope.updatedisplayName = () => {
    $scope.displayNameForm = false;
    $scope.user.displayName = $scope.newItem.displayName;
    User.updateProfile($scope.user._id, $scope.newItem)
      .then(profile =>{
        console.log("profile:", profile);
        $scope.newItem.displayName = '';
      })
      .catch(err =>{
        console.log("err:", err);
      })
  }

  $scope.canceldisplayName = () =>{
    $scope.usernameForm = true;
    $scope.newItem.displayName = '';
  }

//photo
  $scope.showPictureForm = () =>{
    console.log("show form");
    $scope.photoForm = true;
  }

  $scope.updatePicture = () => {
    $scope.photoForm = false;
    console.log("$state.current: ", $state.current);
    $scope.user.profileImage = $scope.newItem.profileImage;
    console.log("$scope.newItem:", $scope.newItem);
    User.updateProfile($scope.user._id, $scope.newItem)
      .then(profile =>{
        console.log("profile:", profile);
        $scope.newItem.profileImage = '';
      })
      .catch(err =>{
        console.log("err:", err);
      })
  }

  $scope.cancelPhotoUrl = () =>{
    $scope.photoForm = true;
    $scope.newItem.photoUrl = '';
  }


  $scope.deleteAccount = (user) =>{
    //add swal
    console.log(user._id);
    User.deleteAccount(user._id)
      .then()
      .catch(err =>{
        console.log("err: ", err);
      });
  }

    $scope.submitMessage = () =>{

    var postObj = {
      to: $scope.user,
      from: $rootScope.currentUser._id,
      fromName: $rootScope.currentUser.displayName,
      text: $scope.newItem.text,
      createdAt: "add moment"
    };

    console.log("post obj:", postObj);


    WallPost.addWallPost(postObj)
      .then(wallpost =>{
        console.log("wallpost:" , wallpost);
        User.addWallPostToUser(ProfileByID._id, wallpost._id);
      })
      .then($state.go($state.$current, null, { reload: true }))
      .catch(err =>{
        console.log("err: ", err);
      })
   };


});