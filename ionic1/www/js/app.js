//ionicApp
angular.module('ionicApp', ['ionic', 'ngCordova', 'ngResource', 'highcharts-ng', 'ionicApp.controllers', 'ionicApp.factory', 'ionicApp.services'])
//调取原生应用
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  //视图初始化
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    //解决安卓导航在顶部$ionicConfigProvider
    $ionicConfigProvider.platform.android.tabs.position('bottom');
    $stateProvider
    //主页面
      .state('main', {
        url: '/main',
        views: {
          'main': {//在name等于main的视图下
            templateUrl: 'templates/main.html'
          }
        }
      })
      //首页
      .state('main.index', {
        url: '/index',
        views: {
          'main-index': {
            templateUrl: 'templates/main-index.html',
            controller: 'index'
          }
        }
      })
      //登陆
      .state('main.index-login', {
        url: 'index/login',
        views: {
          'main-index': {//在name等于index的视图下
            templateUrl: 'templates/index-login.html',
            controller: 'login'
          }
        }
      })
      //销售排行
      .state('main.index-productList', {
        url: 'index/productList',
        views: {
          'main-index': {
            templateUrl: 'templates/index-productList.html',
            controller: 'productList'
          }
        }
      })
      //金额排行
      .state('main.index-moneyList', {
        url: 'index/moneyList',
        views: {
          'main-index': {
            templateUrl: 'templates/index-moneyList.html',
            controller: 'moneyList'
          }
        }
      })
      //故障列表
      .state('main.index-errorList', {
        url: 'index/errorList',
        views: {
          'main-index': {
            templateUrl: 'templates/index-errorList.html',
            controller: 'errorList'
          }
        }
      })
      //销售报表
      .state('main.report', {
        url: '/report',
        views: {
          'main-report': {
            templateUrl: 'templates/main-report.html',
            controller: 'report'
          }
        }
      })
      //订单列表
      .state('main.report-list', {
        url: 'report/list',
        views: {
          'main-report': {
            templateUrl: 'templates/report-list.html',
            controller: 'reportList'
          }
        }
      })
      //报表统计
      .state('main.count', {
        url: '/count',
        views: {
          'main-count': {
            templateUrl: 'templates/main-count.html',
            controller: 'count'
          }
        }
      })
      //商品统计
      .state('main.count-product', {
        url: 'count/product',
        views: {
          'main-count': {
            templateUrl: 'templates/count-product.html',
            controller: 'countProduct'
          }
        }
      })
      //机器统计
      .state('main.count-machine', {
        url: 'count/machine',
        views: {
          'main-count': {
            templateUrl: 'templates/count-machine.html',
            controller: 'countMachine'
          }
        }
      })
      //运营系统
      .state('main.operative', {
        url: '/operative',
        views: {
          'main-operative': {
            templateUrl: 'templates/main-operative.html',
            controller: 'operative'
          }
        }
      })
    //重定向路由
    $urlRouterProvider.otherwise('/main');
  });
