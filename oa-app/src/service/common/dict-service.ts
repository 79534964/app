import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class DictService {

  constructor(public httpService: HttpService, public factorys: Factorys) {
  }

  post({type}) {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString({type}).then((json)=> {
        this.httpService.commonDict(json).map((res) => res.json()).subscribe((data) => {
          this.factorys.checkHttpData(data) && resolve(data);
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
