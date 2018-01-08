import {Component} from '@angular/core';
import {App} from 'ionic-angular';
import {CountProduct} from './product/product';
import {CountMachine} from './machine/machine';

@Component({
  templateUrl: 'count.html'
})
export class CountPage {
  constructor(public app: App) {
  }

  // 页面跳转
  pushPage(str, params = {}) {
    let page = {
      CountProduct,
      CountMachine
    };
    this.app.getRootNav().push(page[str], {params});
  }
}
