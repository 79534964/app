import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';
import {Factorys} from '../../../theme/factorys';

@Component({
  templateUrl: 'date.html'
})
export class CommonDate {
  private startDate = '';
  private endDate = '';

  constructor(public viewCtrl: ViewController, public factorys: Factorys) {
    this.startDate = factorys.getTimeStr(new Date(), 'start').replace(' 00:00', '');
    this.endDate = factorys.getTimeStr(new Date(), 'start').replace(' 00:00', '');
  }

  submit() {
    if (new Date(this.startDate).getTime() > new Date(this.endDate).getTime()) {
      this.factorys.prop('查询时间不正确');
      return false;
    }
    this.viewCtrl.dismiss({
      startDate: new Date(this.startDate),
      endDate: new Date(this.endDate)
    });
  }
}
