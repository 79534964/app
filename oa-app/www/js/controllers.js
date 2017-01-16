angular.module('ionicApp.controllers', [])
//restful 请求对象 $cordovaInAppBrowser内置浏览器 目前版本1.0.0
  .controller('index', function ($scope, $state, $ionicLoading, $cordovaInAppBrowser, $ionicModal, $cordovaNetwork, prop, confirm, restful, dataObject) {
    document.addEventListener('deviceready', function () {
      if ($cordovaNetwork.isOffline()) {
        $ionicModal.fromTemplateUrl('templates/offline.html', {
          scope: $scope
        }).then(function (modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
        $scope.$on('$destroy', function () {
          $scope.modal.remove();
        });
        $scope.reload = function () {
          window.location.href = '';
        }
      } else {
        restful.getVersion({}, function (data) {
          if (data.code == "01") {
            if (data.content.cfgvalue.substr(0, data.content.cfgvalue.indexOf("#")) != '1.0.0') {
              confirm('通知', '有最新的版本 是否更新？', '更新', '下次更新').then(function (res) {
                if (res) {
                  $cordovaInAppBrowser.open('https://www.pgyer.com/B0kl', '_system', {
                    location: 'yes',
                    clearcache: 'yes'
                  });
                }
              });
            }
          }
        });
        if (window.localStorage.user && window.localStorage.password) {
          $ionicLoading.show();
          restful.getToken({
            loginname: window.localStorage.user,
            password: window.localStorage.password
          }, function (data) {
            $ionicLoading.hide();
            if (data.code === '01') {
              prop('登陆成功');
              dataObject.setUserid(data.content.ouid);
            } else {
              $state.go('main.index-login');
              prop(data.msg);
            }
          });
        } else {
          $state.go('main.index-login');
        }
      }
    });
  })
  //登陆的控制器
  .controller('login', function ($scope, $ionicLoading, $ionicHistory, prop, restful, dataObject) {
    $scope.user = window.localStorage.user;
    $scope.password = window.localStorage.password;
    $scope.login = function () {
      var user = $scope.user;
      var password = $scope.password;
      if (!user || !password) {
        prop('账号密码不能为空');
      } else {
        $ionicLoading.show();
        restful.getToken({loginname: user, password: password}, function (data) {
          $ionicLoading.hide();
          if (data.code === '01') {
            window.localStorage.user = user;
            window.localStorage.password = password;
            dataObject.setUserid(data.content.ouid);
            prop('登陆成功');
            $ionicHistory.goBack();
          } else {
            prop(data.msg);
          }
        });
      }
    }
  })
  .controller('productList', function ($scope, $ionicLoading, prop, restful, dataObject, getTimeStr, chartColumnConfig) {
    var cm = $scope.cm = {
      options: {
        initClass: false,
        totalcoupon: 1
      },
      chartOptions: {
        xAxisList: [],
        seriesList: [],
        realCountList: {
          type: 'column',
          name: '实付数量',
          data: []
        },
        countList: {
          type: 'column',
          name: '销售数量',
          data: []
        }
      },
      init: function () {
        cm.getCountList();
        cm.getCountPay();
      },
      getCountList: function () {
        $ionicLoading.show();
        restful.getCountProductList({
            startdata: getTimeStr(new Date('2016-1-1 00:00'), 'start'),
            enddata: getTimeStr(new Date(), 'end'),
            userid: dataObject.getUserid(),
            pagenumber: 1
          },
          function (data) {
            $ionicLoading.hide();
            if (data.code === '01') {
              cm.options.initClass = true;
              angular.forEach(data.content.list.sort(function (a, b) {
                return b.count - a.count
              }), function (e, i) {
                cm.chartOptions.xAxisList.push(e.product_name);
                cm.chartOptions.countList.data.push(e.count);
                cm.chartOptions.realCountList.data.push(e.paycount);
              });
              cm.chartOptions.seriesList.push(cm.chartOptions.countList);
              cm.chartOptions.seriesList.push(cm.chartOptions.realCountList);
              $scope.chartColumnConfig = chartColumnConfig('商品销售数量总计排行', '销售数量(杯)', '杯', cm.chartOptions.xAxisList, cm.chartOptions.seriesList);
            }
          });
      },
      getCountPay: function () {
        restful.getCountMachinePay({
            startdata: getTimeStr(new Date('2016-1-1 00:00'), 'start'),
            enddata: getTimeStr(new Date(), 'end'),
            userid: dataObject.getUserid()
          },
          function (data) {
            if (data.code === '01') {
              cm.options.totalcount = data.content.totalcount;
            } else {
              prop(data.msg);
            }
          });
      }
    }
    cm.init();
  })
  .controller('moneyList', function ($scope, $ionicLoading, prop, restful, dataObject, getTimeStr, chartColumnConfig) {
    var cm = $scope.cm = {
      options: {
        initClass: false,
        totalcoupon: 1
      },
      chartOptions: {
        xAxisList: [],
        seriesList: [],
        payList: {
          type: 'column',
          name: '销售金额',
          data: []
        }
      },
      init: function () {
        cm.getCountList();
        cm.getCountPay();
      },
      getCountList: function () {
        $ionicLoading.show();
        restful.getCountProductList({
            startdata: getTimeStr(new Date('2016-1-1 00:00'), 'start'),
            enddata: getTimeStr(new Date(), 'end'),
            userid: dataObject.getUserid(),
            pagenumber: 1
          },
          function (data) {
            $ionicLoading.hide();
            if (data.code === '01') {
              cm.options.initClass = true;
              angular.forEach(data.content.list.sort(function (a, b) {
                return b.totalsales - a.totalsales
              }), function (e, i) {
                cm.chartOptions.xAxisList.push(e.product_name);
                cm.chartOptions.payList.data.push(e.totalsales);
              });
              cm.chartOptions.seriesList.push(cm.chartOptions.payList);
              $scope.chartColumnConfig = chartColumnConfig('商品销售金额总计排行', '销售金额(元)', '元', cm.chartOptions.xAxisList, cm.chartOptions.seriesList);
            }
          });
      },
      getCountPay: function () {
        restful.getCountMachinePay({
            startdata: getTimeStr(new Date('2016-1-1 00:00'), 'start'),
            enddata: getTimeStr(new Date(), 'end'),
            userid: dataObject.getUserid()
          },
          function (data) {
            if (data.code === '01') {
              cm.options.totalcoupon = data.content.totalcoupon;
            } else {
              prop(data.msg);
            }
          });
      }
    }
    cm.init();
  })
  .controller('errorList', function ($scope, $ionicLoading, $timeout, prop, restful, dataObject) {
    $ionicLoading.show();
    $scope.doRefresh = function () {
      $scope.classFlag2 = false;
      $scope.classFlag1 = false;
      restful.getMachineErrorList({userid: dataObject.getUserid()},
        function (data) {
          $timeout(function () {
            $ionicLoading.hide();
            if (data.code === '01') {
              if (data.content.length > 0) {
                $scope.classFlag1 = true;
                $scope.errorList = data.content;
              } else {
                $scope.classFlag2 = true;
              }
            } else {
              prop(data.msg);
            }
          }, 700);
          $scope.$broadcast('scroll.refreshComplete');
        });
    }
    $scope.doRefresh();
  })
  .controller('report', function ($scope, $state, $ionicLoading, prop, restful, dataObject, orderList) {
    var cx = $scope.cx = {
      radioVale: {
        nickname: 'nickname',
        machineid: 'machineid',
        machinename: 'machinename',
        orderid: 'orderid',
        mobile: 'mobile',
        value: 'orderid'
      },
      curOptions: {
        curClass: false
      },
      changeInput: function () {
        if ($scope.inputValue) {
          cx.curOptions.curClass = true;
        } else {
          cx.curOptions.curClass = false;
        }
      },
      clearInput: function () {
        $scope.inputValue = '';
        cx.curOptions.curClass = false;
      },
      queryData: function () {
        if ($scope.inputValue) {
          if (cx.radioVale.value == 'orderid' || cx.radioVale.value == 'machineid' || cx.radioVale.value == 'mobile') {
            if (isNaN($scope.inputValue)) {
              prop('必须为数字');
            } else {
              cx.query();
            }
          } else {
            cx.query();
          }
        } else {
          prop('不能为空哦');
        }
      },
      query: function () {
        $ionicLoading.show();
        restful.selectOrderList({
            userid: dataObject.getUserid(),
            pagenumber: 1,
            pagesize: 10,
            //[cx.radioVale.value]: $scope.inputValue
          },
          function (data) {
            $ionicLoading.hide();
            if (data.code === '01') {
              if (data.content.list.length == 0) {
                prop('查询不到相关数据');
              } else {
                orderList.init();
                orderList.setDataList(data.content);
                orderList.setOrderInfo({
                  type: cx.radioVale.value,
                  content: $scope.inputValue
                });
                $state.go('main.report-list');
              }
            } else {
              prop(data.msg);
            }
          });
      }
    }
  })
  .controller('reportList', function ($scope, $ionicModal, $ionicLoading, prop, restful, orderList, dataObject) {
    //订单详情
    $ionicModal.fromTemplateUrl('templates/report-details.html', {
      scope: $scope,
      animation: 'slide-in-right'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
    var cx = $scope.cx = {
      dataMap: function (str) {
        if (str == 'nickname') {
          return '用户昵称';
        } else if (str == 'machineid') {
          return '机器编号';
        } else if (str == 'machinename') {
          return '机器名称';
        } else if (str == 'mobile') {
          return '用户手机号';
        } else {
          return '订单编号';
        }
      },
      options: {
        dataList: [],
        orderList: {},
        orderDetails: {},
        page: 1,
        pageFlag: false
      },
      init: function () {
        cx.options.dataList = orderList.getDataList().list;
        if (orderList.getDataList().totalPage <= 1) {
          cx.options.pageFlag = true;
        }
        cx.options.orderList = orderList.getOrderInfo();
      },
      orderDetails: function (index) {
        cx.options.orderDetails = {};
        cx.options.orderDetails = cx.options.dataList[index];
      }
    }
    cx.init();
    $scope.loadMore = function () {
      restful.selectOrderList({
          userid: dataObject.getUserid(),
          pagenumber: ++(cx.options.page),
          pagesize: 10,
          //[cx.options.orderList.type]: cx.options.orderList.content
        },
        function (data) {
          if (data.code === '01') {
            if (data.content.list.length == 0) {
              prop('查询不到相关数据');
              cx.options.pageFlag = true;
            } else {
              cx.options.dataList = cx.options.dataList.concat(data.content.list);
              $scope.$broadcast('scroll.infiniteScrollComplete');
            }
          } else {
            prop(data.msg);
          }
        });
    }
    $scope.title = cx.dataMap(cx.options.orderList.type) + ':' + cx.options.orderList.content + ' 的订单列表';
  })
  .controller('count', function ($scope) {
  })
  .controller('countProduct', function ($scope, $ionicModal, $ionicLoading, $ionicPopup, prop, restful, dataObject, getTimeStr, chartColumnConfig) {
    //柱状
    $ionicModal.fromTemplateUrl('templates/column-charts.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
    $scope.inputStart = new Date();
    $scope.inputEnd = new Date();
    var cm = $scope.cm = {
      options: {
        initClass: false,
        payList: {},
        productList: [],
        pagenum: 1
      },
      chartOptions: {
        title: '',
        xAxisList: [],
        seriesList1: [],
        seriesList2: [],
        countList: {
          type: 'line',
          name: '销售数量',
          data: []
        },
        realCountList: {
          type: 'line',
          name: '实付数量',
          data: []
        },
        payList: {
          type: 'line',
          name: '销售金额',
          data: []
        }
      },
      chartColumnOptions: {
        title: '',
        xAxisList: [],
        seriesList1: [],
        seriesList2: [],
        countList: {
          type: 'column',
          name: '销售数量',
          data: []
        },
        realCountList: {
          type: 'column',
          name: '实付数量',
          data: []
        },
        payList: {
          type: 'column',
          name: '销售金额',
          data: []
        }
      },
      chartColumnInit: function () {
        cm.chartColumnOptions.xAxisList = [];
        cm.chartColumnOptions.seriesList1 = [];
        cm.chartColumnOptions.seriesList2 = [];
        cm.chartColumnOptions.countList.data = [];
        cm.chartColumnOptions.realCountList.data = [];
        cm.chartColumnOptions.payList.data = [];
      },
      chartInit: function () {
        cm.chartOptions.xAxisList = [];
        cm.chartOptions.seriesList1 = [];
        cm.chartOptions.seriesList2 = [];
        cm.chartOptions.countList.data = [];
        cm.chartOptions.realCountList.data = [];
        cm.chartOptions.payList.data = [];
      },
      init: function () {
        cm.options.productList = [];
        cm.getCountPay();
        cm.getCountList();
      },
      getCountList: function () {
        $ionicLoading.show();
        restful.getCountProductList({
            startdata: getTimeStr($scope.inputStart, 'start'),
            enddata: getTimeStr($scope.inputEnd, 'end'),
            userid: dataObject.getUserid(),
            pagenumber: cm.options.pagenum
          },
          function (data) {
            $ionicLoading.hide();
            cm.options.initClass = true;
            if (data.code === '01') {
              cm.options.productList = cm.options.productList.concat(data.content.list);
              cm.chartColumnInit();
              angular.forEach(data.content.list, function (e, i) {
                cm.chartColumnOptions.xAxisList.push(e.product_name);
                cm.chartColumnOptions.countList.data.push(e.count);
                cm.chartColumnOptions.realCountList.data.push(e.paycount);
                cm.chartColumnOptions.payList.data.push(e.totalsales);
              });
              cm.chartColumnOptions.seriesList1.push(cm.chartColumnOptions.countList);
              cm.chartColumnOptions.seriesList1.push(cm.chartColumnOptions.realCountList);
              cm.chartColumnOptions.seriesList2.push(cm.chartColumnOptions.payList);
            } else {
              prop(data.msg);
            }
          });
      },
      getCountPay: function () {
        restful.getCountMachinePay({
            startdata: getTimeStr($scope.inputStart, 'start'),
            enddata: getTimeStr($scope.inputEnd, 'end'),
            userid: dataObject.getUserid()
          },
          function (data) {
            if (data.code === '01') {
              cm.options.payList = data.content;
            } else {
              prop(data.msg);
            }
          });
      },
      showColumnChart: function () {
        $scope.chartColumnConfig1 = chartColumnConfig('商品销售数量统计', '销售数量(杯)', '杯', cm.chartColumnOptions.xAxisList, cm.chartColumnOptions.seriesList1);
        $scope.chartColumnConfig2 = chartColumnConfig('商品销售金额统计', '销售金额(元)', '元', cm.chartColumnOptions.xAxisList, cm.chartColumnOptions.seriesList2);
      },
      showLineChart: function (id) {
        $ionicLoading.show();
        restful.getpProductIdList({
          startdata: getTimeStr($scope.inputStart, 'start'),
          enddata: getTimeStr($scope.inputEnd, 'end'),
          pagesize: 300,
          userid: dataObject.getUserid(),
          pagenumber: 1,
          productid: id
        }, function (data) {
          $ionicLoading.hide();
          if (data.code === '01') {
            cm.chartInit();
            cm.chartOptions.title = data.content.list[0].product_name;
            angular.forEach(data.content.list, function (e, i) {
              cm.chartOptions.xAxisList.push(e.day);
              cm.chartOptions.countList.data.push(e.count);
              cm.chartOptions.realCountList.data.push(e.paycount);
              cm.chartOptions.payList.data.push(e.totalsales);
            });
            cm.chartOptions.seriesList1.push(cm.chartOptions.countList);
            cm.chartOptions.seriesList1.push(cm.chartOptions.realCountList);
            cm.chartOptions.seriesList2.push(cm.chartOptions.payList);
            $scope.chartColumnConfig1 = chartColumnConfig(cm.chartOptions.title, '销售数量(杯)', '杯', cm.chartOptions.xAxisList, cm.chartOptions.seriesList1);
            $scope.chartColumnConfig2 = chartColumnConfig(cm.chartOptions.title, '销售金额(元)', '元', cm.chartOptions.xAxisList, cm.chartOptions.seriesList2);
          } else {
            prop(data.msg);
          }
        });
      },
      showConfirm: function () {
        $ionicPopup.show({
          title: '选择查询时间',
          subTitle: '(请选择正确的时间区间)',
          okText: '确认',
          cancelText: '取消',
          template: '<p class="item">开始时间：<input type="date" ng-model="$parent.inputStart"/></p><p class="item">结束时间：<input type="date" ng-model="$parent.inputEnd"/></p>',
          scope: $scope,
          buttons: [
            {text: '取消'},
            {
              text: '<b>确定</b>',
              type: 'button-positive',
              onTap: function (e) {
                cm.init();
              }
            }
          ]
        })
      }
    }
    cm.init();
  })
  .controller('countMachine', function ($scope, $ionicModal, $ionicLoading, $ionicPopup, prop, restful, dataObject, getTimeStr, chartColumnConfig) {
    //柱状
    $ionicModal.fromTemplateUrl('templates/column-charts.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
    $scope.inputStart = new Date();
    $scope.inputEnd = new Date();
    var cm = $scope.cm = {
      options: {
        initClass: false,
        payList: {},
        machineList: [],
        pagenum: 1
      },
      chartOptions: {
        title: '',
        xAxisList: [],
        seriesList1: [],
        seriesList2: [],
        countList: {
          type: 'line',
          name: '销售数量',
          data: []
        },
        realCountList: {
          type: 'line',
          name: '实付数量',
          data: []
        },
        payList: {
          type: 'line',
          name: '销售金额',
          data: []
        }
      },
      chartInit: function () {
        cm.chartOptions.xAxisList = [];
        cm.chartOptions.seriesList1 = [];
        cm.chartOptions.seriesList2 = [];
        cm.chartOptions.countList.data = [];
        cm.chartOptions.realCountList.data = [];
        cm.chartOptions.payList.data = [];
      },
      init: function () {
        cm.options.machineList = [];
        cm.options.pagenum = 1;
        cm.getCountPay();
        cm.getCountList();
      },
      getCountList: function () {
        $ionicLoading.show();
        restful.getCountMachineList({
            startdata: getTimeStr($scope.inputStart, 'start'),
            enddata: getTimeStr($scope.inputEnd, 'end'),
            userid: dataObject.getUserid(),
            pagenumber: cm.options.pagenum
          },
          function (data) {
            $ionicLoading.hide();
            cm.options.initClass = true;
            if (data.code === '01') {
              if (data.content.list.length > 0) {
                cm.options.machineList = cm.options.machineList.concat(data.content.list);
                cm.options.pagenum = ++(data.content.pageNumber);
              } else {
                prop('没有更多的机器了');
              }
            } else {
              prop(data.msg);
            }
          });
      },
      getCountPay: function () {
        restful.getCountMachinePay({
            startdata: getTimeStr($scope.inputStart, 'start'),
            enddata: getTimeStr($scope.inputEnd, 'end'),
            userid: dataObject.getUserid()
          },
          function (data) {
            if (data.code === '01') {
              cm.options.payList = data.content;
            } else {
              prop(data.msg);
            }
          });
      },
      showLineChart: function (id) {
        $ionicLoading.show();
        restful.getMachineIdList({
          startdata: getTimeStr($scope.inputStart, 'start'),
          enddata: getTimeStr($scope.inputEnd, 'end'),
          pagesize: 300,
          userid: dataObject.getUserid(),
          pagenumber: 1,
          machineid: id
        }, function (data) {
          $ionicLoading.hide();
          if (data.code === '01') {
            cm.chartInit();
            cm.chartOptions.title = data.content.list[0].machinename;
            angular.forEach(data.content.list, function (e, i) {
              cm.chartOptions.xAxisList.push(e.day);
              cm.chartOptions.countList.data.push(e.count);
              cm.chartOptions.realCountList.data.push(e.paycount);
              cm.chartOptions.payList.data.push(e.totalsales);
            });
            cm.chartOptions.seriesList1.push(cm.chartOptions.countList);
            cm.chartOptions.seriesList1.push(cm.chartOptions.realCountList);
            cm.chartOptions.seriesList2.push(cm.chartOptions.payList);
            $scope.chartColumnConfig1 = chartColumnConfig(cm.chartOptions.title, '销售数量(杯)', '杯', cm.chartOptions.xAxisList, cm.chartOptions.seriesList1);
            $scope.chartColumnConfig2 = chartColumnConfig(cm.chartOptions.title, '销售金额(元)', '元', cm.chartOptions.xAxisList, cm.chartOptions.seriesList2);
          } else {
            prop(data.msg);
          }
        });
      },
      showConfirm: function () {
        $ionicPopup.show({
          title: '选择查询时间',
          subTitle: '(请选择正确的时间区间)',
          okText: '确认',
          cancelText: '取消',
          template: '<p class="item">开始时间：<input type="date" ng-model="$parent.inputStart"/></p><p class="item">结束时间：<input type="date" ng-model="$parent.inputEnd"/></p>',
          scope: $scope,
          buttons: [
            {text: '取消'},
            {
              text: '<b>确定</b>',
              type: 'button-positive',
              onTap: function (e) {
                cm.init();
              }
            }
          ]
        })
      }
    }
    cm.init();
  })
  .controller('operative', function ($scope, $state) {
  });
