import {Component} from '@angular/core';
import {NavParams, App, Events} from 'ionic-angular';
import {Factorys} from '../../../theme/factorys';
import {OperatetiveTaskTask1} from './task1/task1';
import {OperatetiveTaskTask2} from './task2/task2';
import {OperatetiveTaskTask3} from './task3/task3';
import {OperatetiveTaskTask4} from './task4/task4';
import {OperatetiveTaskOrder} from './order/order';
import {OperatetiveTaskRepair} from './repair/repair';
import {OperatetiveTaskFeedback} from './feedback/feedback';

// import {Geolocation} from '@ionic-native/geolocation';

import {TaskListService} from '../../../service/oprative/task-list-service';
import {TaskDistanceService} from '../../../service/oprative/task-distance-service';

@Component({
  templateUrl: 'task.html',
  providers: [TaskListService, TaskDistanceService]
})
export class OperatetiveTask {
  private machine = {};
  private taskList = {};
  private distance = {
    type: -1,
    dis: 0
  };

  constructor(public app: App, public navParams: NavParams, public factorys: Factorys, public events: Events, public taskListService: TaskListService, public taskDistanceService: TaskDistanceService) {
    factorys.showLoading();
    this.machine = navParams.get('params');
    this.doRefresh();
    this.getTaskList();
    this.listenEvent();
  }

  // 下拉刷新
  doRefresh(refresher = null) {
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   this.taskDistanceService.post({
    //     lon1: resp.coords.longitude,
    //     lat1: resp.coords.latitude,
    //     lon2: this.machine['longitude'],
    //     lat2: this.machine['latitude']
    //   }).then((data) => {
    //     this.distance.type = data['content'].type;
    //     this.distance.dis = parseInt(data['content'].dis);
    //     if (refresher) {
    //       refresher.complete();
    //     }
    //   });
    // }).catch((error) => {
    //   this.factorys.alert('定位失败，请您务必打开权限！');
    // });
  }

  listenEvent() {
    // 先把上面那个注销
    this.events.unsubscribe('operative-task-success');
    // 订阅说明任务执行成功了。
    this.events.subscribe('operative-task-success', () => {
      this.getTaskList();
    });
  }

  getTaskList() {
    this.taskListService.post({machineId: this.machine['id']}).then((data) => {
      this.taskList = data['content'];
    });
  }

  // 页面跳转
  pushPage(str, params = {}) {
    if (str !== 'OperatetiveTaskRepair' && str !== 'OperatetiveTaskOrder' && str !== 'OperatetiveTaskFeedback') {
      if (this.distance.type === -1) {
        return false;
      }
    }
    let page = {
      OperatetiveTaskTask1,
      OperatetiveTaskTask2,
      OperatetiveTaskTask3,
      OperatetiveTaskTask4,
      OperatetiveTaskOrder,
      OperatetiveTaskRepair,
      OperatetiveTaskFeedback
    };
    this.app.getRootNav().push(page[str], {params});
  }
}
