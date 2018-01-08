import {Injectable} from '@angular/core';
import {Factorys} from './factorys';
import {Storage} from '@ionic/storage';

@Injectable()
export class WxSdk {
  private appId = '';
  private timestamp = '';
  private nonceStr = '';
  private signature = '';
  // private jsApiList = ['scanQRCode', 'openLocation', 'getLocation', 'onMenuShareTimeline', 'onMenuShareAppMessage'];

  constructor(public storage: Storage, public factorys: Factorys) {
  }

  setConfig(data) {
    console.log(data);
    this.appId = data.appId;
    this.timestamp = data.timestamp;
    this.nonceStr = data.nonceStr;
    this.signature = data.signature;
    console.log(data.nonceStr);
    console.log(data.signature);
    console.log(data.timestamp);
  }

  getLocation() {
    // return new Promise((resolve, reject) => {
    //   window.wx.getLocation({
    //     type: 'gcj02',
    //     success: (res) => {
    //       resolve();
    //     },
    //     fail: (res) => {
    //       this.factorys.alert('找不到您，请确认定位是否打开！');
    //     }
    //   });
    // });
  }
}
