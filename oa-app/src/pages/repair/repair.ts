import {Component} from '@angular/core';
import {App} from 'ionic-angular';
import {Factorys} from '../../theme/factorys';

import {RepairList} from './list/list';

import {DictService} from '../../service/common/dict-service';

@Component({
  templateUrl: 'repair.html',
  providers: [DictService]
})
export class RepairPage {
  private dict = [];
  private data = {
    status: '',
    end: '',
    start: '',
    machineName: ''
  }

  constructor(public app: App, public factorys: Factorys, public dictService: DictService) {
    this.data.start = factorys.getTimeStr(new Date(), 'start').replace(' 00:00', '');
    this.data.end = factorys.getTimeStr(new Date(), 'start').replace(' 00:00', '');
    factorys.showLoading();
    this.getDict();
  }

  getDict() {
    this.dictService.post({type: 18}).then((data)=> {
      this.dict = data['content'];
      this.dict.push({code: '', description: '默认所有上报状态'});
    });
  }

  submit() {
    if (new Date(this.data.start).getTime() > new Date(this.data.end).getTime()) {
      this.factorys.prop('查询时间不正确');
      return false;
    }
    this.pushPage('RepairList', {
      status: this.data.status,
      end: this.factorys.getTimeStr(new Date(this.data.end), 'end'),
      start: this.factorys.getTimeStr(new Date(this.data.start), 'start'),
      machineName: this.data.machineName
    });
  }

  // 页面跳转
  pushPage(str, params = {}) {
    let page = {
      RepairList
    };
    this.app.getRootNav().push(page[str], {params});
  }
}
