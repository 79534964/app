import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class ListSuccessService {

  constructor(public httpService: HttpService, public factorys: Factorys) {
  }

  post({id, repairUser}) {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString({repairUser, id}).then((json)=> {
        this.httpService.repairListSuccess(json).map((res) => res.json()).subscribe((data) => {
          this.factorys.checkHttpData(data) && resolve(data);
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
