/**
 * Created by Jacky on 2015/12/23.
 */

//demo services
var playListServices = angular.module('starter.playListServices',['ngResource']);

playListServices.factory('PlayListService', ['$resource', function($resource){
    var playList = $resource('http://192.168.0.189:8100/api/playList/:id.json', {}, {
      query : {
        method:'get',
        params:{id : 'playList'},
        isArray:true
      }
    });

  return playList;
}]
);

//wechat services
var wechatServices = angular.module('starter.wechatServices',['ngResource']);

wechatServices.factory('WechatService', ['$resource', function($resource){
  var wechatList = $resource('http://192.168.0.189:8100/api/playList/:id.json', {}, {
    query : {
      method: 'get',
      params: {id : 'playList'},
      isArray: true
    }
  });
  return wechatList;
}]);

wechatServices.factory('NotificationService', ['$ionicPlatform', '$cordovaLocalNotification', function($ionicPlatform, $cordovaLocalNotification) {
    return {
      /**
       * 推送一條消息
       * @param notificationData
       * notificationData.id  消息id
       * notificationData.title 消息標題 string
       * notificationData.text 消息內容 string
       * notificationData.data 消息參數內容 Arbitrary data, objects will be encoded to JSON string
       * notificationData.at 消息發送時間 time
       * notificationData.every 消息重複時間 second, minute, hour, day, week, month or year
       * notificationData.badge app消息提醒標誌 ios紅點信息
       */
      scheduleSingleNotification: function(notificationData){
        //判斷ionic組件是否連接硬件成功
        $ionicPlatform.ready(function(){
          console.log('show local notification');
          $cordovaLocalNotification.schedule(notificationData).then(function (result) {
              // ...
            console.log('show local notification success');
            console.log(result);

          });
        });
      },
      /**
       * 推送多條消息
       * @param notificationArray
       * 消息數組
       */
      scheduleMultipleNotifications: function(notificationArray){
        //判斷ionic組件是否連接硬件成功
        $ionicPlatform.ready(function(){

          $cordovaLocalNotification.schedule(notificationArray).then(function (result) {
            // ...
          });
        });
      }
    }
}]);

wechatServices.factory('FileService', ['$ionicPlatform', '$cordovaFile',function($ionicPlatform, $cordovaFile){
  return {
    writeText: function(text) {
      $ionicPlatform.ready(function() {
        // CHECK dir and Create dir
        $cordovaFile.checkDir(cordova.file.externalDataDirectory, "test")
          .then(function (success) {
            // success
            console.log(" CHECK dir success");
            console.log(angular.toJson(success));
          }, function (error) {
            // error
            console.log("check dir error");
            $cordovaFile.createDir(cordova.file.externalDataDirectory, "test", false)
              .then(function (success) {
                // success
                console.log("create dir success");
                console.log(success);

              }, function (error) {
                // error
                console.log("create dir error");
                console.log(error);
              });

          });

        //Create file
        $cordovaFile.writeFile(cordova.file.externalDataDirectory, "test/file.txt", text, true)
          .then(function (success) {
            // success
            console.log("write file success ");

          }, function (error) {
            // error
            console.log("write file error ");
            console.log(error);

          });

      });

    }
  }

}]);




