angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
    $scope.login = function() {
      console.log(123123);
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  //Show the serch form
  $scope.searchFlag = false;
  $scope.showSearch = function(){
        $scope.searchFlag = !$scope.searchFlag;

  }
})

.controller('PlaylistsCtrl', ['$http','$scope', 'PlayListService', function($http, $scope, PlayListService) {
  //$http.jsonp("http://127.0.0.1:8000/app/playList/playList.json?callback=JSON_CALLBACK&type=json")
  //      .success(function(data) {
  //      // 数据
  //      console.log(data);
  //    })
  //    .error(
  //      function(data){
  //        console.log(data);
  //        alert("error");
  //      }
  //    );


  $scope.playlists = PlayListService.query();
}])


.controller('PlaylistCtrl',['$http', '$scope', 'PlayListService', '$stateParams',function($http, $scope, PlayListService, $stateParams) {
  console.log($stateParams);
  $scope.playList = PlayListService.get({id: $stateParams.playlistId});
  console.log($scope.playList);
}]);
