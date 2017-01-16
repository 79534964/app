//全局数据对象
var payObject=require('./dataObj');
var priceS=$("#priceS");
var priceP=$("#priceP");
module.exports=function(){
    priceS.text("优惠金额:￥"+payObject.getCouponPrice());
    priceP.text("合计:￥"+payObject.getOrderPrice());
}