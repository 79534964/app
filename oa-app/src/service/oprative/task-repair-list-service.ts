import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class RepairListService {

  constructor(public httpService: HttpService, public factorys: Factorys) {
  }

  post({pageSize, pageNo, machineId = '', machineName = '', status, start = '2017-1-1 00:00', end = this.factorys.getTimeStr(new Date(), 'end')}) {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString({status, pageSize, pageNo, machineId, machineName, start, end}).then((json)=> {
        this.httpService.operativeTaskRepairLst(json).map((res) => res.json()).subscribe((data) => {
          this.factorys.checkHttpData(data) && resolve(data);
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
