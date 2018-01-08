import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class ErrorService {

  constructor(public httpService: HttpService, public factorys: Factorys) {
  }

  post() {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString().then((json)=> {
        this.httpService.indexError(json).map((res) => res.json()).subscribe((data) => {
          this.factorys.checkHttpData(data) && resolve(data);
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
