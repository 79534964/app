import {Component, ViewChild} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {Factorys} from '../../../theme/factorys';
import {MachineIdListService} from '../../../service/count/machine-idList-service';
import {ProductIdListService} from '../../../service/count/product-idList-service';
import highcharts from 'highcharts';

@Component({
  templateUrl: 'linechar.html',
  providers: [MachineIdListService, ProductIdListService]
})
export class CountLinechar {
  private chart_1 = {};
  private chart_2 = {};
  @ViewChild('lineChart_1') public lineChartEl_1;
  @ViewChild('lineChart_2') public lineChartEl_2;

  constructor(public navParams: NavParams, public machineIdListService: MachineIdListService, public productIdListService: ProductIdListService, public factorys: Factorys) {
    factorys.showLoading();
    this.getData({
      type: navParams.get('type'),
      startDate: navParams.get('startDate'),
      endDate: navParams.get('endDate'),
      id: navParams.get('id')
    }).then((data)=> {
      this.initChart(data);
    });
  }

  getData({type, startDate, endDate, id}) {
    return new Promise((resolve, reject) => {
      if (type === 'machine') {
        this.machineIdListService.post({
          startDate,
          endDate,
          machineId: id
        }).then((data) => {
          resolve(data);
        });
      } else {
        this.productIdListService.post({
          startDate,
          endDate,
          productId: id
        }).then((data) => {
          resolve(data);
        });
      }
    });
  }

  initChart(data) {
    this.chart_1 = new highcharts.Chart(this.chartColumnConfig(this.lineChartEl_1.nativeElement, data['title'], '销售数量(杯)', data['xAxisList'], [data['countList'], data['payCountList']]));
    this.chart_2 = new highcharts.Chart(this.chartColumnConfig(this.lineChartEl_2.nativeElement, data['title'], '销售金额(元)', data['xAxisList'], [data['totalsalesList']]));
  }

  // charts配置对象
  chartColumnConfig(nativeElement, title, yAxisTittle, xAxisList, seriesList) {
    return {
      chart: {
        renderTo: nativeElement,
      },
      tooltip: {
        crosshairs: true,
        shared: true
      },
      colors: ['#2f82ce', '#29aedf'],
      credits: {
        enabled: false
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

  ionViewDidLeave() {
    this.chart_1 = null;
    this.chart_2 = null;
  }
}
