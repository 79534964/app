import {Injectable} from '@angular/core';
import {ToastController, AlertController, LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';

@Injectable()
export class Factorys {
  private load;
  private loadFlag = false;
  private alertFlag = true;

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public storage: Storage) {
  }

// 将对象转换为参数字符串 顺便加上公用的userToken
  toJsonString(data = {}) {
    return new Promise((resolve, reject) => {
      let paramStr = '';
      for (let key in data) {
        paramStr += `${key}=${this.filterEmoji(data[key])}&`;
      }
      this.storage.get('user').then((val) => {
        if (val) {
          paramStr += `userToken=${val.userToken}`;
        }
        resolve(paramStr);
      });
    });
  }

  // 检查data.code
  checkHttpData({code, msg}) {
    this.removeLoading();
    if (code === '01') {
      return true;
    } else if (code === '300') {
      this.alert('token失效请重新登录').then(() => {
        this.storage.get('user').then((val) => {
          if (val.userToken !== '') {
            this.storage.set('user', {
              loginName: val.loginName,
              password: val.password,
              officeId: val.officeId,
              userToken: '',
              name: val.name
            });
            window.setTimeout(() => {
              window.location.reload();
            }, 200);
          }
        });
      });
    } else {
      this.alert(msg);
      return false;
    }
  }

  // 网络异常处理
  httpError() {
    this.removeLoading();
    this.alert('服务器异常');
  }

  // 弹框提示
  prop(str) {
    let toast = this.toastCtrl.create({
      message: str,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  // 提示选择
  alert(str) {
    return new Promise((resolve, reject) => {
      if (this.alertFlag) {
        this.alertFlag = false;
        let alert = this.alertCtrl.create({
          enableBackdropDismiss: false,
          title: '提示',
          subTitle: str,
          buttons: [{
            text: '好的',
            handler: () => {
              this.alertFlag = true;
              resolve();
            }
          }]
        });
        alert.present();
      }
    });
  }

  // 提示选择
  confirm(str, ok = '确定', no = '取消') {
    return new Promise((resolve, reject) => {
      let alert = this.alertCtrl.create({
        enableBackdropDismiss: false,
        title: '提示',
        message: str,
        buttons: [{
          text: no,
          handler: () => {
            reject();
          }
        }, {
          text: ok,
          handler: () => {
            resolve();
          }
        }]
      });
      alert.present();
    });
  }

  // loading
  showLoading() {
    this.load = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div class="loading">
                    <img src="assets/images/loading.gif" width="45%">
                </div>`
    });
    this.load.present();
    this.loadFlag = true;
  }

  // 关闭loading
  removeLoading() {
    if (this.loadFlag) {
      this.load.dismiss();
      this.loadFlag = false;
    }
  }

  getTimeStr(time, type) {
    function pad(num, n) {
      let len = num.toString().length;
      while (len < n) {
        num = '0' + num;
        len++;
      }
      return num;
    }

    return `${time.getFullYear()}-${pad(time.getMonth() + 1, 2)}-${pad(time.getDate(), 2)}${type === 'start' ? ' 00:00' : ' 23:59'}`;
  }

  // 获取当天,当周周一,当月1号
  getSelectDate(type) {
    let now = new Date();
    if (type === 'day') {
      return now;
    } else if (type === 'week') {
      let dayNum = (now.getDay() - 1) === -1 ? 7 : (now.getDay() - 1);
      return new Date(now.getTime() - dayNum * 24 * 60 * 60 * 1000);
    } else if (type === 'month') {
      return new Date(now.setDate(1));
    }
  }

  // 将base64转换为FormData
  base64ToFormData(base64) {
    let byteString = window.atob(base64.split(',')[1]);
    let mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    let formData = new FormData();
    formData.append('file', new Blob([ab], {type: mimeString}), 'photo.jpg');
    // userToken带上
    return new Promise((resolve, reject) => {
      this.storage.get('user').then((val) => {
        if (val) {
          formData.append('userToken', val.userToken);
        }
        resolve(formData);
      });
    });
  }

  // 切割图片
  splitImgUrl(url) {
    return url ? `$$group${url.split('/group')[1]}` : '';
  }

  // 过滤字符集
  filterEmoji(str) {
    return typeof str === 'string' ? str.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '') : str;
  }
}
