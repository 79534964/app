import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class MachineListService {

  constructor(public httpService: HttpService, public factorys: Factorys) {
  }

  post({pageSize, pageNo, key, lon, lat}) {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString({pageSize, pageNo, key, lon, lat}).then((json)=> {
        this.httpService.operativeMachineList(json).map((res) => res.json()).subscribe((data) => {
          this.factorys.checkHttpData(data) && resolve(data);
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
