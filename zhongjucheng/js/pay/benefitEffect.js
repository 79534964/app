//全局数据对象
var payObject=require('./dataObj');
//最下方的支付按钮
var payPrice=require('./payPrice');

module.exports=function(){
    var index=0;
    //为常量
    _benIndex=0;
    var curStyle="color";
    var inputBox=$("#scroller li span");
    inputBox.unbind("tap");
    inputBox.on("tap",function(){
        if(index==$(this).attr("data")){
            if(_benIndex%2){
                removeCur(index);
            }else{
                addCur(index);
            }
            _benIndex++;
        }else{
            removeCur(index);
            index=$(this).attr("data");
            addCur(index);
        }
    });
    inputBox.eq(0).trigger("tap");
    function addCur(index){
        var arr=payObject.getNewCouponArr();
        inputBox.eq(index).addClass(curStyle).siblings().attr("checked",true);
        payObject.setCouponId(arr[index].couponId||arr[index].id);
        if(arr[index].priceType=="1"){
            payObject.setCouponPrice(arr[index].couponPrice);
            payObject.setOrderPrice(payObject.getProductPrice()-payObject.getCouponPrice());
        }else if(arr[index].priceType=="2"){
            payObject.setCouponPrice(payObject.getProductPrice()*arr[index].couponPrice/100);
            payObject.setOrderPrice(payObject.getProductPrice()-payObject.getCouponPrice());
        }
        payPrice();
    }
    function removeCur(index){
        inputBox.eq(index).removeClass(curStyle).siblings().removeAttr("checked");
        payObject.setCouponId("undefined");
        payObject.setCouponPrice(0);
        payObject.setOrderPrice(payObject.getProductPrice());
        payPrice();
    }
}