import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from '../http-service';

@Injectable()
export class WxSignService {

  constructor(public httpService: HttpService, public factorys: Factorys) {
  }

  post() {
    return new Promise((resolve, reject) => {
      if (window.location.href.indexOf('?') !== -1) {
        window.location.href = `http://${window.location.host}/mobile/coffeeoa/index.html`;
        return false;
      }
      this.factorys.toJsonString({url: window.location.href.split('#')[0]}).then((json) => {
        this.httpService.commonWxSign(json).map((res) => res.json()).subscribe((data) => {
          this.factorys.checkHttpData(data) && resolve(data);
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
