import {Component, ViewChild} from '@angular/core';
import {NavParams, App, Events} from 'ionic-angular';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {Factorys} from '../../../../../theme/factorys';

import {GetMobileService} from '../../../../../service/common/getMobile-service';
import {RepairAddService} from '../../../../../service/oprative/task-repair-repairAdd-service';
import {RepairUpdateService} from '../../../../../service/oprative/task-repair-repairUpdate-service';
import {RepairCancelService} from '../../../../../service/oprative/task-repair-repairCancel-service';
import {DictService} from '../../../../../service/common/dict-service';

@Component({
  templateUrl: 'changeRepair.html',
  providers: [GetMobileService, RepairAddService, RepairUpdateService, RepairCancelService, DictService],
  animations: [
    trigger('showAlertWrapper', [
      state('void', style({
        display: 'none',
        opacity: 0,
      })),
      state('go', style({
        opacity: 1,
        display: 'block'
      })),
      state('back', style({
        opacity: 0,
        display: 'none'
      })),
      transition('* => *', animate('.3s'))
    ]),
    trigger('showAlert', [
      state('go', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('back', style({
        transform: 'translate3d(0, -1000px, 0)'
      })),
      transition('* => *', animate('.6s cubic-bezier(0.5, 0.610, 0.4, 1.000)'))
    ])
  ]
})
export class OperatetiveTaskRepairChangeRepair {
  @ViewChild('commonPhotoNode') public commonPhotoNode;

  private promptFlag = 'back';
  private machine = {};
  private repair = {};
  private imgList = [];
  private dict = [];
  private state = '';
  private reportDesc = '';
  private reportMobile = '';
  private cancelDesc = '';

  constructor(public app: App, public navParams: NavParams, public getMobileService: GetMobileService, public repairAddService: RepairAddService,
              public repairUpdateService: RepairUpdateService, public repairCancelService: RepairCancelService, public dictService: DictService, public factorys: Factorys, public events: Events) {
    this.getRepairInfo(navParams.get('params').type);
    if (navParams.get('params').type === 'add') {
      // add
      this.machine = navParams.get('params').machine;
    } else {
      //update
      this.repair = navParams.get('params').repair;
      this.dict = this.repair['dict'];
      this.state = this.repair['state1'];
      this.reportDesc = this.repair['reportDesc'];
      this.reportMobile = this.repair['reportMobile'];
      this.imgList = this.repair['img'] ? this.repair['img'].split(',') : [];
    }
  }

  getRepairInfo(type) {
    this.factorys.showLoading();
    type === 'add' && (this.getMobileService.post().then((data) => {
      this.reportMobile = data['content'];
    }));
    this.dictService.post({type: 13}).then((data) => {
      this.dict = data['content'];
    });
  }

  submit() {
    if (this.state === '') {
      this.factorys.prop('请选择故障类型');
      return false;
    }
    if (this.reportDesc === '') {
      this.factorys.prop('请输入报修描述');
      return false;
    }
    if (!(/^1[34578]\d{9}$/.test(this.reportMobile))) {
      this.factorys.prop('请输入正确得报修手机号');
      return false;
    }
    this.factorys.showLoading();
    let img = [];
    this.imgList.map((url) => {
      img.push(this.factorys.splitImgUrl(url));
    });
    // 添加
    if (this.machine['id']) {
      this.repairAddService.post({
        machineId: this.machine['id'],
        state: this.state,
        reportDesc: this.reportDesc,
        reportMobile: this.reportMobile,
        img
      }).then((data) => {
        // 执行删除子组件图片
        this.commonPhotoNode.delImgHttp();
        // 事件传播任务完成了 重新请求
        this.events.publish('operative-task-repair-success');
        this.factorys.prop('报修成功！');
        this.app.getRootNav().pop();
      });
      return false;
    }

    // 修改
    this.repairUpdateService.post({
      machineId: this.repair['machineId'],
      id: this.repair['id'],
      state: this.state,
      reportDesc: this.reportDesc,
      reportMobile: this.reportMobile,
      img
    }).then((data) => {
      // 执行删除子组件图片
      this.commonPhotoNode.delImgHttp();
      // 事件传播任务完成了 重新请求
      this.events.publish('operative-task-repair-success');
      this.factorys.prop('修改成功！');
      this.app.getRootNav().pop();
    });
  }

  // 撤销
  cancel() {
    this.cancelDesc = '';
    this.promptFlag = 'go';
  }

  cancelSubmit() {
    if (this.cancelDesc === '') {
      this.factorys.prop('请输入撤销描述！');
      return false;
    }
    // 先获取手机号
    this.getMobileService.post().then((data) => {
      let cancelMobile = data['content'];
      this.repairCancelService.post({
        machineId: this.repair['machineId'],
        id: this.repair['id'],
        cancelDesc: this.cancelDesc,
        cancelMobile: cancelMobile,
      }).then((data) => {
        this.promptFlag = 'back';
        // 事件传播任务完成了 重新请求
        this.events.publish('operative-task-repair-success');
        this.factorys.prop('撤销成功！');
        this.app.getRootNav().pop();
      });
    });
  }
}
