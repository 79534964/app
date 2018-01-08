import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class ListService {

  constructor(public httpService: HttpService, public factorys: Factorys) {
  }

  post({machineId, isOver, pageSize, pageNo}) {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString({machineId, isOver, pageSize, pageNo}).then((json)=> {
        this.httpService.operativeTaskFeedback(json).map((res) => res.json()).subscribe((data) => {
          this.factorys.checkHttpData(data) && resolve(data);
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
