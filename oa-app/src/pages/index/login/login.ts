import {Component} from '@angular/core';
import {App, Events} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Factorys} from '../../../theme/factorys';

import {LoginService} from '../../../service/index/login-login-service';

@Component({
  templateUrl: 'login.html',
  providers: [LoginService]
})
export class IndexLogin {
  private user = {
    loginName: '',
    password: ''
  };

  constructor(public service: LoginService, public appCtrl: App, public factorys: Factorys, public storage: Storage, public events: Events) {
    storage.get('user').then((val) => {
      if (val) {
        this.user.loginName = val.loginName;
        this.user.password = val.password;
      }
    });
  }

  login() {
    if (this.user.loginName && this.user.password) {
      this.factorys.showLoading();
      this.service.post({
        loginName: this.user.loginName,
        password: this.user.password
      }).then((data) => {
        // 传播登陆成功事件
        this.events.publish('index-login-success');
        this.appCtrl.getRootNav().pop();
        this.factorys.prop('登陆成功');
      });
    } else {
      this.factorys.prop('账号密码不能为空');
    }
  }
}
