import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class RepairCancelService {

  constructor(public httpService: HttpService, public factorys: Factorys) {
  }

  post({machineId, id, cancelDesc, cancelMobile}) {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString({machineId, id, cancelDesc, cancelMobile}).then((json)=> {
        this.httpService.operativeTaskRepairRepairCancel(json).map((res) => res.json()).subscribe((data) => {
          this.factorys.checkHttpData(data) && resolve(data);
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
