import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class VersionService {
  private version = '2.3.0';

  constructor(public httpService: HttpService, public factorys: Factorys) {
  }

  post() {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString().then((json)=> {
        this.httpService.indexVsersion(json).map((res) => res.json()).subscribe((data) => {
          if (this.factorys.checkHttpData(data)) {
            // 判断ios
            if (data['content'].seq === 0 && !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
              return false;
            }
            let dataArr = data['content'].cfgValue.split('#');
            let version = dataArr[0];
            let url = dataArr[3];
            if (version !== this.version) {
              resolve(url);
            }
          }
        });
      });
    });
  }
}
