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


