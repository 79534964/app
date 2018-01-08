import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class TaskService {

  constructor(public httpService: HttpService, public factorys: Factorys) {
  }

  post({type, img, machineId}) {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString({type, img, machineId}).then((json)=> {
        this.httpService.operativeTaskTask(json).map((res) => res.json()).subscribe((data) => {
          this.factorys.checkHttpData(data) && resolve(data);
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
