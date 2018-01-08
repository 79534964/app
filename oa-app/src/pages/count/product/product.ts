import {Component} from '@angular/core';
import {App, ModalController} from 'ionic-angular';
import {Factorys} from '../../../theme/factorys';
import {ProductListService} from '../../../service/count/product-list-service';
import {MachineSalaService} from '../../../service/count/machine-sala-service';
import {CommonDate} from '../../common/date/date';
import {CountLinechar} from '../linechar/linechar';

import highcharts from 'highcharts';

@Component({
  templateUrl: 'product.html',
  providers: [MachineSalaService, ProductListService]
})
export class CountProduct {
  private chart_1 = {};
  private chart_2 = {};
  private typePet = 'list';
  private datePet = 'day';
  private startDate = new Date();
  private endDate = new Date();
  private total;
  private list = [];

  constructor(public app: App, public productService: ProductListService, public totalService: MachineSalaService, public modalCtrl: ModalController, public factorys: Factorys) {
    this.actionHttp();
  }

  actionHttp() {
    if (this.datePet) {
      this.endDate = new Date();
      this.startDate = this.factorys.getSelectDate(this.datePet);
    }
    this.factorys.showLoading();
    Promise.all([
      this.productService.post({
        startDate: this.startDate,
        endDate: this.endDate
      }),
      this.totalService.post({
        startDate: this.startDate,
        endDate: this.endDate
      })
    ]).then((data)=> {
      this.list = data[0]['content'];
      this.total = data[1]['content'];
      if (this.typePet === 'chart') {
        this.showChart();
      }
    });
  }

  showModal() {
    let profileModal = this.modalCtrl.create(CommonDate);
    profileModal.onDidDismiss((data) => {
      if (data) {
        this.datePet = '';
        this.endDate = data.endDate;
        this.startDate = data.startDate;
        this.actionHttp();
      }
    });
    profileModal.present();
  }

  // charts配置对象 需要延迟一下 才能获取对应的dom对象
  initChart({id, title, yAxisTittle, xAxisList, seriesList}) {
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        resolve({
          chart: {
            type: 'column',
            renderTo: document.getElementById(id)
          },
          title: {
            text: title
          },
          xAxis: {
            categories: xAxisList,
            crosshair: true
          },
          credits: {
            enabled: false
          },
          colors: ['#2f82ce', '#29aedf'],
          yAxis: {
            min: 0,
            title: {
              text: yAxisTittle
            }
          },
          tooltip: {
            crosshairs: true,
            shared: true
          },
          series: seriesList
        });
      }, 0);
    });
  }

  // 拆分数据,组成charts对象
  showChart() {
    let xAxisList = [];
    let seriesList = {
      countList: {
        name: '销售数量',
        data: []
      },
      payCountList: {
        name: '实付数量',
        data: []
      },
      totalSalesList: {
        name: '销售金额',
        data: []
      }
    }
    for (let item of this.list) {
      xAxisList.push(item.productName);
      seriesList.countList.data.push(item.count);
      seriesList.payCountList.data.push(item.payCount);
      seriesList.totalSalesList.data.push(item.totalSales);
    }
    Promise.all([
      this.initChart({
        id: 'columnChart_1',
        title: '商品销售数量总计',
        yAxisTittle: '销售数量(杯)',
        xAxisList,
        seriesList: [seriesList['countList'], seriesList['payCountList']]
      }),
      this.initChart({
        id: 'columnChart_2',
        title: '商品销售金额总计',
        yAxisTittle: '销售金额(元)',
        xAxisList,
        seriesList: [seriesList['totalSalesList']]
      })
    ]).then((data)=> {
      this.chart_1 = new highcharts.Chart(data[0]);
      this.chart_2 = new highcharts.Chart(data[1]);
      xAxisList = null;
      seriesList = null;
    });
  }

  getDateStr(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  pushPage(productId) {
    this.app.getRootNav().push(CountLinechar, {
      type: 'product',
      startDate: this.startDate,
      endDate: this.endDate,
      id: productId
    });
  }

  destroyChart() {
    this.chart_1 = null;
    this.chart_2 = null;
  }

  ionViewDidLeave() {
    this.chart_1 = null;
    this.chart_2 = null;
  }
}
