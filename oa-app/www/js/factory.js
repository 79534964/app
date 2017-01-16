angular.module('ionicApp.factory', [])
//所有的请求对象
  .factory('restful', function ($resource) {
    // var host='https://test.wx.mattburg.cn/coffeeforh5/';
    var host = 'http://org.oa.mattburg.cn/coffeeforh5/';
    return $resource('', {}, {
      getVersion: {
        url: 'http://org.oa.mattburg.cn/coffeeforh5/appinfo?appkey=VERSION_H5',
        method: 'POST'
      },
      getToken: {
        url: host + 'login?',
        method: 'POST',
        params: {
          loginname: '@loginname',
          password: '@password'
        }
      },
      getMachineErrorList: {
        url: host + 'machine/breakdownlist?',
        method: 'POST',
        params: {
          userid: '@userid'
        }
      },
      getCountMachineList: {
        url: host + 'order/getmachinesalalist?',
        method: 'POST',
        params: {
          startdata: '@startdata',
          enddata: '@enddata',
          userid: '@userid',
          pagenumber: '@pagenumber'
        }
      },
      getCountMachinePay: {
        url: host + 'order/getmachinesala?',
        method: 'POST',
        params: {
          startdata: '@startdata',
          enddata: '@enddata',
          userid: '@userid'
        }
      },
      getCountProductList: {
        url: host + 'order/getproductsalalist?',
        method: 'POST',
        params: {
          startdata: '@startdata',
          enddata: '@enddata',
          userid: '@userid',
          pagenumber: '@pagenumber'
        }
      },
      getMachineIdList: {
        url: host + 'order/getproductsalalistbymachineid?',
        method: 'POST',
        params: {
          startdata: '@startdata',
          enddata: '@enddata',
          userid: '@userid',
          pagenumber: '@pagenumber',
          machineid: '@machineid',
          pagesize: '@pagesize'
        }
      },
      getpProductIdList: {
        url: host + 'order/getproductsalalistbyproductid?',
        method: 'POST',
        params: {
          startdata: '@startdata',
          enddata: '@enddata',
          userid: '@userid',
          pagenumber: '@pagenumber',
          productid: '@productid',
          pagesize: '@pagesize'
        }
      },
      selectOrderList: {
        url: host + 'order/getorderinfo?',
        method: 'POST',
        params: {
          userid: '@userid',
          orderid: '@orderid',
          machinename: '@machinename',
          machineid: '@machineid',
          nickname: '@nickname',
          mobile: '@mobile',
          pagenumber: '@pagenumber',
          pagesize: '@pagesize'
        }
      }
    });
  })
  //提示框工厂方法
  .factory('prop', function ($ionicPopup, $timeout) {
    return function (str) {
      var myPopup = $ionicPopup.show({
        title: str
      });
      $timeout(function () {
        myPopup.close();
      }, 1000);
    }
  })
  //选择的提示框
  .factory('confirm', function ($ionicPopup) {
    return function (title, content, okText, cancelText) {
      return $ionicPopup.confirm({
        title: title,
        template: content,
        okText: okText,
        cancelText: cancelText
      })
    }
  })
  //二级tab隐藏一级导航
  .directive('hideTabs', function ($rootScope) {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {
        scope.$on('$ionicView.beforeEnter', function () {
          scope.$watch(attributes.hideTabs, function (value) {
            $rootScope.hideTabs = value;
          });
        });

        scope.$on('$ionicView.beforeLeave', function () {
          $rootScope.hideTabs = false;
        });
      }
    };
  })
  //获取时间
  .factory('getTimeStr', function () {
    return function (time, type) {
      if (type == 'start') {
        return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' 00:00';
      } else {
        return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' 23:59';
      }
    }
  })
  //自定义过滤器
  .filter("subDate", function () {
    return function (input) {
      return input.getFullYear() + '-' + (input.getMonth() + 1) + '-' + input.getDate();
    }
  });
