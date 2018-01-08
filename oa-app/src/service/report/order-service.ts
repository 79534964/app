import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class OrderService {

  constructor(public httpService: HttpService, public factorys: Factorys) {
  }

  post({orderId = '', machineName = '', machineId = '', nickName = '', mobile = '', pageNumber = 1, pageSize = 15}) {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString({
        orderId,
        machineName,
        machineId,
        nickName,
        mobile,
        pageNumber,
        pageSize
      }).then((json)=> {
        this.httpService.reportOrder(json).map((res) => res.json()).subscribe((data) => {
          this.factorys.checkHttpData(data) && resolve(data);
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
