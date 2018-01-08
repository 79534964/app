import {Component} from '@angular/core';
import {App} from 'ionic-angular';
import {Factorys} from '../../theme/factorys';
import {OperatetiveTask} from './task/task';
import {OperativeMateriel} from './materiel/materiel';

// import {Geolocation} from '@ionic-native/geolocation';

import {MachineListService} from '../../service/oprative/machineList-service';
import {OperateService} from '../../service/oprative/operate-service';

@Component({
  templateUrl: 'operative.html',
  providers: [MachineListService, OperateService]
})
export class OperativePage {
  private machineList = [];
  private key = '';
  private total = 0;
  private pageSize = 5;
  private pageNo = 1;
  private setTime = -1;
  private lat = 0;
  private lon = 0;

  constructor(public app: App, public machineListService: MachineListService, public operateService: OperateService, public factorys: Factorys) {
    factorys.showLoading();
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   this.lon = resp.coords.longitude;
    //   this.lat = resp.coords.latitude;
    //   this.getMachineService();
    // }).catch((error) => {
    //   this.getMachineService();
    // });
  }

  searchMachine() {
    window.clearTimeout(this.setTime);
    this.setTime = window.setTimeout(() => {
      this.machineList = [];
      this.getMachineService();
    }, 1000);
  }

  // 下拉刷新
  doRefresh(refresher) {
    this.getMachineService().then((res)=> {
      refresher.complete();
    });
  }

  // 上拉加载
  doInfinite(infiniteScroll) {
    this.getMachineService('infinite').then((res)=> {
      infiniteScroll.complete();
    });
  }

  getMachineService(type = 'refresh') {
    this.pageNo = type === 'refresh' ? 1 : this.pageNo + 1;
    return new Promise((resolve, reject) => {
      this.machineListService.post({
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        key: this.key,
        lon: this.lon,
        lat: this.lat
      }).then((data) => {
        this.machineList = type === 'refresh' ? data['content'].list : this.machineList.concat(data['content'].list);
        this.total = data['content'].totalRow;
        resolve();
      });
    });
  }

  operateMachine({id, statusCode}, operationId) {
    if (statusCode === '91') {
      this.factorys.prop('机器断开连接,无法操作!');
      return false;
    }
    let str = '';
    switch (operationId) {
      case 2:
        str = '可重启app';
        break;
      case 3:
        str = '可开机器门';
        break;
      case 4:
        str = '可进入后台';
        break;
      case 5:
        str = '可开取杯门';
        break;
      case -5:
        str = '可关取杯门';
        break;
    }
    this.factorys.confirm(`请确认机器不在冲泡，${str}`).then(() => {
      this.operateService.post({machineId: id, operationId}).then(() => {
        this.factorys.prop('操作成功！');
      });
    }, () => {
    });
  }

  // 页面跳转
  pushPage(str, params = {}) {
    let page = {
      OperatetiveTask,
      OperativeMateriel
    };
    this.app.getRootNav().push(page[str], {params});
  }
}
