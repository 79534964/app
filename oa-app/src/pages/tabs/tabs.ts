import {Component} from '@angular/core';
import {Events} from 'ionic-angular';
import {Storage} from '@ionic/storage';

import {IndexPage} from '../index/index';
import {ReportPage} from '../report/report';
import {CountPage} from '../count/count';
import {OperativePage} from '../operative/operative';
import {RepairPage} from '../repair/repair';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  private officeId = '';

  IndexRoot: any = IndexPage;
  ReportRoot: any = ReportPage;
  CountRoot: any = CountPage;
  OperativeRoot: any = OperativePage;
  RepairRoot: any = RepairPage;

  constructor(public storage: Storage, public events: Events) {
    this.getOfficeId();
    this.listenEvent();
  }

  getOfficeId() {
    this.storage.get('user').then((val) => {
      if (!val) {
        return false;
      }
      if (val.officeId.indexOf(this.officeId) === -1) {
        window.location.reload();
        return false;
      }
      this.officeId = val.officeId ? val.officeId : '';
    });
  }

  listenEvent() {
    // 订阅说明任务执行成功了。
    this.events.subscribe('index-login-success', () => {
      window.setTimeout(() => {
        this.getOfficeId();
      }, 1000);
    });
  }
}
