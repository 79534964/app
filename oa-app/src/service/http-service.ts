import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class HttpService {
  // 测试
  // private PCHOST = 'http://test.wx.mattburg.cn/managerment/';
  // private HOST = 'http://test.wx.mattburg.cn/managerment/m/';
  // private WXHOST = 'http://test.wx.mattburg.cn/coffeewx/';
  // 正式
  // private PCHOST = 'http://pro.massburg.net/managerment/';
  // private HOST = 'http://pro.massburg.net/managerment/m/';
  // private WXHOST = 'http://pro.massburg.net/coffeewx/';
  // 正式
  private PCHOST = 'http://oa.managerment.mattburg.cn/managerment/';
  private HOST = 'http://oa.managerment.mattburg.cn/managerment/m/';
  private WXHOST = 'http://org.oa.mattburg.cn/coffeewx/';

  private headers = new Headers();

  constructor(public http: Http) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  // 上传图片
  commonUpload(data) {
    return this.http.post(`${this.PCHOST}upload/img`, data);
  }

  // 删除图片
  commonDelImg(data) {
    return this.http.post(`${this.PCHOST}upload/del`, data, {headers: this.headers});
  }

  // 数据字典
  commonDict(data) {
    return this.http.post(`${this.PCHOST}dict/code`, data, {headers: this.headers});
  }

  // 获取用户信息
  commonGetMobile(data) {
    return this.http.post(`${this.HOST}appTask/data`, data, {headers: this.headers});
  }

  // 获取用户信息
  commonWxSign(data) {
    return this.http.post(`${this.WXHOST}sign`, data, {headers: this.headers});
  }

  // 登陆
  indexLogin(data) {
    return this.http.post(`${this.PCHOST}login`, data, {headers: this.headers});
  }

  // 获取故障机器
  indexError(data) {
    return this.http.post(`${this.HOST}machine/breakDownList`, data, {headers: this.headers});
  }

  // 获取app版本号
  indexVsersion(data) {
    return this.http.post(`${this.HOST}appinfo?appkey=VERSION_H5`, data, {headers: this.headers});
  }

  // 查询订单
  reportOrder(data) {
    return this.http.post(`${this.HOST}order/getOrderInfo`, data, {headers: this.headers});
  }

  // 获取总销售情况
  countMachinesala(data) {
    return this.http.post(`${this.HOST}order/getMachineSala`, data, {headers: this.headers});
  }

  // 获取商品销售列表
  countProductList(data) {
    return this.http.post(`${this.HOST}order/getProductSalaList`, data, {headers: this.headers});
  }

  // 根据商品id获取每天的销售情况
  countProductIdList(data) {
    return this.http.post(`${this.HOST}order/getProductSalaListByProductId`, data, {headers: this.headers});
  }

  // 获取机器销售列表
  countMachineList(data) {
    return this.http.post(`${this.HOST}order/getMachineSalaList`, data, {headers: this.headers});
  }

  // 根据机器id获取每天的销售情况
  countMachineIdList(data) {
    return this.http.post(`${this.HOST}order/getProductSalaListByMachineId`, data, {headers: this.headers});
  }

  // 获取操作的机器列表
  operativeMachineList(data) {
    return this.http.post(`${this.HOST}machine/list`, data, {headers: this.headers});
  }

  // 操作的机器操作
  operativeOperate(data) {
    return this.http.post(`${this.PCHOST}machine/machineoperation`, data, {headers: this.headers});
  }

  // 获取物料列表
  operativeMaterielList(data) {
    return this.http.post(`${this.HOST}machine/me`, data, {headers: this.headers});
  }

  // 获取任务列表
  operativeTaskList(data) {
    return this.http.post(`${this.HOST}appTask/list`, data, {headers: this.headers});
  }

  // 获取经纬计算结果
  operativeTaskDistance(data) {
    return this.http.post(`${this.HOST}machine/distance`, data, {headers: this.headers});
  }

  // 执行任务
  operativeTaskTask(data) {
    return this.http.post(`${this.HOST}appTask/task`, data, {headers: this.headers});
  }

  // 获取机器反馈订单
  operativeTaskFeedback(data) {
    return this.http.post(`${this.PCHOST}fb/list`, data, {headers: this.headers});
  }

  // 设置机器反馈订单状态
  operativeTaskFeedbackState(data) {
    return this.http.post(`${this.PCHOST}fb/dispose2`, data, {headers: this.headers});
  }

  // 获取机器异常订单
  operativeTaskOrderList(data) {
    return this.http.post(`${this.HOST}aoh/order`, data, {headers: this.headers});
  }

  // 处理机器异常订单
  operativeTaskOrderHandleOrder(data) {
    return this.http.post(`${this.HOST}aoh/deal`, data, {headers: this.headers});
  }

  // 获取报修列表
  operativeTaskRepairLst(data) {
    return this.http.post(`${this.HOST}appTask/repairList`, data, {headers: this.headers});
  }

  // 添加报修信息
  operativeTaskRepairRepairAdd(data) {
    return this.http.post(`${this.HOST}appTask/report`, data, {headers: this.headers});
  }

  // 修改报修信息
  operativeTaskRepairRepairUpdate(data) {
    return this.http.post(`${this.HOST}appTask/update`, data, {headers: this.headers});
  }

  // 撤销报修信息
  operativeTaskRepairRepairCancel(data) {
    return this.http.post(`${this.HOST}appTask/cancel`, data, {headers: this.headers});
  }

  // 确认维修
  repairListSubmit(data) {
    return this.http.post(`${this.PCHOST}repair/repairing`, data, {headers: this.headers});
  }

  // 维修成功
  repairListSuccess(data) {
    return this.http.post(`${this.PCHOST}repair/finish`, data, {headers: this.headers});
  }
}
