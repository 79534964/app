import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class StateService {

  constructor(public httpService: HttpService, public factorys: Factorys) {
  }

  post({type, unDesc, orderNo}) {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString({type, unDesc, orderNo}).then((json)=> {
        this.httpService.operativeTaskFeedbackState(json).map((res) => res.json()).subscribe((data) => {
          this.factorys.checkHttpData(data) && resolve(data);
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
