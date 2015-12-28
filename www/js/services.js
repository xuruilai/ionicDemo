/**
 * Created by Jacky on 2015/12/23.
 */

var playListServices = angular.module('starter.playListServices',['ngResource']);

playListServices.factory('PlayListService', ['$resource', function($resource){
    var playList = $resource('http://127.0.0.1:8100/api/playList/:id.json', {}, {
      query : {
        method:'get',
        params:{id : 'playList'},
        isArray:true
      }
    });

  return playList;
}]
);
