import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class TaskListService {

  constructor(public httpService: HttpService, public factorys: Factorys) {
  }

  post({machineId}) {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString({machineId}).then((json)=> {
        this.httpService.operativeTaskList(json).map((res) => res.json()).subscribe((data) => {
          this.factorys.checkHttpData(data) && resolve(data);
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
