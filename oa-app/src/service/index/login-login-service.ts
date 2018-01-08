import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
// 用来将Observable转换为promise
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class LoginService {

  constructor(public httpService: HttpService, public factorys: Factorys, public storage: Storage) {
  }

  post({loginName, password}) {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString({loginName, password}).then((json)=> {
        this.httpService.indexLogin(json).map((res) => res.json()).subscribe((data) => {
          if (this.factorys.checkHttpData(data)) {
            resolve(data);
            this.storage.set('user', {
              loginName,
              password,
              officeId: data['content'].officeId ? data['content'].officeId : '',
              userToken: data['content'].userToken,
              name: data['content'].loginName
            });
          }
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
