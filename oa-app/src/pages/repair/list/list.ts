import {Component} from '@angular/core';
import {NavParams, ModalController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {Factorys} from '../../../theme/factorys';

import {CommonSlides} from '../../common/slides/slides';

import {RepairListService} from '../../../service/oprative/task-repair-list-service';
import {GetMobileService} from '../../../service/common/getMobile-service';
import {ListSubmitService} from '../../../service/repair/list-submit-service';
import {ListSuccessService} from '../../../service/repair/list-success-service';

@Component({
  templateUrl: 'list.html',
  providers: [RepairListService, GetMobileService, ListSubmitService, ListSuccessService],
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
export class RepairList {
  private promptFlag = 'back';
  private pet = '';
  // 0待维修 1维修中 2已维修 3已撤销
  private status = '';
  private machineName = '';
  private end = '';
  private start = '';
  private pageSize = 10;
  private list = [];
  private total = 0;
  private pageNo = 1;

  private data = {
    id: '',
    index: 0,
    mobile: '',
    repairMobile: '',
    repairDesc: '',
    repairUser: ''
  }

  constructor(public factorys: Factorys, public navParams: NavParams, public modalCtrl: ModalController, public repairListService: RepairListService, public getMobileService: GetMobileService, public listSubmitService: ListSubmitService, public listSuccessService: ListSuccessService, public storage: Storage) {
    this.status = navParams.get('params').status === '' ? 0 : navParams.get('params').status;
    this.end = navParams.get('params').end;
    this.start = navParams.get('params').start;
    this.machineName = navParams.get('params').machineName;
    this.pet = `status${this.status}`;

    factorys.showLoading();
    this.getRepairService('refresh');
    this.getRepairMobile();
    // 获取用户名称
    storage.get('user').then((val) => {
      this.data.repairUser = val.loginName;
    });
  }

  getRepairMobile() {
    this.getMobileService.post().then((data) => {
      this.data.mobile = data['content'];
    })
  }

  openSlides(img) {
    let modal = this.modalCtrl.create(CommonSlides, {img});
    modal.present();
  }

  openSubmit(repair, index) {
    this.promptFlag = 'go';
    this.data.repairMobile = this.data.mobile;
    this.data.id = repair.id;
    this.data.index = index;
  }

  promptSubmit() {
    if (!(/^1[34578]\d{9}$/.test(this.data.repairMobile))) {
      this.factorys.prop('请输入正确的手机号');
      return false;
    }
    if (this.data.repairDesc === '') {
      this.factorys.prop('请输入维修内容');
      return false;
    }
    this.listSubmitService.post({
      repairMobile: this.data.repairMobile,
      id: this.data.id,
      repairDesc: this.data.repairDesc,
      repairUser: this.data.repairUser
    }).then((data) => {
      this.list.splice(this.data.index, 1);
      this.promptFlag = 'back';
      this.factorys.prop('操作成功!');
    });
  }

  repairSuccess(repair, index) {
    this.factorys.confirm('是否确认完成维修！').then(() => {
      if (repair.repairUser !== this.data.repairUser) {
        this.factorys.prop('维修人账号与您的账号不一致，无法完成该维修！');
        return false;
      }
      this.listSuccessService.post({
        id: repair.id,
        repairUser: this.data.repairUser
      }).then((data) => {
        this.list.splice(index, 1);
        this.factorys.prop('操作成功!');
      });
    }, ()=> {
    });
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
        machineName: this.machineName,
        end: this.end,
        start: this.start
      }).then((data) => {
        this.list = type === 'refresh' ? data['content'].list : this.list.concat(data['content'].list);
        this.total = data['content'].totalRow;
        resolve();
      });
    });
  }
}
