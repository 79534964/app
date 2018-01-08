import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';

// 本地存储
import {IonicStorageModule} from '@ionic/storage';
// HTTP
import {HttpModule} from "@angular/http";
// 动画
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// 重写了一些ionic 的方法 适应自己的项目
import {Factorys} from '../theme/factorys';
// 微信SDK
import {WxSdk} from '../theme/wxSdk';
// // 全局的http请求设定
import {HttpService} from '../service/http-service';

// pages
import {MyApp} from './app.component';
// tabs
import {TabsPage} from '../pages/tabs/tabs';
// common
import {CommonDate} from '../pages/common/date/date';
import {CommonPhoto} from '../pages/common/photo/photo';
import {CommonSlides} from '../pages/common/slides/slides';
import {CommonPhone} from '../pages/common/phone/phone';
// index
import {IndexPage} from '../pages/index/index';
import {IndexTotal} from '../pages/index/total/total';
import {IndexError} from '../pages/index/error/error';
import {IndexLogin} from '../pages/index/login/login';
// report
import {ReportPage} from '../pages/report/report';
import {ReportOrder} from '../pages/report/order/order';
import {ReportOrderdetails} from '../pages/report/order/details/details';
// count
import {CountPage} from '../pages/count/count';
import {CountProduct} from '../pages/count/product/product';
import {CountMachine} from '../pages/count/machine/machine';
import {CountLinechar} from '../pages/count/linechar/linechar';
// operative
import {OperativePage} from '../pages/operative/operative';
import {OperativeMateriel} from '../pages/operative/materiel/materiel';
import {OperatetiveTask} from '../pages/operative/task/task'
import {OperatetiveTaskTask1} from '../pages/operative/task/task1/task1';
import {OperatetiveTaskTask2} from '../pages/operative/task/task2/task2';
import {OperatetiveTaskTask3} from '../pages/operative/task/task3/task3';
import {OperatetiveTaskTask4} from '../pages/operative/task/task4/task4';
import {OperatetiveTaskFeedback} from '../pages/operative/task/feedback/feedback';
import {OperatetiveTaskOrder} from '../pages/operative/task/order/order';
import {OperatetiveTaskRepair} from '../pages/operative/task/repair/repair';
import {OperatetiveTaskRepairRepairInfo} from '../pages/operative/task/repair/repairInfo/repairInfo';
import {OperatetiveTaskRepairChangeRepair} from '../pages/operative/task/repair/changeRepair/changeRepair';
// repair
import {RepairPage} from '../pages/repair/repair';
import {RepairList} from '../pages/repair/list/list';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    CommonPhoto,
    CommonPhone,
    CommonDate,
    CommonSlides,
    IndexPage,
    IndexTotal,
    IndexError,
    IndexLogin,
    ReportPage,
    ReportOrder,
    ReportOrderdetails,
    CountPage,
    CountProduct,
    CountMachine,
    CountLinechar,
    OperativePage,
    OperativeMateriel,
    OperatetiveTask,
    OperatetiveTaskTask1,
    OperatetiveTaskTask2,
    OperatetiveTaskTask3,
    OperatetiveTaskTask4,
    OperatetiveTaskOrder,
    OperatetiveTaskRepair,
    OperatetiveTaskFeedback,
    OperatetiveTaskRepairRepairInfo,
    OperatetiveTaskRepairChangeRepair,
    RepairPage,
    RepairList
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    CommonDate,
    CommonSlides,
    IndexPage,
    IndexTotal,
    IndexError,
    IndexLogin,
    ReportPage,
    ReportOrder,
    ReportOrderdetails,
    CountPage,
    CountProduct,
    CountMachine,
    CountLinechar,
    OperativePage,
    OperativeMateriel,
    OperatetiveTask,
    OperatetiveTaskOrder,
    OperatetiveTaskTask1,
    OperatetiveTaskTask2,
    OperatetiveTaskTask3,
    OperatetiveTaskTask4,
    OperatetiveTaskRepair,
    OperatetiveTaskFeedback,
    OperatetiveTaskRepairRepairInfo,
    OperatetiveTaskRepairChangeRepair,
    RepairPage,
    RepairList
  ],
  exports: [CommonPhoto, CommonPhone],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpService,
    Factorys,
    WxSdk
  ]
})
export class AppModule {
}
