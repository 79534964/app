import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Factorys} from '../../theme/factorys';
import {HttpService} from  '../http-service';

@Injectable()
export class MachineIdListService {

  constructor(public httpService: HttpService, public factorys: Factorys) {}

  post({machineId, startDate, endDate, pageNumber = 1, pageSize = 365}) {
    return new Promise((resolve, reject) => {
      this.factorys.toJsonString({
        startDate: this.factorys.getTimeStr(startDate, 'start'),
        endDate: this.factorys.getTimeStr(endDate, 'end'),
        machineId,
        pageNumber,
        pageSize
      }).then((json)=> {
        this.httpService.countMachineIdList(json).map((res) => res.json()).subscribe((data) => {
          if (this.factorys.checkHttpData(data)) {
            let chartConfig = {
              title: '',
              xAxisList: [],
              countList: {
                type: 'line',
                name: '销售数量',
                data: []
              },
              payCountList: {
                type: 'line',
                name: '实付数量',
                data: []
              },
              totalsalesList: {
                type: 'line',
                name: '销售金额',
                data: []
              }
            };
            chartConfig.title = data['content'].list[0].machineName;
            for (let item of data['content'].list) {
              chartConfig.xAxisList.push(item.day);
              chartConfig.countList.data.push(item.count);
              chartConfig.payCountList.data.push(item.payCount);
              chartConfig.totalsalesList.data.push(item.totalSales);
            }
            resolve(chartConfig);
            chartConfig = null;
          }
        }, (err) => {
          this.factorys.httpError();
        });
      });
    });
  }
}
