import {Component} from '@angular/core';
import {App, NavParams, Events} from 'ionic-angular';
import {Factorys} from '../../../../theme/factorys';

import {OperatetiveTaskRepairRepairInfo} from './repairInfo/repairInfo';
import {OperatetiveTaskRepairChangeRepair} from './changeRepair/changeRepair';

import {RepairListService} from '../../../../service/oprative/task-repair-list-service';

@Component({
  templateUrl: 'repair.html',
  providers: [RepairListService]
})
export class OperatetiveTaskRepair {
  private machine = {};
  private pet = '';
  // 0待维修 1维修中 2已维修 3已撤销
  private status = '';
  private pageSize = 10;
  private list = [];
  private total = 0;
  private pageNo = 1;

  constructor(public app: App, public factorys: Factorys, public navParams: NavParams, public repairListService: RepairListService, public events: Events) {
    this.pet = 'status0';
    this.machine = navParams.get('params');
    this.changeStatus(0);
    this.listenEvent();
  }

  changeStatus(status) {
    if (this.status === status) {
      return false;
    }
    this.status = status;
    this.list = [];
    this.factorys.showLoading();
    this.getRepairService();
  }

  listenEvent() {
    // 先把上面那个注销
    this.events.unsubscribe('operative-task-repair-success');
    // 订阅说明任务执行成功了。
    this.events.subscribe('operative-task-repair-success', () => {
      this.getRepairService();
    });
  }

  // 下拉刷新
  doRefresh(refresher) {
    this.getRepairService().then((res)=> {
      refresher.complete();
    });
  }

  // 上拉加载
  doInfinite(infiniteScroll) {
    this.getRepairService('infinite').then((res)=> {
      infiniteScroll.complete();
    });
  }

  getRepairService(type = 'refresh') {
    this.pageNo = type === 'refresh' ? 1 : this.pageNo + 1;
    return new Promise((resolve, reject) => {
      this.repairListService.post({
        status: this.status,
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        machineId: this.machine['id']
      }).then((data) => {
        this.list = type === 'refresh' ? data['content'].list : this.list.concat(data['content'].list);
        this.total = data['content'].totalRow;
        resolve();
      });
    });
  }

  goPage(repair) {
    if (repair.status === '待维修') {
      this.pushPage('OperatetiveTaskRepairChangeRepair', {repair, type: 'update'});
      return false;
    }
    this.pushPage('OperatetiveTaskRepairRepairInfo', repair);
  }

  // 页面跳转
  pushPage(str, params = {}) {
    let page = {
      OperatetiveTaskRepairRepairInfo,
      OperatetiveTaskRepairChangeRepair,
    };
    this.app.getRootNav().push(page[str], {params});
  }
}
