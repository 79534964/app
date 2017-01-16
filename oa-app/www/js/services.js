angular.module('ionicApp.services', [])
//dataObject
  .service('dataObject', function () {
    function dataObject() {
      var userid;
      this.getUserid = function () {
        return userid;
      }
      this.setUserid = function (id) {
        userid = id;
      }
      var userName;
      this.getUserName = function () {
        return userName;
      }
      this.setUserName = function (name) {
        userName = name;
      }
    }

    var obj = new dataObject();
    return obj;
  })
  .service('chartColumnConfig', function () {
    var chartColumnConfig = function (title, yAxisTittle, unit, xAxisList, seriesList) {
      return {
        options: {
          colors: ['#0060b0', '#29aedf'],
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr style="color:{series.color}"><td>{series.name}: </td>' +
            '<td><b>{point.y} ' + unit + '</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          credits: {
            enabled: false
          }
        },
        title: {
          text: title
        },
        yAxis: {
          title: {
            text: yAxisTittle
          }
        },
        xAxis: {
          categories: xAxisList,
          crosshair: true
        },
        series: seriesList
      }
    }
    return chartColumnConfig;
  })
  .service('orderList', function () {
    function orderList() {
      var dataList = [];
      this.getDataList = function () {
        return dataList;
      }
      this.setDataList = function (list) {
        dataList = list;
      }
      var orderInfo = {};
      this.getOrderInfo = function () {
        return orderInfo;
      }
      this.setOrderInfo = function (object) {
        orderInfo = object;
      }
      this.init = function () {
        dataList = [];
        orderInfo = {};
      }
    }

    var obj = new orderList();
    return obj;
  })
