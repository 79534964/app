import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class RepairUpdateService {

  constructor(public httpService: HttpService, public factorys: Factorys) {
  }

  post({machineId, id, img, reportDesc, reportMobile, state}) {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString({machineId, id, img, reportDesc, reportMobile, state}).then((json)=> {
        this.httpService.operativeTaskRepairRepairUpdate(json).map((res) => res.json()).subscribe((data) => {
          this.factorys.checkHttpData(data) && resolve(data);
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
