import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class OrderListService {

  constructor(public httpService: HttpService, public factorys: Factorys) {
  }

  post({type, pageSize, pageNo, machineId}) {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString({type, pageSize, pageNo, machineId}).then((json)=> {
        this.httpService.operativeTaskOrderList(json).map((res) => res.json()).subscribe((data) => {
          this.factorys.checkHttpData(data) && resolve(data);
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
