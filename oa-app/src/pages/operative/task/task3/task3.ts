import {Component, ViewChild} from '@angular/core';
import {NavParams, App, Events} from 'ionic-angular';
import {Factorys} from '../../../../theme/factorys';

import {TaskService} from '../../../../service/oprative/task-task-task-service';

@Component({
  templateUrl: 'task3.html',
  providers: [TaskService]
})
export class OperatetiveTaskTask3 {
  @ViewChild('commonPhotoNode') public commonPhotoNode;

  private machine = {};
  private imgList = [];
  private state = true;

  constructor(public app: App, public navParams: NavParams, public factorys: Factorys, public taskService: TaskService, public events: Events) {
    this.machine = navParams.get('params').machine;
    if (navParams.get('params').imgList) {
      this.imgList = navParams.get('params').imgList.split(',');
      this.state = false;
    }
  }

  submit() {
    if (this.imgList.length === 0) {
      this.factorys.prop('该任务需要上传至少一个张图片！');
      return false;
    }
    this.factorys.showLoading();
    let img = [];
    this.imgList.map((url) => {
      img.push(this.factorys.splitImgUrl(url));
    });
    this.taskService.post({
      type: 3,
      machineId: this.machine['id'],
      img: img.toString()
    }).then((res) => {
      // 执行删除子组件图片
      this.commonPhotoNode.delImgHttp();
      // 事件传播任务完成了 重新请求
      this.events.publish('operative-task-success');
      this.app.getRootNav().pop();
    });
  }
}
