import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class MachineSalaService {

  constructor(public httpService: HttpService, public factorys: Factorys) {}

  post({startDate, endDate}) {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString({
        startDate: this.factorys.getTimeStr(startDate, 'start'),
        endDate: this.factorys.getTimeStr(endDate, 'end')
      }).then((json)=> {
        this.httpService.countMachinesala(json).map((res) => res.json()).subscribe((data) => {
          this.factorys.checkHttpData(data) && resolve(data);
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
