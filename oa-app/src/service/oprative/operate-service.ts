import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class OperateService {

  constructor(public httpService: HttpService, public factorys: Factorys) {
  }

  post({machineId, operationId}) {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString({
        machineId,
        operationId
      }).then((json)=> {
        this.httpService.operativeOperate(json).map((res) => res.json()).subscribe((data) => {
          this.factorys.checkHttpData(data) && resolve(data);
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
