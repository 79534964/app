import {Component} from '@angular/core';
import {App, NavParams} from 'ionic-angular';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {Factorys} from '../../../../theme/factorys';

import {OrderListService} from '../../../../service/oprative/task-order-list-service';
import {DictService} from '../../../../service/common/dict-service';
import {HandleOrderService} from '../../../../service/oprative/task-order-handleOrder-service';

@Component({
  templateUrl: 'order.html',
  providers: [OrderListService, DictService, HandleOrderService],
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
export class OperatetiveTaskOrder {
  private machine = {};
  private pet = '';
  // 1未解决，2已解决
  private type = 2;
  private pageSize = 5;
  private list = [];
  private total = 0;
  private pageNo = 1;
  // 数据交互
  private promptFlag = 'back';
  private data = {
    dict: [],
    index: 0,
    orderNo: '',
    type: '',
    code: 0,
    desc: ''
  }

  constructor(public app: App, public factorys: Factorys, public navParams: NavParams, public orderListService: OrderListService, public dictService: DictService, public handleOrderService: HandleOrderService) {
    this.machine = navParams.get('params');
    this.pet = 'no';
    this.getDict().then(() => {
      this.changeType(1);
    });
  }

  showPrompt(order, index) {
    this.data.orderNo = order.orderNo;
    this.data.index = index;
    this.data.type = '';
    this.data.desc = order.unusualDesc ? order.unusualDesc : '';
    this.promptFlag = 'go';
  }

  promptSubmit(code) {
    this.data.code = code;
    if (this.data.type === '' && this.data.code === 1) {
      this.factorys.prop('请选择解决的方式');
      return false;
    }
    if (this.data.desc === '') {
      this.data.code === 2 && this.factorys.prop('请输入未解决得原因');
      this.data.code === 1 && this.factorys.prop('请输入解决说明');
      return false;
    }
    this.factorys.showLoading();
    this.handleOrderService.post({
      machineId: this.machine['id'],
      orderNo: this.data.orderNo,
      type: this.data.code === 2 ? 0 : this.data.type,
      code: this.data.code,
      desc: this.data.desc
    }).then((res) => {
      this.data.code === 2 && (this.list[this.data.index]['unusualDesc'] = this.factorys.filterEmoji(this.data.desc));
      this.data.code === 1 && (this.list.splice(this.data.index, 1));
      this.promptFlag = 'back';
      this.factorys.prop('操作成功!');
    });
  }

  getDict() {
    return new Promise((resolve, reject) => {
      this.dictService.post({type: 21}).then((data) => {
        this.data.dict = data['content'];
        resolve();
      });
    });
  }

  changeType(type) {
    if (this.type === type) {
      return false
    }
    this.type = type;
    this.list = [];
    this.factorys.showLoading();
    this.getOrderList();
  }

  // 下拉刷新
  doRefresh(refresher) {
    this.getOrderList().then((res)=> {
      refresher.complete();
    });
  }

  // 上拉加载
  doInfinite(infiniteScroll) {
    this.getOrderList('infinite').then((res)=> {
      infiniteScroll.complete();
    });
  }

  getOrderList(type = 'refresh') {
    this.pageNo = type === 'refresh' ? 1 : this.pageNo + 1;
    return new Promise((resolve, reject) => {
        this.orderListService.post({
          machineId: this.machine['id'],
          type: this.type,
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
