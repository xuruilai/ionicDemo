// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
//angular中添加ngCordova依赖
angular.module('starter', ['ionic', 'ngCordova',  'starter.controllers', 'starter.playListServices'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
  //$ionicConfigProvider修改配置
.config(function($ionicConfigProvider){
  //配置平台的页面缓存数量 如超过此数量则移除最长时间未显示的视图页面
  $ionicConfigProvider.views.maxCache(5);
  //配置android平台的缓存
  $ionicConfigProvider.platform.android.views.maxCache(5);

  //配置视图之间过滤效果,默认为platform,按平台动态选择对应的过渡效果 ios ios过渡效果 android 安卓过渡效果 none 无过渡效果
  $ionicConfigProvider.views.transition("ios");

  //这个设置选项中设置为true的时候就会缓存前进的视图，而且不会每次加载的时候不会重置。
  $ionicConfigProvider.views.forwardCache(true);

  //配置是使用js的scroll滚动还是使用原生的滚动。
  $ionicConfigProvider.scrolling.jsScrolling(false);

  //设置返回按钮的图标。设置返回按钮的文字。设置是否将上一个view视图的title设置成返回按钮的文字，iOS是默认的true。
  //$ionicConfigProvider.backButton.icon('iconPath');
  //$ionicConfigProvider.backButton.text('返回');
  $ionicConfigProvider.backButton.previousTitleText(true);

  $ionicConfigProvider.form.checkbox('square');

  $ionicConfigProvider.tabs.position('bottom');
  //更多参数配置访问 http://www.haomou.net/2015/08/18/2015_ionic_tools/
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    views: {
      'main-view': {
          templateUrl: 'templates/menu.html'
      }
    },
    controller: 'AppCtrl'
  })
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
