import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';

import {TabsPage} from '../pages/tabs/tabs';

// @component是angular提供的装饰器函数，用来描述compoent的元数据
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
    });
  }
}
