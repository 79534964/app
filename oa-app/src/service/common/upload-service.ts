import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class UploadService {

  constructor(public httpService: HttpService, public factorys: Factorys) {
  }

  post(formData) {
    return new Promise((resolve, reject) => {
      this.httpService.commonUpload(formData).map((res) => res.json()).subscribe((data) => {
        this.factorys.checkHttpData(data) && resolve(data);
      }, (err) => {
        this.factorys.httpError();
      });
    });
  }
}
