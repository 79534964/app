import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {App, NavParams} from 'ionic-angular';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {Factorys} from '../../../../theme/factorys';

import {ListService} from '../../../../service/oprative/task-feedback-list-service';
import {StateService} from '../../../../service/oprative/task-feedback-state-service';

@Component({
  templateUrl: 'feedback.html',
  providers: [ListService, StateService],
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
export class OperatetiveTaskFeedback {
  private machine = {};
  private pet = '';
  // 0未处理，1已处理 ,2待处理
  private isOver = 99;
  private pageSize = 5;
  private list = [];
  private total = 0;
  private pageNo = 1;
  // 数据交互
  private promptFlag = 'back';
  private data = {
    name: '',
    placeholder: '',
    index: 0,
    orderNo: '',
    type: '',
    unDesc: ''
  }

  constructor(public app: App, public factorys: Factorys, public navParams: NavParams, public storage: Storage, public listService: ListService, public stateService: StateService) {
    this.machine = navParams.get('params');
    this.pet = 'no';
    this.changeType(0);
    this.getName();
  }

  getName() {
    this.storage.get('user').then((val) => {
      this.data.name = val.name;
    });
  }

  showPrompt(order, index, type) {
    this.data.orderNo = order.orderNo;
    this.data.placeholder = type === '1' ? '处理完毕说明' : '待处理说明';
    this.data.index = index;
    this.data.type = type;
    this.data.unDesc = '';
    this.promptFlag = 'go';
  }

  promptSubmit() {
    if (this.data.unDesc === '') {
      this.data.type === '1' && this.factorys.prop('请输入处理说明');
      this.data.type === '2' && this.factorys.prop('请输入待处理说明');
      return false;
    }
    this.factorys.showLoading();
    this.stateService.post({
      orderNo: this.data.orderNo,
      type: this.data.type,
      unDesc: this.data.unDesc,
    }).then((res) => {
      let flag = true;
      if (this.isOver === 2 && this.data.type === '2') {
        this.list[this.data.index]['unDesc'] = this.factorys.filterEmoji(this.data.unDesc);
        this.list[this.data.index]['undealName'] = this.data.name;
        flag = false;
      }
      if (flag) {
        this.list.splice(this.data.index, 1);
        this.total--;
      }
      this.promptFlag = 'back';
      this.factorys.prop('操作成功!');
    });
  }

  changeType(isOver) {
    if (this.isOver === isOver) {
      return false
    }
    this.isOver = isOver;
    this.list = [];
    this.factorys.showLoading();
    this.getList();
  }

  // 下拉刷新
  doRefresh(refresher) {
    this.getList().then((res)=> {
      refresher.complete();
    });
  }

  // 上拉加载
  doInfinite(infiniteScroll) {
    this.getList('infinite').then((res)=> {
      infiniteScroll.complete();
    });
  }

  getList(type = 'refresh') {
    this.pageNo = type === 'refresh' ? 1 : this.pageNo + 1;
    return new Promise((resolve, reject) => {
        this.listService.post({
          machineId: this.machine['id'],
          isOver: this.isOver,
          pageSize: this.pageSize,
          pageNo: this.pageNo
        }).then((data) => {
          this.list = type === 'refresh' ? data['content'].list : this.list.concat(data['content'].list);
          this.total = data['content'].totalRow;
          resolve();
        });
      }
    );
  }
}
