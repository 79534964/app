import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class TaskDistanceService {

  constructor(public httpService: HttpService, public factorys: Factorys) {
  }

  post({lon1, lat1, lon2, lat2}) {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString({lon1, lat1, lon2, lat2}).then((json)=> {
        this.httpService.operativeTaskDistance(json).map((res) => res.json()).subscribe((data) => {
          this.factorys.checkHttpData(data) && resolve(data);
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
