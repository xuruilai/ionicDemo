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

//調用相機
.controller('CameraCtrl',['$scope', '$cordovaCamera', function($scope, $cordovaCamera){
  $scope.getPhoto = function(){
    document.addEventListener("deviceready", function(){
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
  };
}])
  //二維碼掃描
  .controller('BarcodeCtrl', function($scope, $cordovaBarcodeScanner) {
    $scope.scanBarcode = function(){
      document.addEventListener("deviceready", function () {

        $cordovaBarcodeScanner
          .scan()
          .then(function(barcodeData) {
            // Success! Barcode data is here
            var barcode = document.getElementById('myBarcode');
            console.log(barcodeData);
            barcode.innerHTML = angular.toJson(barcodeData);
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
    }
  })

  //獲取位置信息
  .controller('GeoCtrl', function($scope, $cordovaGeolocation) {
    document.addEventListener("deviceready", function () {
      $scope.getPosition = function(){
        var posOptions = {timeout: 10000, enableHighAccuracy: true, maximumAge: 30000};
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;
            var position_dom = document.getElementById('myPosition');
            console.log(position);
            position_dom.innerHTML = angular.toJson(position);
          }, function(err) {
            // error
            var position_dom = document.getElementById('myPosition');
            position_dom.innerHTML = angular.toJson(err);
          });
      }
    }, false);
  })

  //發送消息
  .controller('PushCtrl', function($scope, $http) {
    // Define relevant info
    var privateKey = '7df2624b34bb997efb9002249525c7aa7409ae8e3ecd1bbd';
    //var tokens = ['DEV-c3ca1c8e-6442-4beb-9902-3c514add229c'];
    var tokens = ['DEV-8a3e8014-e98a-459c-bb1b-7f6b0b7df15f'];
    var appId = 'f34d57f8';

  // Encode your key
    var auth = btoa(privateKey + ':');

  // Build the request object
    var req = {
      method: 'POST',
      url: 'https://push.ionic.io/api/v1/push',
      headers: {
        'Content-Type': 'application/json',
        'X-Ionic-Application-Id': appId,
        'Authorization': 'basic ' + auth
      },
      data: {
        "tokens": tokens,
        "notification": {
          "alert":"Hello World!"
        }
      }
    };

    // Make the API call
    $http(req).success(function(resp){
      // Handle success
      console.log(resp);
      console.log("Ionic Push: Push success!");
    }).error(function(error){
      // Handle error
      console.log("Ionic Push: Push error...");
    });
  })

  //查看推送消息狀態
  .controller('CheckPushCtrl', function($scope, $http) {
    // Define relevant info
    var privateKey = '7df2624b34bb997efb9002249525c7aa7409ae8e3ecd1bbd';
    var appId = 'f34d57f8';
    var messageId = '66223874ae0d11e58b606abe193e18ed';

  // Encode your key
    var auth = btoa(privateKey + ':');

  // Build the request object
    var req = {
      method: 'GET',
      url: 'https://push.ionic.io/api/v1/status/' + messageId,
      headers: {
        'Content-Type': 'application/json',
        'X-Ionic-Application-Id': appId,
        'Authorization': 'basic ' + auth
      }
    };

  // Make the API call
    $http(req).success(function(resp){
      console.log(resp);
      // Handle success
      console.log("Ionic Push: Push success!");
    }).error(function(error){
      // Handle error
      console.log("Ionic Push: Push error...");
    });
  })

  //添加本地消息推送
  .controller('NotificationCtrl', ['$scope', '$rootScope', '$ionicPlatform', '$cordovaLocalNotification', function($scope, $rootScope, $ionicPlatform, $cordovaLocalNotification) {
    //添加app本地消息提醒
    $ionicPlatform.ready(function () {

      // ========== Scheduling
      $scope.scheduleSingleNotification = function () {
        $cordovaLocalNotification.schedule({
          id: 1,
          title: 'single Title here',
          text: 'Text here',
          data: {
            customProperty: 'custom value'
          }
        }).then(function (result) {
          // ...
        });
      };

      $scope.scheduleMultipleNotifications = function () {
        $cordovaLocalNotification.schedule([
          {
            id: 1,
            title: 'Multiple Title 1 here',
            text: 'Text 1 here',
            data: {
              customProperty: 'custom 1 value'
            }
          },
          {
            id: 2,
            title: 'Multiple Title 2 here',
            text: 'Text 2 here',
            data: {
              customProperty: 'custom 2 value'
            }
          },
          {
            id: 3,
            title: 'Multiple Title 3 here',
            text: 'Text 3 here',
            data: {
              customProperty: 'custom 3 value'
            }
          }
        ]).then(function (result) {
          // ...
        });
      };

      $scope.scheduleDelayedNotification = function () {
        var now = new Date().getTime();
        var _10SecondsFromNow = new Date(now + 10 * 1000);

        $cordovaLocalNotification.schedule({
          id: 1,
          title: 'Delayed 10sTitle here',
          text: 'Text here',
          at: _10SecondsFromNow
        }).then(function (result) {
          // ...
        });
      };

      $scope.scheduleEveryMinuteNotification = function () {
        $cordovaLocalNotification.schedule({
          id: 1,
          title: 'EveryMinute Title here',
          text: 'Text here',
          every: 'minute'
        }).then(function (result) {
          // ...
        });
      };

      // =========/ Scheduling

      // ========== Events

      $rootScope.$on('$cordovaLocalNotification:schedule',
        function (event, notification, state) {
          // ...
          alert('event schedule');
        });

      $rootScope.$on('$cordovaLocalNotification:trigger',
        function (event, notification, state) {
          // ...
        });

      $rootScope.$on('$cordovaLocalNotification:update',
        function (event, notification, state) {
          // ...
        });

      $rootScope.$on('$cordovaLocalNotification:clear',
        function (event, notification, state) {
          // ...
        });

      $rootScope.$on('$cordovaLocalNotification:clearall',
        function (event, state) {
          // ...
        });

      $rootScope.$on('$cordovaLocalNotification:cancel',
        function (event, notification, state) {
          // ...
        });

      $rootScope.$on('$cordovaLocalNotification:cancelall',
        function (event, state) {
          // ...
        });

      $rootScope.$on('$cordovaLocalNotification:click',
        function (event, notification, state) {
          // ...
          alert('event click');
          alert(angular.toJson(notification));
          alert(angular.toJson(state));

        });

      // =========/ Events

    });


  }]);




