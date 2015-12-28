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

  };

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
  $scope.playList = PlayListService.get({id: $stateParams.playlistId});
  console.log($scope.playList);
}])

.controller('WechatListCtrl',['$http', '$scope', 'WechatService', '$stateParams', function($http, $scope, wechatService, $stateParams){
  $scope.wechatList = wechatService.query();
}])

.controller('WechatCtrl',['$http', '$scope', 'WechatService', '$stateParams',function($http, $scope, wechatService, $stateParams) {
  $scope.wechat = wechatService.get({id: $stateParams.wechatId});
}])

.controller('PictureCtrl',['$scope', '$cordovaCamera', function($scope, $cordovaCamera){
  document.addEventListener("deviceready", function () {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });

  }, false);
}])
  //二維碼掃描
  .controller('BarcodeCtrl', function($scope, $cordovaBarcodeScanner) {

    document.addEventListener("deviceready", function () {

      $cordovaBarcodeScanner
        .scan()
        .then(function(barcodeData) {
          // Success! Barcode data is here
          console.log(barcodeData);
        }, function(error) {
          // An error occurred
          console.log(error);
        });


      // NOTE: encoding not functioning yet
      $cordovaBarcodeScanner
        .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
        .then(function(success) {
          // Success!
        }, function(error) {
          // An error occurred
        });

    }, false);
  });
