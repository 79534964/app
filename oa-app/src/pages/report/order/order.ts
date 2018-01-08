import {Component} from '@angular/core';
import {NavParams, App} from 'ionic-angular';
import {OrderService} from '../../../service/report/order-service';
import {ReportOrderdetails} from './details/details';

@Component({
  templateUrl: 'order.html',
  providers: [OrderService]
})
export class ReportOrder {
  private flag = true;
  private list = [];
  private radioValue = '';
  private inputValue = '';
  private radioKey = '';
  private pageNumber = 1;

  constructor(public navParams: NavParams, public orderService: OrderService, public app: App) {
    this.list = navParams.get('list');
    this.radioValue = navParams.get('radioValue');
    this.inputValue = navParams.get('inputValue');
    this.radioKey = navParams.get('radioKey');
    if (this.list.length < 10) {
      this.flag = false;
    }
  }

  showItemPage(item) {
    this.app.getRootNav().push(ReportOrderdetails, {item});
  }

  doInfinite(infiniteScroll) {
    this.orderService.post({
      [this.radioValue]: this.inputValue,
      pageNumber: ++this.pageNumber
    }).then((data) => {
      infiniteScroll.complete();
      if (data['content'].list.length === 0) {
        this.flag = false;
      } else {
        this.list = this.list.concat(data['content'].list);
      }
    });
  }
}
