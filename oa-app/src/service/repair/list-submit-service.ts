import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class ListSubmitService {

  constructor(public httpService: HttpService, public factorys: Factorys) {
  }

  post({repairMobile, repairDesc, repairUser, id}) {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString({repairMobile, repairDesc, repairUser, id}).then((json)=> {
        this.httpService.repairListSubmit(json).map((res) => res.json()).subscribe((data) => {
          this.factorys.checkHttpData(data) && resolve(data);
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
