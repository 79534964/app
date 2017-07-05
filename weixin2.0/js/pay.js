//loading组件
var loading=require('./pay/loading');
//头部产品组件
var header=require('./pay/header');
//选机器部分组件
var machine=require('./pay/machine');
//全局数据对象
var payObject=require('./pay/dataObj');
//将数据中的优惠券按规则重新排序的组件
var sortBenefit=require('./pay/sortBenefit');
//优惠劵区域
var reBenefit=require('./pay/reBenefit');
//最下方的支付按钮
var payPrice=require('./pay/payPrice');
//最后一步支付
var submit=require('./pay/submit');
// 获取商品
var getProductInfo=require('./pay/getProductInfo');
sucess=function(json){
    var data=json;
    payObject.init(data);
    sortBenefit(data);
    $(document).ready(function(){
       loading(false);
       header(data[2].productEntity);
       machine(data);
       reBenefit();
       payPrice();
       submit();
       getProductInfo();
    });
}