import {Component} from '@angular/core';
import {App, Events} from 'ionic-angular';
import {Storage} from '@ionic/storage';

import {ErrorService} from '../../service/index/error-list-service';
import {VersionService} from '../../service/index/version-service';
import {MachineSalaService} from '../../service/count/machine-sala-service';
import {WxSignService} from '../../service/common/wxSign-service';

import {Factorys} from '../../theme/factorys';
import {WxSdk} from '../../theme/wxSdk';

import {IndexTotal} from './total/total';
import {IndexError} from './error/error';
import {IndexLogin} from './login/login';

@Component({
  templateUrl: 'index.html',
  providers: [ErrorService, VersionService, MachineSalaService, WxSignService]
})
export class IndexPage {
  private officeId = '';
  private name = '';
  // 异常机器列表
  private errorList = [];
  // 下来刷新提示上次刷新时间
  private refreshTime = '';
  // 今日销售总计
  private total = {
    totalSales: 0,
    totalCount: 0,
    totalCoupon: 0
  };

  constructor(public errorService: ErrorService, public wxSignService: WxSignService, public machineSalaService: MachineSalaService, public app: App, public factorys: Factorys, public wxSdk: WxSdk, public storage: Storage, public events: Events) {
    this.listenEvent();
    this.getWxConfig();
    storage.get('user').then((val) => {
      if (val && val.userToken) {
        factorys.showLoading();
        this.getUserInfo();
        this.doRefresh();
        return false;
      }
      app.getRootNav().push(IndexLogin);
    });
  }

  getWxConfig() {
    this.wxSignService.post().then((data) => {
      this.wxSdk.setConfig(data['content']);
    });
  }

  listenEvent() {
    // 订阅说明任务执行成功了。
    this.events.subscribe('index-login-success', () => {
      window.setTimeout(() => {
        this.getUserInfo();
        this.doRefresh();
      }, 500);
    });
  }

  getUserInfo() {
    this.storage.get('user').then((val) => {
      this.name = val.name;
      this.officeId = val.officeId ? val.officeId : '';
    });
  }

  // 页面跳转
  pushPage(str, params = {}) {
    let page = {
      IndexTotal,
      IndexError,
      IndexLogin
    };
    this.app.getRootNav().push(page[str], {params});
  }

  // 下拉刷新
  doRefresh(refresher = null) {
    Promise.all([
      this.errorService.post(),
      this.machineSalaService.post({
        startDate: new Date(),
        endDate: new Date()
      })
    ]).then((datas) => {
      let time = new Date();
      this.refreshTime = `上次刷新时间 ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
      this.errorList = datas[0]['content'];
      this.total = datas[1]['content'];
      refresher && refresher.complete();
    });
  }
}
