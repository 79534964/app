import {Component, ViewChild} from '@angular/core';
import {NavParams} from 'ionic-angular';
import highcharts from 'highcharts';

@Component({
  templateUrl: 'total.html'
})
export class IndexTotal {
  private total = {};
  private _chart = {};
  @ViewChild('pieChart') public pieChartEl;

  constructor(public navParams: NavParams) {
    this.total = navParams.get('params');
  }

  ionViewDidLoad() {
    this._chart = new highcharts.Chart({
      chart: {
        renderTo: this.pieChartEl.nativeElement
      },
      title: {
        text: '总计销售占比'
      },
      tooltip: {
        pointFormat: '金额:{point.y}元 占比:{point.percentage:.1f}%'
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            format: '{point.percentage:.1f} %'
          },
          showInLegend: true
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'pie',
        data: [
          ['实付金额', this.total['totalSales']],
          ['优惠金额', this.total['totalCoupon']]
        ]
      }]
    });
  }

  ionViewDidLeave() {
    this._chart = null;
  }
}
