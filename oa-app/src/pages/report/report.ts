import {Component} from '@angular/core';
import {App} from 'ionic-angular';
import {OrderService} from '../../service/report/order-service';
import {Factorys} from '../../theme/factorys';

import {ReportOrder} from './order/order';

@Component({
  templateUrl: 'report.html',
  providers: [OrderService]
})
export class ReportPage {
  private radioKey = '';
  private radioValue = '';
  private inputValue = '';

  constructor(public orderService: OrderService, public app: App, public factorys: Factorys) {
  }

  submit() {
    if (this.radioValue) {
      if (this.inputValue) {
        if ((this.radioValue === 'orderId' || this.radioValue === 'mobile') && !(/^[0-9]*$/.test(this.inputValue))) {
          this.factorys.prop('输入的必须为数字');
        } else {
          this.query();
        }
      } else {
        this.factorys.prop('请输入需要查询的内容');
      }
    } else {
      this.factorys.prop('请选择查询条件');
    }
  }

  query() {
    this.factorys.showLoading();
    this.orderService.post({
      [this.radioValue]: this.inputValue
    }).then((data) => {
      if (data['content'].list.length === 0) {
        this.factorys.prop('查询不到相关订单');
      } else {
        this.app.getRootNav().push(ReportOrder, {
          list: data['content'].list,
          radioValue: this.radioValue,
          inputValue: this.inputValue,
          radioKey: this.radioKey
        });
      }
    });
  }

  getRadio(key, value, fab) {
    fab.close();
    this.radioValue = value;
    this.radioKey = key;
  }
}
