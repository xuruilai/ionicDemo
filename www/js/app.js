// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

//調試用語句，去除Ripple Emulator調試彈框
var annoyingDialog = parent.document.getElementById('exec-dialog');
if (annoyingDialog) annoyingDialog.outerHTML = "";
//angular中添加ngCordova依赖
//加載ionic.service.core,用於app推送
angular.module('starter', ['ionic','ionic.service.core', 'ngCordova',  'starter.controllers', 'starter.playListServices', 'starter.wechatServices'])

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

    //添加推送代碼
    var push = new Ionic.Push({
      "debug": true
    });

    push.register(function(token) {
      console.log("Device token:",token.token);
      //alert(token.token);


    });

  });

  //物理返回按钮控制&双击退出应用
  $ionicPlatform.registerBackButtonAction(function (e) {
    //判断处于哪个页面时双击退出
    if ($location.path() == '') {
      if ($rootScope.backButtonPressedOnceToExit) {
        ionic.Platform.exitApp();
      } else {
        $rootScope.backButtonPressedOnceToExit = true;
        $cordovaToast.showShortBottom('再按一次退出系统');
        setTimeout(function () {
          $rootScope.backButtonPressedOnceToExit = false;
        }, 2000);
      }
    }else if ($ionicHistory.backView()) {
      if ($cordovaKeyboard.isVisible()) {
        $cordovaKeyboard.close();
      } else {
        $ionicHistory.goBack();
      }
    }
    else {
      $rootScope.backButtonPressedOnceToExit = true;
      $cordovaToast.showShortBottom('再按一次退出系统');
      setTimeout(function () {
        $rootScope.backButtonPressedOnceToExit = false;
      }, 2000);
    }
    e.preventDefault();
    return false;
  }, 101);

})
  //$ionicConfigProvider修改配置
.config(function($ionicConfigProvider){
  //配置平台的页面缓存数量 如超过此数量则移除最长时间未显示的视图页面
  $ionicConfigProvider.views.maxCache(0);
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

  //設置導航條標題的對齊方式
  $ionicConfigProvider.navBar.alignTitle('center');

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
      'bar-view': {
        templateUrl: 'templates/bars.html',
        controller: 'AppCtrl'
      }
    }
  })
  .state('app.search', {
    url: '/search',
    views: {
      'tab-address': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'tab-discover': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'tab-wechat': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'tab-wechat': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

    .state('app.wechatList', {
      url: '/wechatList',
      views: {
        'tab-wechat': {
          templateUrl: 'templates/wechatlist.html',
          controller: 'WechatListCtrl'
        }
      }
    })

    .state('app.wechat',{
      url: '/wechat/:wechatId',
      views: {
        'tab-wechat': {
          templateUrl: 'templates/wechat.html',
          controller: 'WechatCtrl'
        }
      }
    })

    .state('app.picture',{
      url: '/picture',
      views: {
        'tab-address': {
          templateUrl: 'templates/camera.html',
          controller: 'CameraCtrl'
        }
      }
    })

    .state('app.scanBarcode',{
      url: '/scanBarcode',
      views: {
        'tab-address': {
          templateUrl: 'templates/scanBarcode.html',
          controller: 'BarcodeCtrl'
        }
      }
    })

    .state('app.geoPosition',{
      url: '/geoPosition',
      views: {
        'tab-address': {
          templateUrl: 'templates/geoPosition.html',
          controller: 'GeoCtrl'
        }
      }
    })
  //推送消息
    .state('app.pushNews',{
      url: '/pushNews',
      views: {
        'tab-address': {
          templateUrl: 'templates/browse.html',
          controller: 'PushCtrl'
        }
      }
    })
  //檢查推送狀態
    .state('app.checkPush',{
      url: '/checkPush',
      views: {
        'tab-address': {
          templateUrl: 'templates/browse.html',
          controller: 'CheckPushCtrl'
        }
      }
    })

    //添加本地推送消息
    .state('app.notification',{
      url: '/notification',
      views: {
        'tab-address': {
          templateUrl: 'templates/notification.html',
          controller: 'NotificationCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/wechatList');
});
